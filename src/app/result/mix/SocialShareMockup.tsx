import { BrandIdentitySimple } from '@/lib/types'

interface Props {
  mixedBrand: BrandIdentitySimple
}

const C_BORDER = 'rgba(40,43,50,0.12)'
const C_MAIN = '#282B32'
const C_MUTED = 'rgba(40,43,50,0.5)'

const getLuminance = (hex: string): number => {
  const rgb = parseInt(hex.slice(1), 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = rgb & 0xff
  return (r * 299 + g * 587 + b * 114) / 1000
}
const getTextColor = (hex: string): string =>
  getLuminance(hex) > 155 ? C_MAIN : '#ffffff'

export default function SocialShareMockup({ mixedBrand }: Props) {
  const { brand, colors, typography } = mixedBrand
  const headingFont = typography.heading.name
  const bodyFont = typography.body.name
  const primary = colors.primary.hex
  const onPrimary = getTextColor(primary)
  const onPrimarySoft =
    onPrimary === '#ffffff' ? 'rgba(255,255,255,0.8)' : 'rgba(40,43,50,0.6)'
  const domain = `${brand.name.toLowerCase().replace(/\s+/g, '')}.com`

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
        LINK SHARE CARD
      </p>

      <div style={{ maxWidth: '440px', margin: '0 auto' }}>
        {/* 공유 카드 (OG preview) */}
        <div
          style={{
            border: `1px solid ${C_BORDER}`,
            borderRadius: '12px',
            overflow: 'hidden',
            background: '#fff',
          }}
        >
          {/* OG 이미지 영역 */}
          <div
            style={{
              background: primary,
              aspectRatio: '1.91 / 1',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            {/* 상단: 로고 마크 + 워드마크 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '6px',
                  background: colors.accent.hex,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontFamily: `"${headingFont}", sans-serif`, fontSize: '12px', fontWeight: 700, color: getTextColor(colors.accent.hex), lineHeight: 1 }}>
                  {brand.name.charAt(0).toUpperCase()}
                </span>
              </span>
              <span style={{ fontFamily: `"${headingFont}", sans-serif`, fontSize: '14px', fontWeight: 700, color: onPrimary }}>
                {brand.name}
              </span>
            </div>

            {/* 중앙/하단: 큰 카피 */}
            <div>
              <h3
                style={{
                  fontFamily: `"${headingFont}", sans-serif`,
                  fontSize: '30px',
                  fontWeight: 700,
                  color: onPrimary,
                  margin: '0 0 6px',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                }}
              >
                {brand.slogan.ko}
              </h3>
              <p
                style={{
                  fontFamily: `"${bodyFont}", sans-serif`,
                  fontSize: '12px',
                  color: onPrimarySoft,
                  margin: 0,
                  letterSpacing: '0.02em',
                }}
              >
                {brand.slogan.en}
              </p>
            </div>
          </div>

          {/* 메타 영역 (도메인 + 제목 + 설명) */}
          <div style={{ padding: '14px 16px', background: 'rgba(40,43,50,0.02)' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '11px', color: C_MUTED, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
              {domain}
            </p>
            <p style={{ fontFamily: 'sans-serif', fontSize: '13px', fontWeight: 600, color: C_MAIN, margin: '0 0 3px' }}>
              {brand.name} — {brand.slogan.ko}
            </p>
            <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: C_MUTED, margin: 0, lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {brand.slogan.en} · {domain}에서 더 알아보세요.
            </p>
          </div>
        </div>

        {/* 채팅 버블 안에 들어간 느낌의 캡션 */}
        <p
          style={{
            fontFamily: 'sans-serif',
            fontSize: '11px',
            color: C_MUTED,
            textAlign: 'center',
            margin: '12px 0 0',
          }}
        >
          메신저·SNS에 링크를 공유하면 이렇게 표시됩니다
        </p>
      </div>
    </div>
  )
}
