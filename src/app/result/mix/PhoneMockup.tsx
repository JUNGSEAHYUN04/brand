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

export default function PhoneMockup({ mixedBrand }: Props) {
  const { brand, colors, typography } = mixedBrand
  const headingFont = typography.heading.name
  const bodyFont = typography.body.name
  const onPrimary = getTextColor(colors.primary.hex)

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
        APP SCREEN
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
        {/* 폰 프레임 */}
        <div
          style={{
            width: '300px',
            borderRadius: '40px',
            border: '10px solid #282B32',
            background: '#fff',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 노치 */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '24px',
              background: '#282B32',
              borderBottomLeftRadius: '14px',
              borderBottomRightRadius: '14px',
              zIndex: 2,
            }}
          />

          {/* 흰 배경 본문 */}
          <div style={{ padding: '40px 24px 0', background: '#fff' }}>
            {/* 헤더: 워드마크 + 메뉴 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '40px',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '2px',
                    background: colors.primary.hex,
                  }}
                />
                <span
                  style={{
                    fontFamily: `"${headingFont}", sans-serif`,
                    fontSize: '15px',
                    fontWeight: 700,
                    color: C_MAIN,
                  }}
                >
                  {brand.name}
                </span>
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{ width: '15px', height: '2px', borderRadius: '2px', background: 'rgba(40,43,50,0.4)' }} />
                ))}
              </span>
            </div>

            {/* 히어로: 큰 타이포 + 작은 키워드 */}
            <p
              style={{
                fontFamily: `"${bodyFont}", sans-serif`,
                fontSize: '11px',
                color: colors.primary.hex,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                margin: '0 0 14px',
                fontWeight: 600,
              }}
            >
              {brand.slogan.en}
            </p>
            <h3
              style={{
                fontFamily: `"${headingFont}", sans-serif`,
                fontSize: '30px',
                fontWeight: 700,
                color: C_MAIN,
                margin: 0,
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
              }}
            >
              {brand.slogan.ko}
            </h3>

            {/* CTA: solid + ghost 절제 */}
            <div style={{ display: 'flex', gap: '8px', margin: '28px 0 36px' }}>
              <button
                style={{
                  background: colors.primary.hex,
                  color: onPrimary,
                  border: 'none',
                  borderRadius: '10px',
                  padding: '11px 22px',
                  fontFamily: `"${bodyFont}", sans-serif`,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                시작하기
              </button>
              <button
                style={{
                  background: 'transparent',
                  color: C_MAIN,
                  border: `1px solid ${C_BORDER}`,
                  borderRadius: '10px',
                  padding: '11px 18px',
                  fontFamily: `"${bodyFont}", sans-serif`,
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                더 보기
              </button>
            </div>
          </div>

          {/* 리스트 영역 */}
          <div style={{ padding: '0 24px', flex: 1 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '6px',
              }}
            >
              <span
                style={{
                  fontFamily: `"${headingFont}", sans-serif`,
                  fontSize: '13px',
                  fontWeight: 600,
                  color: C_MAIN,
                }}
              >
                추천 메뉴
              </span>
              <span
                style={{
                  fontFamily: `"${bodyFont}", sans-serif`,
                  fontSize: '11px',
                  color: colors.primary.hex,
                  fontWeight: 600,
                }}
              >
                전체
              </span>
            </div>

            {[
              { c: colors.primary.hex, title: '첫 번째 항목', sub: '간결한 한 줄 설명' },
              { c: colors.secondary.hex, title: '두 번째 항목', sub: '간결한 한 줄 설명' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 0',
                  borderBottom: `1px solid ${C_BORDER}`,
                }}
              >
                {/* 색 도트만 — 큰 회색 썸네일 제거 */}
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: item.c,
                    flexShrink: 0,
                  }}
                />
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: `"${bodyFont}", sans-serif`,
                      fontSize: '13px',
                      fontWeight: 600,
                      color: C_MAIN,
                    }}
                  >
                    {item.title}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: `"${bodyFont}", sans-serif`,
                      fontSize: '11px',
                      color: 'rgba(40,43,50,0.5)',
                      marginTop: '2px',
                    }}
                  >
                    {item.sub}
                  </span>
                </span>
                <span style={{ color: 'rgba(40,43,50,0.3)', fontSize: '14px' }}>›</span>
              </div>
            ))}
          </div>

          {/* 하단 탭바: 라인 아이콘 느낌 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: '16px 24px 22px',
              borderTop: `1px solid ${C_BORDER}`,
            }}
          >
            {[true, false, false].map((active, i) => (
              <span
                key={i}
                style={{
                  width: active ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '999px',
                  background: active ? colors.primary.hex : 'rgba(40,43,50,0.2)',
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}