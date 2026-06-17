'use client'

import { useState } from 'react'
import { Colors } from '@/lib/types'

interface Props {
  colors: Colors
}

const F4 = 'SCDream4, sans-serif'
const F5 = 'SCDream5, sans-serif'
const F6 = 'SCDream6, sans-serif'
const F7 = 'SCDream7, sans-serif'

const C_MAIN = '#282B32'
const C_SUB = 'rgba(40,43,50,0.8)'
const C_MUTED = 'rgba(40,43,50,0.6)'
const C_LABEL = 'rgba(40,43,50,0.8)'
const C_BORDER = 'rgba(40,43,50,0.2)'
const C_BORDER_LIGHT = 'rgba(40,43,50,0.1)'

const C_OK = '#16A34A'
const C_NO = '#DC2626'

// 대비 계산 (WCAG, 외부 의존성 없음)
function hexToRgb(hex: string): [number, number, number] | null {
  let h = hex.trim().replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  if (h.length !== 6) return null
  const n = parseInt(h, 16)
  if (Number.isNaN(n)) return null
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
function luminance(hex: string): number {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0
  const [r, g, b] = rgb.map((v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
function contrastRatio(a: string, b: string): number {
  const l1 = luminance(a)
  const l2 = luminance(b)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}
function ratingFor(ratio: number): { aa: boolean; aaa: boolean; aaLarge: boolean } {
  return { aa: ratio >= 4.5, aaa: ratio >= 7, aaLarge: ratio >= 3 }
}

// HEX → HSL
function hexToHsl(hex: string): [number, number, number] | null {
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  let [r, g, b] = rgb.map((v) => v / 255)
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h /= 6
  }
  return [h * 360, s * 100, l * 100]
}
function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const c = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    return Math.round(255 * c).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}
// 단색 → 50~900 명암 스케일 (표시용)
const SCALE_STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const
const SCALE_LIGHTNESS: Record<string, number> = {
  '50': 96, '100': 90, '200': 80, '300': 68, '400': 56,
  '500': 46, '600': 38, '700': 30, '800': 22, '900': 15,
}
function buildScale(hex: string): { step: string; hex: string }[] {
  const hsl = hexToHsl(hex)
  if (!hsl) return SCALE_STEPS.map((step) => ({ step, hex }))
  const [h, s] = hsl
  return SCALE_STEPS.map((step) => {
    const l = SCALE_LIGHTNESS[step]
    const adjS = l > 70 ? s * 0.7 : s
    return { step, hex: hslToHex(h, Math.min(adjS, 100), l) }
  })
}

const AA_TOOLTIP = 'AA: 본문 텍스트의 최소 대비 기준(4.5:1). 일반 크기 글자는 이 기준을 넘겨야 읽기 편합니다.'
const AAA_TOOLTIP = 'AAA: 가장 엄격한 대비 기준(7:1). 작은 글자나 가독성이 특히 중요한 곳에 권장됩니다.'

export default function ColorSystem({ colors }: Props) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null)

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex)
    setCopiedHex(hex)
    setTimeout(() => setCopiedHex(null), 1500)
  }

  const coreColors = [
    { label: 'Primary',   ...colors.primary },
    { label: 'Secondary', ...colors.secondary },
    { label: 'Accent',    ...colors.accent },
  ]

  const coreScales = coreColors.map((c) => ({ label: c.label, base: c.hex, steps: buildScale(c.hex) }))

  const neutralEntries = Object.entries(colors.neutral)
  const semanticColors = [
    { label: 'Success', hex: colors.semantic.success },
    { label: 'Error',   hex: colors.semantic.error },
    { label: 'Warning', hex: colors.semantic.warning },
    { label: 'Info',    hex: colors.semantic.info },
  ]

  const neutralSwatch = (colors.neutral as any)['300'] || 'rgba(40,43,50,0.25)'
  const usageItems = colors.usageRatio
    ? [
        { label: 'Primary',   value: colors.usageRatio.primary,   swatch: colors.primary.hex },
        { label: 'Secondary', value: colors.usageRatio.secondary, swatch: colors.secondary.hex },
        { label: 'Accent',    value: colors.usageRatio.accent,    swatch: colors.accent.hex },
        { label: 'Neutral',   value: colors.usageRatio.neutral,   swatch: neutralSwatch },
      ].filter((item) => item.value > 0)
    : []

  const contrastRows = coreColors.map((c) => {
    const onWhite = contrastRatio(c.hex, '#ffffff')
    const onBlack = contrastRatio(c.hex, '#0F0F0F')
    const best = onWhite >= onBlack ? { fg: '#ffffff', label: '흰 텍스트', ratio: onWhite } : { fg: '#0F0F0F', label: '검은 텍스트', ratio: onBlack }
    return { name: c.label, hex: c.hex, best, rating: ratingFor(best.ratio) }
  })

  return (
    <div>
      <div className="mb-6">
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.1em', marginBottom: '5px' }}>COLOR SYSTEM</p>
        <h2 style={{ fontFamily: F7, fontSize: '32px', color: C_MAIN }}>컬러 시스템</h2>
      </div>

      {/* 코어 컬러 — 흰 카드 + 작은 색 네모 */}
      <section className="mb-14">
        <div className="space-y-4">
          {coreColors.map((color) => {
            const meaning = (color as any).meaning as string | undefined
            const dos = (color as any).dos as string[] | undefined
            const donts = (color as any).donts as string[] | undefined
            return (
              <div key={color.label} className="p-6 rounded-2xl" style={{ border: `1px solid ${C_BORDER}`, background: '#fff' }}>
                <div className="flex items-start gap-5">
                  {/* 작은 색 네모 */}
                  <button onClick={() => handleCopy(color.hex)}
                    className="shrink-0 rounded-xl transition-transform hover:scale-105"
                    style={{ width: '72px', height: '72px', background: color.hex, border: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer' }} />
                  {/* 이름 + 의미 + HEX/rgb */}
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2.5 mb-1.5 flex-wrap">
                      <span style={{ fontFamily: F7, fontSize: '17px', color: C_MAIN }}>{color.label}</span>
                      <span style={{ fontFamily: F4, fontSize: '14px', color: C_MUTED }}>{(color as any).name}</span>
                    </div>
                    <p style={{ fontFamily: F4, fontSize: '14px', color: C_SUB, lineHeight: '1.65', marginBottom: '12px' }}>
                      {meaning || (color as any).usage}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <button onClick={() => handleCopy(color.hex)} style={{ fontFamily: 'monospace', fontSize: '12px', color: C_SUB, background: 'rgba(40,43,50,0.04)', padding: '4px 10px', borderRadius: '7px', border: 'none', cursor: 'pointer' }}>
                        {copiedHex === color.hex ? '✓ 복사됨' : color.hex}
                      </button>
                      <span style={{ fontFamily: 'monospace', fontSize: '12px', color: C_MUTED, background: 'rgba(40,43,50,0.04)', padding: '4px 10px', borderRadius: '7px' }}>
                        rgb({(color as any).rgb})
                      </span>
                    </div>
                  </div>
                </div>

                {(dos?.length || donts?.length) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5 mt-5" style={{ borderTop: `1px solid ${C_BORDER_LIGHT}` }}>
                    {dos?.length ? (
                      <div>
                        <p style={{ fontFamily: F5, fontSize: '11px', color: C_OK, letterSpacing: '0.06em', marginBottom: '8px' }}>DO</p>
                        <ul className="space-y-1.5">
                          {dos.map((d, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span style={{ color: C_OK, fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>✓</span>
                              <span style={{ fontFamily: F4, fontSize: '13px', color: C_SUB, lineHeight: '1.55' }}>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : <div />}
                    {donts?.length ? (
                      <div>
                        <p style={{ fontFamily: F5, fontSize: '11px', color: C_NO, letterSpacing: '0.06em', marginBottom: '8px' }}>DON&apos;T</p>
                        <ul className="space-y-1.5">
                          {donts.map((d, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span style={{ color: C_NO, fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>✕</span>
                              <span style={{ fontFamily: F4, fontSize: '13px', color: C_SUB, lineHeight: '1.55' }}>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : <div />}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* 코어 컬러 명암 스케일 */}
      <section className="mb-14">
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '8px' }}>COLOR SCALE</p>
        <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED, lineHeight: '1.6', marginBottom: '16px' }}>
          각 코어 컬러의 명암 단계입니다. 500이 기준색이고, 밝은 쪽(50~400)은 배경·호버, 어두운 쪽(600~900)은 텍스트·강조에 씁니다.
        </p>
        <div className="space-y-5">
          {coreScales.map((sc) => (
            <div key={sc.label} className="p-5 rounded-xl" style={{ border: `1px solid ${C_BORDER}`, background: '#fff' }}>
              <p style={{ fontFamily: F5, fontSize: '13px', color: C_MAIN, marginBottom: '12px' }}>{sc.label}</p>
              <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
                {sc.steps.map((s) => {
                  const textColor = parseInt(s.step) >= 400 ? '#fff' : C_MAIN
                  const tokenName = `${sc.label.toLowerCase()}-${s.step}`
                  return (
                    <button key={s.step} onClick={() => handleCopy(s.hex)}
                      className="flex-1 flex flex-col items-center justify-center transition-transform hover:scale-y-110"
                      style={{ background: s.hex, height: '64px', cursor: 'pointer', border: 'none' }}
                      title={`${tokenName} · ${s.hex}`}>
                      <span style={{ fontFamily: F5, fontSize: '11px', color: textColor }}>{s.step}</span>
                      <span style={{ fontFamily: F4, fontSize: '9px', color: textColor, opacity: 0.8, marginTop: '2px' }}>
                        {copiedHex === s.hex ? '✓' : s.hex.replace('#', '')}
                      </span>
                    </button>
                  )
                })}
              </div>
              <p style={{ fontFamily: 'monospace', fontSize: '11px', color: C_MUTED, marginTop: '8px' }}>
                {sc.label.toLowerCase()}-50 ~ {sc.label.toLowerCase()}-900
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 뉴트럴 팔레트 */}
      <section className="mb-14">
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>NEUTRAL PALETTE</p>
        <div className="p-6 rounded-xl" style={{ border: `1px solid ${C_BORDER}`, background: '#fff' }}>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
            {neutralEntries.map(([key, hex]) => (
              <button key={key} onClick={() => handleCopy(hex)} className="group">
                <div className="w-full h-24 rounded-xl mb-2 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: hex, border: '1px solid rgba(0,0,0,0.05)' }} />
                <p style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED, textAlign: 'center' }}>{key}</p>
                <p style={{ fontFamily: F4, fontSize: '11px', color: C_MUTED, textAlign: 'center', opacity: 0.7 }}>
                  {copiedHex === hex ? '✓' : hex}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 시맨틱 컬러 */}
      <section className="mb-14">
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>SEMANTIC COLORS</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {semanticColors.map((color) => (
            <button key={color.label} onClick={() => handleCopy(color.hex)}
              className="p-5 rounded-xl text-left transition-colors"
              style={{ border: `1px solid ${C_BORDER}`, background: '#fff' }}>
              <div className="w-full h-16 rounded-lg mb-4"
                style={{ backgroundColor: color.hex, border: '1px solid rgba(0,0,0,0.05)' }} />
              <p style={{ fontFamily: F5, fontSize: '13px', color: C_MAIN, marginBottom: '4px' }}>{color.label}</p>
              <p style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED }}>
                {copiedHex === color.hex ? '✓ 복사됨' : color.hex}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 컬러 사용 비율 */}
      {usageItems.length > 0 && (
        <section className="mb-14">
          <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>USAGE RATIO</p>
          <div className="p-8 rounded-xl" style={{ border: `1px solid ${C_BORDER}`, background: '#fff' }}>
            <div className="flex w-full h-12 rounded-lg overflow-hidden mb-6" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
              {usageItems.map((item) => (
                <div key={item.label} style={{ width: `${item.value}%`, backgroundColor: item.swatch }} />
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {usageItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded shrink-0" style={{ backgroundColor: item.swatch, border: '1px solid rgba(0,0,0,0.05)' }} />
                  <div>
                    <p style={{ fontFamily: F5, fontSize: '13px', color: C_MAIN }}>{item.label}</p>
                    <p style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED }}>{item.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 페어링 가이드 — 흰 카드 + 작은 색 네모 (큰 색 면적 제거) */}
      {colors.pairings && colors.pairings.length > 0 && (
        <section className="mb-14">
          <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>PAIRING GUIDE</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {colors.pairings.map((p, i) => {
              const ratio = contrastRatio(p.bg, p.fg)
              const r = ratingFor(ratio)
              return (
                <div key={i} className="p-5 rounded-xl" style={{ border: `1px solid ${p.recommended ? C_BORDER : 'rgba(220,38,38,0.35)'}`, background: '#fff' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {/* 작은 미리보기 칩: bg 네모 위에 fg 글자 */}
                      <span className="shrink-0 rounded-lg flex items-center justify-center"
                        style={{ width: '44px', height: '44px', background: p.bg, border: '1px solid rgba(0,0,0,0.08)' }}>
                        <span style={{ fontFamily: F6, fontSize: '15px', color: p.fg }}>Aa</span>
                      </span>
                      <div>
                        <p style={{ fontFamily: F5, fontSize: '14px', color: C_MAIN, marginBottom: '3px' }}>{p.label}</p>
                        <div className="flex items-center gap-2">
                          <span style={{ fontFamily: 'monospace', fontSize: '11px', color: C_MUTED }}>{p.bg}</span>
                          <span style={{ fontFamily: 'monospace', fontSize: '11px', color: C_MUTED }}>/ {p.fg}</span>
                        </div>
                      </div>
                    </div>
                    <span style={{
                      fontFamily: F5, fontSize: '11px', color: '#fff',
                      background: p.recommended ? C_OK : C_NO,
                      padding: '3px 10px', borderRadius: '99px', flexShrink: 0,
                    }}>{p.recommended ? '권장' : '피하기'}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ fontFamily: F5, fontSize: '12px', color: C_MAIN }}>대비 {ratio.toFixed(2)}:1</span>
                    <span title={r.aa ? (r.aaa ? AAA_TOOLTIP : AA_TOOLTIP) : '대비 기준(AA 4.5:1)에 미달합니다.'} style={{ fontFamily: F4, fontSize: '11px', color: r.aa ? C_OK : C_NO, cursor: 'help' }}>
                      {r.aaa ? 'AAA' : r.aa ? 'AA' : r.aaLarge ? 'AA Large만' : '미달'}
                    </span>
                  </div>
                  <p style={{ fontFamily: F4, fontSize: '13px', color: C_SUB, lineHeight: '1.6' }}>{p.note}</p>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* 시맨틱 토큰 — 흰 카드 + 작은 색 네모 (좌측 띠/soft 박스 제거) */}
      <section className="mb-14">
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '8px' }}>SEMANTIC TOKENS</p>
        <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED, lineHeight: '1.6', marginBottom: '16px' }}>
          상태와 의미를 전달하는 토큰입니다. 색 자체보다 &lsquo;무엇을 알리는가&rsquo;가 중요하므로, 아래 용도에 맞게만 사용하세요.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { token: 'success', hex: colors.semantic.success, role: '성공 · 완료', desc: '저장 완료, 결제 성공처럼 작업이 정상적으로 끝났음을 알릴 때.', dont: '단순 강조나 브랜드 색 대용으로 쓰지 마세요.' },
            { token: 'error',   hex: colors.semantic.error,   role: '오류 · 실패', desc: '입력 오류, 요청 실패, 삭제 같은 파괴적 동작을 알릴 때.', dont: '경고 수준의 가벼운 알림에 남용하지 마세요.' },
            { token: 'warning', hex: colors.semantic.warning, role: '주의 · 경고', desc: '되돌릴 수 있지만 주의가 필요한 상황(용량 임박 등)에.', dont: '치명적 오류에는 error를 쓰세요.' },
            { token: 'info',    hex: colors.semantic.info,    role: '정보 · 안내', desc: '중립적인 안내·팁·업데이트 소식을 전할 때.', dont: '사용자 행동을 요구하는 경고에는 쓰지 마세요.' },
          ].map((t) => {
            const onWhite = contrastRatio(t.hex, '#ffffff')
            const onBlack = contrastRatio(t.hex, '#0F0F0F')
            const best = onWhite >= onBlack ? { ratio: onWhite } : { ratio: onBlack }
            const rating = ratingFor(best.ratio)
            return (
              <div key={t.token} className="p-5 rounded-2xl" style={{ border: `1px solid ${C_BORDER}`, background: '#fff' }}>
                <div className="flex items-start gap-4">
                  {/* 작은 색 네모 */}
                  <button onClick={() => handleCopy(t.hex)}
                    className="shrink-0 rounded-xl transition-transform hover:scale-105"
                    style={{ width: '48px', height: '48px', background: t.hex, border: '1px solid rgba(0,0,0,0.06)', cursor: 'pointer' }} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                      <span style={{ fontFamily: 'monospace', fontSize: '13px', color: C_MAIN }}>{t.token}</span>
                      <span style={{ fontFamily: F5, fontSize: '12px', color: C_SUB }}>{t.role}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button onClick={() => handleCopy(t.hex)} style={{ fontFamily: 'monospace', fontSize: '12px', color: C_SUB, background: 'rgba(40,43,50,0.04)', padding: '3px 9px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
                        {copiedHex === t.hex ? '✓ 복사됨' : t.hex}
                      </button>
                      <span title={rating.aa ? (rating.aaa ? AAA_TOOLTIP : AA_TOOLTIP) : '대비 기준(AA 4.5:1)에 미달합니다.'}
                        style={{ fontFamily: F4, fontSize: '11px', color: rating.aa ? C_OK : C_NO, cursor: 'help' }}>
                        {best.ratio.toFixed(1)}:1 · {rating.aaa ? 'AAA' : rating.aa ? 'AA' : '미달'}
                      </span>
                    </div>
                  </div>
                </div>
                <p style={{ fontFamily: F4, fontSize: '13px', color: C_SUB, lineHeight: '1.6', marginTop: '14px' }}>{t.desc}</p>
                <p style={{ fontFamily: F4, fontSize: '12px', color: C_NO, lineHeight: '1.55', marginTop: '6px', opacity: 0.85 }}>✕ {t.dont}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* 접근성 — 흰 카드, 행별 회색 박스 제거 (구분선만) */}
      <section>
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>ACCESSIBILITY</p>
        <div className="p-8 rounded-xl" style={{ border: `1px solid ${C_BORDER}`, background: '#fff' }}>
          {colors.accessibility?.summary && (
            <p style={{ fontFamily: F4, fontSize: '14px', color: C_SUB, lineHeight: '1.75', marginBottom: '20px' }}>{colors.accessibility.summary}</p>
          )}

          <div>
            {contrastRows.map((row, idx) => (
              <div key={row.name} className="flex items-center gap-4 py-4"
                style={{ borderTop: idx === 0 ? 'none' : `1px solid ${C_BORDER_LIGHT}` }}>
                {/* 작은 색 네모 */}
                <div className="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center" style={{ background: row.hex, border: '1px solid rgba(0,0,0,0.06)' }}>
                  <span style={{ color: row.best.fg, fontFamily: F6, fontSize: '15px' }}>Aa</span>
                </div>
                <div className="flex-1">
                  <p style={{ fontFamily: F5, fontSize: '13px', color: C_MAIN }}>{row.name} + {row.best.label}</p>
                  <p style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED }}>대비 {row.best.ratio.toFixed(2)}:1</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  {[
                    { label: 'AA', pass: row.rating.aa, tip: AA_TOOLTIP },
                    { label: 'AAA', pass: row.rating.aaa, tip: AAA_TOOLTIP },
                  ].map((b) => (
                    <span key={b.label} title={b.tip} style={{
                      fontFamily: F5, fontSize: '11px',
                      color: b.pass ? C_OK : C_MUTED,
                      background: b.pass ? 'rgba(22,163,74,0.1)' : 'rgba(40,43,50,0.05)',
                      padding: '3px 10px', borderRadius: '6px', cursor: 'help',
                    }}>{b.label} {b.pass ? '✓' : '—'}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {colors.accessibility?.notes && colors.accessibility.notes.length > 0 && (
            <div className="pt-6 mt-2 space-y-4" style={{ borderTop: `1px solid ${C_BORDER_LIGHT}` }}>
              {colors.accessibility.notes.map((note, index) => (
                <div key={index} className="flex items-start gap-4">
                  <span style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED, flexShrink: 0, marginTop: '2px' }}>0{index + 1}</span>
                  <p style={{ fontFamily: F4, fontSize: '14px', color: C_SUB, lineHeight: '1.7' }}>{note}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}