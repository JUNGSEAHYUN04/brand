'use client'

import { useState } from 'react'
import { Colors } from '@/lib/types'

interface Props {
  colors: Colors
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

export default function ColorSystem({ colors }: Props) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null)

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex)
    setCopiedHex(hex)
    setTimeout(() => setCopiedHex(null), 1500)
  }

  const coreColors = [
    { label: 'Primary',   ...colors.primary },
    { label: 'Secondary', ...colors.secondary },
    { label: 'Accent',    ...colors.accent },
  ]

  const neutralEntries = Object.entries(colors.neutral)
  const semanticColors = [
    { label: 'Success', hex: colors.semantic.success },
    { label: 'Error',   hex: colors.semantic.error },
    { label: 'Warning', hex: colors.semantic.warning },
    { label: 'Info',    hex: colors.semantic.info },
  ]

  return (
    <div>
      <div className="mb-6">
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.1em', marginBottom: '5px' }}>COLOR SYSTEM</p>
        <h2 style={{ fontFamily: F7, fontSize: '32px', color: C_MAIN }}>컬러 시스템</h2>
      </div>

      {/* 코어 컬러 */}
      <section className="mb-14">
        <div className="space-y-3">
          {coreColors.map((color) => (
            <div key={color.label} className="flex items-center gap-5 p-5 rounded-xl transition-colors"
              style={{ border: `1px solid ${C_BORDER}`, background: '#fff' }}>
              <button onClick={() => handleCopy(color.hex)}
                className="w-20 h-20 rounded-xl shrink-0 transition-transform hover:scale-105"
                style={{ backgroundColor: color.hex, border: '1px solid rgba(0,0,0,0.05)' }} />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p style={{ fontFamily: F6, fontSize: '15px', color: C_MAIN }}>{color.label}</p>
                  <span style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED }}>{(color as any).name}</span>
                </div>
                <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED, marginBottom: '10px' }}>{(color as any).usage}</p>
                <div className="flex gap-2">
                  <span style={{ fontFamily: F4, fontSize: '12px', color: C_SUB, background: 'rgba(40,43,50,0.04)', padding: '5px 12px', borderRadius: '8px' }}>
                    {color.hex}
                  </span>
                  <span style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED, background: 'rgba(40,43,50,0.04)', padding: '5px 12px', borderRadius: '8px' }}>
                    rgb({(color as any).rgb})
                  </span>
                </div>
              </div>
              <button onClick={() => handleCopy(color.hex)}
                style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
                {copiedHex === color.hex ? '✓ 복사됨' : 'HEX 복사'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 뉴트럴 팔레트 */}
      <section className="mb-14">
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>NEUTRAL PALETTE</p>
        <div className="p-6 rounded-xl" style={{ border: `1px solid ${C_BORDER}`, background: '#fff' }}>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
            {neutralEntries.map(([key, hex]) => (
              <button key={key} onClick={() => handleCopy(hex)} className="group">
                <div className="w-full h-24 rounded-xl mb-2 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: hex, border: '1px solid rgba(0,0,0,0.05)' }} />
                <p style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED, textAlign: 'center' }}>{key}</p>
                <p style={{ fontFamily: F4, fontSize: '11px', color: C_MUTED, textAlign: 'center', opacity: 0.7 }}>
                  {copiedHex === hex ? '✓' : hex}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 시맨틱 컬러 */}
      <section className="mb-14">
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>SEMANTIC COLORS</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {semanticColors.map((color) => (
            <button key={color.label} onClick={() => handleCopy(color.hex)}
              className="p-5 rounded-xl text-left transition-colors"
              style={{ border: `1px solid ${C_BORDER}`, background: '#fff' }}>
              <div className="w-full h-16 rounded-lg mb-4"
                style={{ backgroundColor: color.hex, border: '1px solid rgba(0,0,0,0.05)' }} />
              <p style={{ fontFamily: F5, fontSize: '13px', color: C_MAIN, marginBottom: '4px' }}>{color.label}</p>
              <p style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED }}>
                {copiedHex === color.hex ? '✓ 복사됨' : color.hex}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 컬러 조합 */}
      <section>
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>COLOR COMBINATION</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-xl" style={{ border: `1px solid ${C_BORDER}`, background: '#fff' }}>
            <p style={{ fontFamily: F6, fontSize: '15px', color: colors.primary.hex, marginBottom: '6px' }}>Primary on White</p>
            <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED }}>기본 텍스트 조합</p>
          </div>
          <div className="p-6 rounded-xl" style={{ backgroundColor: colors.primary.hex }}>
            <p style={{ fontFamily: F6, fontSize: '15px', color: '#fff', marginBottom: '6px' }}>White on Primary</p>
            <p style={{ fontFamily: F4, fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>버튼, CTA 조합</p>
          </div>
          <div className="p-6 rounded-xl" style={{ backgroundColor: (colors.neutral as any)['50'], border: `1px solid ${C_BORDER}` }}>
            <p style={{ fontFamily: F6, fontSize: '15px', color: colors.accent.hex, marginBottom: '6px' }}>Accent on Neutral</p>
            <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED }}>강조 요소 조합</p>
          </div>
        </div>
      </section>
    </div>
  )
}