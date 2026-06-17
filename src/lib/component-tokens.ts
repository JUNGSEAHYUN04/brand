// @ts-ignore
import { oklch, formatHex, converter } from 'culori'
import { Colors, Typography } from './types'

// ─────────────────────────────────────────
// 유틸리티
// ─────────────────────────────────────────
const toRgb = converter('rgb')

function withOpacity(hex: string, opacity: number): string {
  const rgb = toRgb(hex)
  if (!rgb) return hex
  return `rgba(${Math.round(rgb.r * 255)}, ${Math.round(rgb.g * 255)}, ${Math.round(rgb.b * 255)}, ${opacity})`
}

// WCAG 상대 휘도 계산
function getLuminance(hex: string): number {
  const rgb = toRgb(hex)
  if (!rgb) return 0
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// WCAG 대비 비율
function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1)
  const l2 = getLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker  = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

// 배경색에 따라 흰/검 자동 선택 (WCAG AA 4.5:1)
function getAccessibleTextColor(bgHex: string): string {
  const white = '#ffffff'
  const dark  = '#0F0F0F'
  return getContrastRatio(bgHex, white) >= 4.5 ? white : dark
}

// OKLCH 기반 컬러 스케일 생성
function generateScale(hex: string): Record<string, string> {
  const base = oklch(hex)
  if (!base) return {}

  const lightnesses: Record<string, number> = {
    '50':  0.97,
    '100': 0.93,
    '200': 0.87,
    '300': 0.78,
    '400': 0.68,
    '500': base.l,
    '600': Math.max(base.l - 0.08, 0.1),
    '700': Math.max(base.l - 0.16, 0.05),
    '800': Math.max(base.l - 0.24, 0.03),
    '900': Math.max(base.l - 0.32, 0.01),
  }

  return Object.fromEntries(
    Object.entries(lightnesses).map(([key, l]) => {
      const isBright = l > base.l

      // 밝은 단계: 채도 강하게 죽이기 + hue 살짝 이동
      const ratio = base.l / Math.max(l, 0.01)
      const c = isBright
        ? base.c * Math.pow(ratio, 1.5) * 0.25  // 밝은 쪽 채도 강하게 감소
        : base.c * Math.pow(ratio, 0.8)          // 어두운 쪽은 채도 유지

      const h = isBright
        ? (base.h ?? 0) + 10  // 밝은 쪽 hue 살짝 이동 (형광 방지)
        : base.h

      return [
        key,
        formatHex({ mode: 'oklch', l, c, h }) ?? hex,
      ]
    })
  )
}
// ─────────────────────────────────────────
// 1. Foundation Tokens
// ─────────────────────────────────────────
export function generateFoundationTokens(colors: Colors, typography: Typography) {
  return {
    color: {
      primary:   generateScale(colors.primary.hex),
      secondary: generateScale(colors.secondary.hex),
      accent:    generateScale(colors.accent.hex),
      neutral:   colors.neutral,
      semantic: {
        success: generateScale(colors.semantic.success),
        warning: generateScale(colors.semantic.warning),
        error:   generateScale(colors.semantic.error),
        info:    generateScale(colors.semantic.info),
      },
    },
    spacing: {
      1: 4,
      2: 8,
      3: 12,
      4: 16,
      5: 20,
      6: 24,
      8: 32,
      10: 40,
      12: 48,
      16: 64,
    },
    radius: {
      sm:   4,
      md:   8,
      lg:   12,
      xl:   16,
      full: 9999,
    },
    elevation: {
      1: '0 1px 4px rgba(0, 0, 0, 0.06)',
      2: '0 4px 16px rgba(0, 0, 0, 0.10)',
      3: '0 8px 32px rgba(0, 0, 0, 0.14)',
    },
    motion: {
      duration: {
        fast:   150,
        normal: 250,
        slow:   350,
      },
      easing: {
        standard:   'cubic-bezier(0.4, 0, 0.2, 1)',
        emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
        decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
        accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
      },
    },
    zIndex: {
      dropdown: 1000,
      sticky:   1100,
      modal:    1200,
    },
    typography: {
      fonts: {
        heading: typography.fonts.heading,
        body:    typography.fonts.body,
        mono:    typography.fonts.mono,
      },
      scale: {
        display: typography.scale.display,
        h1:      typography.scale.h1,
        h2:      typography.scale.h2,
        h3:      typography.scale.h3,
        h4:      typography.scale.h4,
        body:    typography.scale.bodyM,
        bodyL:   typography.scale.bodyL,
        bodyS:   typography.scale.bodyS,
        caption: typography.scale.caption,
        label:   typography.scale.label,
      },
    },
    controlSize: {
      sm: 32,
      md: 40,
      lg: 48,
    },
    surface: {
      base:    '#ffffff',
      raised:  '#ffffff',
      overlay: '#ffffff',
      inverse: '#0F0F0F',
    },
    layout: {
      contentMaxWidth: 1200,
      sidebarWidth:    280,
      headerHeight:    64,
    },
    breakpoints: {
      sm:  640,
      md:  768,
      lg:  1024,
      xl:  1280,
      '2xl': 1536,
    },
    grid: {
      columns:     12,
      gutter:      24,
      margin:      24,
      maxWidth:    1200,
      // 반응형 컬럼 수 (breakpoint별)
      responsive: {
        sm: 4,
        md: 8,
        lg: 12,
      },
    },
  }
}

