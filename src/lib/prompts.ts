import { FormValues } from './types'

export const getSystemPrompt = () => `
당신은 15년 경력의 전문 브랜드 아이덴티티 디자이너입니다.
입력받은 브랜드 정보를 바탕으로 완성도 높은 브랜드 아이덴티티 시스템을 생성하세요.

반드시 지켜야 할 규칙:
1. 순수 JSON만 반환하세요. 마크다운 백틱, 설명 텍스트 절대 금지
2. JSON 키는 반드시 이 순서대로: brand → colors → typography
3. 폰트는 Google Fonts에 실제 존재하는 폰트명만 사용하세요
   - 한글이 포함된 브랜드명이면 한글을 지원하는 Google Fonts 폰트를 우선 선택하세요
   - 예시(한글 지원): Noto Sans KR, Nanum Gothic, Nanum Myeongjo, Black Han Sans, Do Hyeon
   - 예시(영문): Inter, Playfair Display, Montserrat, DM Sans, Space Grotesk, JetBrains Mono
4. 브랜드 키워드를 분석해서 톤앤매너, 컬러, 폰트 등 모든 요소를 자동으로 결정하세요
5. WCAG 2.1 접근성 기준을 준수하세요 — 텍스트와 배경 간 명도 대비 4.5:1 이상
6. 컬러 조합은 색상 이론(보색, 유사색, 삼각배색 등)을 기반으로 조화롭게 선택하세요
7. 폰트 조합은 Heading과 Body가 서로 대비되면서도 조화로운 쌍으로 선택하세요
`

export const getUserPrompt = (values: FormValues) => `
아래 브랜드 정보를 바탕으로 완전한 브랜드 아이덴티티를 생성해주세요.

=== 브랜드 정보 ===
브랜드명: ${
  values.brandName
    ? `"${values.brandName}"`
    : '없음 — 아래 키워드를 바탕으로 브랜드명 후보 3개를 제안하고, 가장 적합한 1개를 선택해 가이드북을 생성하세요'
}
브랜드 키워드: ${values.keywords.join(', ')}
업종: ${values.industry ? values.industry : '미지정 — 키워드를 바탕으로 가장 적합한 업종을 추론하세요'}

=== 톤앤매너 자동 결정 규칙 ===
- 브랜드 키워드를 분석해서 톤앤매너를 자동으로 결정하세요
- 키워드의 감성, 분위기, 연상 이미지를 종합적으로 판단하세요
  예시: "자연, 친환경, 따뜻함" → 따뜻하고 유기적인 톤
        "혁신, 테크, 미래" → 모던하고 미니멀한 톤
        "럭셔리, 고급, 프리미엄" → 우아하고 세련된 톤
        "활발, 젊은, 트렌디" → 밝고 역동적인 톤

=== 슬로건 규칙 ===
- 한글 버전과 영어 버전 각각 1개씩 생성
- 각각 5단어(단어 기준) 이내
- 키워드에서 추론된 톤앤매너에 맞는 스타일로 작성

=== 컬러 규칙 ===
- Primary, Secondary, Accent 3가지 반드시 생성
- 키워드에서 추론된 업종 특성과 톤앤매너를 동시에 고려해서 결정
- WCAG 2.1 기준 — Primary 컬러는 흰 배경에서 명도 대비 4.5:1 이상 확보
- 각 색상마다 "어디에 주로 쓰이는지" usage 설명 포함
- Neutral 팔레트는 Primary 컬러와 어울리는 톤으로 생성 (완전한 무채색 지양)
- Neutral은 반드시 50, 100, 200, 300, 400, 500, 900 7개 모두 생성
- Semantic 컬러(success/error/warning/info)는 범용적인 색상으로 생성

=== 폰트 규칙 ===
- Heading, Body, Mono 3가지 반드시 생성
- 반드시 Google Fonts에 실제 존재하는 폰트명만 사용
- 브랜드명에 한글이 포함되어 있으면 한글을 지원하는 폰트 우선 선택
- Heading과 Body는 서로 대비되는 조합으로 선택 (예: Serif Heading + Sans Body)
- 키워드 톤앤매너에 맞는 폰트 선택
  예시: 고급스러운 → Playfair Display / 모던한 → Inter / 친근한 → Nunito

=== 출력 JSON 구조 (이 구조만 반환, 다른 키 추가 금지) ===
{
  "brand": {
    "name": "확정된 브랜드명",
    "nameCandidates": ["후보1", "후보2", "후보3"],
    "nameReason": "이 브랜드명을 선택한 이유 (2문장)",
    "slogan": {
      "ko": "한글 슬로건",
      "en": "English Slogan"
    },
    "personality": ["성격 키워드1", "성격 키워드2", "성격 키워드3"],
    "tone": "이 브랜드의 톤앤매너 설명 (2~3문장으로 구체적으로)"
  },
  "colors": {
    "primary": { "hex": "#...", "rgb": "r, g, b", "name": "색상 이름", "usage": "CTA 버튼, 주요 강조 요소" },
    "secondary": { "hex": "#...", "rgb": "r, g, b", "name": "색상 이름", "usage": "서브 섹션, 보조 UI 요소" },
    "accent": { "hex": "#...", "rgb": "r, g, b", "name": "색상 이름", "usage": "하이라이트, 포인트 요소" },
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
    }
  },
  "typography": {
    "fonts": {
      "heading": "Google Fonts 폰트명",
      "body": "Google Fonts 폰트명",
      "mono": "Google Fonts 폰트명"
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
`

export const getLogoPrompt = (brand: {
  name: string
  personality: string[]
  tone: string
  colors: {
    primary: { hex: string; name: string }
    secondary: { hex: string; name: string }
    accent: { hex: string; name: string }
  }
}) => `
Create a professional, minimalist logo for a brand called "${brand.name}".

Brand personality: ${brand.personality.join(', ')}
Brand tone: ${brand.tone}
Primary color: ${brand.colors.primary.name} (${brand.colors.primary.hex})
Secondary color: ${brand.colors.secondary.name} (${brand.colors.secondary.hex})
Accent color: ${brand.colors.accent.name} (${brand.colors.accent.hex})

Requirements:
- Clean, modern, professional design
- Suitable for digital and print use
- White or transparent background
- Incorporate the brand colors
- Simple and memorable
- No text in the logo (icon/symbol only)
`