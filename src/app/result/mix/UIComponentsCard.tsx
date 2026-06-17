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
  getLuminance(hex) > 155 ? '#282B32' : '#fff'

const BRIGHTNESS_THRESHOLD = 225
const isTooBright = (hex: string): boolean => getLuminance(hex) > BRIGHTNESS_THRESHOLD

// 카드 최상단 라벨 (대문자 — 위계상 가장 위)
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontFamily: 'SCDream4, sans-serif',
      fontSize: '14px',
      color: 'rgba(40,43,50,0.7)',
      letterSpacing: '0.1em',
      marginBottom: '24px',
      textTransform: 'uppercase',
    }}
  >
    {children}
  </p>
)

// 그룹 제목 (Buttons / Tags & Badges / Cards — 대문자 라벨보다 작고 연하게)
const GroupTitle = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontFamily: 'SCDream4, sans-serif',
      fontSize: '12px',
      color: 'rgba(40,43,50,0.55)',
      marginBottom: '12px',
    }}
  >
    {children}
  </p>
)

// 서브 라벨 (SOLID / OUTLINE / SOFT — 가장 작고 연함)
const SubLabel = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontFamily: 'SCDream4, sans-serif',
      fontSize: '9px',
      color: 'rgba(40,43,50,0.4)',
      marginBottom: '8px',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    }}
  >
    {children}
  </p>
)

export default function UIComponentsCard({ mixedBrand }: Props) {
  const { colors, typography } = mixedBrand
  const bodyFont = typography.body.name
  const headingFont = typography.heading.name

  const textOnPrimary = getTextColor(colors.primary.hex)
  const textOnSecondary = getTextColor(colors.secondary.hex)
  const textOnAccent = getTextColor(colors.accent.hex)

  const isPriBright = isTooBright(colors.primary.hex)
  const isSecBright = isTooBright(colors.secondary.hex)
  const isAccBright = isTooBright(colors.accent.hex)
  const hasOutlineTags = !isPriBright || !isSecBright || !isAccBright

  const tagBase: React.CSSProperties = {
    padding: '6px 14px',
    borderRadius: '999px',
    fontSize: '12px',
    fontFamily: bodyFont,
    fontWeight: 500,
  }

  return (
    <div className="bg-white rounded-xl p-8 border" style={{ borderColor: C_BORDER }}>
      <SectionLabel>UI COMPONENTS</SectionLabel>

      <div className="space-y-10">
        {/* BUTTONS */}
        <div>
          <GroupTitle>Buttons</GroupTitle>
          <div className="flex gap-3 flex-wrap">
            <button
              style={{
                background: colors.primary.hex,
                color: textOnPrimary,
                padding: '10px 24px',
                borderRadius: '8px',
                border: 'none',
                fontFamily: bodyFont,
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Primary
            </button>
            <button
              style={{
                background: colors.secondary.hex,
                color: textOnSecondary,
                padding: '10px 24px',
                borderRadius: '8px',
                border: 'none',
                fontFamily: bodyFont,
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Secondary
            </button>
            {!isPriBright && (
              <button
                style={{
                  background: 'transparent',
                  color: colors.primary.hex,
                  padding: '10px 24px',
                  borderRadius: '8px',
                  border: `1.5px solid ${colors.primary.hex}`,
                  fontFamily: bodyFont,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Outline
              </button>
            )}
          </div>
        </div>

        {/* TAGS & BADGES */}
        <div>
          <GroupTitle>Tags & Badges</GroupTitle>
          <div className="space-y-6">
            {/* Solid */}
            <div>
              <SubLabel>Solid</SubLabel>
              <div className="flex gap-2 flex-wrap">
                <span style={{ ...tagBase, background: colors.primary.hex, color: textOnPrimary }}>Primary</span>
                <span style={{ ...tagBase, background: colors.secondary.hex, color: textOnSecondary }}>Secondary</span>
                <span style={{ ...tagBase, background: colors.accent.hex, color: textOnAccent }}>Accent</span>
              </div>
            </div>

            {/* Outline */}
            {hasOutlineTags && (
              <div>
                <SubLabel>Outline</SubLabel>
                <div className="flex gap-2 flex-wrap">
                  {!isPriBright && <span style={{ ...tagBase, background: 'transparent', color: colors.primary.hex, border: `1px solid ${colors.primary.hex}` }}>Primary</span>}
                  {!isSecBright && <span style={{ ...tagBase, background: 'transparent', color: colors.secondary.hex, border: `1px solid ${colors.secondary.hex}` }}>Secondary</span>}
                  {!isAccBright && <span style={{ ...tagBase, background: 'transparent', color: colors.accent.hex, border: `1px solid ${colors.accent.hex}` }}>Accent</span>}
                </div>
              </div>
            )}

            {/* Soft */}
            {hasOutlineTags && (
              <div>
                <SubLabel>Soft Background</SubLabel>
                <div className="flex gap-2 flex-wrap">
                  {!isPriBright && <span style={{ ...tagBase, background: colors.primary.hex + '15', color: colors.primary.hex, fontWeight: 600 }}>Primary</span>}
                  {!isSecBright && <span style={{ ...tagBase, background: colors.secondary.hex + '15', color: colors.secondary.hex, fontWeight: 600 }}>Secondary</span>}
                  {!isAccBright && <span style={{ ...tagBase, background: colors.accent.hex + '15', color: colors.accent.hex, fontWeight: 600 }}>Accent</span>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CARDS */}
        <div>
          <GroupTitle>Cards</GroupTitle>
          <div
            style={{
              background: '#fff',
              border: `1px solid ${C_BORDER}`,
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '140px',
                background: colors.primary.hex,
                borderRadius: '8px',
                marginBottom: '16px',
              }}
            />
            <h4
              style={{
                fontFamily: headingFont,
                fontSize: '16px',
                fontWeight: 700,
                color: '#282B32',
                margin: '0 0 6px',
              }}
            >
              Card Title
            </h4>
            <p
              style={{
                fontFamily: bodyFont,
                fontSize: '13px',
                color: 'rgba(40,43,50,0.6)',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Card description with brand colors
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}