// ─────────────────────────────────────────
// 2. Semantic Tokens
// ─────────────────────────────────────────
export function generateSemanticTokens(foundation: ReturnType<typeof generateFoundationTokens>) {
  const { color, radius, surface } = foundation

  return {
    primary: {
      default:  color.primary['500'],
      hover:    color.primary['600'],
      pressed:  color.primary['700'],
      subtle:   color.primary['50'],
      soft:     color.primary['100'],
      focus:    withOpacity(color.primary['500'], 0.25),
    },
    success: {
      default:  color.semantic.success['500'],
      hover:    color.semantic.success['600'],
      subtle:   color.semantic.success['50'],
      soft:     color.semantic.success['100'],
      focus:    withOpacity(color.semantic.success['500'], 0.25),
    },
    warning: {
      default:  color.semantic.warning['500'],
      hover:    color.semantic.warning['600'],
      subtle:   color.semantic.warning['50'],
      soft:     color.semantic.warning['100'],
      focus:    withOpacity(color.semantic.warning['500'], 0.25),
    },
    error: {
      default:  color.semantic.error['500'],
      hover:    color.semantic.error['600'],
      subtle:   color.semantic.error['50'],
      soft:     color.semantic.error['100'],
      focus:    withOpacity(color.semantic.error['500'], 0.25),
    },
    info: {
      default:  color.semantic.info['500'],
      hover:    color.semantic.info['600'],
      subtle:   color.semantic.info['50'],
      soft:     color.semantic.info['100'],
      focus:    withOpacity(color.semantic.info['500'], 0.25),
    },
    text: {
      primary:   color.neutral['900'],
      secondary: color.neutral['500'],
      disabled:  color.neutral['400'] ?? '#9CA3AF',
      inverse:   '#ffffff',
      brand:     color.primary['500'],
    },
    bg: {
      default:  surface.base,
      subtle:   color.neutral['50'],
      muted:    color.neutral['100'],
      disabled: color.neutral['100'],
    },
    surface: {
      base:    surface.base,
      raised:  surface.raised,
      overlay: surface.overlay,
      inverse: surface.inverse,
    },
    border: {
      default:  color.neutral['200'],
      strong:   color.neutral['300'] ?? '#D1D5DB',
      focus:    color.primary['500'],
      error:    color.semantic.error['500'],
      success:  color.semantic.success['500'],
      warning:  color.semantic.warning['500'],
      disabled: color.neutral['200'],
    },
    focusRing: {
      default: `0 0 0 3px ${withOpacity(color.primary['500'], 0.25)}`,
      error:   `0 0 0 3px ${withOpacity(color.semantic.error['500'], 0.25)}`,
      success: `0 0 0 3px ${withOpacity(color.semantic.success['500'], 0.25)}`,
      warning: `0 0 0 3px ${withOpacity(color.semantic.warning['500'], 0.25)}`,
    },
    radius: {
      button: radius.md,
      input:  radius.md,
      card:   radius.lg,
      badge:  radius.full,
      tag:    radius.full,
    },
  }
}

