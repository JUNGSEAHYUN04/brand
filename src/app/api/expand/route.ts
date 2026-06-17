import { GoogleGenAI } from '@google/genai'
import { BrandIdentitySimple, BrandIdentity } from '@/lib/types'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' })

export async function POST(request: Request) {
  try {
    const simpleData: BrandIdentitySimple = await request.json()

    if (!simpleData.brand || !simpleData.colors || !simpleData.typography) {
      return Response.json(
        { error: '필수 데이터가 누락되었습니다.' },
        { status: 400 }
      )
    }

    // 💡 1번 프롬프트: 브랜드 기획 및 텍스트 데이터 전용
    const brandPrompt = `
다음 Simple 브랜드 데이터를 바탕으로 Full '브랜드 기획' 데이터를 JSON으로 확장하세요.

=== 기존 데이터 ===
브랜드명: ${simpleData.brand.name}
슬로건: ${simpleData.brand.slogan.ko} / ${simpleData.brand.slogan.en}
성격: ${simpleData.brand.personality.join(', ')}
톤: ${simpleData.brand.tone}

=== 출력 JSON ===
{
  "brand": {
    "name": "${simpleData.brand.name}",
    "nameReason": "브랜드명을 선택한 이유 (1~2문장)",
    "slogan": {
      "ko": "${simpleData.brand.slogan.ko}",
      "en": "${simpleData.brand.slogan.en}"
    },
    "personality": ${JSON.stringify(simpleData.brand.personality)},
    "brandEssence": "브랜드의 존재이유와 지향하는 미래 (1문장)",
    "tone": "${simpleData.brand.tone}",
    "coreTone": ["핵심 톤 키워드1", "톤2", "톤3"],
    "positioning": {
      "category": "어떤 카테고리/시장에 속하는지",
      "competitors": "주요 경쟁 상대 (1~2문장)",
      "differentiation": "경쟁 대비 차별점 (1~2문장)",
      "statement": "한 문장 포지셔닝 선언문"
    },
    "targetProfile": {
      "demographics": "인구통계 (연령, 성별 등)",
      "occupation": "직업/상황",
      "needs": "핵심 니즈",
      "painPoints": "겪고 있는 불편",
      "goals": "목표"
    },
    "mission": "지금 우리가 매일 하는 일 (1문장)",
    "vision": "5~10년 뒤 만들고 싶은 미래 (1문장)"
  }
}

순수 JSON만 반환하세요. 마크다운, 설명 텍스트 절대 금지.
`

    // 💡 2번 프롬프트: 디자인 시스템(컬러, 폰트) 데이터 전용
    const designPrompt = `
다음 Simple 브랜드 데이터를 바탕으로 Full '디자인 시스템' 데이터를 JSON으로 확장하세요.

=== 기존 데이터 ===
성격: ${simpleData.brand.personality.join(', ')}
톤: ${simpleData.brand.tone}
Primary Color: ${simpleData.colors.primary.hex}
Secondary Color: ${simpleData.colors.secondary.hex}
Accent Color: ${simpleData.colors.accent.hex}
Heading Font: ${simpleData.typography.heading.name}
Body Font: ${simpleData.typography.body.name}
Mono Font: ${simpleData.typography.mono.name}

=== 출력 JSON ===
{
  "colors": {
    "primary": {
      "hex": "${simpleData.colors.primary.hex}",
      "rgb": "r, g, b",
      "name": "${simpleData.colors.primary.name}",
      "usage": "${simpleData.colors.primary.usage}",
      "meaning": "이 색이 전달하는 느낌 (1문장)",
      "dos": ["권장 사용처1", "사용처2"],
      "donts": ["피해야 할 사용1", "피할 사용2"]
    },
    "secondary": {
      "hex": "${simpleData.colors.secondary.hex}",
      "rgb": "r, g, b",
      "name": "${simpleData.colors.secondary.name}",
      "usage": "${simpleData.colors.secondary.usage}",
      "meaning": "이 색이 전달하는 느낌 (1문장)",
      "dos": ["권장 사용처1", "사용처2"],
      "donts": ["피해야 할 사용1", "피할 사용2"]
    },
    "accent": {
      "hex": "${simpleData.colors.accent.hex}",
      "rgb": "r, g, b",
      "name": "${simpleData.colors.accent.name}",
      "usage": "${simpleData.colors.accent.usage}",
      "meaning": "이 색이 전달하는 느낌 (1문장)",
      "dos": ["권장 사용처1", "사용처2"],
      "donts": ["피해야 할 사용1", "피할 사용2"]
    },
    "neutral": {
      "50": "#...", "100": "#...", "200": "#...", "300": "#...", "400": "#...", "500": "#...", "900": "#..."
    },
    "semantic": {
      "success": "#...", "error": "#...", "warning": "#...", "info": "#..."
    },
    "usageRatio": {
      "primary": 0, "secondary": 0, "accent": 0, "neutral": 0
    },
    "accessibility": {
      "summary": "가독성을 확보하기 위한 핵심 원칙",
      "notes": ["권고사항1", "권고사항2"]
    },
    "pairings": [
      { "label": "조합 이름", "bg": "#...", "fg": "#...", "recommended": true, "note": "사용 맥락 또는 피할 이유" },
      { "label": "조합 이름", "bg": "#...", "fg": "#...", "recommended": false, "note": "사용 맥락 또는 피할 이유" }
    ]
  },
  "typography": {
    "fonts": {
      "heading": "${simpleData.typography.heading.name}",
      "body": "${simpleData.typography.body.name}",
      "mono": "${simpleData.typography.mono.name}"
    },
    "scale": {
      "display": { "size": 56, "weight": 700, "lineHeight": 1.1, "letterSpacing": "-0.02em" },
      "h1": { "size": 40, "weight": 700, "lineHeight": 1.2, "letterSpacing": "-0.01em" },
      "h2": { "size": 32, "weight": 600, "lineHeight": 1.25, "letterSpacing": "-0.01em" },
      "h3": { "size": 24, "weight": 600, "lineHeight": 1.3 },
      "h4": { "size": 20, "weight": 500, "lineHeight": 1.4 },
      "bodyL": { "size": 18, "weight": 400, "lineHeight": 1.7 },
      "bodyM": { "size": 16, "weight": 400, "lineHeight": 1.6 },
      "bodyS": { "size": 14, "weight": 400, "lineHeight": 1.5 },
      "caption": { "size": 12, "weight": 400, "lineHeight": 1.4 },
      "label": { "size": 12, "weight": 500, "lineHeight": 1.4, "letterSpacing": "0.08em" }
    }
  }
}

순수 JSON만 반환하세요. 마크다운, 설명 텍스트 절대 금지.
`

    // 💡 두 개의 프롬프트를 동시에 실행합니다. (토큰 분산)
    const [brandRes, designRes] = await Promise.all([
      ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: brandPrompt,
        config: { maxOutputTokens: 8000, temperature: 0.7, responseMimeType: 'application/json' },
      }),
      ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: designPrompt,
        config: { maxOutputTokens: 8000, temperature: 0.7, responseMimeType: 'application/json' },
      })
    ])

    // 에러 체크
    const brandFinish = brandRes.candidates?.[0]?.finishReason
    const designFinish = designRes.candidates?.[0]?.finishReason

    if (brandFinish !== 'STOP' || designFinish !== 'STOP') {
      console.error(`Token Limit Error: Brand(${brandFinish}), Design(${designFinish})`)
      throw new Error('응답이 길어 중간에 잘렸습니다. 다시 시도해주세요.')
    }

    if (!brandRes.text || !designRes.text) {
      throw new Error('빈 응답을 받았습니다.')
    }

    // 각각 파싱
    const parsedBrand = parseJsonLoose<{ brand: any }>(brandRes.text)
    const parsedDesign = parseJsonLoose<{ colors: any, typography: any }>(designRes.text)

    // 💡 백엔드에서 하나로 합쳐서 프론트엔드가 요구하는 완벽한 형태로 조립
    const fullData: BrandIdentity = {
      brand: parsedBrand.brand,
      colors: parsedDesign.colors,
      typography: parsedDesign.typography
    }

    return Response.json(fullData)

  } catch (error) {
    console.error('Expand error:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : '확장 실패' },
      { status: 500 }
    )
  }
}

