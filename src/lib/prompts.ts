import { FormValues } from './types'

export const getSystemPrompt = () => `
당신은 15년 경력의 브랜드 전략가이자 브랜드 아이덴티티 디자이너입니다.

입력된 브랜드 정보를 분석하여 완성도 높은 브랜드 가이드북 수준의 아이덴티티를 생성하세요.

핵심 원칙:

순수 JSON만 반환하세요. 마크다운, 설명 텍스트 절대 금지
하나의 브랜드 아이덴티티 객체만 생성하세요. 배열이나 리스트로 감싸지 마세요
JSON 키는 반드시 이 순서대로: brand → colors → typography
브랜드명, 컬러, 폰트 등 모든 요소는 완전히 다르고 독립적이어야 합니다
모든 폰트명은 Google Fonts(fonts.google.com)에 실제 존재하는 정확한 영문 이름으로만 출력하세요 (예: "Playfair Display", "Montserrat", "Noto Sans KR"). 한글 표기, 존재하지 않는 폰트, 시스템 폰트(Helvetica, Arial 등) 절대 금지
폰트명은 Google Fonts에 등재된 철자 그대로 정확히 표기 (대소문자·띄어쓰기 포함). URL 생성에 그대로 쓰이므로 오타가 있으면 안 됩니다
이름·슬로건·컬러·폰트 각각에 "생성 이유"를 반드시 한 문장으로 작성하세요

요소 규칙:

Heading Font, Body Font, Mono Font는 서로 모두 다른 폰트여야 합니다
Primary, Secondary, Accent는 서로 다른 HEX 값이어야 합니다
`

export const getUserPrompt = (values: FormValues) => `
아래 정보를 바탕으로 하나의 완성도 높은 브랜드 아이덴티티를 생성하세요.

브랜드명: ${
  values.brandName
    ? `"${values.brandName}"`
    : '없음 — 키워드를 바탕으로 생성하세요'
}

키워드: ${values.keywords.join(', ')}

업종: ${values.industry || '미지정'}

=== 브랜드명 생성 규칙 ===

브랜드명은 반드시 영문으로 생성 (영어 알파벳만 사용, 한글 표기 금지)
2~3음절 수준의 짧고 기억하기 쉬운 이름
발음하기 쉽고 긍정적 의미 전달
기존 유명 브랜드와 유사하지 않을 것
nameReason: 이 이름을 지은 이유를 한 문장으로

=== 슬로건 규칙 ===

한글: 5단어 이내
영문: 5단어 이내
슬로건은 배열이 아니라 단일 문자열 하나로 출력
sloganReason: 이 슬로건의 의도를 한 문장으로

=== 컬러 규칙 ===

Primary, Secondary, Accent 생성
WCAG 2.1 기준 준수 (명도 대비 4.5:1 이상)
각 컬러마다 reason: 이 색을 고른 이유를 한 문장으로

=== 폰트 규칙 ===

⚠️ 모든 폰트명(heading/body/mono)은 Google Fonts에 실제 존재하는 정확한 영문 이름이어야 하며, 등재된 철자 그대로(대소문자·띄어쓰기 포함) 출력해야 합니다. 한글 폰트명 표기나 시스템 폰트(Helvetica, Arial 등) 금지. 한글 지원이 필요하면 "Noto Sans KR", "Noto Serif KR", "Nanum Gothic" 같은 정식 영문명을 사용하세요
Heading / Body / Mono는 서로 모두 다른 폰트로 선택
각 폰트마다 reason: 이 폰트를 고른 이유를 한 문장으로 (브랜드 성격·가독성·분위기와 연결)

=== 출력 JSON (이 구조의 객체 하나만, 배열 금지) ===

{
  "brand": {
    "name": "영문 브랜드명 (English only)",
    "nameReason": "이 이름을 지은 이유 (한 문장)",
    "slogan": {
      "ko": "한글 슬로건",
      "en": "English Slogan"
    },
    "sloganReason": "이 슬로건의 의도 (한 문장)",
    "personality": ["키워드1", "키워드2", "키워드3"],
    "tone": "톤앤매너 설명 (1~2문장)"
  },
  "colors": {
    "primary": { "hex": "#...", "name": "색상명", "usage": "사용처", "reason": "이 색을 고른 이유 (한 문장)" },
    "secondary": { "hex": "#...", "name": "색상명", "usage": "사용처", "reason": "이 색을 고른 이유 (한 문장)" },
    "accent": { "hex": "#...", "name": "색상명", "usage": "사용처", "reason": "이 색을 고른 이유 (한 문장)" }
  },
  "typography": {
    "heading": { "name": "Google Fonts 폰트명", "reason": "이 폰트를 고른 이유 (한 문장)" },
    "body": { "name": "Google Fonts 폰트명", "reason": "이 폰트를 고른 이유 (한 문장)" },
    "mono": { "name": "Google Fonts 폰트명", "reason": "이 폰트를 고른 이유 (한 문장)" }
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
Create a professional, minimalist logo for "${brand.name}".

Personality: ${brand.personality.join(', ')}
Tone: ${brand.tone}
Colors: Primary ${brand.colors.primary.name} (${brand.colors.primary.hex}), Secondary ${brand.colors.secondary.name} (${brand.colors.secondary.hex}), Accent ${brand.colors.accent.name} (${brand.colors.accent.hex})

Requirements:

Clean, modern, professional design
Icon/symbol only (no text)
Suitable for digital and print
Use the brand colors
`