'use client'

import { useState } from 'react'
import { Brand } from '@/lib/types'

interface Props {
  brand: Brand
}

const F4 = 'SCDream4, sans-serif'
const F5 = 'SCDream5, sans-serif'
const F6 = 'SCDream6, sans-serif'

export default function SloganCard({ brand }: Props) {
  const [copiedLang, setCopiedLang] = useState<'ko' | 'en' | null>(null)

  const handleCopy = (text: string, lang: 'ko' | 'en') => {
    navigator.clipboard.writeText(text)
    setCopiedLang(lang)
    setTimeout(() => setCopiedLang(null), 1500)
  }

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col" style={{ border: '1px solid rgba(40,43,50,0.08)' }}>

      <div className="mb-5">
        <p style={{ fontFamily: F4, fontSize: '11px', color: 'rgba(40,43,50,0.7)', letterSpacing: '0.1em' }}>
          SLOGAN
        </p>
      </div>

      <div className="flex-1 space-y-3 mb-6">
        {/* 한글 슬로건 */}
        <button
          onClick={() => handleCopy(brand.slogan.ko, 'ko')}
          className="w-full text-left p-4 rounded-xl transition-all"
          style={{ border: '1px solid rgba(40,43,50,0.1)', background: 'none' }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = '#282B32'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(40,43,50,0.1)'}
        >
          <p style={{ fontFamily: F4, fontSize: '11px', color: 'rgba(40,43,50,0.4)', marginBottom: '8px' }}>한국어</p>
          <p style={{ fontFamily: F6, fontSize: '17px', color: '#282B32', lineHeight: 1.3 }}>
            {brand.slogan.ko}
          </p>
          <p style={{ fontFamily: F4, fontSize: '11px', color: 'rgba(40,43,50,0.35)', marginTop: '8px' }}>
            {copiedLang === 'ko' ? '✓ 복사됨' : '클릭해서 복사'}
          </p>
        </button>

        {/* 영문 슬로건 */}
        <button
          onClick={() => handleCopy(brand.slogan.en, 'en')}
          className="w-full text-left p-4 rounded-xl transition-all"
          style={{ border: '1px solid rgba(40,43,50,0.1)', background: 'none' }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = '#282B32'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(40,43,50,0.1)'}
        >
          <p style={{ fontFamily: F4, fontSize: '11px', color: 'rgba(40,43,50,0.4)', marginBottom: '8px' }}>English</p>
          <p style={{ fontFamily: F6, fontSize: '17px', color: '#282B32', lineHeight: 1.3 }}>
            {brand.slogan.en}
          </p>
          <p style={{ fontFamily: F4, fontSize: '11px', color: 'rgba(40,43,50,0.35)', marginTop: '8px' }}>
            {copiedLang === 'en' ? '✓ 복사됨' : '클릭해서 복사'}
          </p>
        </button>
      </div>

      {/* Brand Personality */}
      <div className="pt-4" style={{ borderTop: '1px solid rgba(40,43,50,0.06)' }}>
        <p style={{ fontFamily: F5, fontSize: '11px', color: 'rgba(40,43,50,0.4)', marginBottom: '10px' }}>
          Brand Personality
        </p>
        <div className="flex flex-wrap gap-1.5">
          {brand.personality.map((keyword) => (
            <span key={keyword} style={{
              fontFamily: F4,
              fontSize: '12px',
              color: 'rgba(40,43,50,0.6)',
              background: 'rgba(40,43,50,0.04)',
              border: '1px solid rgba(40,43,50,0.1)',
              padding: '3px 12px',
              borderRadius: '99px',
            }}>
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Tone & Manner */}
      <div className="pt-4 mt-4" style={{ borderTop: '1px solid rgba(40,43,50,0.06)' }}>
        <p style={{ fontFamily: F5, fontSize: '11px', color: 'rgba(40,43,50,0.4)', marginBottom: '8px' }}>
          Tone & Manner
        </p>
        <p style={{ fontFamily: F4, fontSize: '12px', color: 'rgba(40,43,50,0.55)', lineHeight: '1.65' }}>
          {brand.tone}
        </p>
      </div>
    </div>
  )
}