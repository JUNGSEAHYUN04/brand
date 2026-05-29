'use client'

import { Logo } from '@/lib/types'

interface Props {
  logo: Logo
}

export default function LogoCard({ logo }: Props) {
  const handleDownload = () => {
    const blob = new Blob([logo.svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'logo.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Logo</p>
          <p className="text-xs text-gray-300 capitalize">{logo.style}</p>
        </div>
        <button
          onClick={handleDownload}
          className="text-xs px-3 py-1.5 border border-gray-200 text-gray-500 rounded-lg hover:border-gray-400 hover:text-gray-700 transition-all"
        >
          SVG 다운로드
        </button>
      </div>

      {/* 로고 프리뷰 */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* 밝은 배경 */}
        <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6 h-32">
          <div
            className="max-w-full max-h-full"
            dangerouslySetInnerHTML={{ __html: logo.svg }}
          />
        </div>

        {/* 어두운 배경 */}
        <div className="flex items-center justify-center bg-gray-950 rounded-xl p-6 h-32">
          <div
            className="max-w-full max-h-full"
            dangerouslySetInnerHTML={{ __html: logo.svg }}
          />
        </div>
      </div>

      {/* 컨셉 설명 */}
      <div className="pt-4 border-t border-gray-50">
        <p className="text-xs text-gray-400 mb-1">디자인 컨셉</p>
        <p className="text-sm text-gray-600 leading-relaxed">{logo.concept}</p>
      </div>
    </div>
  )
}