// ─────────────────────────────────────────
// 3. Component Tokens
// ─────────────────────────────────────────
export function generateComponentTokens(
  semantic: ReturnType<typeof generateSemanticTokens>,
  foundation: ReturnType<typeof generateFoundationTokens>
) {
  const { primary, error, success, warning, info, text, bg, border, focusRing, radius, surface } = semantic
  const { elevation, spacing, controlSize, color, motion, zIndex } = foundation

  return {
    // ── Button ──────────────────────────────
    button: {
      primary: {
        default:  { bg: primary.default, text: getAccessibleTextColor(primary.default), border: 'transparent' },
        hover:    { bg: primary.hover,   text: getAccessibleTextColor(primary.hover),   border: 'transparent' },
        pressed:  { bg: primary.pressed, text: getAccessibleTextColor(primary.pressed), border: 'transparent' },
        focus:    { bg: primary.default, text: getAccessibleTextColor(primary.default), shadow: focusRing.default },
        disabled: { bg: bg.disabled,     text: text.disabled,                           border: border.disabled },
        loading:  { bg: primary.default, text: getAccessibleTextColor(primary.default), opacity: 0.8 },
      },
      secondary: {
        default:  { bg: bg.default,  text: text.primary,  border: border.default },
        hover:    { bg: bg.subtle,   text: text.primary,  border: border.default },
        pressed:  { bg: bg.muted,    text: text.primary,  border: border.default },
        focus:    { bg: bg.default,  text: text.primary,  shadow: focusRing.default },
        disabled: { bg: bg.disabled, text: text.disabled, border: border.disabled },
      },
      ghost: {
        default:  { bg: 'transparent',  text: primary.default, border: 'transparent' },
        hover:    { bg: primary.subtle, text: primary.hover,   border: 'transparent' },
        pressed:  { bg: primary.soft,   text: primary.pressed, border: 'transparent' },
        focus:    { bg: 'transparent',  text: primary.default, shadow: focusRing.default },
        disabled: { bg: 'transparent',  text: text.disabled,   border: 'transparent' },
      },
      danger: {
        default:  { bg: error.default, text: getAccessibleTextColor(error.default), border: 'transparent' },
        hover:    { bg: error.hover,   text: getAccessibleTextColor(error.hover),   border: 'transparent' },
        pressed:  { bg: error.default, text: getAccessibleTextColor(error.default), border: 'transparent' },
        focus:    { bg: error.default, text: getAccessibleTextColor(error.default), shadow: focusRing.error },
        disabled: { bg: bg.disabled,   text: text.disabled,                         border: border.disabled },
      },
      sizes: {
        sm: { height: controlSize.sm, paddingX: spacing[3], fontSize: 13, borderRadius: radius.button },
        md: { height: controlSize.md, paddingX: spacing[4], fontSize: 14, borderRadius: radius.button },
        lg: { height: controlSize.lg, paddingX: spacing[5], fontSize: 16, borderRadius: radius.button },
      },
    },

    // ── Input ────────────────────────────────
    input: {
      default:  { bg: bg.default,  border: border.default,  text: text.primary,   placeholder: text.secondary },
      focus:    { bg: bg.default,  border: border.focus,    text: text.primary,   shadow: focusRing.default },
      filled:   { bg: bg.default,  border: border.strong,   text: text.primary },
      error:    { bg: bg.default,  border: border.error,    text: text.primary,   shadow: focusRing.error },
      success:  { bg: bg.default,  border: border.success,  text: text.primary,   shadow: focusRing.success },
      warning:  { bg: bg.default,  border: border.warning,  text: text.primary,   shadow: focusRing.warning },
      disabled: { bg: bg.disabled, border: border.disabled, text: text.disabled },
      readOnly: { bg: bg.subtle,   border: border.default,  text: text.secondary },
      sizes: {
        sm: { height: controlSize.sm, paddingX: spacing[3], fontSize: 13, borderRadius: radius.input },
        md: { height: controlSize.md, paddingX: spacing[4], fontSize: 14, borderRadius: radius.input },
        lg: { height: controlSize.lg, paddingX: spacing[4], fontSize: 16, borderRadius: radius.input },
      },
    },

    // ── Checkbox ─────────────────────────────
    checkbox: {
      unchecked:     { bg: bg.default,      border: border.default,  icon: 'transparent' },
      checked:       { bg: primary.default, border: primary.default, icon: getAccessibleTextColor(primary.default) },
      indeterminate: { bg: primary.default, border: primary.default, icon: getAccessibleTextColor(primary.default) },
      focus:         { shadow: focusRing.default },
      disabled:      { bg: bg.disabled,     border: border.disabled, icon: text.disabled },
    },

    // ── Radio ────────────────────────────────
    radio: {
      unselected: { bg: bg.default,  border: border.default,  dot: 'transparent' },
      selected:   { bg: bg.default,  border: primary.default, dot: primary.default },
      focus:      { shadow: focusRing.default },
      disabled:   { bg: bg.disabled, border: border.disabled, dot: text.disabled },
    },

    // ── Badge ────────────────────────────────
    badge: {
      primary: {
        filled:  { bg: primary.default, text: getAccessibleTextColor(primary.default), border: 'transparent' },
        outline: { bg: 'transparent',   text: primary.pressed,                         border: primary.default },
        soft:    { bg: primary.soft,    text: primary.pressed,                         border: 'transparent' },
      },
      success: {
        filled:  { bg: success.default, text: getAccessibleTextColor(success.default), border: 'transparent' },
        outline: { bg: 'transparent',   text: success.hover,                           border: success.default },
        soft:    { bg: success.soft,    text: success.hover,                           border: 'transparent' },
      },
      warning: {
        filled:  { bg: warning.default, text: getAccessibleTextColor(warning.default), border: 'transparent' },
        outline: { bg: 'transparent',   text: warning.hover,                           border: warning.default },
        soft:    { bg: warning.soft,    text: warning.hover,                           border: 'transparent' },
      },
      error: {
        filled:  { bg: error.default, text: getAccessibleTextColor(error.default), border: 'transparent' },
        outline: { bg: 'transparent', text: error.hover,                           border: error.default },
        soft:    { bg: error.soft,    text: error.hover,                           border: 'transparent' },
      },
      info: {
        filled:  { bg: info.default, text: getAccessibleTextColor(info.default), border: 'transparent' },
        outline: { bg: 'transparent', text: info.hover,                          border: info.default },
        soft:    { bg: info.soft,     text: info.hover,                          border: 'transparent' },
      },
      sizes: {
        sm: { fontSize: 11, paddingX: spacing[2], paddingY: 2,          borderRadius: radius.badge },
        md: { fontSize: 12, paddingX: spacing[3], paddingY: spacing[1], borderRadius: radius.badge },
      },
    },

    // ── Tag ──────────────────────────────────
    tag: {
      default: { bg: bg.default,     border: border.default, text: text.primary },
      colored: { bg: primary.subtle, border: primary.soft,   text: primary.pressed },
      hover:   { bg: bg.subtle,      border: border.strong,  text: text.primary },
      sizes: {
        sm: { fontSize: 12, paddingX: spacing[2], paddingY: spacing[1], borderRadius: radius.tag },
        md: { fontSize: 13, paddingX: spacing[3], paddingY: spacing[1], borderRadius: radius.tag },
      },
    },

    // ── Accordion ────────────────────────────
    accordion: {
      default: {
        header:      { bg: surface.base,   text: text.primary,   border: border.default },
        headerHover: { bg: bg.subtle },
        content:     { bg: surface.base,   text: text.secondary },
        icon:        { color: text.secondary },
        iconOpen:    { color: primary.default },
        motion:      foundation.motion.duration.normal,
      },
      bordered: {
        header:      { bg: surface.base, text: text.primary, border: border.strong },
        headerHover: { bg: bg.subtle },
        content:     { bg: surface.base, text: text.secondary },
        motion:      foundation.motion.duration.normal,
      },
    },

    // ── Breadcrumb ───────────────────────────
    breadcrumb: {
      default:   { text: text.secondary },
      hover:     { text: text.primary },
      active:    { text: primary.default, fontWeight: 500 },
      separator: { text: border.default },
    },

    // ── Card ─────────────────────────────────
    card: {
      default:  { bg: surface.raised,   border: border.default, shadow: elevation[1], borderRadius: radius.card },
      bordered: { bg: surface.raised,   border: primary.soft,   shadow: 'none',       borderRadius: radius.card },
      elevated: { bg: surface.raised,   border: 'transparent',  shadow: elevation[2], borderRadius: radius.card },
      modal:    { bg: surface.overlay,  border: 'transparent',  shadow: elevation[3], borderRadius: radius.card },
      padding: {
        sm: spacing[3],
        md: spacing[4],
        lg: spacing[6],
      },
    },

    // ── Tabs ─────────────────────────────────
    tabs: {
      list:        { bg: 'transparent', border: border.default },
      tab: {
        default:   { bg: 'transparent',  text: text.secondary, border: 'transparent' },
        hover:     { bg: bg.subtle,      text: text.primary,   border: 'transparent' },
        active:    { bg: 'transparent',  text: primary.default, border: primary.default },
        disabled:  { bg: 'transparent',  text: text.disabled,  border: 'transparent' },
      },
      indicator:   { color: primary.default, height: 2 },
      panel:       { bg: surface.base, text: text.secondary },
      sizes: {
        sm: { height: controlSize.sm, paddingX: spacing[3], fontSize: 13 },
        md: { height: controlSize.md, paddingX: spacing[4], fontSize: 14 },
      },
    },

    // ── Dropdown ─────────────────────────────
    dropdown: {
      trigger:     { bg: bg.default, text: text.primary, border: border.default, borderRadius: radius.input },
      menu:        { bg: surface.overlay, border: border.default, shadow: elevation[2], borderRadius: radius.card, zIndex: zIndex.dropdown },
      item: {
        default:   { bg: 'transparent', text: text.primary },
        hover:     { bg: bg.subtle,     text: text.primary },
        active:    { bg: primary.subtle, text: primary.pressed },
        disabled:  { bg: 'transparent', text: text.disabled },
      },
      divider:     { color: border.default },
      sizes: {
        item: { paddingX: spacing[4], paddingY: spacing[2], fontSize: 14 },
      },
    },

    // ── Modal ────────────────────────────────
    modal: {
      overlay:     { bg: 'rgba(0, 0, 0, 0.45)', zIndex: zIndex.modal },
      container:   { bg: surface.overlay, border: 'transparent', shadow: elevation[3], borderRadius: radius.card },
      header:      { text: text.primary, border: border.default },
      body:        { text: text.secondary },
      footer:      { border: border.default },
      closeIcon:   { color: text.secondary, hover: text.primary },
      widths: {
        sm: 400,
        md: 560,
        lg: 720,
      },
      padding: spacing[6],
    },

    // ── Empty State ──────────────────────────
    emptyState: {
      container:   { bg: 'transparent', text: text.secondary },
      icon:        { bg: bg.subtle, color: text.secondary },
      title:       { text: text.primary },
      description: { text: text.secondary },
      padding:     spacing[10],
    },
  }
}

// ─────────────────────────────────────────
// 통합 생성 함수
// ─────────────────────────────────────────
export function buildDesignSystem(colors: Colors, typography: Typography) {
  const foundation = generateFoundationTokens(colors, typography)
  const semantic   = generateSemanticTokens(foundation)
  const component  = generateComponentTokens(semantic, foundation)

  return { foundation, semantic, component }
}

export type DesignSystem     = ReturnType<typeof buildDesignSystem>
export type FoundationTokens = ReturnType<typeof generateFoundationTokens>
export type SemanticTokens   = ReturnType<typeof generateSemanticTokens>
export type ComponentTokens  = ReturnType<typeof generateComponentTokens>