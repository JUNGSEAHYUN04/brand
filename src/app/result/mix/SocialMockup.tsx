import { BrandIdentitySimple } from '@/lib/types'

interface Props {
  mixedBrand: BrandIdentitySimple
}

const C_BORDER = 'rgba(40,43,50,0.12)'
const C_MAIN = '#282B32'

const getLuminance = (hex: string): number => {
  const rgb = parseInt(hex.slice(1), 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = rgb & 0xff
  return (r * 299 + g * 587 + b * 114) / 1000
}
const getTextColor = (hex: string): string =>
  getLuminance(hex) > 155 ? '#282B32' : '#ffffff'

export default function SocialMockup({ mixedBrand }: Props) {
  const { brand, colors, typography } = mixedBrand
  const headingFont = typography.heading.name
  const bodyFont = typography.body.name
  const onPrimary = getTextColor(colors.primary.hex)
  const handle = brand.name.toLowerCase().replace(/\s+/g, '')

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
        SOCIAL PROFILE
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
        {/* 카드 컨테이너 */}
        <div
          style={{
            width: '320px',
            borderRadius: '16px',
            border: `1px solid ${C_BORDER}`,
            background: '#fff',
            overflow: 'hidden',
          }}
        >
          {/* 프로필 헤더 */}
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
              {/* 아바타 — primary 원에 이니셜 */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: colors.primary.hex,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: `"${headingFont}", sans-serif`,
                    fontSize: '26px',
                    fontWeight: 700,
                    color: onPrimary,
                    lineHeight: 1,
                  }}
                >
                  {brand.name.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* 통계 */}
              <div style={{ flex: 1, display: 'flex', justifyContent: 'space-around' }}>
                {[
                  { n: '128', l: '게시물' },
                  { n: '4.8K', l: '팔로워' },
                  { n: '312', l: '팔로잉' },
                ].map((s) => (
                  <div key={s.l} style={{ textAlign: 'center' }}>
                    <p style={{ fontFamily: `"${bodyFont}", sans-serif`, fontSize: '15px', fontWeight: 700, color: C_MAIN, margin: 0 }}>{s.n}</p>
                    <p style={{ fontFamily: `"${bodyFont}", sans-serif`, fontSize: '11px', color: 'rgba(40,43,50,0.5)', margin: '2px 0 0' }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 이름 + 바이오 */}
            <p
              style={{
                fontFamily: `"${headingFont}", sans-serif`,
                fontSize: '16px',
                fontWeight: 700,
                color: C_MAIN,
                margin: 0,
              }}
            >
              {brand.name}
            </p>
            <p
              style={{
                fontFamily: `"${bodyFont}", sans-serif`,
                fontSize: '12px',
                color: 'rgba(40,43,50,0.5)',
                margin: '2px 0 8px',
              }}
            >
              @{handle}
            </p>
            <p
              style={{
                fontFamily: `"${bodyFont}", sans-serif`,
                fontSize: '12px',
                color: 'rgba(40,43,50,0.7)',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {brand.slogan.ko}
            </p>

            {/* 버튼 */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
              <button
                style={{
                  flex: 1,
                  background: colors.primary.hex,
                  color: onPrimary,
                  border: 'none',
                  borderRadius: '8px',
                  padding: '9px 0',
                  fontFamily: `"${bodyFont}", sans-serif`,
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                팔로우
              </button>
              <button
                style={{
                  flex: 1,
                  background: 'transparent',
                  color: C_MAIN,
                  border: `1px solid ${C_BORDER}`,
                  borderRadius: '8px',
                  padding: '9px 0',
                  fontFamily: `"${bodyFont}", sans-serif`,
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                메시지
              </button>
            </div>
          </div>

          {/* 포스트 그리드 — 브랜드 3색 순환 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2px',
              borderTop: `1px solid ${C_BORDER}`,
            }}
          >
            {[
              colors.primary.hex,
              colors.secondary.hex,
              colors.accent.hex,
              colors.accent.hex,
              colors.primary.hex,
              colors.secondary.hex,
            ].map((c, i) => {
              const txt = getTextColor(c)
              return (
                <div
                  key={i}
                  style={{
                    aspectRatio: '1',
                    background: c,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: `"${headingFont}", sans-serif`,
                      fontSize: '18px',
                      fontWeight: 700,
                      color: txt,
                      opacity: 0.85,
                    }}
                  >
                    {brand.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