// 모델 응답에서 JSON만 안전하게 추출/파싱
function parseJsonLoose<T>(raw: string): T {
  // 1) 그대로 시도
  try {
    return JSON.parse(raw) as T
  } catch {
    /* fall through */
  }

  // 2) 코드펜스 제거 후 시도
  let text = raw
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim()
  try {
    return JSON.parse(text) as T
  } catch {
    /* fall through */
  }

  // 3) 첫 '{' 부터 균형 잡힌 '}' 까지만 추출 (문자열 내부 중괄호 무시)
  const start = text.indexOf('{')
  if (start === -1) {
    throw new Error('유효한 JSON을 찾을 수 없습니다. (객체 시작 없음)')
  }

  let depth = 0
  let inStr = false
  let escaped = false
  let end = -1
  for (let i = start; i < text.length; i++) {
    const ch = text[i]
    if (inStr) {
      if (escaped) escaped = false
      else if (ch === '\\') escaped = true
      else if (ch === '"') inStr = false
      continue
    }
    if (ch === '"') inStr = true
    else if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) {
        end = i
        break
      }
    }
  }

  if (end === -1) {
    throw new Error('JSON이 중간에 잘렸습니다. 출력 토큰 한도를 초과했을 수 있습니다.')
  }

  const candidate = text.slice(start, end + 1)
  return JSON.parse(candidate) as T
}