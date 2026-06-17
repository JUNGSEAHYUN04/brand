import { BrandIdentitySimple } from '@/lib/types'

interface Props {
  mixedBrand: BrandIdentitySimple
}

const C_BORDER = 'rgba(40,43,50,0.12)'

// 밝기 기반 대비 텍스트 색
const getLuminance = (hex: string): number => {
  const rgb = parseInt(hex.slice(1), 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = rgb & 0xff
  return (r * 299 + g * 587 + b * 114) / 1000
}
const getTextColor = (hex: string): string =>
  getLuminance(hex) > 155 ? '#282B32' : '#ffffff'

export default function BusinessCardMockup({ mixedBrand }: Props) {
  const { brand, colors, typography } = mixedBrand
  const headingFont = typography.heading.name
  const bodyFont = typography.body.name

  const onPrimary = getTextColor(colors.primary.hex)
  const onPrimarySoft =
    onPrimary === '#ffffff' ? 'rgba(255,255,255,0.7)' : 'rgba(40,43,50,0.6)'

  // 카드 공통 치수 (명함 비율 약 1.75:1)
  const cardBase: React.CSSProperties = {
    width: '320px',
    height: '184px',
    borderRadius: '12px',
    padding: '24px',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
  }

  return (
    <div
      className="bg-white rounded-xl p-8 border"
      style={{ borderColor: C_BORDER }}
    >
      <p
        style={{
          fontFamily: 'SCDream4, sans-serif',
          fontSize: '14px',
          color: 'rgba(40,43,50,0.7)',
          letterSpacing: '0.1em',
          marginBottom: '24px',
        }}
      >
        BUSINESS CARD
      </p>

      <div
        style={{
          display: 'flex',
          gap: '32px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: '8px 0',
        }}
      >
        {/* 앞면 — 로고/이름 */}
        <div
          style={{
            ...cardBase,
            background: colors.primary.hex,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* 상단: 액센트 도트 + 슬로건 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: colors.accent.hex,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: `"${bodyFont}", sans-serif`,
                fontSize: '11px',
                color: onPrimarySoft,
                letterSpacing: '0.04em',
              }}
            >
              {brand.slogan.en}
            </span>
          </div>

          {/* 중앙/하단: 브랜드명 */}
          <div>
            <h3
              style={{
                fontFamily: `"${headingFont}", sans-serif`,
                fontSize: '34px',
                fontWeight: 700,
                color: onPrimary,
                margin: 0,
                lineHeight: 1,
              }}
            >
              {brand.name}
            </h3>
            <p
              style={{
                fontFamily: `"${bodyFont}", sans-serif`,
                fontSize: '12px',
                color: onPrimarySoft,
                margin: '6px 0 0',
              }}
            >
              {brand.slogan.ko}
            </p>
          </div>
        </div>

        {/* 뒷면 — 미니멀: 워드마크 상단 / 주소 좌하단 / 연락처 우하단 */}
        <div
          style={{
            ...cardBase,
            background: '#ffffff',
            border: `1px solid ${C_BORDER}`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 상단: 액센트 탭 + 워드마크 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
            <span
              style={{
                width: '6px',
                height: '26px',
                borderRadius: '2px',
                background: colors.primary.hex,
                flexShrink: 0,
              }}
            />
            <div>
              <p
                style={{
                  fontFamily: `"${headingFont}", sans-serif`,
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#282B32',
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                {brand.name}
              </p>
              <p
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: '9px',
                  color: 'rgba(40,43,50,0.5)',
                  margin: '4px 0 0',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                {brand.slogan.en}
              </p>
            </div>
          </div>

          {/* 하단: 주소(좌) + 연락처(우) */}
          <div
            style={{
              marginTop: 'auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            {/* 좌하단 주소 */}
            <div
              style={{
                fontFamily: 'sans-serif',
                fontSize: '9px',
                color: 'rgba(40,43,50,0.55)',
                lineHeight: 1.6,
              }}
            >
              <p style={{ margin: 0, fontWeight: 600, color: 'rgba(40,43,50,0.75)' }}>서울특별시 강남구</p>
              <p style={{ margin: 0 }}>테헤란로 123, 4F</p>
            </div>

            {/* 우하단 연락처 (세로 구분선 + 정렬) */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <span
                style={{
                  width: '1px',
                  background: C_BORDER,
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: '9.5px',
                  color: 'rgba(40,43,50,0.7)',
                  lineHeight: 1.7,
                  textAlign: 'left',
                }}
              >
                <p style={{ margin: 0 }}>
                  <span style={{ color: colors.primary.hex, fontWeight: 600 }}>e </span>
                  hello@{brand.name.toLowerCase().replace(/\s+/g, '')}.com
                </p>
                <p style={{ margin: 0 }}>
                  <span style={{ color: colors.secondary.hex, fontWeight: 600 }}>t </span>
                  +82 10 1234 5678
                </p>
                <p style={{ margin: 0 }}>
                  <span style={{ color: colors.accent.hex, fontWeight: 600 }}>w </span>
                  www.{brand.name.toLowerCase().replace(/\s+/g, '')}.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}