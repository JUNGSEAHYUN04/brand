'use client'

import { Logo } from '@/lib/types'

interface Props {
  logo: Logo
}

export default function LogoCard({ logo }: Props) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Logo</p>
          <p className="text-xs text-gray-300 capitalize">{logo.style}</p>
        </div>
      </div>

      {/* 로고 프리뷰 */}
      {logo.url ? (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6 h-32">
            <img src={logo.url} alt="logo" className="max-w-full max-h-full object-contain" />
          </div>
          <div className="flex items-center justify-center bg-gray-950 rounded-xl p-6 h-32">
            <img src={logo.url} alt="logo" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center justify-center bg-gray-50 rounded-xl h-32">
            <p className="text-xs text-gray-300">로고 생성 예정</p>
          </div>
          <div className="flex items-center justify-center bg-gray-950 rounded-xl h-32">
            <p className="text-xs text-gray-600">로고 생성 예정</p>
          </div>
        </div>
      )}

      {/* 컨셉 설명 */}
      {logo.concept && (
        <div className="pt-4 border-t border-gray-50">
          <p className="text-xs text-gray-400 mb-1">디자인 컨셉</p>
          <p className="text-sm text-gray-600 leading-relaxed">{logo.concept}</p>
        </div>
      )}
    </div>
  )
}