import { BrandIdentitySimple } from '@/lib/types'

interface Props {
  mixedBrand: BrandIdentitySimple
}

const C_BORDER = 'rgba(40,43,50,0.12)'
const C_LABEL = 'rgba(40,43,50,0.55)'

export default function BrandSnapshot({ mixedBrand }: Props) {
  return (
    <div className="sticky top-24">
      <div
        className="bg-white rounded-xl p-6 border"
        style={{ borderColor: C_BORDER }}
      >
        <p
          style={{
            fontSize: '11px',
            color: C_LABEL,
            letterSpacing: '0.08em',
            marginBottom: '12px',
            fontWeight: 600,
          }}
        >
          BRAND SNAPSHOT
        </p>
        <div>
          <h3
            style={{
              fontFamily: 'Oswald-SemiBold, sans-serif',
              fontSize: '36px',
              fontWeight: 600,
              color: '#282B32',
              marginBottom: '8px',
            }}
          >
            {mixedBrand.brand.name}
          </h3>
          {mixedBrand.brand.slogan && (
            <p
              style={{
                fontFamily: 'SCDream4, sans-serif',
                fontSize: '12px',
                color: 'rgba(40,43,50,0.6)',
                marginBottom: '12px',
              }}
            >
              {mixedBrand.brand.slogan.ko}
            </p>
          )}
          <div className="flex gap-3 items-center mb-6">
            <div
              style={{
                width: '32px',
                height: '32px',
                background: mixedBrand.colors.primary.hex,
                borderRadius: '8px',
              }}
            />
            <div
              style={{
                width: '32px',
                height: '32px',
                background: mixedBrand.colors.secondary.hex,
                borderRadius: '8px',
              }}
            />
            <div
              style={{
                width: '32px',
                height: '32px',
                background: mixedBrand.colors.accent.hex,
                borderRadius: '8px',
              }}
            />
          </div>
          <p
            style={{
              fontFamily: 'SCDream4, sans-serif',
              fontSize: '11px',
              color: 'rgba(40,43,50,0.55)',
            }}
          >
            {mixedBrand.typography.heading.name} / {mixedBrand.typography.body.name}
          </p>
        </div>
      </div>
    </div>
  )
}