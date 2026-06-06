import { NextRequest } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { getSystemPrompt, getUserPrompt } from '@/lib/prompts'
import { FormValues, BrandIdentity } from '@/lib/types'
import { localEvaluate } from '@/lib/evaluator'
import { updateMemory, getImprovedRulesPrompt } from '@/lib/prompt-memory'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// AI가 결과물 보고 프롬프트 개선 규칙 생성
async function generatePromptImprovements(
  data: BrandIdentity,
  keywords: string[],
  industry?: string
): Promise<string[]> {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.1-flash-lite',
      generationConfig: { maxOutputTokens: 512, temperature: 0.3 },
    })

    const prompt = `
당신은 시니어 브랜드 전략가이자 AI 프롬프트 엔지니어입니다.
아래 브랜드 아이덴티티 생성 결과물을 분석하고,
다음 생성 시 품질 향상 효과가 가장 큰 프롬프트 규칙 3개를 도출하세요.

=== 생성 결과물 ===
브랜드 키워드: ${keywords.join(', ')}
업종: ${industry || '미지정'}
브랜드명: ${data.brand.name}
슬로건 (한글): ${data.brand.slogan.ko}
슬로건 (영문): ${data.brand.slogan.en}
톤앤매너: ${data.brand.tone}
Personality: ${data.brand.personality.join(', ')}
Primary 컬러: ${data.colors.primary.hex} (${data.colors.primary.name}) 용도: ${data.colors.primary.usage}
Secondary 컬러: ${data.colors.secondary.hex} (${data.colors.secondary.name})
Accent 컬러: ${data.colors.accent.hex} (${data.colors.accent.name})
Heading 폰트: ${data.typography.fonts.heading}
Body 폰트: ${data.typography.fonts.body}
Mono 폰트: ${data.typography.fonts.mono}

=== 평가 기준 ===
- 브랜드명과 업종의 적합성
- 슬로건의 기억성, 차별성, 전달력
- Tone & Personality의 일관성
- 컬러 전략의 논리성과 활용성
- 폰트 선택의 적합성
- 전체 브랜드 시스템의 일관성

=== 분석 절차 ===
각 규칙을 만들기 전에 반드시 내부적으로 아래 질문에 답하세요.
1. 왜 이런 결과가 생성되었는가?
2. 생성 단계에서 어떤 판단 기준이 부족했는가?
3. 어떤 생성 규칙을 추가하면 동일한 문제가 재발하지 않는가?

중요:
- 결과물의 표면적인 수정안을 제시하지 마세요.
- 생성 로직을 개선하는 규칙만 작성하세요.
- 추상적인 표현(더 창의적으로, 더 세련되게 등)을 사용하지 마세요.
- 반드시 측정 가능하거나 판단 가능한 기준을 포함하세요.
- 영향도가 가장 큰 규칙만 선택하세요.
- 이미 잘된 요소는 언급하지 마세요.

=== 출력 형식 ===
- 규칙 내용
- 규칙 내용
- 규칙 내용
다른 설명 없이 규칙만 출력하세요. 규칙은 특정 결과물을 수정하기 위한 지시가 아니라, 향후 수백 번의 브랜드 생성에서도 재사용 가능한 일반화된 생성 규칙이어야 합니다.
`

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    return text
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s*/, '').trim())
      .filter(line => line.length > 10)
      .slice(0, 3)
  } catch (e) {
    console.error('AI improvement error:', e)
    return []
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: FormValues = await req.json()

    if (!body.keywords?.length) {
      return new Response(JSON.stringify({ error: '키워드를 입력해주세요.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.1-flash-lite',
      systemInstruction: getSystemPrompt(),
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      },
    })

    // 누적 개선 규칙 포함
    const improvedRules = getImprovedRulesPrompt()
    const prompt = improvedRules
      ? `${getUserPrompt(body)}\n\n${improvedRules}`
      : getUserPrompt(body)

    const result = await model.generateContentStream(prompt)

    const readable = new ReadableStream({
  async start(controller) {
    let fullText = ''

    try {
      for await (const chunk of result.stream) {
        try {
          const text = chunk.text()
          if (text) {
            fullText += text
            controller.enqueue(new TextEncoder().encode(text))
          }
        } catch (chunkError) {
          // 개별 청크 에러는 무시하고 계속
          console.error('Chunk error:', chunkError)
        }
      }
      controller.close()

      // 백그라운드 평가
      if (fullText) {
        setImmediate(async () => {
          try {
            const clean = fullText.replace(/```json|```/g, '').trim()
            const data = JSON.parse(clean) as BrandIdentity
            const localResult = localEvaluate(data, body.keywords, body.industry)
            const aiRules = await generatePromptImprovements(data, body.keywords, body.industry)
            const combinedFeedback = [...localResult.failedItems, ...aiRules]
            updateMemory(localResult.score, aiRules.length, combinedFeedback)
          } catch (e) {
            console.error('Evaluation error:', e)
          }
        })
      }

    } catch (err) {
      console.error('Stream error:', err)
      controller.close()
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