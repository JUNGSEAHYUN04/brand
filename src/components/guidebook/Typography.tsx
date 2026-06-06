'use client'

import { useEffect } from 'react'
import { Typography as TypographyType, Colors } from '@/lib/types'

interface Props {
  typography: TypographyType
  colors: Colors
}

export default function Typography({ typography, colors }: Props) {
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

  const scaleEntries = [
    { label: 'Display', key: 'display', data: scale.display, sample: 'Brand Identity' },
    { label: 'H1', key: 'h1', data: scale.h1, sample: 'Heading One' },
    { label: 'H2', key: 'h2', data: scale.h2, sample: 'Heading Two' },
    { label: 'H3', key: 'h3', data: scale.h3, sample: 'Heading Three' },
    { label: 'H4', key: 'h4', data: scale.h4, sample: 'Heading Four' },
    { label: 'Body L', key: 'bodyL', data: scale.bodyL, sample: '브랜드의 이야기를 담은 본문 텍스트입니다.' },
    { label: 'Body M', key: 'bodyM', data: scale.bodyM, sample: '브랜드의 이야기를 담은 본문 텍스트입니다.' },
    { label: 'Body S', key: 'bodyS', data: scale.bodyS, sample: '브랜드의 이야기를 담은 본문 텍스트입니다.' },
    { label: 'Caption', key: 'caption', data: scale.caption, sample: '캡션 텍스트 / 보조 설명' },
    { label: 'Label', key: 'label', data: scale.label, sample: 'LABEL TEXT' },
  ]

  return (
    <div>
      <div className="mb-10">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Typography</p>
        <h2 className="text-3xl font-bold text-gray-950">타이포그래피</h2>
      </div>

      {/* 폰트 패밀리 */}
      <section className="mb-14">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Font Family</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { role: 'Heading', font: fonts.heading, sample: 'Aa Bb Cc' },
            { role: 'Body', font: fonts.body, sample: 'Aa Bb Cc' },
            { role: 'Mono', font: fonts.mono, sample: 'Aa Bb Cc' },
          ].map(({ role, font, sample }) => (
            <div key={role} className="p-6 border border-gray-200 rounded-xl">
              <p className="text-sm text-gray-600 mb-4">{role}</p>
              <p
                className="text-4xl font-bold mb-3"
                style={{ fontFamily: font, color: colors.primary.hex }}
              >
                {sample}
              </p>
              <p className="text-base font-medium text-gray-800 mb-2">{font}</p>
              <p
                className="text-sm text-gray-600"
                style={{ fontFamily: font }}
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz<br />
                0123456789
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 타입 스케일 */}
      <section className="mb-14">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Type Scale</p>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          {scaleEntries.map(({ label, data, sample }, index) => (
            <div
              key={label}
              className={`flex items-center gap-6 px-8 py-6 ${
                index !== scaleEntries.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="w-24 shrink-0">
                <p className="text-sm font-medium text-gray-700">{label}</p>
                <p className="text-sm text-gray-500">{data.size}px</p>
              </div>
              <div className="flex-1 overflow-hidden">
                <p
                  className="truncate text-gray-900"
                  style={{
                    fontFamily: ['Display', 'H1', 'H2', 'H3', 'H4'].includes(label)
                      ? fonts.heading
                      : fonts.body,
                    fontSize: `${Math.min(data.size, 36)}px`,
                    fontWeight: data.weight,
                    lineHeight: data.lineHeight,
                    letterSpacing: data.letterSpacing,
                  }}
                >
                  {sample}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-mono text-gray-600">{data.size}px / {data.weight}</p>
                <p className="text-sm font-mono text-gray-500">{data.lineHeight} leading</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 텍스트 조합 프리뷰 */}
      <section>
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Preview</p>
        <div className="p-10 border border-gray-200 rounded-xl">
          <p
            className="mb-3"
            style={{
              fontFamily: fonts.heading,
              fontSize: `${scale.h2.size}px`,
              fontWeight: scale.h2.weight,
              lineHeight: scale.h2.lineHeight,
              color: colors.primary.hex,
            }}
          >
            브랜드의 이야기
          </p>
          <p
            className="mb-5 text-gray-950"
            style={{
              fontFamily: fonts.heading,
              fontSize: `${scale.h4.size}px`,
              fontWeight: scale.h4.weight,
              lineHeight: scale.h4.lineHeight,
            }}
          >
            타이포그래피로 전달하는 브랜드 아이덴티티
          </p>
          <p
            className="text-gray-600"
            style={{
              fontFamily: fonts.body,
              fontSize: `${scale.bodyM.size}px`,
              fontWeight: scale.bodyM.weight,
              lineHeight: scale.bodyM.lineHeight,
            }}
          >
            브랜드의 가치와 철학을 타이포그래피로 표현합니다.
            일관된 폰트 사용으로 브랜드의 개성을 강화하고
            독자에게 명확한 메시지를 전달할 수 있어요.
          </p>
        </div>
      </section>
    </div>
  )
}