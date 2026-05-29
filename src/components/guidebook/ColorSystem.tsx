'use client'

import { useState } from 'react'
import { Colors } from '@/lib/types'

interface Props {
  colors: Colors
}

export default function ColorSystem({ colors }: Props) {
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

  const neutralEntries = Object.entries(colors.neutral)
  const semanticColors = [
    { label: 'Success', hex: colors.semantic.success },
    { label: 'Error', hex: colors.semantic.error },
    { label: 'Warning', hex: colors.semantic.warning },
    { label: 'Info', hex: colors.semantic.info },
  ]

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Color System</p>
        <h2 className="text-2xl font-bold text-gray-950">컬러 시스템</h2>
      </div>

      {/* 코어 컬러 */}
      <section className="mb-12">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Core Colors</p>
        <div className="space-y-3">
          {coreColors.map((color) => (
            <div
              key={color.label}
              className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
            >
              {/* 큰 스와치 */}
              <button
                onClick={() => handleCopy(color.hex)}
                className="w-16 h-16 rounded-xl border border-black/5 shrink-0 transition-transform hover:scale-105"
                style={{ backgroundColor: color.hex }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-gray-900">{color.label}</p>
                  <span className="text-xs text-gray-400">{color.name}</span>
                </div>
                <p className="text-xs text-gray-400 mb-2">{color.usage}</p>
                <div className="flex gap-3">
                  <span className="text-xs font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded">
                    {color.hex}
                  </span>
                  <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    rgb({color.rgb})
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleCopy(color.hex)}
                className="text-xs text-gray-400 hover:text-gray-700 transition-colors shrink-0"
              >
                {copiedHex === color.hex ? '✓ 복사됨' : 'HEX 복사'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 뉴트럴 팔레트 */}
      <section className="mb-12">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Neutral Palette</p>
        <div className="grid grid-cols-5 gap-3">
          {neutralEntries.map(([key, hex]) => (
            <button
              key={key}
              onClick={() => handleCopy(hex)}
              className="group"
            >
              <div
                className="w-full h-20 rounded-xl border border-black/5 mb-2 transition-transform group-hover:scale-105"
                style={{ backgroundColor: hex }}
              />
              <p className="text-xs text-gray-500 text-center">{key}</p>
              <p className="text-xs font-mono text-gray-400 text-center">
                {copiedHex === hex ? '✓' : hex}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 시맨틱 컬러 */}
      <section className="mb-12">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Semantic Colors</p>
        <div className="grid grid-cols-4 gap-3">
          {semanticColors.map((color) => (
            <button
              key={color.label}
              onClick={() => handleCopy(color.hex)}
              className="group p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors text-left"
            >
              <div
                className="w-full h-12 rounded-lg border border-black/5 mb-3"
                style={{ backgroundColor: color.hex }}
              />
              <p className="text-xs font-medium text-gray-700 mb-1">{color.label}</p>
              <p className="text-xs font-mono text-gray-400">
                {copiedHex === color.hex ? '✓ 복사됨' : color.hex}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 컬러 조합 프리뷰 */}
      <section>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Color Combination</p>
        <div className="grid grid-cols-3 gap-3">
          {/* Primary on White */}
          <div className="p-5 border border-gray-100 rounded-xl bg-white">
            <div
              className="text-sm font-semibold mb-1"
              style={{ color: colors.primary.hex }}
            >
              Primary on White
            </div>
            <p className="text-xs text-gray-400">기본 텍스트 조합</p>
          </div>

          {/* White on Primary */}
          <div
            className="p-5 rounded-xl"
            style={{ backgroundColor: colors.primary.hex }}
          >
            <div className="text-sm font-semibold text-white mb-1">
              White on Primary
            </div>
            <p className="text-xs text-white/60">버튼, CTA 조합</p>
          </div>

          {/* Accent on Neutral */}
          <div
            className="p-5 rounded-xl"
            style={{ backgroundColor: colors.neutral['50'] }}
          >
            <div
              className="text-sm font-semibold mb-1"
              style={{ color: colors.accent.hex }}
            >
              Accent on Neutral
            </div>
            <p className="text-xs text-gray-400">강조 요소 조합</p>
          </div>
        </div>
      </section>
    </div>
  )
}