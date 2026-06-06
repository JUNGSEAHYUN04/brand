import { BrandIdentity } from './types'

// ─────────────────────────────────────────
// WCAG 대비 계산
// ─────────────────────────────────────────
function hexToRgb(hex: string) {
  const clean = hex.replace('#', '')
  return {
    r: parseInt(clean.substring(0, 2), 16) / 255,
    g: parseInt(clean.substring(2, 4), 16) / 255,
    b: parseInt(clean.substring(4, 6), 16) / 255,
  }
}

function getLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex)
  const toLinear = (v: number) => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1)
  const l2 = getLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

// ─────────────────────────────────────────
// 평가 결과 타입
// ─────────────────────────────────────────
export interface LocalEvalResult {
  score: number
  maxScore: number
  failedItems: string[]
  feedback: string
}

// ─────────────────────────────────────────
// 로컬 평가 (토큰 0)
// ─────────────────────────────────────────
export function localEvaluate(
  data: BrandIdentity,
  keywords: string[],
  industry?: string
): LocalEvalResult {
  const failedItems: string[] = []
  let score = 0
  const maxScore = 100

  // 1. 슬로건 5단어 이내
  const koWords = data.brand.slogan.ko.trim().split(/\s+/).length
  const enWords = data.brand.slogan.en.trim().split(/\s+/).length
  if (koWords <= 5 && enWords <= 5) {
    score += 10
  } else {
    failedItems.push(`슬로건이 너무 깁니다 (한글: ${koWords}단어, 영문: ${enWords}단어). 각각 5단어 이내로 작성하세요.`)
  }

  // 2. Neutral 7개 모두 있는지
  const requiredNeutral = ['50', '100', '200', '300', '400', '500', '900']
  const missingNeutral = requiredNeutral.filter(k => !data.colors.neutral[k as keyof typeof data.colors.neutral])
  if (missingNeutral.length === 0) {
    score += 10
  } else {
    failedItems.push(`Neutral 팔레트 누락: ${missingNeutral.join(', ')}`)
  }

  // 3. 폰트 3개 모두 있는지
  if (data.typography.fonts.heading && data.typography.fonts.body && data.typography.fonts.mono) {
    score += 10
  } else {
    failedItems.push('폰트가 누락되었습니다. Heading, Body, Mono 3가지 모두 필요합니다.')
  }

  // 4. HEX 형식
  const hexPattern = /^#[0-9A-Fa-f]{6}$/
  const hexValues = [
    data.colors.primary.hex,
    data.colors.secondary.hex,
    data.colors.accent.hex,
    data.colors.semantic.success,
    data.colors.semantic.error,
    data.colors.semantic.warning,
    data.colors.semantic.info,
  ]
  const invalidHex = hexValues.filter(h => !hexPattern.test(h))
  if (invalidHex.length === 0) {
    score += 10
  } else {
    failedItems.push(`잘못된 HEX 형식: ${invalidHex.join(', ')}`)
  }

  // 5. Primary WCAG 대비
  const primaryContrast = getContrastRatio(data.colors.primary.hex, '#ffffff')
  if (primaryContrast >= 4.5) {
    score += 15
  } else if (primaryContrast >= 3) {
    score += 8
    failedItems.push(`Primary 컬러 대비 부족 (${primaryContrast.toFixed(2)}:1). 4.5:1 이상 필요합니다.`)
  } else {
    failedItems.push(`Primary 컬러 대비 매우 부족 (${primaryContrast.toFixed(2)}:1). 더 어두운 색상을 사용하세요.`)
  }

  // 6. 컬러 조화
  const p = hexToRgb(data.colors.primary.hex)
  const s = hexToRgb(data.colors.secondary.hex)
  const a = hexToRgb(data.colors.accent.hex)
  const psDiff = Math.abs(p.r - s.r) + Math.abs(p.g - s.g) + Math.abs(p.b - s.b)
  const paDiff = Math.abs(p.r - a.r) + Math.abs(p.g - a.g) + Math.abs(p.b - a.b)
  if (psDiff > 0.1 && paDiff > 0.1) {
    score += 10
  } else {
    score += 5
    failedItems.push('Primary, Secondary, Accent 컬러가 너무 유사합니다. 더 구별되는 색상 조합을 사용하세요.')
  }

  // 7. 폰트 조합 대비
  const headingFont = data.typography.fonts.heading.toLowerCase()
  const bodyFont = data.typography.fonts.body.toLowerCase()
  const serifFonts = ['playfair', 'merriweather', 'lora', 'nanum myeongjo', 'eb garamond']
  const sansFonts = ['inter', 'roboto', 'montserrat', 'dm sans', 'nunito', 'poppins', 'noto sans', 'nanum gothic']
  const headingIsSerif = serifFonts.some(f => headingFont.includes(f))
  const bodyIsSans = sansFonts.some(f => bodyFont.includes(f))
  if (headingIsSerif !== bodyIsSans || headingFont !== bodyFont) {
    score += 10
  } else {
    score += 5
    failedItems.push('Heading과 Body 폰트가 너무 유사합니다. Serif+Sans 조합을 권장합니다.')
  }

  // 8. 타입 스케일 계층
  const scale = data.typography.scale
  const scaleLogic = scale.display.size > scale.h1.size &&
    scale.h1.size > scale.h2.size &&
    scale.h2.size > scale.h3.size &&
    scale.bodyL.size > scale.caption.size
  if (scaleLogic) {
    score += 10
  } else {
    failedItems.push('타입 스케일 계층이 올바르지 않습니다.')
  }

  // 9. Tone 설명 구체성
  if (data.brand.tone.length >= 50) {
    score += 10
  } else {
    score += 5
    failedItems.push('tone 설명이 너무 짧습니다. 2~3문장으로 구체적으로 작성하세요.')
  }

  // 10. Personality 키워드
  if (data.brand.personality.length >= 3) {
    score += 5
  } else {
    failedItems.push('personality 키워드가 부족합니다. 3개 이상 작성하세요.')
  }

  const feedback = failedItems.length > 0
    ? `다음 항목을 개선하세요:\n${failedItems.map(i => `- ${i}`).join('\n')}`
    : ''

  return { score, maxScore, failedItems, feedback }
}