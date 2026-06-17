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

    // 확장 프롬프트
    const expandPrompt = `
다음 Simple 브랜드 데이터를 Full 브랜드 데이터로 확장하세요.

=== 기존 데이터 ===
브랜드명: ${simpleData.brand.name}
슬로건: ${simpleData.brand.slogan.ko} / ${simpleData.brand.slogan.en}
성격: ${simpleData.brand.personality.join(', ')}
톤: ${simpleData.brand.tone}

Primary Color: ${simpleData.colors.primary.name} (${simpleData.colors.primary.hex})
Secondary Color: ${simpleData.colors.secondary.name} (${simpleData.colors.secondary.hex})
Accent Color: ${simpleData.colors.accent.name} (${simpleData.colors.accent.hex})

Heading Font: ${simpleData.typography.heading.name}
Body Font: ${simpleData.typography.body.name}
Mono Font: ${simpleData.typography.mono.name}

=== 확장할 항목 ===

1. nameReason: 브랜드명을 선택한 이유 (1~2문장)
2. brandEssence: 브랜드의 존재이유와 지향하는 미래 (1문장)
3. coreTone: 핵심 톤 키워드 3~5개
4. positioning: 브랜드 포지셔닝 (구조화)
   - category: 어떤 카테고리/시장에 속하는지
   - competitors: 주요 경쟁 상대 또는 경쟁 구도 (1~2문장)
   - differentiation: 경쟁 대비 차별점 (1~2문장)
   - statement: 한 문장 포지셔닝 선언문
5. targetProfile: 타겟 고객 프로필 (구조화)
   - demographics: 인구통계 (연령대, 성별, 지역 등)
   - occupation: 직업 또는 처한 상황
   - needs: 핵심 니즈 (1~2문장)
   - painPoints: 겪고 있는 문제/불편 (1~2문장)
   - goals: 달성하려는 목표 (1~2문장)
6. mission: 미션 — 지금 우리가 매일 하는 일을 행동 중심으로 (1문장, vision과 겹치지 않게)
7. vision: 비전 — 5~10년 뒤 만들고 싶은 변화/상태를 미래형으로 (1문장, mission과 겹치지 않게)
8. 코어 컬러 3개(primary/secondary/accent) 각각에 다음을 추가:
   - meaning: 이 색이 전달하는 느낌·심리·연상 (1문장, 브랜드 성격과 연결)
   - dos: 권장 사용처 2~3개 (배열, 구체적으로 "어디에 쓰는지")
   - donts: 피해야 할 사용 2~3개 (배열, "이런 데는 쓰지 말 것")
9. Neutral 팔레트: 50, 100, 200, 300, 400, 500, 900 (7개 HEX)
   - Primary 컬러와 어울리는 톤으로 생성
10. Semantic 컬러 (Primary 컬러와 조화로운 계열):
    - success (초록 계열): #...
    - error (빨강 계열): #...
    - warning (노랑/주황 계열): #...
    - info (파랑/청록 계열): #...
11. usageRatio: 컬러 사용 비율 (4개 합계 정확히 100)
    - 실제 UI에서는 neutral(배경·테두리·텍스트)이 가장 큰 비중을 차지함. neutral을 0으로 두지 말 것.
    - 이 브랜드의 성격에 맞게 비율을 직접 판단해서 정할 것. 기계적으로 60/30/10을 쓰지 말 것.
    - primary, secondary, accent, neutral 각각의 % (숫자)
12. accessibility: 접근성 설명
    - summary: 이 컬러 조합에서 가독성을 확보하기 위한 핵심 원칙 (1~2문장, 일반론 말고 이 팔레트에 맞게)
    - notes: 구체적 권고사항 2~4개 (배열, "primary 위에는 흰 텍스트" 처럼 실제 조합 기준으로)
13. pairings: 컬러 페어링 가이드 3~4개 (배열). 각 항목:
    - label: 조합 이름 (예: "Primary 배경 + 흰 텍스트")
    - bg: 배경 HEX
    - fg: 전경(텍스트) HEX
    - recommended: 권장이면 true, 피해야 할 조합이면 false
    - note: 언제 쓰는지 또는 왜 피해야 하는지 (1문장)
    - 권장 조합 2~3개와 피해야 할 조합 1개를 섞을 것
14. Typography Scale (각 스타일의 size, weight, lineHeight, letterSpacing 정의):
    - display, h1, h2, h3, h4, bodyL, bodyM, bodyS, caption, label

=== 출력 JSON ===
{
  "brand": {
    "name": "${simpleData.brand.name}",
    "nameReason": "선택 이유",
    "slogan": {
      "ko": "${simpleData.brand.slogan.ko}",
      "en": "${simpleData.brand.slogan.en}"
    },
    "personality": ${JSON.stringify(simpleData.brand.personality)},
    "brandEssence": "존재이유",
    "tone": "${simpleData.brand.tone}",
    "coreTone": ["톤1", "톤2", "톤3"],
    "positioning": {
      "category": "...",
      "competitors": "...",
      "differentiation": "...",
      "statement": "..."
    },
    "targetProfile": {
      "demographics": "...",
      "occupation": "...",
      "needs": "...",
      "painPoints": "...",
      "goals": "..."
    },
    "mission": "...",
    "vision": "..."
  },
  "colors": {
    "primary": {
      "hex": "${simpleData.colors.primary.hex}",
      "rgb": "r, g, b",
      "name": "${simpleData.colors.primary.name}",
      "usage": "${simpleData.colors.primary.usage}",
      "meaning": "이 색이 전달하는 느낌",
      "dos": ["권장 사용처1", "권장 사용처2"],
      "donts": ["피할 사용1", "피할 사용2"]
    },
    "secondary": {
      "hex": "${simpleData.colors.secondary.hex}",
      "rgb": "r, g, b",
      "name": "${simpleData.colors.secondary.name}",
      "usage": "${simpleData.colors.secondary.usage}",
      "meaning": "이 색이 전달하는 느낌",
      "dos": ["권장 사용처1", "권장 사용처2"],
      "donts": ["피할 사용1", "피할 사용2"]
    },
    "accent": {
      "hex": "${simpleData.colors.accent.hex}",
      "rgb": "r, g, b",
      "name": "${simpleData.colors.accent.name}",
      "usage": "${simpleData.colors.accent.usage}",
      "meaning": "이 색이 전달하는 느낌",
      "dos": ["권장 사용처1", "권장 사용처2"],
      "donts": ["피할 사용1", "피할 사용2"]
    },
    "neutral": {
      "50": "#...",
      "100": "#...",
      "200": "#...",
      "300": "#...",
      "400": "#...",
      "500": "#...",
      "900": "#..."
    },
    "semantic": {
      "success": "#...",
      "error": "#...",
      "warning": "#...",
      "info": "#..."
    },
    "usageRatio": {
      "primary": 0,
      "secondary": 0,
      "accent": 0,
      "neutral": 0
    },
    "accessibility": {
      "summary": "...",
      "notes": ["...", "..."]
    },
    "pairings": [
      { "label": "조합 이름", "bg": "#......", "fg": "#......", "recommended": true, "note": "사용 맥락" },
      { "label": "조합 이름", "bg": "#......", "fg": "#......", "recommended": false, "note": "피해야 할 이유" }
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

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: expandPrompt,
      config: {
        maxOutputTokens: 12288,
        temperature: 0.7,
        responseMimeType: 'application/json',
      },
    })

    const responseText = response.text
    if (!responseText) {
      throw new Error('빈 응답을 받았습니다.')
    }

    // responseMimeType이 JSON이라 보통 순수 JSON이지만, 혹시 몰라 안전하게 추출
    let fullData: BrandIdentity
    try {
      fullData = JSON.parse(responseText)
    } catch {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('유효한 JSON을 찾을 수 없습니다.')
      }
      fullData = JSON.parse(jsonMatch[0])
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