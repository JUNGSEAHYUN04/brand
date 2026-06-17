import { useEffect } from 'react'
import { BrandIdentitySimple } from '@/lib/types'

interface Props {
  mixedBrand: BrandIdentitySimple
}

const C_BORDER = 'rgba(40,43,50,0.12)'

const getLuminance = (hex: string): number => {
  const rgb = parseInt(hex.slice(1), 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = rgb & 0xff
  return (r * 299 + g * 587 + b * 114) / 1000
}
const getTextColor = (hex: string): string =>
  getLuminance(hex) > 155 ? '#282B32' : '#ffffff'

export default function HeroPreview({ mixedBrand }: Props) {
  const { brand, colors, typography } = mixedBrand
  const headingFont = typography.heading.name
  const bodyFont = typography.body.name
  const primary = colors.primary.hex
  const onPrimary = getTextColor(primary)
  const onPrimarySoft =
    onPrimary === '#ffffff' ? 'rgba(255,255,255,0.8)' : 'rgba(40,43,50,0.6)'

  useEffect(() => {
    const families = [headingFont, bodyFont]
      .filter(Boolean)
      .map((f) => f.trim().replace(/\s+/g, '+'))
      .join('&family=')

    const href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [headingFont, bodyFont])

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
        HERO PREVIEW
      </p>

      {/* primary 히어로 블록 */}
      <div
        style={{
          background: primary,
          borderRadius: '12px',
          padding: '48px 40px',
        }}
      >
        {/* 상단: 작은 마크 + 영문 키워드 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: colors.accent.hex }} />
          <span
            style={{
              fontFamily: `"${bodyFont}", sans-serif`,
              fontSize: '11px',
              color: onPrimarySoft,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {brand.slogan.en}
          </span>
        </div>

        <h2
          style={{
            fontFamily: `"${headingFont}", sans-serif`,
            fontSize: '44px',
            fontWeight: 700,
            color: onPrimary,
            margin: '0 0 12px',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
          }}
        >
          {brand.name}
        </h2>
        <p
          style={{
            fontFamily: `"${bodyFont}", sans-serif`,
            fontSize: '16px',
            color: onPrimarySoft,
            margin: '0 0 28px',
            lineHeight: 1.6,
            maxWidth: '460px',
          }}
        >
          {brand.slogan.ko}
        </p>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            style={{
              fontFamily: `"${bodyFont}", sans-serif`,
              fontSize: '13px',
              fontWeight: 600,
              background: onPrimary === '#ffffff' ? '#fff' : '#282B32',
              color: onPrimary === '#ffffff' ? primary : '#fff',
              padding: '12px 26px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            시작하기
          </button>
          <button
            style={{
              fontFamily: `"${bodyFont}", sans-serif`,
              fontSize: '13px',
              fontWeight: 500,
              background: 'transparent',
              color: onPrimary,
              padding: '12px 22px',
              borderRadius: '10px',
              border: `1px solid ${onPrimary === '#ffffff' ? 'rgba(255,255,255,0.4)' : 'rgba(40,43,50,0.25)'}`,
              cursor: 'pointer',
            }}
          >
            더 보기
          </button>
        </div>
      </div>
    </div>
  )
}