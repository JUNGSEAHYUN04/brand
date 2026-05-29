import { FormValues } from './types'

export const getSystemPrompt = () => `
당신은 15년 경력의 전문 브랜드 아이덴티티 디자이너입니다.
입력받은 브랜드 정보를 바탕으로 완성도 높은 브랜드 아이덴티티 시스템을 생성하세요.

반드시 지켜야 할 규칙:
1. 순수 JSON만 반환하세요. 마크다운 백틱, 설명 텍스트 절대 금지
2. JSON 키는 반드시 이 순서대로: brand → logo → colors → typography → spacing → components
3. 폰트는 Google Fonts에 실제 존재하는 폰트명만 사용하세요
   - 한글이 포함된 브랜드명이면 한글을 지원하는 Google Fonts 폰트를 우선 선택하세요
   - 예시(한글 지원): Noto Sans KR, Nanum Gothic, Nanum Myeongjo, Black Han Sans, Do Hyeon
   - 예시(영문): Inter, Playfair Display, Montserrat, DM Sans, Space Grotesk, JetBrains Mono
4. 로고는 반드시 가로형(landscape) SVG로 생성하세요 (viewBox="0 0 320 80" 기준)
5. 로고 색상은 최소 2가지 이상 사용하고, 그라디언트도 허용합니다
6. 톤앤매너를 모든 결정의 기준으로 삼으세요
`

export const getUserPrompt = (values: FormValues) => `
아래 브랜드 정보를 바탕으로 완전한 브랜드 아이덴티티를 생성해주세요.

=== 브랜드 정보 ===
브랜드명: ${
  values.brandName
    ? `"${values.brandName}"`
    : '없음 — 아래 정보를 바탕으로 브랜드명 후보 3개를 제안하고, 가장 적합한 1개를 선택해 가이드북을 생성하세요'
}
브랜드 키워드: ${values.keywords.join(', ')}
업종: ${values.industry}
타겟 고객: ${values.targetAudience}
톤앤매너: ${values.tone}

=== 슬로건 규칙 ===
- 한글 버전과 영어 버전 각각 1개씩 생성
- 각각 5단어(단어 기준) 이내
- 톤앤매너에 맞는 스타일로 작성
  예시: 톤이 "감성적/따뜻한" → 시적이고 감성적인 슬로건
        톤이 "전문적/신뢰감" → 직관적이고 명확한 슬로건
        톤이 "유쾌한/위트있는" → 재치있고 기억에 남는 슬로건
        톤이 "강렬한/임팩트" → 짧고 강렬한 슬로건

=== 로고 SVG 규칙 ===
- 반드시 가로형 레이아웃 (viewBox="0 0 320 80")
- 톤앤매너에 따라 아래 3가지 스타일 중 1개 선택:
  · wordmark: 브랜드명 전체를 타이포그래피로 표현 (미니멀/모던 톤에 적합)
  · lettermark: 브랜드명 이니셜 1~2자를 심볼화 (고급스러운/전문적 톤에 적합)
  · symbol+wordmark: 기하학적 심볼 + 브랜드명 텍스트 조합 (친근한/역동적 톤에 적합)
- 색상 사용 규칙:
  · 최소 2가지 색상 사용 필수
  · 그라디언트 허용 (단, SVG linearGradient 문법으로 작성)
  · 생성된 Primary, Secondary 컬러를 활용
  · 배경은 투명(transparent)으로 설정
- SVG 내부에 외부 폰트 import 금지 (텍스트는 SVG 기본 font-family 사용)

=== 컬러 규칙 ===
- Primary, Secondary, Accent 3가지 반드시 생성
- 업종 특성과 톤앤매너를 동시에 고려해서 결정
  예시: 의료+신뢰감 → 청록/파랑 계열 / 푸드+따뜻함 → 오렌지/레드 계열
- 각 색상마다 "어디에 주로 쓰이는지" usage 설명 포함
- Neutral 팔레트는 Primary 컬러와 어울리는 톤으로 생성 (완전한 무채색 지양)
- Semantic 컬러(success/error/warning/info)는 범용적인 색상으로 생성

=== 폰트 규칙 ===
- Heading, Body, Mono 3가지 반드시 생성
- 반드시 Google Fonts에 실제 존재하는 폰트명만 사용
- 브랜드명에 한글이 포함되어 있으면 한글을 지원하는 폰트 우선 선택
- Heading과 Body는 서로 대비되는 조합으로 선택 (예: Serif Heading + Sans Body)
- 톤앤매너에 맞는 폰트 선택
  예시: 고급스러운 → Playfair Display / 모던한 → Inter / 친근한 → Nunito

=== 출력 JSON 구조 ===
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
  "logo": {
    "svg": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 80'>...</svg>",
    "style": "wordmark | lettermark | symbol+wordmark",
    "concept": "로고 디자인 컨셉과 선택 이유 (2~3문장)"
  },
  "colors": {
    "primary": { "hex": "#...", "rgb": "r, g, b", "name": "색상 이름", "usage": "CTA 버튼, 주요 강조 요소" },
    "secondary": { "hex": "#...", "rgb": "r, g, b", "name": "색상 이름", "usage": "서브 섹션, 보조 UI 요소" },
    "accent": { "hex": "#...", "rgb": "r, g, b", "name": "색상 이름", "usage": "하이라이트, 포인트 요소" },
    "neutral": {
      "50": "#...",
      "100": "#...",
      "200": "#...",
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
      "label": { "size": 12, "weight": 500, "letterSpacing": "0.08em" }
    }
  },
  "spacing": {
    "base": 4,
    "scale": { "xs": 4, "sm": 8, "md": 16, "lg": 24, "xl": 32, "2xl": 48, "3xl": 64 },
    "borderRadius": { "sm": 4, "md": 8, "lg": 12, "xl": 16, "full": 9999 }
  },
  "components": {
    "button": {
      "variants": ["primary", "secondary", "ghost", "danger"],
      "sizes": {
        "sm": { "height": 32, "paddingX": 12, "fontSize": 13 },
        "md": { "height": 40, "paddingX": 16, "fontSize": 14 },
        "lg": { "height": 48, "paddingX": 20, "fontSize": 16 }
      },
      "states": ["default", "hover", "active", "disabled", "loading"]
    },
    "input": {
      "variants": ["text", "password", "search", "textarea"],
      "states": ["default", "focus", "error", "success", "disabled"]
    },
    "checkbox": { "states": ["unchecked", "checked", "indeterminate", "disabled"] },
    "radio": { "states": ["unselected", "selected", "disabled"] },
    "badge": { "variants": ["filled", "outline", "soft"], "sizes": ["sm", "md"] },
    "tag": { "dismissible": true, "variants": ["default", "colored"] },
    "accordion": { "variants": ["default", "bordered"], "multiple": true },
    "breadcrumb": { "separator": "/", "maxVisible": 4 },
    "card": { "variants": ["default", "bordered", "elevated"], "padding": "md" }
  }
}
`