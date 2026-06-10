'use client'

import { useState } from 'react'
import { Colors, Typography } from '@/lib/types'
import { buildDesignSystem } from '@/lib/component-tokens'

interface Props {
  colors: Colors
  typography: Typography
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

export default function ComponentKit({ colors, typography }: Props) {
  const { component, foundation } = buildDesignSystem(colors, typography)
  const { button, input, checkbox, radio, badge, tag, accordion, breadcrumb, card } = component
  const fonts = foundation.typography.fonts

  const [radioSelected, setRadioSelected] = useState('option1')
  const [accordionOpen, setAccordionOpen] = useState<string | null>('item1')

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.1em', marginBottom: '5px' }}>UI COMPONENTS</p>
        <h2 style={{ fontFamily: F7, fontSize: '32px', color: C_MAIN }}>UI 컴포넌트</h2>
      </div>

      {/* 버튼 */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>BUTTON</p>
        <div style={{ padding: '32px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Variants */}
          <div>
            <p style={{ fontFamily: F5, fontSize: '13px', color: C_MUTED, marginBottom: '16px' }}>Variants</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {(['primary', 'secondary', 'ghost', 'danger'] as const).map((variant) => {
                const s = button[variant].default as any
                return (
                  <button
                    key={variant}
                    style={{
                      height: `${button.sizes.lg.height}px`,
                      padding: `0 ${button.sizes.lg.paddingX}px`,
                      fontSize: `${button.sizes.lg.fontSize}px`,
                      borderRadius: `${button.sizes.lg.borderRadius}px`,
                      backgroundColor: s.bg,
                      color: s.text,
                      border: s.border === 'transparent' ? 'none' : `1px solid ${s.border}`,
                      fontFamily: F5,
                      cursor: 'pointer',
                    }}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sizes */}
          <div style={{ paddingTop: '24px', borderTop: `1px solid ${C_BORDER_LIGHT}` }}>
            <p style={{ fontFamily: F5, fontSize: '13px', color: C_MUTED, marginBottom: '16px' }}>Sizes</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
              {(['sm', 'md', 'lg'] as const).map((size) => {
                const s = button.sizes[size]
                const d = button.primary.default as any
                return (
                  <button
                    key={size}
                    style={{
                      height: `${s.height}px`,
                      padding: `0 ${s.paddingX}px`,
                      fontSize: `${s.fontSize}px`,
                      borderRadius: `${s.borderRadius}px`,
                      backgroundColor: d.bg,
                      color: d.text,
                      border: 'none',
                      fontFamily: F5,
                      cursor: 'pointer',
                    }}
                  >
                    {size.toUpperCase()}
                  </button>
                )
              })}
            </div>
          </div>

          {/* States */}
          <div style={{ paddingTop: '24px', borderTop: `1px solid ${C_BORDER_LIGHT}` }}>
            <p style={{ fontFamily: F5, fontSize: '13px', color: C_MUTED, marginBottom: '16px' }}>States</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {[
                { label: 'Default',  token: button.primary.default as any },
                { label: 'Hover',    token: button.primary.hover as any },
                { label: 'Pressed',  token: button.primary.pressed as any },
                { label: 'Disabled', token: button.primary.disabled as any },
              ].map(({ label, token }) => (
                <button
                  key={label}
                  style={{
                    height: `${button.sizes.md.height}px`,
                    padding: `0 ${button.sizes.md.paddingX}px`,
                    fontSize: `${button.sizes.md.fontSize}px`,
                    borderRadius: `${button.sizes.md.borderRadius}px`,
                    backgroundColor: token.bg,
                    color: token.text,
                    border: token.border === 'transparent' ? 'none' : `1px solid ${token.border}`,
                    fontFamily: F5,
                    opacity: token.opacity ?? 1,
                    cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              ))}
              <button
                style={{
                  height: `${button.sizes.md.height}px`,
                  padding: `0 ${button.sizes.md.paddingX}px`,
                  fontSize: `${button.sizes.md.fontSize}px`,
                  borderRadius: `${button.sizes.md.borderRadius}px`,
                  backgroundColor: (button.primary.loading as any).bg,
                  color: (button.primary.loading as any).text,
                  border: 'none',
                  fontFamily: F5,
                  opacity: (button.primary.loading as any).opacity,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
              >
                <span style={{
                  width: '16px', height: '16px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 0.75s linear infinite',
                  display: 'inline-block',
                }} />
                Loading
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Text Input */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>TEXT INPUT</p>
        <div style={{ padding: '32px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { label: 'Default',  token: input.default as any,  placeholder: '텍스트를 입력하세요' },
            { label: 'Focus',    token: input.focus as any,    placeholder: '포커스 상태' },
            { label: 'Error',    token: input.error as any,    placeholder: '오류 상태' },
            { label: 'Success',  token: input.success as any,  placeholder: '성공 상태' },
            { label: 'Disabled', token: input.disabled as any, placeholder: '비활성화 상태' },
          ].map(({ label, token, placeholder }) => (
            <div key={label}>
              <p style={{ fontFamily: F5, fontSize: '13px', color: C_MUTED, marginBottom: '8px' }}>{label}</p>
              <input
                type="text"
                placeholder={placeholder}
                disabled={label === 'Disabled'}
                style={{
                  width: '100%',
                  height: `${input.sizes.lg.height}px`,
                  padding: `0 ${input.sizes.lg.paddingX}px`,
                  fontSize: `${input.sizes.lg.fontSize}px`,
                  borderRadius: `${input.sizes.lg.borderRadius}px`,
                  backgroundColor: token.bg,
                  color: token.text,
                  border: `1.5px solid ${token.border}`,
                  boxShadow: token.shadow ?? 'none',
                  fontFamily: F4,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Checkbox & Radio */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>CHECKBOX & RADIO</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>

          {/* Checkbox */}
          <div style={{ padding: '32px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>
            <p style={{ fontFamily: F5, fontSize: '13px', color: C_MUTED, marginBottom: '20px' }}>Checkbox</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Checked',   token: checkbox.checked as any,   checked: true },
                { label: 'Unchecked', token: checkbox.unchecked as any, checked: false },
                { label: 'Disabled',  token: checkbox.disabled as any,  checked: false },
              ].map((item) => (
                <label key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '5px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: item.token.bg,
                    border: `1px solid ${item.token.border}`,
                    flexShrink: 0,
                  }}>
                    {item.checked && (
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: item.token.icon }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span style={{ fontFamily: F4, fontSize: '14px', color: C_SUB }}>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Radio */}
          <div style={{ padding: '32px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>
            <p style={{ fontFamily: F5, fontSize: '13px', color: C_MUTED, marginBottom: '20px' }}>Radio</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Option 1', value: 'option1', disabled: false },
                { label: 'Option 2', value: 'option2', disabled: false },
                { label: 'Disabled', value: 'option3', disabled: true },
              ].map((item) => (
                <label key={item.value} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <div
                    style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      border: `2px solid ${radioSelected === item.value ? (radio.selected as any).border : (radio.unselected as any).border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}
                    onClick={() => !item.disabled && setRadioSelected(item.value)}
                  >
                    {radioSelected === item.value && (
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: (radio.selected as any).dot }} />
                    )}
                  </div>
                  <span style={{ fontFamily: F4, fontSize: '14px', color: C_SUB }}>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Badge & Tag */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>BADGE & TAG</p>
        <div style={{ padding: '32px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Badge */}
          <div>
            <p style={{ fontFamily: F5, fontSize: '13px', color: C_MUTED, marginBottom: '14px' }}>Badge</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {(['filled', 'outline', 'soft'] as const).map((variant) => {
                const t = badge.primary[variant] as any
                return (
                  <span
                    key={variant}
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: F5,
                      fontSize: `${badge.sizes.md.fontSize + 2}px`,
                      padding: `${badge.sizes.md.paddingY + 2}px ${badge.sizes.md.paddingX + 4}px`,
                      borderRadius: `${badge.sizes.md.borderRadius}px`,
                      backgroundColor: t.bg,
                      color: t.text,
                      border: t.border === 'transparent' ? 'none' : `1px solid ${t.border}`,
                    }}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Tag */}
          <div style={{ paddingTop: '20px', borderTop: `1px solid ${C_BORDER_LIGHT}` }}>
            <p style={{ fontFamily: F5, fontSize: '13px', color: C_MUTED, marginBottom: '14px' }}>Tag</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['디자인', '브랜딩', '마케팅', 'UI/UX'].map((label) => (
                <span
                  key={label}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    fontFamily: F4,
                    fontSize: `${tag.sizes.md.fontSize}px`,
                    padding: `${tag.sizes.md.paddingY + 2}px ${tag.sizes.md.paddingX + 4}px`,
                    borderRadius: `${tag.sizes.md.borderRadius}px`,
                    backgroundColor: (tag.default as any).bg,
                    color: (tag.default as any).text,
                    border: `1px solid ${(tag.default as any).border}`,
                  }}
                >
                  {label}
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', opacity: 0.5, padding: 0 }}>✕</button>
                </span>
              ))}
              <span
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontFamily: F4,
                  fontSize: `${tag.sizes.md.fontSize}px`,
                  padding: `${tag.sizes.md.paddingY + 2}px ${tag.sizes.md.paddingX + 4}px`,
                  borderRadius: `${tag.sizes.md.borderRadius}px`,
                  backgroundColor: (tag.colored as any).bg,
                  color: (tag.colored as any).text,
                  border: `1px solid ${(tag.colored as any).border}`,
                }}
              >
                컬러 태그
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', opacity: 0.5, padding: 0 }}>✕</button>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>ACCORDION</p>
        <div style={{ border: `1px solid ${C_BORDER}`, borderRadius: '16px', overflow: 'hidden' }}>
          {[
            { id: 'item1', title: '브랜드 아이덴티티란?', content: '브랜드 아이덴티티는 브랜드를 시각적으로 표현하는 요소들의 집합입니다. 로고, 컬러, 타이포그래피 등이 포함됩니다.' },
            { id: 'item2', title: '컬러 시스템의 중요성', content: '일관된 컬러 사용은 브랜드 인지도를 높이고 신뢰감을 형성합니다.' },
            { id: 'item3', title: '타이포그래피 가이드', content: '폰트 선택과 계층 구조는 브랜드의 성격을 전달하는 중요한 요소입니다.' },
          ].map((item, index) => (
            <div
              key={item.id}
              style={{ borderBottom: index !== 2 ? `1px solid ${(accordion.default.header as any).border}` : 'none' }}
            >
              <button
                onClick={() => setAccordionOpen(accordionOpen === item.id ? null : item.id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '20px 32px', textAlign: 'left',
                  background: accordionOpen === item.id ? (accordion.default.headerHover as any).bg : (accordion.default.header as any).bg,
                  border: 'none', cursor: 'pointer',
                  fontFamily: F5,
                }}
              >
                <span style={{ fontFamily: F5, fontSize: '15px', color: C_MAIN }}>
                  {item.title}
                </span>
                <svg
                  width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  style={{
                    color: accordionOpen === item.id ? (accordion.default.iconOpen as any).color : (accordion.default.icon as any).color,
                    transform: accordionOpen === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {accordionOpen === item.id && (
                <div style={{ padding: '16px 32px 20px', backgroundColor: (accordion.default.content as any).bg }}>
                  <p style={{ fontFamily: F4, fontSize: '14px', color: C_SUB, lineHeight: '1.75' }}>
                    {item.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Breadcrumb */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>BREADCRUMB</p>
        <div style={{ padding: '32px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {['홈', '브랜드 가이드', '컴포넌트'].map((item, index, arr) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    fontFamily: index === arr.length - 1 ? F5 : F4,
                    fontSize: '14px',
                    color: index === arr.length - 1 ? (breadcrumb.active as any).text : (breadcrumb.default as any).text,
                    cursor: 'pointer',
                  }}
                >
                  {item}
                </span>
                {index < arr.length - 1 && (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    style={{ color: (breadcrumb.separator as any).text }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </nav>
        </div>
      </section>

      {/* Card */}
      <section>
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>CARD</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {(['default', 'bordered', 'elevated'] as const).map((variant) => {
            const t = card[variant] as any
            return (
              <div
                key={variant}
                style={{
                  backgroundColor: t.bg,
                  border: t.border === 'transparent' ? 'none' : `1px solid ${t.border}`,
                  boxShadow: t.shadow,
                  borderRadius: `${t.borderRadius}px`,
                  padding: `${card.padding.lg}px`,
                }}
              >
                <p style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED, marginBottom: '16px' }}>{variant}</p>
                <div style={{
                  width: '100%', height: '96px', borderRadius: '10px', marginBottom: '16px',
                  backgroundColor: `${(button.primary.default as any).bg}15`,
                }} />
                <p style={{ fontFamily: F6, fontSize: '15px', color: C_MAIN, marginBottom: '6px' }}>카드 타이틀</p>
                <p style={{ fontFamily: F4, fontSize: '13px', color: C_SUB }}>카드 설명 텍스트입니다.</p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}