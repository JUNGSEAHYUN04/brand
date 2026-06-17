import { NextRequest } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { getSystemPrompt, getUserPrompt } from '@/lib/prompts'
import { BrandIdentitySimple } from '@/lib/types'
import { getImprovedRulesPrompt } from '@/lib/prompt-memory'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

function norm(s: string) {
  return s?.trim().toLowerCase().replace(/\s+/g, ' ') ?? ''
}

function sloganKey(v: unknown): string {
  if (Array.isArray(v)) return norm(v.join(' '))
  if (typeof v === 'string') return norm(v)
  return ''
}

function personalityKey(c: BrandIdentitySimple) {
  return norm([...c.brand.personality].sort().join(','))
}

function isDuplicate(
  candidate: BrandIdentitySimple,
  existing: BrandIdentitySimple[]
): boolean {
  return existing.some(c =>
    norm(c.brand.name) === norm(candidate.brand.name) ||
    sloganKey(c.brand.slogan.ko) === sloganKey(candidate.brand.slogan.ko) ||
    sloganKey(c.brand.slogan.en) === sloganKey(candidate.brand.slogan.en) ||
    personalityKey(c) === personalityKey(candidate) ||
    norm(c.brand.tone) === norm(candidate.brand.tone) ||
    norm(c.typography.heading.name) === norm(candidate.typography.heading.name) ||
    norm(c.typography.body.name) === norm(candidate.typography.body.name) ||
    norm(c.typography.mono.name) === norm(candidate.typography.mono.name) ||
    norm(c.colors.primary.hex) === norm(candidate.colors.primary.hex) ||
    norm(c.colors.secondary.hex) === norm(candidate.colors.secondary.hex) ||
    norm(c.colors.accent.hex) === norm(candidate.colors.accent.hex)
  )
}

async function generateSingleCandidate(
  prompt: string,
  previousCandidates: BrandIdentitySimple[] = []
): Promise<BrandIdentitySimple | null> {
  try {
    let excludePrompt = prompt
    if (previousCandidates.length > 0) {
      const join = (arr: string[]) => arr.filter(Boolean).join(', ')

      const excludedBrandNames = join(previousCandidates.map(c => c.brand.name))
      const excludedSlogansKo = join(previousCandidates.map(c => sloganKey(c.brand.slogan.ko)))
      const excludedSlogansEn = join(previousCandidates.map(c => sloganKey(c.brand.slogan.en)))
      const excludedPersonalities = join(previousCandidates.map(c => c.brand.personality.join('/')))
      const excludedTones = join(previousCandidates.map(c => c.brand.tone))
      const excludedHeadingFonts = join(previousCandidates.map(c => c.typography.heading.name))
      const excludedBodyFonts = join(previousCandidates.map(c => c.typography.body.name))
      const excludedMonoFonts = join(previousCandidates.map(c => c.typography.mono.name))
      const excludedPrimary = join(previousCandidates.map(c => c.colors.primary.hex))
      const excludedSecondary = join(previousCandidates.map(c => c.colors.secondary.hex))
      const excludedAccent = join(previousCandidates.map(c => c.colors.accent.hex))

      excludePrompt += `
⚠️ IMPORTANT: Do NOT reuse ANY of the following. Every field below must be completely different from these previous candidates:

Brand names: ${excludedBrandNames}
Slogans (KO): ${excludedSlogansKo}
Slogans (EN): ${excludedSlogansEn}
Personalities: ${excludedPersonalities}
Tones: ${excludedTones}
Heading fonts: ${excludedHeadingFonts}
Body fonts: ${excludedBodyFonts}
Mono fonts: ${excludedMonoFonts}
Primary colors: ${excludedPrimary}
Secondary colors: ${excludedSecondary}
Accent colors: ${excludedAccent}

Generate a completely new candidate where the brand name, both slogans, personality keywords, tone, all three fonts, and all three colors are entirely different from every value listed above. All font names must be exact, valid Google Fonts names in English.`
    }

    // 이 호출은 후보 1개만 생성 (배열 금지)
    excludePrompt += `

⚠️ OUTPUT FORMAT: Return exactly ONE brand identity as a single JSON object: { "brand": {...}, "colors": {...}, "typography": {...} }. Do NOT return an array or a list. Output only one candidate object.`

    const result = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: excludePrompt,
      config: {
        systemInstruction: getSystemPrompt(),
        maxOutputTokens: 8192,
        temperature: 0.9,
        responseMimeType: 'application/json',
        thinkingConfig: { thinkingBudget: 0 },
      },
    })

    const text = result.text
    if (!text) {
      console.error('Empty response')
      return null
    }

    try {
      let parsed = JSON.parse(text)

      // 모델이 배열로 여러 개를 뱉는 경우 첫 번째만 사용
      if (Array.isArray(parsed)) {
        parsed = parsed[0]
      }

      // 구조 검증
      if (!parsed || !parsed.brand || !parsed.colors || !parsed.typography) {
        console.error('Invalid candidate structure:', JSON.stringify(parsed).slice(0, 200))
        return null
      }

      return parsed as BrandIdentitySimple
    } catch {
      console.error('JSON parse failed:', text.slice(0, 200))
      return null
    }
  } catch (e) {
    console.error('Generation error:', e)
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: any = await req.json()

    if (!body.keywords?.length) {
      return new Response(JSON.stringify({ error: '키워드를 입력해주세요.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const count = Number(body.count ?? 3)

    const improvedRules = getImprovedRulesPrompt()
    const prompt = improvedRules
      ? `${getUserPrompt(body)}\n\n${improvedRules}`
      : getUserPrompt(body)

    const readable = new ReadableStream({
      async start(controller) {
        try {
          controller.enqueue(new TextEncoder().encode('['))

          const candidates: BrandIdentitySimple[] = []
          const MAX_ATTEMPTS = count * 5
          let attempts = 0

          const first = await generateSingleCandidate(prompt)
          attempts++
          if (first) candidates.push(first)

          while (candidates.length < count && attempts < MAX_ATTEMPTS) {
            const next = await generateSingleCandidate(prompt, candidates)
            attempts++
            if (next && !isDuplicate(next, candidates)) {
              candidates.push(next)
            }
          }

          if (candidates.length === 0) {
            controller.enqueue(
              new TextEncoder().encode(JSON.stringify({ error: '생성 실패' }))
            )
            controller.close()
            return
          }

          for (let i = 0; i < candidates.length; i++) {
            controller.enqueue(
              new TextEncoder().encode(JSON.stringify(candidates[i]))
            )
            if (i < candidates.length - 1) {
              controller.enqueue(new TextEncoder().encode(','))
            }
          }

          controller.enqueue(new TextEncoder().encode(']'))
          controller.close()
        } catch (err) {
          console.error('Stream error:', err)
          try {
            controller.close()
          } catch {
            // 이미 닫힌 경우 무시
          }
        }
      },
    })

    return new Response(readable, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (err) {
    console.error('Generate API error:', err)
    return new Response(JSON.stringify({ error: '생성 중 오류가 발생했습니다.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}