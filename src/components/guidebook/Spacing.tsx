'use client'

import { Spacing as SpacingType } from '@/lib/types'

interface Props {
  spacing: SpacingType
}

export default function Spacing({ spacing }: Props) {
  const { scale, borderRadius } = spacing

  const scaleEntries = Object.entries(scale) as [string, number][]
  const borderRadiusEntries = Object.entries(borderRadius) as [string, number][]

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Spacing</p>
        <h2 className="text-2xl font-bold text-gray-950">여백 & 그리드</h2>
      </div>

      {/* 스페이싱 스케일 */}
      <section className="mb-12">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Spacing Scale</p>
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          {scaleEntries.map(([key, value], index) => (
            <div
              key={key}
              className={`flex items-center gap-6 px-6 py-4 ${
                index !== scaleEntries.length - 1 ? 'border-b border-gray-50' : ''
              }`}
            >
              {/* 토큰명 */}
              <div className="w-16 shrink-0">
                <p className="text-xs font-mono font-medium text-gray-600">{key}</p>
              </div>

              {/* 시각적 바 */}
              <div className="flex-1">
                <div
                  className="bg-blue-100 rounded-sm h-5"
                  style={{ width: `${Math.min(value * 2, 400)}px` }}
                />
              </div>

              {/* 값 */}
              <div className="shrink-0 text-right">
                <p className="text-xs font-mono text-gray-400">{value}px</p>
                <p className="text-xs text-gray-300">{value / spacing.base}x base</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 스페이싱 시각화 */}
      <section className="mb-12">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Visual Guide</p>
        <div className="p-8 border border-gray-100 rounded-xl bg-gray-50">
          <div className="flex items-end gap-0">
            {scaleEntries.map(([key, value]) => (
              <div key={key} className="flex flex-col items-center gap-2">
                <p className="text-xs font-mono text-gray-400">{value}</p>
                <div
                  className="bg-blue-200 rounded-sm w-8"
                  style={{ height: `${Math.min(value * 1.5, 120)}px` }}
                />
                <p className="text-xs font-mono text-gray-500">{key}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Border Radius */}
      <section className="mb-12">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Border Radius</p>
        <div className="grid grid-cols-5 gap-4">
          {borderRadiusEntries.map(([key, value]) => (
            <div key={key} className="flex flex-col items-center gap-3">
              <div
                className="w-16 h-16 bg-gray-100 border border-gray-200"
                style={{
                  borderRadius: key === 'full' ? '9999px' : `${value}px`,
                }}
              />
              <div className="text-center">
                <p className="text-xs font-mono font-medium text-gray-600">{key}</p>
                <p className="text-xs font-mono text-gray-400">
                  {key === 'full' ? '9999px' : `${value}px`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 여백 적용 예시 */}
      <section>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Usage Example</p>
        <div className="grid grid-cols-2 gap-4">
          {/* 카드 여백 예시 */}
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
              <p className="text-xs text-gray-400">Card Padding — md (16px)</p>
            </div>
            <div style={{ padding: `${scale.md}px` }}>
              <div className="bg-gray-100 rounded-lg h-20 flex items-center justify-center">
                <p className="text-xs text-gray-400">Content</p>
              </div>
            </div>
          </div>

          {/* 섹션 여백 예시 */}
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
              <p className="text-xs text-gray-400">Section Gap — xl (32px)</p>
            </div>
            <div className="p-4 flex flex-col" style={{ gap: `${scale.xl}px` }}>
              <div className="bg-gray-100 rounded-lg h-8 flex items-center justify-center">
                <p className="text-xs text-gray-400">Section A</p>
              </div>
              <div className="bg-gray-100 rounded-lg h-8 flex items-center justify-center">
                <p className="text-xs text-gray-400">Section B</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}