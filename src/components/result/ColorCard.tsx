'use client'

import { useState } from 'react'
import { Colors } from '@/lib/types'

interface Props {
  colors: Colors
}

export default function ColorCard({ colors }: Props) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null)

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex)
    setCopiedHex(hex)
    setTimeout(() => setCopiedHex(null), 1500)
  }

  const coreColors = [
    { label: 'Primary', ...colors.primary },
    { label: 'Secondary', ...colors.secondary },
    { label: 'Accent', ...colors.accent },
  ]

  const neutralColors = Object.entries(colors.neutral).map(([key, hex]) => ({
    label: key,
    hex,
  }))

  const semanticColors = [
    { label: 'Success', hex: colors.semantic.success },
    { label: 'Error', hex: colors.semantic.error },
    { label: 'Warning', hex: colors.semantic.warning },
    { label: 'Info', hex: colors.semantic.info },
  ]

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">
      {/* 헤더 */}
      <div className="mb-5">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Color Palette</p>
      </div>

      {/* 코어 컬러 */}
      <div className="space-y-3 mb-5">
        {coreColors.map((color) => (
          <button
            key={color.label}
            onClick={() => handleCopy(color.hex)}
            className="w-full flex items-center gap-3 group"
          >
            {/* 컬러 스와치 */}
            <div
              className="w-10 h-10 rounded-lg shrink-0 border border-black/5"
              style={{ backgroundColor: color.hex }}
            />
            <div className="flex-1 text-left">
              <p className="text-xs font-medium text-gray-700">{color.label}</p>
              <p className="text-xs text-gray-400">{color.name}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono text-gray-600">
                {copiedHex === color.hex ? '✓ 복사됨' : color.hex}
              </p>
              <p className="text-xs text-gray-300">{color.usage}</p>
            </div>
          </button>
        ))}
      </div>

      {/* 뉴트럴 팔레트 */}
      <div className="mb-5">
        <p className="text-xs text-gray-400 mb-2">Neutral</p>
        <div className="flex gap-1.5">
          {neutralColors.map((color) => (
            <button
              key={color.label}
              onClick={() => handleCopy(color.hex)}
              className="flex-1 group"
              title={color.hex}
            >
              <div
                className="h-8 rounded-lg border border-black/5 mb-1"
                style={{ backgroundColor: color.hex }}
              />
              <p className="text-xs text-gray-300 text-center">{color.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 시맨틱 컬러 */}
      <div>
        <p className="text-xs text-gray-400 mb-2">Semantic</p>
        <div className="flex gap-2">
          {semanticColors.map((color) => (
            <button
              key={color.label}
              onClick={() => handleCopy(color.hex)}
              className="flex-1 flex flex-col items-center gap-1 group"
            >
              <div
                className="w-full h-7 rounded-lg border border-black/5"
                style={{ backgroundColor: color.hex }}
              />
              <p className="text-xs text-gray-400">{color.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}