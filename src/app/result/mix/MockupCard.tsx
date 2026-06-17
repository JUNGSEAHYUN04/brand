'use client'

import React, { useState } from 'react'
import { BrandIdentitySimple } from '@/lib/types'

interface Props {
  mixedBrand: BrandIdentitySimple
}

const C_BORDER = 'rgba(40,43,50,0.12)'
const C_MAIN = '#282B32'
const C_SUB = 'rgba(40,43,50,0.6)'
const C_MUTED = 'rgba(40,43,50,0.5)'

const getLuminance = (hex: string): number => {
  const rgb = parseInt(hex.slice(1), 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = rgb & 0xff
  return (r * 299 + g * 587 + b * 114) / 1000
}
const getTextColor = (hex: string): string =>
  getLuminance(hex) > 155 ? C_MAIN : '#ffffff'

export default function MockupCard({ mixedBrand }: Props) {
  const { brand, colors, typography } = mixedBrand
  const primary = colors.primary.hex
  const secondary = colors.secondary.hex
  const accent = colors.accent.hex
  const headingFont = typography.heading.name
  const bodyFont = typography.body.name
  const onPrimary = getTextColor(primary)

  const [activeTab, setActiveTab] = useState<'features' | 'pricing' | 'blog'>('features')
  const [selectedPlan, setSelectedPlan] = useState('Professional')

  return (
    <div className="bg-white rounded-xl p-8 border" style={{ borderColor: C_BORDER }}>
      <p
        style={{
          fontFamily: 'SCDream4, sans-serif',
          fontSize: '14px',
          color: 'rgba(40,43,50,0.7)',
          letterSpacing: '0.1em',
          marginBottom: '24px',
        }}
      >
        WEBSITE PREVIEW
      </p>

      {/* 브라우저 프레임 */}
      <div
        style={{
          border: `1px solid ${C_BORDER}`,
          borderRadius: '12px',
          overflow: 'hidden',
          background: '#fff',
        }}
      >
        {/* 브라우저 바 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 14px',
            borderBottom: `1px solid ${C_BORDER}`,
            background: 'rgba(40,43,50,0.02)',
          }}
        >
          {['rgba(40,43,50,0.18)', 'rgba(40,43,50,0.18)', 'rgba(40,43,50,0.18)'].map((c, i) => (
            <span key={i} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />
          ))}
          <span
            style={{
              marginLeft: '10px',
              flex: 1,
              fontFamily: 'sans-serif',
              fontSize: '10px',
              color: C_MUTED,
              background: '#fff',
              border: `1px solid ${C_BORDER}`,
              borderRadius: '6px',
              padding: '3px 10px',
            }}
          >
            www.{brand.name.toLowerCase().replace(/\s+/g, '')}.com
          </span>
        </div>

        {/* 사이트 헤더 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 24px',
            borderBottom: `1px solid ${C_BORDER}`,
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: primary }} />
            <span style={{ fontFamily: `"${headingFont}", sans-serif`, fontSize: '16px', fontWeight: 700, color: C_MAIN }}>
              {brand.name}
            </span>
          </span>
          <span style={{ display: 'flex', gap: '6px' }}>
            {(['features', 'pricing', 'blog'] as const).map((item) => {
              const active = activeTab === item
              return (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  style={{
                    fontFamily: `"${bodyFont}", sans-serif`,
                    fontSize: '12px',
                    fontWeight: active ? 600 : 500,
                    color: active ? C_MAIN : C_SUB,
                    background: active ? 'rgba(40,43,50,0.05)' : 'transparent',
                    border: active ? `1px solid rgba(40,43,50,0.2)` : '1px solid transparent',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transition: 'all 0.18s',
                  }}
                >
                  {item}
                </button>
              )
            })}
          </span>
          <button
            style={{
              fontFamily: `"${bodyFont}", sans-serif`,
              fontSize: '12px',
              fontWeight: 600,
              background: primary,
              color: onPrimary,
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Get Access
          </button>
        </div>

        {/* 히어로 */}
        <div style={{ padding: '56px 24px', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: `"${bodyFont}", sans-serif`,
              fontSize: '11px',
              color: primary,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              margin: '0 0 16px',
            }}
          >
            {brand.slogan.en}
          </p>
          <h1
            style={{
              fontFamily: `"${headingFont}", sans-serif`,
              fontSize: '44px',
              fontWeight: 700,
              color: C_MAIN,
              margin: '0 0 16px',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            {brand.name}
          </h1>
          <p
            style={{
              fontFamily: `"${bodyFont}", sans-serif`,
              fontSize: '15px',
              color: C_SUB,
              lineHeight: 1.7,
              maxWidth: '440px',
              margin: '0 auto 28px',
            }}
          >
            {brand.slogan.ko}
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              style={{
                fontFamily: `"${bodyFont}", sans-serif`,
                fontSize: '13px',
                fontWeight: 600,
                background: primary,
                color: onPrimary,
                padding: '12px 28px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              시작하기
            </button>
            <button
              style={{
                fontFamily: `"${bodyFont}", sans-serif`,
                fontSize: '13px',
                fontWeight: 500,
                background: 'transparent',
                color: C_MAIN,
                padding: '12px 24px',
                borderRadius: '10px',
                border: `1px solid ${C_BORDER}`,
                cursor: 'pointer',
              }}
            >
              더 보기
            </button>
          </div>
        </div>

        {/* 스탯 바 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: `1px solid ${C_BORDER}`,
            borderBottom: `1px solid ${C_BORDER}`,
          }}
        >
          {[
            { num: '500K+', label: '사용자' },
            { num: '99.9%', label: '가동률' },
            { num: '150+', label: '국가' },
            { num: '4.9', label: '평점' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                textAlign: 'center',
                padding: '24px 12px',
                borderLeft: i === 0 ? 'none' : `1px solid ${C_BORDER}`,
              }}
            >
              <p style={{ fontFamily: `"${headingFont}", sans-serif`, fontSize: '22px', fontWeight: 700, color: C_MAIN, margin: '0 0 4px' }}>
                {stat.num}
              </p>
              <p style={{ fontFamily: `"${bodyFont}", sans-serif`, fontSize: '11px', color: C_MUTED, margin: 0 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* FEATURES */}
        {activeTab === 'features' && (
          <div style={{ padding: '48px 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <p style={{ fontFamily: `"${bodyFont}", sans-serif`, fontSize: '11px', color: secondary, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 8px' }}>
                Core Features
              </p>
              <h2 style={{ fontFamily: `"${headingFont}", sans-serif`, fontSize: '28px', fontWeight: 700, color: C_MAIN, margin: 0 }}>
                강력한 도구
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              {[
                { title: '빠른 속도', desc: '성능에 최적화된 설계' },
                { title: '엔터프라이즈', desc: '보안이 기본 내장' },
                { title: '글로벌 네트워크', desc: '어디서나 배포 가능' },
              ].map((feat, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    borderRadius: '12px',
                    padding: '24px',
                    border: `1px solid ${C_BORDER}`,
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: i === 0 ? primary : i === 1 ? secondary : accent,
                      marginBottom: '16px',
                    }}
                  />
                  <h3 style={{ fontFamily: `"${headingFont}", sans-serif`, fontSize: '15px', fontWeight: 600, color: C_MAIN, margin: '0 0 6px' }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontFamily: `"${bodyFont}", sans-serif`, fontSize: '12px', color: C_SUB, margin: 0, lineHeight: 1.6 }}>
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRICING */}
        {activeTab === 'pricing' && (
          <div style={{ padding: '48px 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <p style={{ fontFamily: `"${bodyFont}", sans-serif`, fontSize: '11px', color: accent, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 8px' }}>
                Pricing
              </p>
              <h2 style={{ fontFamily: `"${headingFont}", sans-serif`, fontSize: '28px', fontWeight: 700, color: C_MAIN, margin: 0 }}>
                간단한 요금제
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              {[
                { name: 'Starter', price: '$49' },
                { name: 'Professional', price: '$149' },
                { name: 'Enterprise', price: 'Custom' },
              ].map((plan) => {
                const active = selectedPlan === plan.name
                return (
                  <div
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan.name)}
                    style={{
                      background: active ? 'rgba(40,43,50,0.04)' : '#fff',
                      border: active ? `1px solid rgba(40,43,50,0.25)` : `1px solid ${C_BORDER}`,
                      borderRadius: '12px',
                      padding: '28px 20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.18s',
                    }}
                  >
                    {active && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '-9px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: primary,
                          color: onPrimary,
                          padding: '3px 12px',
                          borderRadius: '999px',
                          fontFamily: `"${bodyFont}", sans-serif`,
                          fontSize: '10px',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        선택됨
                      </span>
                    )}
                    <h3 style={{ fontFamily: `"${headingFont}", sans-serif`, fontSize: '14px', fontWeight: 600, color: C_MAIN, margin: '0 0 12px' }}>
                      {plan.name}
                    </h3>
                    <p style={{ fontFamily: `"${headingFont}", sans-serif`, fontSize: '32px', fontWeight: 700, color: C_MAIN, margin: '0 0 20px' }}>
                      {plan.price}
                    </p>
                    <button
                      style={{
                        width: '100%',
                        fontFamily: `"${bodyFont}", sans-serif`,
                        fontSize: '12px',
                        fontWeight: 600,
                        background: active ? primary : 'transparent',
                        color: active ? onPrimary : C_MAIN,
                        padding: '10px 0',
                        borderRadius: '8px',
                        border: active ? 'none' : `1px solid ${C_BORDER}`,
                        cursor: 'pointer',
                      }}
                    >
                      선택하기
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* BLOG */}
        {activeTab === 'blog' && (
          <div style={{ padding: '48px 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <p style={{ fontFamily: `"${bodyFont}", sans-serif`, fontSize: '11px', color: accent, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 8px' }}>
                Blog
              </p>
              <h2 style={{ fontFamily: `"${headingFont}", sans-serif`, fontSize: '28px', fontWeight: 700, color: C_MAIN, margin: 0 }}>
                최신 아티클
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              {[
                { title: '시작하기 가이드', date: '1월 15일', c: primary },
                { title: '베스트 프랙티스', date: '1월 12일', c: secondary },
                { title: '케이스 스터디', date: '1월 10일', c: accent },
              ].map((article) => (
                <div
                  key={article.title}
                  style={{
                    borderRadius: '12px',
                    border: `1px solid ${C_BORDER}`,
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ height: '70px', background: article.c }} />
                  <div style={{ padding: '16px' }}>
                    <p style={{ fontFamily: `"${bodyFont}", sans-serif`, fontSize: '11px', color: C_MUTED, margin: '0 0 6px' }}>
                      {article.date}
                    </p>
                    <h3 style={{ fontFamily: `"${headingFont}", sans-serif`, fontSize: '14px', fontWeight: 600, color: C_MAIN, margin: 0 }}>
                      {article.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 뉴스레터 CTA */}
        <div style={{ background: primary, padding: '40px 24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: `"${headingFont}", sans-serif`, fontSize: '24px', fontWeight: 700, color: onPrimary, margin: '0 0 8px' }}>
            업데이트 받기
          </h2>
          <p style={{ fontFamily: `"${bodyFont}", sans-serif`, fontSize: '13px', color: onPrimary, opacity: 0.85, margin: '0 0 20px' }}>
            최신 소식을 메일로 받아보세요
          </p>
          <div style={{ maxWidth: '380px', margin: '0 auto', display: 'flex', gap: '8px' }}>
            <span
              style={{
                flex: 1,
                padding: '11px 14px',
                borderRadius: '8px',
                background: '#fff',
                fontFamily: `"${bodyFont}", sans-serif`,
                fontSize: '12px',
                color: C_MUTED,
                textAlign: 'left',
              }}
            >
              이메일을 입력하세요
            </span>
            <button
              style={{
                fontFamily: `"${bodyFont}", sans-serif`,
                fontSize: '12px',
                fontWeight: 600,
                background: C_MAIN,
                color: '#fff',
                padding: '11px 20px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              구독
            </button>
          </div>
        </div>

        {/* 푸터 */}
        <div style={{ background: C_MAIN, padding: '32px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '24px' }}>
            {[
              { title: 'Product', items: ['기능', '요금제', '보안'] },
              { title: 'Company', items: ['소개', '블로그', '문의'] },
              { title: 'Legal', items: ['개인정보', '약관', '쿠키'] },
              { title: 'Follow', items: ['Twitter', 'LinkedIn', 'GitHub'] },
            ].map((col) => (
              <div key={col.title}>
                <p style={{ fontFamily: `"${bodyFont}", sans-serif`, fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', margin: '0 0 12px' }}>
                  {col.title}
                </p>
                {col.items.map((item) => (
                  <p key={item} style={{ fontFamily: `"${bodyFont}", sans-serif`, fontSize: '12px', color: 'rgba(255,255,255,0.55)', margin: '8px 0', cursor: 'pointer' }}>
                    {item}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '20px', textAlign: 'center' }}>
            <p style={{ fontFamily: `"${bodyFont}", sans-serif`, fontSize: '11px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
              © 2024 {brand.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}