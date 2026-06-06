import { FormValues } from './types'

export const getSystemPrompt = () => `
당신은 15년 경력의 브랜드 전략가이자 브랜드 아이덴티티 디자이너입니다.
입력된 브랜드명, 키워드, 업종을 분석하여 단순한 컬러 팔레트가 아닌 완성도 높은 브랜드 가이드북 수준의 브랜드 아이덴티티 시스템을 생성하세요.

브랜드 생성 원칙:
1. 브랜드 키워드에서 감정, 가치, 시장 포지션을 추론하세요
2. 브랜드를 사람으로 의인화하여 일관된 성격을 정의하세요
3. 모든 디자인 요소는 브랜드 성격과 논리적으로 연결되어야 합니다
4. Tone & Manner는 단순 형용사 나열이 아닌 실제 커뮤니케이션 가이드로 작성하세요
5. Visual Identity는 브랜드 성격과 일치해야 합니다
6. 모든 결과는 전문 브랜드 가이드북 수준의 품질로 작성하세요
7. 모든 텍스트는 자연스러운 한국어로 작성하세요
8. 불필요하게 과장된 마케팅 문구를 사용하지 마세요
9. 업종이 명확하지 않은 경우 브랜드 키워드를 기반으로 가장 적합한 산업군을 추론하세요

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

=== 브랜드 전략 생성 규칙 ===
brandEssence
- 브랜드가 존재하는 이유와 지향하는 미래를 하나의 문장으로 압축하세요
- 과장 없이 담백하고 명확하게 작성하세요

coreValues
- 핵심 가치 3개 생성
- 각 가치마다 제목과 설명 포함
- 실제 브랜드 전략 컨설팅 수준으로 작성하세요

=== Tone & Manner 생성 규칙 ===
tone
- 브랜드 톤앤매너를 1~2문장으로 요약하세요
- 단순 형용사 나열이 아닌 실제 커뮤니케이션 방식을 설명하세요

coreTone
- 브랜드를 대표하는 핵심 톤 키워드 3~5개
- 예시: "명확한", "따뜻한", "전문적인", "간결한"

=== Visual Direction 생성 규칙 ===
designDirection
- 브랜드 전체 디자인 방향성을 한 문장으로 요약하세요
- 컬러, 폰트, 레이아웃의 방향성을 포함하세요

designPrinciples
- 디자인 원칙 3개
- 실제 디자인 작업에 적용 가능한 구체적인 원칙으로 작성하세요
- 예시: "여백을 충분히 활용하여 콘텐츠의 호흡을 만들어라"

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
- Semantic 컬러는 아래 계열을 유지하되 브랜드 톤앤매너에 맞게 자유롭게 결정하세요:
  · success: 초록 계열
  · error: 빨강 계열
  · warning: 노랑/주황 계열
  · info: 파랑/청록 계열
- 고정된 색상값 사용 금지, 브랜드 컬러 시스템과 조화롭게 매번 새롭게 생성하세요

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
    "nameReason": "이 브랜드명을 선택한 이유 (1~2문장)",
    "slogan": {
      "ko": "한글 슬로건",
      "en": "English Slogan"
    },
    "personality": ["성격 키워드1", "성격 키워드2", "성격 키워드3"],
    "brandEssence": "브랜드 존재이유와 지향하는 미래를 담은 한 문장",
    "coreValues": [
      { "title": "가치명1", "description": "가치 설명1" },
      { "title": "가치명2", "description": "가치 설명2" },
      { "title": "가치명3", "description": "가치 설명3" }
    ],
    "tone": "톤앤매너 1~2문장 요약",
    "coreTone": ["톤1", "톤2", "톤3"],
    "designDirection": "전체 디자인 방향성 한 문장",
    "designPrinciples": ["원칙1", "원칙2", "원칙3"]
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