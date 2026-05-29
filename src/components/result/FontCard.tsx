'use client'

import { useEffect } from 'react'
import { Typography, Colors } from '@/lib/types'

interface Props {
  typography: Typography
  colors?: Colors
}

export default function FontCard({ typography, colors }: Props) {
  const { fonts, scale } = typography

  // Google Fonts 동적 로드
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

  const primaryColor = colors?.primary?.hex || '#111111'

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col">
      {/* 헤더 */}
      <div className="mb-5">
        <p className="text-xs text-gray-400 uppercase tracking-widest">Typography</p>
      </div>

      {/* 폰트 패밀리 */}
      <div className="space-y-4 mb-6">
        {/* Heading */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-400 mb-2">Heading</p>
          <p
            className="text-2xl font-bold leading-tight mb-1"
            style={{ fontFamily: fonts.heading, color: primaryColor }}
          >
            {fonts.heading}
          </p>
          <p
            className="text-sm text-gray-500"
            style={{ fontFamily: fonts.heading }}
          >
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </p>
        </div>

        {/* Body */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-400 mb-2">Body</p>
          <p
            className="text-lg font-medium leading-tight mb-1 text-gray-800"
            style={{ fontFamily: fonts.body }}
          >
            {fonts.body}
          </p>
          <p
            className="text-sm text-gray-500"
            style={{ fontFamily: fonts.body }}
          >
            The quick brown fox jumps over the lazy dog
          </p>
        </div>

        {/* Mono */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-400 mb-2">Mono</p>
          <p
            className="text-base font-medium leading-tight mb-1 text-gray-800"
            style={{ fontFamily: fonts.mono }}
          >
            {fonts.mono}
          </p>
          <p
            className="text-sm text-gray-500"
            style={{ fontFamily: fonts.mono }}
          >
            const brand = 'identity'
          </p>
        </div>
      </div>

      {/* 타입 스케일 */}
      <div className="pt-4 border-t border-gray-50">
        <p className="text-xs text-gray-400 mb-3">Type Scale</p>
        <div className="space-y-2">
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
              <span className="text-xs text-gray-400 w-16 shrink-0">{label}</span>
              <span
                className="flex-1 text-gray-700 truncate"
                style={{
                  fontFamily: fonts.heading,
                  fontSize: `${Math.min(data.size, 20)}px`,
                  fontWeight: data.weight,
                  lineHeight: data.lineHeight,
                }}
              >
                {label}
              </span>
              <span className="text-xs text-gray-300 shrink-0">
                {data.size}px / {data.weight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}