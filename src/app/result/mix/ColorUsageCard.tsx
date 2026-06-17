import { BrandIdentitySimple } from '@/lib/types'

interface Props {
  mixedBrand: BrandIdentitySimple
}

const C_BORDER = 'rgba(40,43,50,0.12)'
const C_MAIN = '#282B32'

// 밝기 → 대비 텍스트 색 자동 선택
const getLuminance = (hex: string): number => {
  const rgb = parseInt(hex.slice(1), 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = rgb & 0xff
  return (r * 299 + g * 587 + b * 114) / 1000
}
const getTextColor = (hex: string): string =>
  getLuminance(hex) > 155 ? C_MAIN : '#ffffff'

export default function ColorUsageCard({ mixedBrand }: Props) {
  const { colors } = mixedBrand
  const rows = [
    { label: 'Primary Color', ...colors.primary },
    { label: 'Secondary Color', ...colors.secondary },
    { label: 'Accent Color', ...colors.accent },
  ]

  return (
    <div className="bg-white rounded-xl p-8 border" style={{ borderColor: C_BORDER }}>
      <p
        style={{
          fontFamily: 'SCDream4, sans-serif',
          fontSize: '14px',
          color: 'rgba(40,43,50,0.7)',
          letterSpacing: '0.1em',
          marginBottom: '24px',
        }}
      >
        COLOR USAGE
      </p>

      <div className="space-y-5">
        {rows.map((c) => {
          const onColor = getTextColor(c.hex)
          return (
            <div key={c.label}>
              {/* 색 이름 + hex */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '4px', background: c.hex, border: `1px solid ${C_BORDER}`, flexShrink: 0 }} />
                <h3
                  style={{
                    fontFamily: 'SCDream4, sans-serif',
                    fontSize: '14px',
                    color: C_MAIN,
                    margin: 0,
                  }}
                >
                  {c.label}
                </h3>
                <span
                  style={{
                    fontFamily: 'SCDream4, sans-serif',
                    fontSize: '11px',
                    color: 'rgba(40,43,50,0.45)',
                    textTransform: 'uppercase',
                  }}
                >
                  {c.hex}
                </span>
              </div>

              {/* usage 박스 — 배경 밝기 따라 글자색 자동 */}
              <div
                style={{
                  background: c.hex,
                  border: `1px solid ${C_BORDER}`,
                  borderRadius: '10px',
                  padding: '18px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'SCDream4, sans-serif',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    color: onColor,
                    margin: 0,
                  }}
                >
                  {c.usage}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}