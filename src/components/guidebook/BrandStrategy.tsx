'use client'

import { Brand, Colors, Logo } from '@/lib/types'
import { useState } from 'react'
import { Check } from 'lucide-react'

interface Props {
  brand: Brand
  colors: Colors
  logo?: Logo
}

const F4 = 'SCDream4, sans-serif'
const F5 = 'SCDream5, sans-serif'
const F6 = 'SCDream6, sans-serif'
const F7 = 'SCDream7, sans-serif'

const C_MAIN = '#282B32'
const C_SUB = 'rgba(40,43,50,0.8)'
const C_MUTED = 'rgba(40,43,50,0.6)'
const C_LABEL = 'rgba(40,43,50,0.8)'
const C_BORDER = 'rgba(40,43,50,0.2)'
const C_BORDER_LIGHT = 'rgba(40,43,50,0.1)'

export default function BrandStrategy({ brand, colors, logo }: Props) {
  const [hoveredBtn, setHoveredBtn] = useState(false)
  const [hoveredSlogan, setHoveredSlogan] = useState<'ko' | 'en' | null>(null)
  const [copiedSlogan, setCopiedSlogan] = useState<'ko' | 'en' | null>(null)

  const handleCopySlogan = (type: 'ko' | 'en', text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSlogan(type)
    setTimeout(() => setCopiedSlogan(null), 1500)
  }

  const handleLogoDownload = () => {
    if (!logo?.url) return
    const a = document.createElement('a')
    a.href = logo.url
    a.download = `${brand.name}-logo.png`
    a.click()
  }

  return (
    <div>
      <div className="mb-6">
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.1em', marginBottom: '5px' }}>BRAND STRATEGY</p>
        <h2 style={{ fontFamily: F7, fontSize: '32px', color: C_MAIN }}>브랜드 전략</h2>
      </div>

      {/* 브랜드 기본 */}
      <section className="mb-14">
        <div className="p-8 rounded-2xl" style={{ border: `1px solid ${C_BORDER}`, background: '#fff' }}>
          {logo?.url && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em' }}>LOGO</p>
                <button onClick={handleLogoDownload}
                  onMouseEnter={() => setHoveredBtn(true)}
                  onMouseLeave={() => setHoveredBtn(false)}
                  style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED, background: 'none', border: `1px solid ${hoveredBtn ? 'rgba(40,43,50,0.45)' : C_BORDER}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', transition: 'border-color 0.15s' }}>
                  다운로드
                </button>
              </div>
              <div className="w-36 h-36 rounded-2xl overflow-hidden" style={{ border: `1px solid ${C_BORDER_LIGHT}` }}>
                <img src={logo.url} alt={`${brand.name} logo`} className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          <h3 style={{ fontFamily: F7, fontSize: '22px', color: C_MAIN, marginBottom: '12px' }}>{brand.name}</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {brand.personality.map((keyword) => (
              <span key={keyword} style={{ fontFamily: F4, fontSize: '13px', color: C_SUB, background: 'rgba(40,43,50,0.05)', padding: '5px 14px', borderRadius: '99px' }}>
                {keyword}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-5 rounded-xl"
              onMouseEnter={() => setHoveredSlogan('ko')}
              onMouseLeave={() => setHoveredSlogan(null)}
              onClick={() => handleCopySlogan('ko', brand.slogan.ko)}
              style={{ border: `1px solid ${hoveredSlogan === 'ko' ? 'rgba(40,43,50,0.45)' : C_BORDER}`, background: '#fff', transition: 'border-color 0.15s', cursor: 'pointer', userSelect: 'none' }}>
              <div className="flex items-center justify-between">
                <p style={{ fontFamily: F4, fontSize: '12px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '0px' }}>한국어 슬로건</p>
                <p style={{ fontFamily: F4, fontSize: '11px', color: C_MUTED, transition: 'opacity 0.15s', opacity: hoveredSlogan === 'ko' ? 1 : 0 }}>
                  {copiedSlogan === 'ko' ? '복사됨 ✓' : '클릭하여 복사'}
                </p>
              </div>
              <p style={{ fontFamily: F6, fontSize: '17px', color: C_MAIN }}>{brand.slogan.ko}</p>
            </div>
            <div className="p-5 rounded-xl"
              onMouseEnter={() => setHoveredSlogan('en')}
              onMouseLeave={() => setHoveredSlogan(null)}
              onClick={() => handleCopySlogan('en', brand.slogan.en)}
              style={{ border: `1px solid ${hoveredSlogan === 'en' ? 'rgba(40,43,50,0.45)' : C_BORDER}`, background: '#fff', transition: 'border-color 0.15s', cursor: 'pointer', userSelect: 'none' }}>
              <div className="flex items-center justify-between">
                <p style={{ fontFamily: F4, fontSize: '12px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '0px' }}>ENGLISH SLOGAN</p>
                <p style={{ fontFamily: F4, fontSize: '11px', color: C_MUTED, transition: 'opacity 0.15s', opacity: hoveredSlogan === 'en' ? 1 : 0 }}>
                  {copiedSlogan === 'en' ? '복사됨 ✓' : '클릭하여 복사'}
                </p>
              </div>
              <p style={{ fontFamily: F6, fontSize: '17px', color: C_MAIN }}>{brand.slogan.en}</p>
            </div>
          </div>

          {brand.brandEssence && (
            <div className="pt-6 mt-6" style={{ borderTop: `1px solid ${C_BORDER_LIGHT}` }}>
              <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>BRAND ESSENCE</p>
              <p style={{ fontFamily: F4, fontSize: '15px', color: C_SUB, lineHeight: '1.7' }}>{brand.brandEssence}</p>
            </div>
          )}
        </div>
      </section>

      {/* Core Values */}
      {brand.coreValues && brand.coreValues.length > 0 && (
        <section className="mb-14">
          <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>CORE VALUES</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {brand.coreValues.map((value, index) => (
              <div key={index} className="p-6 rounded-xl" style={{ border: `1px solid ${C_BORDER}`, background: '#fff' }}>
                <p style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED, marginBottom: '10px' }}>0{index + 1}</p>
                <p style={{ fontFamily: F6, fontSize: '15px', color: C_MAIN, marginBottom: '8px' }}>{value.title}</p>
                <p style={{ fontFamily: F4, fontSize: '13px', color: C_SUB, lineHeight: '1.65' }}>{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tone & Manner */}
      <section className="mb-14">
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>TONE & MANNER</p>
        <div className="p-8 rounded-xl" style={{ border: `1px solid ${C_BORDER}`, background: '#fff' }}>
          <p style={{ fontFamily: F4, fontSize: '14px', color: C_SUB, lineHeight: '1.75', marginBottom: '24px' }}>{brand.tone}</p>
          {brand.coreTone && brand.coreTone.length > 0 && (
            <div className="pt-6" style={{ borderTop: `1px solid ${C_BORDER_LIGHT}` }}>
              <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '12px' }}>CORE TONE</p>
              <div className="flex flex-wrap gap-2">
                {brand.coreTone.map((tone) => (
                  <span key={tone} style={{ fontFamily: F4, fontSize: '13px', color: C_SUB, padding: '6px 16px', borderRadius: '99px', border: `1px solid ${C_BORDER}` }}>
                    {tone}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Visual Direction */}
      {(brand.designDirection || brand.designPrinciples) && (
        <section className="mb-14">
          <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>VISUAL DIRECTION</p>
          <div className="p-8 rounded-xl" style={{ border: `1px solid ${C_BORDER}`, background: '#fff' }}>
            {brand.designDirection && (
              <div className="mb-6">
                <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '10px' }}>DESIGN DIRECTION</p>
                <p style={{ fontFamily: F4, fontSize: '14px', color: C_SUB, lineHeight: '1.75' }}>{brand.designDirection}</p>
              </div>
            )}
            {brand.designPrinciples && brand.designPrinciples.length > 0 && (
              <div className="pt-6" style={{ borderTop: `1px solid ${C_BORDER_LIGHT}` }}>
                <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>DESIGN PRINCIPLES</p>
                <div className="space-y-4">
                  {brand.designPrinciples.map((principle, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <span style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED, flexShrink: 0, marginTop: '2px' }}>0{index + 1}</span>
                      <p style={{ fontFamily: F4, fontSize: '14px', color: C_SUB, lineHeight: '1.7' }}>{principle}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Brand Name 후보 */}
      {brand.nameCandidates && brand.nameCandidates.length > 0 && (
        <section>
          <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>BRAND NAME CANDIDATES</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {brand.nameCandidates.map((name, index) => {
              const isSelected = name.trim() === brand.name.trim()
              return (
                <div key={name} className="p-5 rounded-xl" style={{
                  border: isSelected ? `1px solid ${C_BORDER}` : `1px solid ${C_BORDER_LIGHT}`,
                  background: isSelected ? 'rgba(40,43,50,0.03)' : '#fff',
                }}>
                  <div className="flex items-center gap-1.5" style={{ marginBottom: '8px' }}>
                    {isSelected && <Check size={11} strokeWidth={2.5} style={{ color: C_LABEL, flexShrink: 0 }} />}
                    <span style={{ fontFamily: F4, fontSize: '11px', color: C_LABEL, letterSpacing: '0.06em' }}>
                      {isSelected ? '선택됨' : `후보 ${index + 1}`}
                    </span>
                  </div>
                  <p style={{ fontFamily: F7, fontSize: '19px', color: C_MAIN }}>{name}</p>
                </div>
              )
            })}
          </div>
          {brand.nameReason && (
            <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED, marginTop: '16px', lineHeight: '1.65' }}>
              <span style={{ fontFamily: F5, color: C_MAIN }}>선택 이유: </span>
              {brand.nameReason}
            </p>
          )}
        </section>
      )}
    </div>
  )
}