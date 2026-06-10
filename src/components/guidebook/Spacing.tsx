'use client'

import { Spacing as SpacingType } from '@/lib/types'

interface Props {
  spacing: SpacingType
}

const F4 = 'SCDream4, sans-serif'
const F5 = 'SCDream5, sans-serif'
const F6 = 'SCDream6, sans-serif'
const F7 = 'SCDream7, sans-serif'

const C_MAIN = '#282B32'
const C_SUB = 'rgba(40,43,50,0.8)'
const C_MUTED = 'rgba(40,43,50,0.6)'
const C_LABEL = 'rgba(40,43,50,0.8)'
const C_BORDER = 'rgba(40,43,50,0.2)'
const C_BORDER_LIGHT = 'rgba(40,43,50,0.1)'

export default function Spacing({ spacing }: Props) {
  const { scale, borderRadius } = spacing

  const scaleEntries = Object.entries(scale) as [string, number][]
  const borderRadiusEntries = Object.entries(borderRadius) as [string, number][]

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontFamily: F4, fontSize: '13px', color: C_LABEL, letterSpacing: '0.1em', marginBottom: '5px' }}>SPACING</p>
        <h2 style={{ fontFamily: F7, fontSize: '32px', color: C_MAIN }}>여백 & 그리드</h2>
      </div>

      {/* 스페이싱 스케일 */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontFamily: F4, fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>SPACING SCALE</p>
        <div style={{ border: `1px solid ${C_BORDER}`, borderRadius: '16px', overflow: 'hidden', background: '#fff' }}>
          {scaleEntries.map(([key, value], index) => (
            <div
              key={key}
              style={{
                display: 'flex', alignItems: 'center', gap: '24px',
                padding: '20px 32px',
                borderBottom: index !== scaleEntries.length - 1 ? `1px solid ${C_BORDER_LIGHT}` : 'none',
              }}
            >
              <div style={{ width: '80px', flexShrink: 0 }}>
                <p style={{ fontFamily: F5, fontSize: '13px', color: 'rgba(40,43,50,0.8)' }}>{key}</p>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  width: `${Math.min(value * 2.5, 500)}px`,
                  height: '20px',
                  backgroundColor: C_BORDER,
                  borderRadius: '4px',
                }} />
              </div>
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <p style={{ fontFamily: F5, fontSize: '13px', color: 'rgba(40,43,50,0.8)' }}>{value}px</p>
                <p style={{ fontFamily: F4, fontSize: '11px', color: C_MUTED, marginTop: '3px' }}>{value / spacing.base}x base</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 스페이싱 시각화 */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontFamily: F4, fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>VISUAL GUIDE</p>
        <div style={{ padding: '48px 40px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '28px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {scaleEntries.map(([key, value]) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <p style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED }}>{value}</p>
                <div style={{
                  width: '36px',
                  height: `${Math.min(value * 1.8, 144)}px`,
                  backgroundColor: C_BORDER,
                  borderRadius: '4px',
                }} />
                <p style={{ fontFamily: F5, fontSize: '12px', color: 'rgba(40,43,50,0.8)' }}>{key}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Border Radius */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontFamily: F4, fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>BORDER RADIUS</p>
        <div style={{ padding: '48px 40px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center', alignItems: 'center' }}>
            {borderRadiusEntries.map(([key, value]) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '80px', height: '80px',
                  backgroundColor: 'rgba(40,43,50,0.05)',
                  border: `1px solid ${C_BORDER}`,
                  borderRadius: key === 'full' ? '9999px' : `${value}px`,
                }} />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: F5, fontSize: '13px', color: 'rgba(40,43,50,0.8)' }}>{key}</p>
                  <p style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED, marginTop: '2px' }}>
                    {key === 'full' ? '9999px' : `${value}px`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 여백 적용 예시 */}
      <section>
        <p style={{ fontFamily: F4, fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>USAGE EXAMPLE</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>

          {/* Card Padding */}
          <div style={{ border: `1px solid ${C_BORDER}`, borderRadius: '16px', overflow: 'hidden', background: '#fff' }}>
            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${C_BORDER_LIGHT}`, background: '#fff' }}>
              <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED }}>Card Padding — md ({scale.md}px)</p>
            </div>
            <div style={{ padding: `${scale.md}px`, background: 'rgba(220,38,38,0.06)' }}>
              <div style={{
                backgroundColor: '#fff',
                border: `1px solid ${C_BORDER_LIGHT}`,
                borderRadius: '10px', height: '96px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED }}>Content</p>
              </div>
            </div>
          </div>

          {/* Section Gap */}
          <div style={{ border: `1px solid ${C_BORDER}`, borderRadius: '16px', overflow: 'hidden', background: '#fff' }}>
            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${C_BORDER_LIGHT}`, background: '#fff' }}>
              <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED }}>Section Gap — xl ({scale.xl}px)</p>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', background: '#fff' }}>
              <div style={{
                backgroundColor: 'rgba(40,43,50,0.05)',
                height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED }}>Section A</p>
              </div>
              <div style={{
                height: `${scale.xl}px`,
                background: 'rgba(220,38,38,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <p style={{ fontFamily: F5, fontSize: '11px', color: 'rgba(185,28,28,0.7)' }}>{scale.xl}px</p>
              </div>
              <div style={{
                backgroundColor: 'rgba(40,43,50,0.05)',
                height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED }}>Section B</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}