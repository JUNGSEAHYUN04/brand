'use client'

import { useState } from 'react'
import { Colors } from '@/lib/types'

interface Props {
  colors: Colors
}

const F4 = 'SCDream4, sans-serif'
const F5 = 'SCDream5, sans-serif'

export default function ColorCard({ colors }: Props) {
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

  const neutralColors = Object.entries(colors.neutral).map(([key, hex]) => ({ label: key, hex }))

  const semanticColors = [
    { label: 'Success', hex: colors.semantic.success },
    { label: 'Error',   hex: colors.semantic.error },
    { label: 'Warning', hex: colors.semantic.warning },
    { label: 'Info',    hex: colors.semantic.info },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 h-full flex flex-col"
      style={{ border: '1px solid rgba(40,43,50,0.08)' }}>

      {/* 헤더 */}
      <div className="mb-5">
        <p style={{ fontFamily: F4, fontSize: '11px', color: 'rgba(40,43,50,0.7)', letterSpacing: '0.1em' }}>
          COLOR PALETTE
        </p>
      </div>

      {/* 코어 컬러 */}
      <div className="space-y-3 mb-6">
        {coreColors.map((color) => (
          <button key={color.label} onClick={() => handleCopy(color.hex)}
            className="w-full flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl shrink-0" style={{ backgroundColor: color.hex, border: '1px solid rgba(0,0,0,0.05)' }} />
            <div className="flex-1 text-left">
              <p style={{ fontFamily: F5, fontSize: '13px', color: '#282B32' }}>{color.label}</p>
              <p style={{ fontFamily: F4, fontSize: '12px', color: 'rgba(40,43,50,0.5)' }}>{(color as any).name}</p>
            </div>
            <div className="text-right">
              <p style={{ fontFamily: F4, fontSize: '12px', color: 'rgba(40,43,50,0.7)' }}>
                {copiedHex === color.hex ? '✓ 복사됨' : color.hex}
              </p>
              <p style={{ fontFamily: F4, fontSize: '11px', color: 'rgba(40,43,50,0.4)' }}>{(color as any).usage}</p>
            </div>
          </button>
        ))}
      </div>

      {/* 뉴트럴 */}
      <div className="mb-6">
        <p style={{ fontFamily: F5, fontSize: '12px', color: 'rgba(40,43,50,0.5)', marginBottom: '10px' }}>Neutral</p>
        <div className="flex gap-1.5">
          {neutralColors.map((color) => (
            <button key={color.label} onClick={() => handleCopy(color.hex)} className="flex-1" title={color.hex}>
              <div className="h-10 rounded-lg mb-1.5" style={{ backgroundColor: color.hex, border: '1px solid rgba(0,0,0,0.05)' }} />
              <p style={{ fontFamily: F4, fontSize: '11px', color: 'rgba(40,43,50,0.45)', textAlign: 'center' }}>{color.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 시맨틱 */}
      <div>
        <p style={{ fontFamily: F5, fontSize: '12px', color: 'rgba(40,43,50,0.5)', marginBottom: '10px' }}>Semantic</p>
        <div className="flex gap-2">
          {semanticColors.map((color) => (
            <button key={color.label} onClick={() => handleCopy(color.hex)} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full h-10 rounded-lg" style={{ backgroundColor: color.hex, border: '1px solid rgba(0,0,0,0.05)' }} />
              <p style={{ fontFamily: F4, fontSize: '12px', color: 'rgba(40,43,50,0.55)' }}>{color.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}