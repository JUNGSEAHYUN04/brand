'use client'

import { useEffect } from 'react'
import { Typography, Colors } from '@/lib/types'

interface Props {
  typography: Typography
  colors?: Colors
}

export default function FontCard({ typography, colors }: Props) {
  const { fonts, scale } = typography

  useEffect(() => {
    const fontNames = [fonts.heading, fonts.body, fonts.mono]
      .filter(Boolean)
      .map((f) => f.replace(/ /g, '+'))
      .join('&family=')

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${fontNames}&display=swap`
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [fonts])

  const primaryColor = colors?.primary?.hex || '#0F0F0F'

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <p className="text-xs text-gray-500 uppercase tracking-widest">Typography</p>
      </div>

      {/* 가로 배치 — 폰트 3개 + 타입 스케일 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Heading */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-600 mb-3">Heading</p>
          <p
            className="text-2xl font-bold leading-tight mb-2 truncate"
            style={{ fontFamily: fonts.heading, color: primaryColor }}
          >
            {fonts.heading}
          </p>
          <p
            className="text-xs text-gray-600 leading-relaxed"
            style={{ fontFamily: fonts.heading }}
          >
            ABCDEFGHIJKLM<br />NOPQRSTUVWXYZ
          </p>
        </div>

        {/* Body */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-600 mb-3">Body</p>
          <p
            className="text-2xl font-bold leading-tight mb-2 truncate text-gray-900"
            style={{ fontFamily: fonts.body }}
          >
            {fonts.body}
          </p>
          <p
            className="text-xs text-gray-600 leading-relaxed"
            style={{ fontFamily: fonts.body }}
          >
            The quick brown fox<br />jumps over the lazy dog
          </p>
        </div>

        {/* Mono */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-600 mb-3">Mono</p>
          <p
            className="text-xl font-bold leading-tight mb-2 truncate text-gray-900"
            style={{ fontFamily: fonts.mono }}
          >
            {fonts.mono}
          </p>
          <p
            className="text-xs text-gray-600 leading-relaxed"
            style={{ fontFamily: fonts.mono }}
          >
            const brand =<br />'identity'
          </p>
        </div>

        {/* 타입 스케일 */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-600 mb-3">Type Scale</p>
          <div className="space-y-1.5">
            {[
              { label: 'Display', data: scale.display },
              { label: 'H1', data: scale.h1 },
              { label: 'H2', data: scale.h2 },
              { label: 'H3', data: scale.h3 },
              { label: 'Body L', data: scale.bodyL },
              { label: 'Body M', data: scale.bodyM },
              { label: 'Caption', data: scale.caption },
            ].map(({ label, data }) => (
              <div key={label} className="flex items-center justify-between">
                <span
                  className="text-gray-800 truncate flex-1"
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: `${Math.min(data.size, 16)}px`,
                    fontWeight: data.weight,
                    lineHeight: data.lineHeight,
                  }}
                >
                  {label}
                </span>
                <span className="text-xs text-gray-500 shrink-0 ml-2">
                  {data.size}px
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}