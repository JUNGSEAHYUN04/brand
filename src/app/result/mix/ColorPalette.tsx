import { BrandIdentitySimple } from '@/lib/types'

interface Props {
  mixedBrand: BrandIdentitySimple
}

const C_BORDER = 'rgba(40,43,50,0.12)'
const C_MAIN = '#282B32'
const C_MUTED = 'rgba(40,43,50,0.5)'

export default function ColorPalette({ mixedBrand }: Props) {
  const { colors } = mixedBrand
  const swatches = [
    { ...colors.primary, role: 'PRIMARY' },
    { ...colors.secondary, role: 'SECONDARY' },
    { ...colors.accent, role: 'ACCENT' },
  ]

  return (
    <div className="bg-white rounded-xl p-8 border" style={{ borderColor: C_BORDER }}>
      <p
        style={{
          fontFamily: 'SCDream4, sans-serif',
          fontSize: '14px',
          color: 'rgba(40,43,50,0.7)',
          letterSpacing: '0.1em',
          marginBottom: '20px',
        }}
      >
        COLOR PALETTE
      </p>

      <div className="grid grid-cols-3 gap-4">
        {swatches.map((c) => (
          <div key={c.role}>
            <div
              style={{
                width: '100%',
                height: '88px',
                background: c.hex,
                borderRadius: '10px',
                border: `1px solid ${C_BORDER}`,
                marginBottom: '12px',
              }}
            />
            <p
              style={{
                fontFamily: 'SCDream4, sans-serif',
                fontSize: '9px',
                color: C_MUTED,
                letterSpacing: '0.1em',
                margin: '0 0 4px',
              }}
            >
              {c.role}
            </p>
            <p
              style={{
                fontFamily: 'SCDream4, sans-serif',
                fontSize: '13px',
                color: C_MAIN,
                margin: '0 0 2px',
              }}
            >
              {c.name}
            </p>
            <p
              style={{
                fontFamily: 'SCDream4, sans-serif',
                fontSize: '11px',
                color: C_MUTED,
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
              }}
            >
              {c.hex}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}