'use client'

import { Logo, Brand } from '@/lib/types'

interface Props {
  logo: Logo
  brand?: Brand
}

const F4 = 'SCDream4, sans-serif'
const F5 = 'SCDream5, sans-serif'
const F7 = 'SCDream7, sans-serif'

export default function LogoCard({ logo, brand }: Props) {
  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = logo.url
    a.download = `${brand?.name || 'logo'}-logo.png`
    a.click()
  }

  return (
    <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid rgba(40,43,50,0.08)' }}>
      <div className="flex items-center justify-between mb-5">
        <p style={{ fontFamily: F4, fontSize: '11px', color: 'rgba(40,43,50,0.7)', letterSpacing: '0.1em' }}>
          LOGO
        </p>
        <button
          onClick={handleDownload}
          className="transition-all"
          style={{
            fontFamily: F4,
            fontSize: '12px',
            padding: '6px 14px',
            border: '1px solid rgba(40,43,50,0.15)',
            borderRadius: '8px',
            color: 'rgba(40,43,50,0.6)',
            background: 'none',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = '#282B32'
            e.currentTarget.style.color = '#282B32'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = 'rgba(40,43,50,0.15)'
            e.currentTarget.style.color = 'rgba(40,43,50,0.6)'
          }}
        >
          다운로드
        </button>
      </div>

      <div className="flex items-center gap-8">
        <div className="shrink-0 w-48 h-48 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(40,43,50,0.06)' }}>
          <img src={logo.url} alt="logo" className="w-full h-full object-cover" />
        </div>

        <div className="flex-1">
          {brand?.name && (
            <h2 style={{ fontFamily: F7, fontSize: '28px', color: '#282B32', marginBottom: '12px', lineHeight: 1.1 }}>
              {brand.name}
            </h2>
          )}
          <div className="flex flex-wrap gap-2 mb-4">
            <span style={{ fontFamily: F5, fontSize: '12px', color: 'rgba(40,43,50,0.6)', background: 'rgba(40,43,50,0.06)', padding: '4px 12px', borderRadius: '99px' }}>
              {logo.style || 'Symbol'}
            </span>
            {brand?.personality?.slice(0, 2).map((p) => (
              <span key={p} style={{ fontFamily: F4, fontSize: '12px', color: 'rgba(40,43,50,0.6)', background: 'rgba(40,43,50,0.06)', padding: '4px 12px', borderRadius: '99px' }}>
                {p}
              </span>
            ))}
          </div>
          <p style={{ fontFamily: F4, fontSize: '13px', color: 'rgba(40,43,50,0.55)', lineHeight: '1.65' }}
            className="line-clamp-2">
            {logo.concept || '브랜드 아이덴티티를 시각적으로 표현한 심볼 로고입니다.'}
          </p>
        </div>
      </div>
    </div>
  )
}