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

  return (
    <div>
      <div className="mb-10">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">UI Components</p>
        <h2 className="text-3xl font-bold text-gray-950">UI 컴포넌트</h2>
      </div>

      {/* 버튼 */}
      <section className="mb-14">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Button</p>
        <div className="p-8 border border-gray-200 rounded-xl space-y-8">

          {/* Variants */}
          <div>
            <p className="text-sm text-gray-600 font-medium mb-4">Variants</p>
            <div className="flex flex-wrap gap-4">
              {(['primary', 'secondary', 'ghost', 'danger'] as const).map((variant) => {
                const s = button[variant].default as any
                return (
                  <button
                    key={variant}
                    className="text-base font-medium transition-all"
                    style={{
                      height: `${button.sizes.lg.height}px`,
                      padding: `0 ${button.sizes.lg.paddingX}px`,
                      fontSize: `${button.sizes.lg.fontSize}px`,
                      borderRadius: `${button.sizes.lg.borderRadius}px`,
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
            <p className="text-sm text-gray-600 font-medium mb-4">Sizes</p>
            <div className="flex flex-wrap items-center gap-4">
              {(['sm', 'md', 'lg'] as const).map((size) => {
                const s = button.sizes[size]
                const d = button.primary.default as any
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
            <p className="text-sm text-gray-600 font-medium mb-4">States</p>
            <div className="flex flex-wrap gap-4">
              {[
                { label: 'Default',  token: button.primary.default as any },
                { label: 'Hover',    token: button.primary.hover as any },
                { label: 'Pressed',  token: button.primary.pressed as any },
                { label: 'Disabled', token: button.primary.disabled as any },
              ].map(({ label, token }) => (
                <button
                  key={label}
                  className="text-base font-medium"
                  style={{
                    height: `${button.sizes.md.height}px`,
                    padding: `0 ${button.sizes.md.paddingX}px`,
                    fontSize: `${button.sizes.md.fontSize}px`,
                    borderRadius: `${button.sizes.md.borderRadius}px`,
                    backgroundColor: token.bg,
                    color: token.text,
                    border: token.border === 'transparent' ? 'none' : `1px solid ${token.border}`,
                    fontFamily: fonts.body,
                    opacity: token.opacity ?? 1,
                  }}
                >
                  {label}
                </button>
              ))}
              <button
                className="text-base font-medium flex items-center gap-2"
                style={{
                  height: `${button.sizes.md.height}px`,
                  padding: `0 ${button.sizes.md.paddingX}px`,
                  fontSize: `${button.sizes.md.fontSize}px`,
                  borderRadius: `${button.sizes.md.borderRadius}px`,
                  backgroundColor: (button.primary.loading as any).bg,
                  color: (button.primary.loading as any).text,
                  border: 'none',
                  fontFamily: fonts.body,
                  opacity: (button.primary.loading as any).opacity,
                }}
              >
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Loading
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Text Input */}
      <section className="mb-14">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Text Input</p>
        <div className="p-8 border border-gray-200 rounded-xl space-y-5">
          {[
            { label: 'Default',  token: input.default as any,  placeholder: '텍스트를 입력하세요' },
            { label: 'Focus',    token: input.focus as any,    placeholder: '포커스 상태' },
            { label: 'Error',    token: input.error as any,    placeholder: '오류 상태' },
            { label: 'Success',  token: input.success as any,  placeholder: '성공 상태' },
            { label: 'Disabled', token: input.disabled as any, placeholder: '비활성화 상태' },
          ].map(({ label, token, placeholder }) => (
            <div key={label}>
              <p className="text-sm text-gray-600 font-medium mb-2">{label}</p>
              <input
                type="text"
                placeholder={placeholder}
                disabled={label === 'Disabled'}
                className="w-full outline-none transition-all"
                style={{
                  height: `${input.sizes.lg.height}px`,
                  padding: `0 ${input.sizes.lg.paddingX}px`,
                  fontSize: `${input.sizes.lg.fontSize}px`,
                  borderRadius: `${input.sizes.lg.borderRadius}px`,
                  backgroundColor: token.bg,
                  color: token.text,
                  border: `1.5px solid ${token.border}`,
                  boxShadow: token.shadow ?? 'none',
                  fontFamily: fonts.body,
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Checkbox & Radio */}
      <section className="mb-14">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Checkbox & Radio</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Checkbox */}
          <div className="p-8 border border-gray-200 rounded-xl">
            <p className="text-sm text-gray-600 font-medium mb-5">Checkbox</p>
            <div className="space-y-4">
              {[
                { label: 'Checked',   token: checkbox.checked as any,   checked: true },
                { label: 'Unchecked', token: checkbox.unchecked as any, checked: false },
                { label: 'Disabled',  token: checkbox.disabled as any,  checked: false },
              ].map((item) => (
                <label key={item.label} className="flex items-center gap-4 cursor-pointer">
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center border shrink-0"
                    style={{
                      backgroundColor: item.token.bg,
                      borderColor: item.token.border,
                    }}
                  >
                    {item.checked && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        style={{ color: item.token.icon }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-base text-gray-800" style={{ fontFamily: fonts.body }}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Radio */}
          <div className="p-8 border border-gray-200 rounded-xl">
            <p className="text-sm text-gray-600 font-medium mb-5">Radio</p>
            <div className="space-y-4">
              {[
                { label: 'Option 1', value: 'option1', disabled: false },
                { label: 'Option 2', value: 'option2', disabled: false },
                { label: 'Disabled', value: 'option3', disabled: true },
              ].map((item) => (
                <label key={item.value} className="flex items-center gap-4 cursor-pointer">
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{
                      borderColor: radioSelected === item.value
                        ? (radio.selected as any).border
                        : (radio.unselected as any).border,
                    }}
                    onClick={() => !item.disabled && setRadioSelected(item.value)}
                  >
                    {radioSelected === item.value && (
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: (radio.selected as any).dot }} />
                    )}
                  </div>
                  <span className="text-base text-gray-800" style={{ fontFamily: fonts.body }}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Badge & Tag */}
      <section className="mb-14">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Badge & Tag</p>
        <div className="p-8 border border-gray-200 rounded-xl space-y-6">

          {/* Badge */}
          <div>
            <p className="text-sm text-gray-600 font-medium mb-4">Badge</p>
            <div className="flex flex-wrap gap-3">
              {(['filled', 'outline', 'soft'] as const).map((variant) => {
                const t = badge.primary[variant] as any
                return (
                  <span
                    key={variant}
                    className="inline-flex items-center justify-center font-medium"
                    style={{
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
          <div>
            <p className="text-sm text-gray-600 font-medium mb-4">Tag</p>
            <div className="flex flex-wrap gap-3">
              {['디자인', '브랜딩', '마케팅', 'UI/UX'].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 font-medium"
                  style={{
                    fontSize: `${tag.sizes.md.fontSize + 2}px`,
                    padding: `${tag.sizes.md.paddingY + 2}px ${tag.sizes.md.paddingX + 4}px`,
                    borderRadius: `${tag.sizes.md.borderRadius}px`,
                    backgroundColor: (tag.default as any).bg,
                    color: (tag.default as any).text,
                    border: `1px solid ${(tag.default as any).border}`,
                    fontFamily: fonts.body,
                  }}
                >
                  {label}
                  <button className="hover:opacity-60 transition-opacity">✕</button>
                </span>
              ))}
              <span
                className="inline-flex items-center gap-2 font-medium"
                style={{
                  fontSize: `${tag.sizes.md.fontSize + 2}px`,
                  padding: `${tag.sizes.md.paddingY + 2}px ${tag.sizes.md.paddingX + 4}px`,
                  borderRadius: `${tag.sizes.md.borderRadius}px`,
                  backgroundColor: (tag.colored as any).bg,
                  color: (tag.colored as any).text,
                  border: `1px solid ${(tag.colored as any).border}`,
                  fontFamily: fonts.body,
                }}
              >
                컬러 태그
                <button className="hover:opacity-60 transition-opacity">✕</button>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion */}
      <section className="mb-14">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Accordion</p>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
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
                className="w-full flex items-center justify-between px-8 py-5 text-left transition-colors"
                style={{
                  backgroundColor: accordionOpen === item.id
                    ? (accordion.default.headerHover as any).bg
                    : (accordion.default.header as any).bg,
                  fontFamily: fonts.body,
                }}
              >
                <span
                  className="text-base font-medium"
                  style={{ color: (accordion.default.header as any).text }}
                >
                  {item.title}
                </span>
                <svg
                  className="w-5 h-5 transition-transform duration-200"
                  style={{
                    color: accordionOpen === item.id
                      ? (accordion.default.iconOpen as any).color
                      : (accordion.default.icon as any).color,
                    transform: accordionOpen === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {accordionOpen === item.id && (
                <div
                  className="px-8 pb-5"
                  style={{ backgroundColor: (accordion.default.content as any).bg }}
                >
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: (accordion.default.content as any).text, fontFamily: fonts.body }}
                  >
                    {item.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="mb-14">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Breadcrumb</p>
        <div className="p-8 border border-gray-200 rounded-xl">
          <nav className="flex items-center gap-3">
            {['홈', '브랜드 가이드', '컴포넌트'].map((item, index, arr) => (
              <div key={item} className="flex items-center gap-3">
                <span
                  className="text-base transition-colors cursor-pointer"
                  style={{
                    color: index === arr.length - 1
                      ? (breadcrumb.active as any).text
                      : (breadcrumb.default as any).text,
                    fontWeight: index === arr.length - 1 ? (breadcrumb.active as any).fontWeight : 400,
                    fontFamily: fonts.body,
                  }}
                >
                  {item}
                </span>
                {index < arr.length - 1 && (
                  <svg
                    className="w-4 h-4"
                    style={{ color: (breadcrumb.separator as any).text }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
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
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Card</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                <p className="text-sm text-gray-600 mb-4 capitalize">{variant}</p>
                <div
                  className="w-full h-24 rounded-lg mb-4"
                  style={{ backgroundColor: (button.primary.default as any).bg + '15' }}
                />
                <p className="text-base font-medium mb-2 text-gray-900" style={{ fontFamily: fonts.body }}>
                  카드 타이틀
                </p>
                <p className="text-sm text-gray-600" style={{ fontFamily: fonts.body }}>
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