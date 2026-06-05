'use client'

import { useState } from 'react'
import { Colors, Typography } from '@/lib/types'
import { buildDesignSystem } from '@/lib/component-tokens'

interface Props {
  colors: Colors
  typography: Typography
}

export default function ComponentKit({ colors, typography }: Props) {
  const { component, foundation } = buildDesignSystem(colors, typography)
  const { button, input, checkbox, radio, badge, tag, accordion, breadcrumb, card } = component
  const fonts = foundation.typography.fonts

  const [radioSelected, setRadioSelected] = useState('option1')
  const [accordionOpen, setAccordionOpen] = useState<string | null>('item1')
  const [inputValue, setInputValue] = useState('')

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">UI Components</p>
        <h2 className="text-2xl font-bold text-gray-950">UI 컴포넌트</h2>
      </div>

      {/* 버튼 */}
      <section className="mb-12">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Button</p>
        <div className="p-6 border border-gray-100 rounded-xl space-y-6">

          {/* Variants */}
          <div>
            <p className="text-xs text-gray-400 mb-3">Variants</p>
            <div className="flex flex-wrap gap-3">
              {(['primary', 'secondary', 'ghost', 'danger'] as const).map((variant) => {
                const s = button[variant].default
                return (
                  <button
                    key={variant}
                    className="text-sm font-medium transition-all"
                    style={{
                      height: `${button.sizes.md.height}px`,
                      padding: `0 ${button.sizes.md.paddingX}px`,
                      fontSize: `${button.sizes.md.fontSize}px`,
                      borderRadius: `${button.sizes.md.borderRadius}px`,
                      backgroundColor: s.bg,
                      color: s.text,
                      border: s.border === 'transparent' ? 'none' : `1px solid ${s.border}`,
                      fontFamily: fonts.body,
                    }}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <p className="text-xs text-gray-400 mb-3">Sizes</p>
            <div className="flex flex-wrap items-center gap-3">
              {(['sm', 'md', 'lg'] as const).map((size) => {
                const s = button.sizes[size]
                const d = button.primary.default
                return (
                  <button
                    key={size}
                    className="font-medium"
                    style={{
                      height: `${s.height}px`,
                      padding: `0 ${s.paddingX}px`,
                      fontSize: `${s.fontSize}px`,
                      borderRadius: `${s.borderRadius}px`,
                      backgroundColor: d.bg,
                      color: d.text,
                      border: 'none',
                      fontFamily: fonts.body,
                    }}
                  >
                    {size.toUpperCase()}
                  </button>
                )
              })}
            </div>
          </div>

          {/* States */}
          <div>
            <p className="text-xs text-gray-400 mb-3">States</p>
            <div className="flex flex-wrap gap-3">
              {([ 
                { label: 'Default',  token: button.primary.default },
                { label: 'Hover',    token: button.primary.hover },
                { label: 'Pressed',  token: button.primary.pressed },
                { label: 'Disabled', token: button.primary.disabled },
              ] as const).map(({ label, token }) => (
                <button
                  key={label}
                  className="text-sm font-medium"
                  style={{
                    height: `${button.sizes.md.height}px`,
                    padding: `0 ${button.sizes.md.paddingX}px`,
                    fontSize: `${button.sizes.md.fontSize}px`,
                    borderRadius: `${button.sizes.md.borderRadius}px`,
                    backgroundColor: (token as any).bg,
                    color: (token as any).text,
                    border: (token as any).border === 'transparent' ? 'none' : `1px solid ${(token as any).border}`,
                    fontFamily: fonts.body,
                    opacity: (token as any).opacity ?? 1,
                  }}
                >
                  {label}
                </button>
              ))}
              {/* Loading */}
              <button
                className="text-sm font-medium flex items-center gap-2"
                style={{
                  height: `${button.sizes.md.height}px`,
                  padding: `0 ${button.sizes.md.paddingX}px`,
                  fontSize: `${button.sizes.md.fontSize}px`,
                  borderRadius: `${button.sizes.md.borderRadius}px`,
                  backgroundColor: button.primary.loading.bg,
                  color: button.primary.loading.text,
                  border: 'none',
                  fontFamily: fonts.body,
                  opacity: button.primary.loading.opacity,
                }}
              >
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Loading
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Text Input */}
      <section className="mb-12">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Text Input</p>
        <div className="p-6 border border-gray-100 rounded-xl space-y-4">
          {([ 
            { label: 'Default',  token: input.default },
            { label: 'Focus',    token: input.focus },
            { label: 'Error',    token: input.error },
            { label: 'Success',  token: input.success },
            { label: 'Disabled', token: input.disabled },
          ] as const).map(({ label, token }) => (
            <div key={label}>
              <p className="text-xs text-gray-400 mb-1.5">{label}</p>
              <input
                type="text"
                placeholder={`${label} 상태`}
                disabled={label === 'Disabled'}
                className="w-full outline-none transition-all"
                style={{
                  height: `${input.sizes.md.height}px`,
                  padding: `0 ${input.sizes.md.paddingX}px`,
                  fontSize: `${input.sizes.md.fontSize}px`,
                  borderRadius: `${input.sizes.md.borderRadius}px`,
                  backgroundColor: (token as any).bg,
                  color: (token as any).text,
                  border: `1.5px solid ${(token as any).border}`,
                  boxShadow: (token as any).shadow ?? 'none',
                  fontFamily: fonts.body,
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Checkbox & Radio */}
      <section className="mb-12">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Checkbox & Radio</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Checkbox */}
          <div className="p-6 border border-gray-100 rounded-xl">
            <p className="text-xs text-gray-400 mb-4">Checkbox</p>
            <div className="space-y-3">
              {([
                { label: 'Checked',       token: checkbox.checked,   checked: true },
                { label: 'Unchecked',     token: checkbox.unchecked, checked: false },
                { label: 'Disabled',      token: checkbox.disabled,  checked: false },
              ] as const).map((item) => (
                <label key={item.label} className="flex items-center gap-3 cursor-pointer">
                  <div
                    className="w-4 h-4 rounded flex items-center justify-center border shrink-0"
                    style={{
                      backgroundColor: (item.token as any).bg,
                      borderColor: (item.token as any).border,
                    }}
                  >
                    {item.checked && (
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        style={{ color: (item.token as any).icon }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm" style={{ fontFamily: fonts.body, color: (item.token as any).icon === '#9CA3AF' ? '#9CA3AF' : '#374151' }}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Radio */}
          <div className="p-6 border border-gray-100 rounded-xl">
            <p className="text-xs text-gray-400 mb-4">Radio</p>
            <div className="space-y-3">
              {([
                { label: 'Option 1', value: 'option1', token: radio.selected },
                { label: 'Option 2', value: 'option2', token: radio.unselected },
                { label: 'Disabled', value: 'option3', token: radio.disabled },
              ] as const).map((item) => (
                <label key={item.value} className="flex items-center gap-3 cursor-pointer">
                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{ borderColor: radioSelected === item.value ? radio.selected.border : radio.unselected.border }}
                    onClick={() => item.value !== 'option3' && setRadioSelected(item.value)}
                  >
                    {radioSelected === item.value && (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: radio.selected.dot }} />
                    )}
                  </div>
                  <span className="text-sm" style={{ fontFamily: fonts.body }}>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Badge & Tag */}
      <section className="mb-12">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Badge & Tag</p>
        <div className="p-6 border border-gray-100 rounded-xl space-y-5">

          {/* Badge */}
          {/* Badge */}
<div>
  <p className="text-xs text-gray-400 mb-3">Badge</p>
  <div className="flex flex-wrap gap-2">
    {(['filled', 'outline', 'soft'] as const).map((variant) => {
      const t = badge.primary[variant]
      return (
        <span
          key={variant}
          className="inline-flex items-center justify-center font-medium"
          style={{
            fontSize: `${badge.sizes.md.fontSize}px`,
            padding: `${badge.sizes.md.paddingY}px ${badge.sizes.md.paddingX}px`,
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
          <div>
            <p className="text-xs text-gray-400 mb-3">Tag</p>
            <div className="flex flex-wrap gap-2">
              {(['디자인', '브랜딩', '마케팅', 'UI/UX'] as const).map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 font-medium"
                  style={{
                    fontSize: `${tag.sizes.md.fontSize}px`,
                    padding: `${tag.sizes.md.paddingY}px ${tag.sizes.md.paddingX}px`,
                    borderRadius: `${tag.sizes.md.borderRadius}px`,
                    backgroundColor: tag.default.bg,
                    color: tag.default.text,
                    border: `1px solid ${tag.default.border}`,
                    fontFamily: fonts.body,
                  }}
                >
                  {label}
                  <button className="hover:opacity-60 transition-opacity text-xs">✕</button>
                </span>
              ))}
              <span
                className="inline-flex items-center gap-1.5 font-medium"
                style={{
                  fontSize: `${tag.sizes.md.fontSize}px`,
                  padding: `${tag.sizes.md.paddingY}px ${tag.sizes.md.paddingX}px`,
                  borderRadius: `${tag.sizes.md.borderRadius}px`,
                  backgroundColor: tag.colored.bg,
                  color: tag.colored.text,
                  border: `1px solid ${tag.colored.border}`,
                  fontFamily: fonts.body,
                }}
              >
                컬러 태그
                <button className="hover:opacity-60 transition-opacity text-xs">✕</button>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion */}
      <section className="mb-12">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Accordion</p>
        <div className="border rounded-xl overflow-hidden" style={{ borderColor: accordion.default.header.border }}>
          {[
            { id: 'item1', title: '브랜드 아이덴티티란?', content: '브랜드 아이덴티티는 브랜드를 시각적으로 표현하는 요소들의 집합입니다. 로고, 컬러, 타이포그래피 등이 포함됩니다.' },
            { id: 'item2', title: '컬러 시스템의 중요성', content: '일관된 컬러 사용은 브랜드 인지도를 높이고 신뢰감을 형성합니다.' },
            { id: 'item3', title: '타이포그래피 가이드', content: '폰트 선택과 계층 구조는 브랜드의 성격을 전달하는 중요한 요소입니다.' },
          ].map((item, index) => (
            <div key={item.id} style={{ borderBottom: index !== 2 ? `1px solid ${accordion.default.header.border}` : 'none' }}>
              <button
                onClick={() => setAccordionOpen(accordionOpen === item.id ? null : item.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
                style={{
                  backgroundColor: accordionOpen === item.id
                    ? accordion.default.headerHover.bg
                    : accordion.default.header.bg,
                  fontFamily: fonts.body,
                }}
              >
                <span className="text-sm font-medium" style={{ color: accordion.default.header.text }}>
                  {item.title}
                </span>
                <span
                  className="transition-transform duration-200"
                  style={{
                    color: accordionOpen === item.id
                      ? accordion.default.iconOpen.color
                      : accordion.default.icon.color,
                    transform: accordionOpen === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  ↓
                </span>
              </button>
              {accordionOpen === item.id && (
                <div
                  className="px-5 pb-4"
                  style={{ backgroundColor: accordion.default.content.bg }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: accordion.default.content.text, fontFamily: fonts.body }}>
                    {item.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="mb-12">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Breadcrumb</p>
        <div className="p-6 border border-gray-100 rounded-xl">
          <nav className="flex items-center gap-2">
            {['홈', '브랜드 가이드', '컴포넌트'].map((item, index, arr) => (
              <div key={item} className="flex items-center gap-2">
                <span
                  className="text-sm transition-colors cursor-pointer"
                  style={{
                    color: index === arr.length - 1
                      ? breadcrumb.active.text
                      : breadcrumb.default.text,
                    fontWeight: index === arr.length - 1 ? breadcrumb.active.fontWeight : 400,
                    fontFamily: fonts.body,
                  }}
                >
                  {item}
                </span>
                {index < arr.length - 1 && (
                  <span className="text-sm" style={{ color: breadcrumb.separator.text }}>/</span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </section>

      {/* Card */}
      <section>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Card</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['default', 'bordered', 'elevated'] as const).map((variant) => {
            const t = card[variant]
            return (
              <div
                key={variant}
                style={{
                  backgroundColor: t.bg,
                  border: t.border === 'transparent' ? 'none' : `1px solid ${t.border}`,
                  boxShadow: t.shadow,
                  borderRadius: `${t.borderRadius}px`,
                  padding: `${card.padding.md}px`,
                }}
              >
                <p className="text-xs text-gray-400 mb-3 capitalize">{variant}</p>
                <div
                  className="w-full h-20 rounded-lg mb-3"
                  style={{ backgroundColor: button.primary.default.bg + '15' }}
                />
                <p className="text-sm font-medium mb-1" style={{ fontFamily: fonts.body, color: '#111' }}>
                  카드 타이틀
                </p>
                <p className="text-xs" style={{ fontFamily: fonts.body, color: '#9CA3AF' }}>
                  카드 설명 텍스트입니다.
                </p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}