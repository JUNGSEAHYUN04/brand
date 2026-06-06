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
      <div className="mb-10">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Color System</p>
        <h2 className="text-3xl font-bold text-gray-950">컬러 시스템</h2>
      </div>

      {/* 코어 컬러 */}
      <section className="mb-14">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Core Colors</p>
        <div className="space-y-4">
          {coreColors.map((color) => (
            <div
              key={color.label}
              className="flex items-center gap-5 p-5 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
            >
              <button
                onClick={() => handleCopy(color.hex)}
                className="w-20 h-20 rounded-xl border border-black/5 shrink-0 transition-transform hover:scale-105"
                style={{ backgroundColor: color.hex }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-base font-semibold text-gray-900">{color.label}</p>
                  <span className="text-sm text-gray-600">{color.name}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{color.usage}</p>
                <div className="flex gap-3">
                  <span className="text-sm font-mono text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg">
                    {color.hex}
                  </span>
                  <span className="text-sm font-mono text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                    rgb({color.rgb})
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleCopy(color.hex)}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors shrink-0"
              >
                {copiedHex === color.hex ? '✓ 복사됨' : 'HEX 복사'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 뉴트럴 팔레트 */}
      <section className="mb-14">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Neutral Palette</p>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
          {neutralEntries.map(([key, hex]) => (
            <button
              key={key}
              onClick={() => handleCopy(hex)}
              className="group"
            >
              <div
                className="w-full h-24 rounded-xl border border-black/5 mb-2 transition-transform group-hover:scale-105"
                style={{ backgroundColor: hex }}
              />
              <p className="text-sm text-gray-600 text-center">{key}</p>
              <p className="text-xs font-mono text-gray-500 text-center">
                {copiedHex === hex ? '✓' : hex}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 시맨틱 컬러 */}
      <section className="mb-14">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Semantic Colors</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {semanticColors.map((color) => (
            <button
              key={color.label}
              onClick={() => handleCopy(color.hex)}
              className="group p-5 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors text-left"
            >
              <div
                className="w-full h-16 rounded-lg border border-black/5 mb-4"
                style={{ backgroundColor: color.hex }}
              />
              <p className="text-sm font-medium text-gray-800 mb-1">{color.label}</p>
              <p className="text-sm font-mono text-gray-600">
                {copiedHex === color.hex ? '✓ 복사됨' : color.hex}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 컬러 조합 프리뷰 */}
      <section>
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Color Combination</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 border border-gray-200 rounded-xl bg-white">
            <div
              className="text-base font-semibold mb-2"
              style={{ color: colors.primary.hex }}
            >
              Primary on White
            </div>
            <p className="text-sm text-gray-600">기본 텍스트 조합</p>
          </div>

          <div
            className="p-6 rounded-xl"
            style={{ backgroundColor: colors.primary.hex }}
          >
            <div className="text-base font-semibold text-white mb-2">
              White on Primary
            </div>
            <p className="text-sm text-white/70">버튼, CTA 조합</p>
          </div>

          <div
            className="p-6 rounded-xl"
            style={{ backgroundColor: colors.neutral['50'] }}
          >
            <div
              className="text-base font-semibold mb-2"
              style={{ color: colors.accent.hex }}
            >
              Accent on Neutral
            </div>
            <p className="text-sm text-gray-600">강조 요소 조합</p>
          </div>
        </div>
      </section>
    </div>
  )
}