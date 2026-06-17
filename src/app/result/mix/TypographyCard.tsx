import { useEffect } from 'react'
import { BrandIdentitySimple } from '@/lib/types'

interface Props {
  mixedBrand: BrandIdentitySimple
}

const C_BORDER = 'rgba(40,43,50,0.12)'
const C_BORDER_SOFT = 'rgba(40,43,50,0.08)'
const C_MAIN = '#282B32'
const C_SUB = 'rgba(40,43,50,0.6)'
const C_MUTED = 'rgba(40,43,50,0.45)'

export default function TypographyCard({ mixedBrand }: Props) {
  const { typography } = mixedBrand
  const heading = typography.heading
  const body = typography.body
  const mono = typography.mono

  useEffect(() => {
    const families = [heading.name, body.name, mono.name]
      .filter(Boolean)
      .map((f) => f.trim().replace(/\s+/g, '+'))
      .join('&family=')
    const href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [heading.name, body.name, mono.name])

  const rows = [
    {
      role: 'HEADING',
      font: heading,
      mono: false,
      sample: '다람쥐 헌 쳇바퀴에 타고파',
      sampleSize: 28,
      weight: 700,
      sizes: [
        { label: 'H1', px: 32 },
        { label: 'H2', px: 24 },
        { label: 'H3', px: 18 },
      ],
    },
    {
      role: 'BODY',
      font: body,
      mono: false,
      sample: '브랜드의 목소리를 담은 본문입니다. The quick brown fox jumps over the lazy dog.',
      sampleSize: 15,
      weight: 400,
      sizes: [
        { label: 'Base', px: 15 },
        { label: 'Small', px: 13 },
        { label: 'Caption', px: 11 },
      ],
    },
    {
      role: 'MONO',
      font: mono,
      mono: true,
      sample: 'const brand = "identity"; // 1234567890',
      sampleSize: 14,
      weight: 400,
      sizes: [{ label: 'Code', px: 13 }],
    },
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
        TYPOGRAPHY
      </p>

      <div>
        {rows.map((r, idx) => {
          const ff = `"${r.font.name}", ${r.mono ? 'monospace' : 'sans-serif'}`
          return (
            <div
              key={r.role}
              style={{
                paddingTop: idx === 0 ? 0 : '28px',
                paddingBottom: idx === rows.length - 1 ? 0 : '28px',
                borderBottom: idx === rows.length - 1 ? 'none' : `1px solid ${C_BORDER_SOFT}`,
              }}
            >
              {/* 헤더 줄: 역할 라벨(작게 위) + 폰트명(아래 크게) */}
              <div style={{ marginBottom: '18px' }}>
                <p
                  style={{
                    fontFamily: 'SCDream4, sans-serif',
                    fontSize: '9px',
                    color: C_MUTED,
                    letterSpacing: '0.12em',
                    margin: '0 0 6px',
                  }}
                >
                  {r.role}
                </p>
                <p
                  style={{
                    fontFamily: ff,
                    fontSize: '22px',
                    fontWeight: 600,
                    color: C_MAIN,
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
                  {r.font.name}
                </p>
              </div>

              {/* 샘플 문장 */}
              <p
                style={{
                  fontFamily: ff,
                  fontSize: `${r.sampleSize}px`,
                  fontWeight: r.weight,
                  color: C_MAIN,
                  margin: '0 0 18px',
                  lineHeight: 1.45,
                }}
              >
                {r.sample}
              </p>

              {/* 크기 스케일 — 옅은 배경 트랙에 묶어서 구분 */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px',
                  alignItems: 'baseline',
                  background: 'rgba(40,43,50,0.02)',
                  border: `1px solid ${C_BORDER_SOFT}`,
                  borderRadius: '8px',
                  padding: '12px 16px',
                }}
              >
                {r.sizes.map((s) => (
                  <span key={s.label} style={{ display: 'inline-flex', alignItems: 'baseline', gap: '7px' }}>
                    <span style={{ fontFamily: ff, fontSize: `${s.px}px`, fontWeight: r.weight, color: C_MAIN, lineHeight: 1 }}>
                      Ag
                    </span>
                    <span style={{ fontFamily: 'sans-serif', fontSize: '10px', color: C_MUTED }}>
                      {s.label} · {s.px}px
                    </span>
                  </span>
                ))}
              </div>

              {/* 선택 이유 */}
              {r.font.reason && (
                <p
                  style={{
                    fontFamily: 'SCDream4, sans-serif',
                    fontSize: '11px',
                    color: C_SUB,
                    margin: '12px 0 0',
                    lineHeight: 1.6,
                  }}
                >
                  {r.font.reason}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}