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
      <div className="mb-10">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Spacing</p>
        <h2 className="text-3xl font-bold text-gray-950">여백 & 그리드</h2>
      </div>

      {/* 스페이싱 스케일 */}
      <section className="mb-14">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Spacing Scale</p>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          {scaleEntries.map(([key, value], index) => (
            <div
              key={key}
              className={`flex items-center gap-6 px-8 py-5 ${
                index !== scaleEntries.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="w-20 shrink-0">
                <p className="text-sm font-mono font-medium text-gray-700">{key}</p>
              </div>
              <div className="flex-1">
                <div
                  className="bg-gray-200 rounded-sm h-6"
                  style={{ width: `${Math.min(value * 2.5, 500)}px` }}
                />
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-mono text-gray-700">{value}px</p>
                <p className="text-sm text-gray-500">{value / spacing.base}x base</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 스페이싱 시각화 */}
      <section className="mb-14">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Visual Guide</p>
        <div className="p-10 border border-gray-200 rounded-xl bg-gray-50">
          <div className="flex items-end gap-4 flex-wrap">
            {scaleEntries.map(([key, value]) => (
              <div key={key} className="flex flex-col items-center gap-2">
                <p className="text-sm font-mono text-gray-600">{value}</p>
                <div
                  className="bg-gray-400 rounded-sm w-10"
                  style={{ height: `${Math.min(value * 1.8, 144)}px` }}
                />
                <p className="text-sm font-mono text-gray-700 font-medium">{key}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Border Radius */}
      <section className="mb-14">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Border Radius</p>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-5">
          {borderRadiusEntries.map(([key, value]) => (
            <div key={key} className="flex flex-col items-center gap-4">
              <div
                className="w-20 h-20 bg-gray-100 border border-gray-200"
                style={{
                  borderRadius: key === 'full' ? '9999px' : `${value}px`,
                }}
              />
              <div className="text-center">
                <p className="text-sm font-mono font-medium text-gray-700">{key}</p>
                <p className="text-sm font-mono text-gray-500">
                  {key === 'full' ? '9999px' : `${value}px`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 여백 적용 예시 */}
      <section>
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Usage Example</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
              <p className="text-sm text-gray-600">Card Padding — md (16px)</p>
            </div>
            <div style={{ padding: `${scale.md}px` }}>
              <div className="bg-gray-100 rounded-lg h-24 flex items-center justify-center">
                <p className="text-sm text-gray-600">Content</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
              <p className="text-sm text-gray-600">Section Gap — xl (32px)</p>
            </div>
            <div className="p-5 flex flex-col" style={{ gap: `${scale.xl}px` }}>
              <div className="bg-gray-100 rounded-lg h-10 flex items-center justify-center">
                <p className="text-sm text-gray-600">Section A</p>
              </div>
              <div className="bg-gray-100 rounded-lg h-10 flex items-center justify-center">
                <p className="text-sm text-gray-600">Section B</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}