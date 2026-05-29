'use client'

import { useState } from 'react'
import { Components, Colors, Typography } from '@/lib/types'

interface Props {
  components: Components
  colors: Colors
  typography: Typography
}

export default function ComponentKit({ components, colors, typography }: Props) {
  const [checkboxStates, setCheckboxStates] = useState({
    checked: true,
    unchecked: false,
    indeterminate: false,
    disabled: false,
  })
  const [radioSelected, setRadioSelected] = useState('option1')
  const [accordionOpen, setAccordionOpen] = useState<string | null>('item1')
  const [inputValue, setInputValue] = useState('')

  const primary = colors.primary.hex
  const secondary = colors.secondary.hex
  const { fonts } = typography

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
              <button
                className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-opacity hover:opacity-90"
                style={{ backgroundColor: primary, fontFamily: fonts.body }}
              >
                Primary
              </button>
              <button
                className="px-4 py-2 text-sm font-medium rounded-lg border transition-opacity hover:opacity-80"
                style={{ color: primary, borderColor: primary, fontFamily: fonts.body }}
              >
                Secondary
              </button>
              <button
                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-50"
                style={{ color: primary, fontFamily: fonts.body }}
              >
                Ghost
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-opacity hover:opacity-90"
                style={{ backgroundColor: colors.semantic.error, fontFamily: fonts.body }}
              >
                Danger
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <p className="text-xs text-gray-400 mb-3">Sizes</p>
            <div className="flex flex-wrap items-center gap-3">
              {Object.entries(components.button.sizes).map(([size, spec]) => (
                <button
                  key={size}
                  className="font-medium text-white rounded-lg transition-opacity hover:opacity-90"
                  style={{
                    height: `${spec.height}px`,
                    padding: `0 ${spec.paddingX}px`,
                    fontSize: `${spec.fontSize}px`,
                    backgroundColor: primary,
                    fontFamily: fonts.body,
                  }}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* States */}
          <div>
            <p className="text-xs text-gray-400 mb-3">States</p>
            <div className="flex flex-wrap gap-3">
              <button
                className="px-4 py-2 text-sm font-medium text-white rounded-lg"
                style={{ backgroundColor: primary, fontFamily: fonts.body }}
              >
                Default
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white rounded-lg opacity-80"
                style={{ backgroundColor: primary, fontFamily: fonts.body }}
              >
                Hover
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white rounded-lg opacity-60"
                style={{ backgroundColor: primary, fontFamily: fonts.body }}
              >
                Active
              </button>
              <button
                disabled
                className="px-4 py-2 text-sm font-medium text-white rounded-lg opacity-30 cursor-not-allowed"
                style={{ backgroundColor: primary, fontFamily: fonts.body }}
              >
                Disabled
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white rounded-lg flex items-center gap-2"
                style={{ backgroundColor: primary, fontFamily: fonts.body }}
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
          {/* Default */}
          <div>
            <label className="text-xs text-gray-400 block mb-1.5">Default</label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="텍스트를 입력하세요"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none transition-colors"
              style={{ fontFamily: fonts.body }}
            />
          </div>

          {/* Focus */}
          <div>
            <label className="text-xs text-gray-400 block mb-1.5">Focus</label>
            <input
              type="text"
              placeholder="포커스 상태"
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
              style={{
                fontFamily: fonts.body,
                border: `2px solid ${primary}`,
              }}
            />
          </div>

          {/* Error */}
          <div>
            <label className="text-xs text-gray-400 block mb-1.5">Error</label>
            <input
              type="text"
              defaultValue="잘못된 입력값"
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
              style={{
                fontFamily: fonts.body,
                border: `1.5px solid ${colors.semantic.error}`,
              }}
            />
            <p className="text-xs mt-1" style={{ color: colors.semantic.error }}>
              올바른 값을 입력해주세요
            </p>
          </div>

          {/* Disabled */}
          <div>
            <label className="text-xs text-gray-400 block mb-1.5">Disabled</label>
            <input
              type="text"
              disabled
              defaultValue="비활성화 상태"
              className="w-full px-3 py-2.5 border border-gray-100 rounded-lg text-sm bg-gray-50 text-gray-300 cursor-not-allowed"
              style={{ fontFamily: fonts.body }}
            />
          </div>
        </div>
      </section>

      {/* Checkbox & Radio */}
      <section className="mb-12">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Checkbox & Radio</p>
        <div className="grid grid-cols-2 gap-4">
          {/* Checkbox */}
          <div className="p-6 border border-gray-100 rounded-xl">
            <p className="text-xs text-gray-400 mb-4">Checkbox</p>
            <div className="space-y-3">
              {[
                { label: 'Checked', key: 'checked', checked: true },
                { label: 'Unchecked', key: 'unchecked', checked: false },
                { label: 'Disabled', key: 'disabled', checked: false, disabled: true },
              ].map((item) => (
                <label key={item.label} className="flex items-center gap-3 cursor-pointer">
                  <div
                    className="w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0"
                    style={{
                      backgroundColor: item.checked ? primary : 'white',
                      borderColor: item.checked ? primary : '#E5E7EB',
                      opacity: item.disabled ? 0.4 : 1,
                    }}
                  >
                    {item.checked && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: fonts.body,
                      color: item.disabled ? '#D1D5DB' : '#374151',
                    }}
                  >
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
              {[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Disabled', value: 'option3', disabled: true },
              ].map((item) => (
                <label key={item.value} className="flex items-center gap-3 cursor-pointer">
                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                    style={{
                      borderColor: radioSelected === item.value ? primary : '#E5E7EB',
                      opacity: item.disabled ? 0.4 : 1,
                    }}
                    onClick={() => !item.disabled && setRadioSelected(item.value)}
                  >
                    {radioSelected === item.value && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: primary }}
                      />
                    )}
                  </div>
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: fonts.body,
                      color: item.disabled ? '#D1D5DB' : '#374151',
                    }}
                  >
                    {item.label}
                  </span>
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
          <div>
            <p className="text-xs text-gray-400 mb-3">Badge</p>
            <div className="flex flex-wrap gap-2">
              <span
                className="inline-flex items-center justify-center text-xs px-2.5 py-1 rounded-full font-medium text-white"
                style={{ backgroundColor: primary }}
              >
                Filled
              </span>
              <span
                className="inline-flex items-center justify-center text-xs px-2.5 py-1 rounded-full font-medium border"
                style={{ color: primary, borderColor: primary }}
              >
                Outline
              </span>
              <span
                className="inline-flex items-center justify-center text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ backgroundColor: `${primary}15`, color: primary }}
              >
                Soft
              </span>
              <span
                className="inline-flex items-center justify-center text-xs px-2 py-0.5 rounded-full font-medium text-white"
                style={{ backgroundColor: primary }}
              >
                SM
              </span>
              <span
                className="inline-flex items-center justify-center text-sm px-3 py-1 rounded-full font-medium text-white"
                style={{ backgroundColor: primary }}
              >
                MD
              </span>
            </div>
          </div>

          {/* Tag */}
          <div>
            <p className="text-xs text-gray-400 mb-3">Tag</p>
            <div className="flex flex-wrap gap-2">
              {['디자인', '브랜딩', '마케팅', 'UI/UX'].map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border"
                  style={{ borderColor: '#E5E7EB', color: '#374151', fontFamily: fonts.body }}
                >
                  {tag}
                  <button className="hover:opacity-60 transition-opacity" style={{ color: primary }}>✕</button>
                </span>
              ))}
              <span
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                style={{ backgroundColor: `${primary}15`, color: primary, fontFamily: fonts.body }}
              >
                컬러 태그
                <button className="hover:opacity-60 transition-opacity">✕</button>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion */}
      <section className="mb-12">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Accordion</p>
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          {[
            { id: 'item1', title: '브랜드 아이덴티티란?', content: '브랜드 아이덴티티는 브랜드를 시각적으로 표현하는 요소들의 집합입니다. 로고, 컬러, 타이포그래피 등이 포함됩니다.' },
            { id: 'item2', title: '컬러 시스템의 중요성', content: '일관된 컬러 사용은 브랜드 인지도를 높이고 신뢰감을 형성합니다. Primary, Secondary, Accent 컬러를 정의하여 사용합니다.' },
            { id: 'item3', title: '타이포그래피 가이드', content: '폰트 선택과 계층 구조는 브랜드의 성격을 전달하는 중요한 요소입니다. Heading과 Body 폰트를 구분하여 사용하세요.' },
          ].map((item, index) => (
            <div
              key={item.id}
              className={index !== 2 ? 'border-b border-gray-100' : ''}
            >
              <button
                onClick={() => setAccordionOpen(accordionOpen === item.id ? null : item.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span
                  className="text-sm font-medium text-gray-800"
                  style={{ fontFamily: fonts.body }}
                >
                  {item.title}
                </span>
                <span
                  className="text-gray-400 transition-transform duration-200"
                  style={{ transform: accordionOpen === item.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  ↓
                </span>
              </button>
              {accordionOpen === item.id && (
                <div className="px-5 pb-4">
                  <p
                    className="text-sm text-gray-500 leading-relaxed"
                    style={{ fontFamily: fonts.body }}
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
      <section className="mb-12">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Breadcrumb</p>
        <div className="p-6 border border-gray-100 rounded-xl">
          <nav className="flex items-center gap-2">
            {['홈', '브랜드 가이드', '컴포넌트'].map((item, index, arr) => (
              <div key={item} className="flex items-center gap-2">
                <span
                  className={`text-sm transition-colors ${
                    index === arr.length - 1
                      ? 'font-medium'
                      : 'hover:opacity-80 cursor-pointer'
                  }`}
                  style={{
                    color: index === arr.length - 1 ? primary : '#9CA3AF',
                    fontFamily: fonts.body,
                  }}
                >
                  {item}
                </span>
                {index < arr.length - 1 && (
                  <span className="text-gray-300 text-sm">/</span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </section>

      {/* Card */}
      <section>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Card</p>
        <div className="grid grid-cols-3 gap-4">
          {/* Default */}
          <div className="p-5 bg-white border border-gray-100 rounded-xl">
            <p className="text-xs text-gray-400 mb-3">Default</p>
            <div
              className="w-full h-24 rounded-lg mb-3"
              style={{ backgroundColor: `${primary}10` }}
            />
            <p className="text-sm font-medium text-gray-900 mb-1" style={{ fontFamily: fonts.body }}>
              카드 타이틀
            </p>
            <p className="text-xs text-gray-400" style={{ fontFamily: fonts.body }}>
              카드 설명 텍스트입니다.
            </p>
          </div>

          {/* Bordered */}
          <div className="p-5 bg-white rounded-xl" style={{ border: `1.5px solid ${primary}30` }}>
            <p className="text-xs text-gray-400 mb-3">Bordered</p>
            <div
              className="w-full h-24 rounded-lg mb-3"
              style={{ backgroundColor: `${primary}10` }}
            />
            <p className="text-sm font-medium text-gray-900 mb-1" style={{ fontFamily: fonts.body }}>
              카드 타이틀
            </p>
            <p className="text-xs text-gray-400" style={{ fontFamily: fonts.body }}>
              카드 설명 텍스트입니다.
            </p>
          </div>

          {/* Elevated */}
          <div
            className="p-5 bg-white rounded-xl"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
          >
            <p className="text-xs text-gray-400 mb-3">Elevated</p>
            <div
              className="w-full h-24 rounded-lg mb-3"
              style={{ backgroundColor: `${primary}10` }}
            />
            <p className="text-sm font-medium text-gray-900 mb-1" style={{ fontFamily: fonts.body }}>
              카드 타이틀
            </p>
            <p className="text-xs text-gray-400" style={{ fontFamily: fonts.body }}>
              카드 설명 텍스트입니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}