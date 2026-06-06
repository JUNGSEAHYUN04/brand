'use client'

import { useState } from 'react'
import { Brand } from '@/lib/types'

interface Props {
  brand: Brand
}

export default function SloganCard({ brand }: Props) {
  const [copiedLang, setCopiedLang] = useState<'ko' | 'en' | null>(null)

  const handleCopy = (text: string, lang: 'ko' | 'en') => {
    navigator.clipboard.writeText(text)
    setCopiedLang(lang)
    setTimeout(() => setCopiedLang(null), 1500)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col">
      {/* 헤더 */}
      <div className="mb-5">
        <p className="text-xs text-gray-500 uppercase tracking-widest">Slogan</p>
      </div>

      {/* 슬로건 */}
      <div className="flex-1 space-y-4 mb-6">
        {/* 한글 슬로건 */}
        {/* 한글 슬로건 */}
<button
  onClick={() => handleCopy(brand.slogan.ko, 'ko')}
  className="w-full text-left p-4 rounded-xl border border-gray-200 group transition-all hover:border-gray-400"
>
  <p className="text-xs text-gray-500 mb-2">한국어</p>
  <p className="text-lg font-bold text-gray-950 leading-tight">
    {brand.slogan.ko}
  </p>
  <p className="text-xs text-gray-500 mt-2">
    {copiedLang === 'ko' ? '✓ 복사됨' : '클릭해서 복사'}
  </p>
</button>

        {/* 영문 슬로건 */}
        <button
          onClick={() => handleCopy(brand.slogan.en, 'en')}
          className="w-full text-left p-4 rounded-xl border border-gray-200 group transition-all hover:border-gray-400"
        >
          <p className="text-xs text-gray-500 mb-2">English</p>
          <p className="text-lg font-bold text-gray-950 leading-tight">
            {brand.slogan.en}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {copiedLang === 'en' ? '✓ 복사됨' : '클릭해서 복사'}
          </p>
        </button>
      </div>

      {/* 브랜드 퍼스낼리티 */}
      <div className="pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-600 font-medium mb-2">Brand Personality</p>
        <div className="flex flex-wrap gap-1.5">
          {brand.personality.map((keyword) => (
            <span
              key={keyword}
              className="text-xs px-2.5 py-1 bg-gray-50 text-gray-700 rounded-full border border-gray-200"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* 톤앤매너 */}
      <div className="pt-4 mt-4 border-t border-gray-100">
        <p className="text-xs text-gray-600 font-medium mb-2">Tone & Manner</p>
        <p className="text-xs text-gray-700 leading-relaxed">{brand.tone}</p>
      </div>
    </div>
  )
}