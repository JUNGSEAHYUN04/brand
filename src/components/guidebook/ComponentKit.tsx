'use client'

import { useState, ReactNode } from 'react'
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
const C_LABEL = 'rgba(40,43,50,0.45)'
const C_BORDER = 'rgba(40,43,50,0.2)'
const C_BORDER_LIGHT = 'rgba(40,43,50,0.1)'

const C_OK = '#16A34A'
const C_NO = '#DC2626'

const LABEL_LS = '0.08em'

// 섹션 제목 + 한 줄 설명
function SectionHead({ label, desc }: { label: string; desc?: string }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <p style={{ fontFamily: F4, fontSize: '12px', color: C_LABEL, letterSpacing: LABEL_LS, marginBottom: desc ? '6px' : 0 }}>{label}</p>
      {desc && <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED, lineHeight: '1.6' }}>{desc}</p>}
    </div>
  )
}

// Do / Don't 블록
function DoDont({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', paddingTop: '24px', marginTop: '24px', borderTop: `1px solid ${C_BORDER_LIGHT}` }}>
      <div>
        <p style={{ fontFamily: F5, fontSize: '11px', color: C_OK, letterSpacing: '0.05em', marginBottom: '8px' }}>DO</p>
        {dos.map((d, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
            <span style={{ color: C_OK, fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>✓</span>
            <span style={{ fontFamily: F4, fontSize: '13px', color: C_SUB, lineHeight: '1.55' }}>{d}</span>
          </div>
        ))}
      </div>
      <div>
        <p style={{ fontFamily: F5, fontSize: '11px', color: C_NO, letterSpacing: '0.05em', marginBottom: '8px' }}>DON&apos;T</p>
        {donts.map((d, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
            <span style={{ color: C_NO, fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>✕</span>
            <span style={{ fontFamily: F4, fontSize: '13px', color: C_SUB, lineHeight: '1.55' }}>{d}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// variant별 용도 줄
function UsageRow({ items }: { items: { name: string; use: string }[] }) {
  return (
    <div style={{ paddingTop: '24px', marginTop: '24px', borderTop: `1px solid ${C_BORDER_LIGHT}`, display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((it) => (
        <div key={it.name} style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
          <span style={{ fontFamily: F6, fontSize: '13px', color: C_MAIN, width: '92px', flexShrink: 0 }}>{it.name}</span>
          <span style={{ fontFamily: F4, fontSize: '13px', color: C_SUB, lineHeight: '1.55' }}>{it.use}</span>
        </div>
      ))}
    </div>
  )
}

export default function ComponentKit({ colors, typography }: Props) {
  const { component, foundation } = buildDesignSystem(colors, typography)
  const {
    button, input, checkbox, radio, badge, tag, accordion, breadcrumb, card,
    tabs, dropdown, modal, emptyState,
  } = component
  const fonts = foundation.typography.fonts

  const [radioSelected, setRadioSelected] = useState('option1')
  const [accordionOpen, setAccordionOpen] = useState<string | null>('item1')
  const [activeTab, setActiveTab] = useState('tab1')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '13px', color: C_LABEL, letterSpacing: '0.1em', marginBottom: '5px' }}>UI COMPONENTS</p>
        <h2 style={{ fontFamily: F7, fontSize: '32px', color: C_MAIN }}>UI 컴포넌트</h2>
      </div>

      {/* 버튼 */}
      <section style={{ marginBottom: '56px' }}>
        <SectionHead label="BUTTON" desc="사용자의 행동을 유도하는 가장 기본 요소입니다. 화면당 주요 액션(primary)은 하나로 제한해 시선을 모읍니다." />
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

          <UsageRow items={[
            { name: 'Primary', use: '저장·제출·다음처럼 화면에서 가장 중요한 단 하나의 액션' },
            { name: 'Secondary', use: '취소·뒤로처럼 primary를 보조하는 액션' },
            { name: 'Ghost', use: '더보기·필터처럼 약한 보조 액션, 시선을 덜 끄는 곳' },
            { name: 'Danger', use: '삭제·탈퇴처럼 되돌리기 어려운 파괴적 액션' },
          ]} />

          <DoDont
            dos={['한 화면에 primary는 하나만', '버튼 레이블은 동사로 명확하게 (저장, 삭제)', '로딩 중엔 비활성화로 중복 클릭 방지']}
            donts={['primary를 여러 개 나열', '“확인”처럼 모호한 레이블 남용', 'danger를 일반 액션에 사용']}
          />
        </div>
      </section>

      {/* Text Input */}
      <section style={{ marginBottom: '56px' }}>
        <SectionHead label="TEXT INPUT" desc="사용자 입력을 받는 필드입니다. 상태(focus·error·success)로 현재 상황을 분명히 알려 줍니다." />
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

          <UsageRow items={[
            { name: 'Focus', use: '현재 입력 중인 필드. 테두리 강조로 위치를 알림' },
            { name: 'Error', use: '검증 실패. 아래에 무엇이 잘못됐는지 메시지를 함께' },
            { name: 'Success', use: '검증 통과를 즉시 확인시켜야 할 때만 절제해서' },
            { name: 'Disabled', use: '지금 입력할 수 없는 필드. 이유가 있으면 안내 병행' },
          ]} />

          <DoDont
            dos={['라벨은 항상 표시 (placeholder로 대체 금지)', '오류는 필드 바로 아래 구체적으로', '입력 형식 예시를 placeholder로']}
            donts={['placeholder를 라벨처럼 사용', '오류를 색상으로만 표시 (텍스트 병행)', '성공 상태를 모든 필드에 남발']}
          />
        </div>
      </section>

      {/* Checkbox & Radio */}
      <section style={{ marginBottom: '56px' }}>
        <SectionHead label="CHECKBOX & RADIO" desc="체크박스는 여러 개를 동시에 고를 때, 라디오는 하나만 골라야 할 때 씁니다." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>

          {/* Checkbox */}
          <div style={{ padding: '32px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>
            <p style={{ fontFamily: F5, fontSize: '13px', color: C_MUTED, marginBottom: '20px' }}>Checkbox · 다중 선택</p>
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
            <p style={{ fontFamily: F5, fontSize: '13px', color: C_MUTED, marginBottom: '20px' }}>Radio · 단일 선택</p>
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
        <SectionHead label="BADGE & TAG" desc="배지는 상태·수치를 알리는 표식이고, 태그는 분류·필터에 쓰며 보통 제거(✕)할 수 있습니다." />
        <div style={{ padding: '32px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Badge */}
          <div>
            <p style={{ fontFamily: F5, fontSize: '13px', color: C_MUTED, marginBottom: '14px' }}>Badge · 상태 표시</p>
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
            <p style={{ fontFamily: F5, fontSize: '13px', color: C_MUTED, marginBottom: '14px' }}>Tag · 분류 / 필터</p>
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

          <DoDont
            dos={['배지는 상태·개수 표시에 (예: 신규, 3)', '태그는 제거 가능하게 ✕ 제공', '의미가 명확한 짧은 단어 사용']}
            donts={['배지를 클릭 버튼처럼 사용', '한 곳에 태그를 과도하게 나열', '배지·태그에 긴 문장 넣기']}
          />
        </div>
      </section>

      {/* Accordion */}
      <section style={{ marginBottom: '56px' }}>
        <SectionHead label="ACCORDION" desc="공간을 아끼며 정보를 접고 펴는 요소. FAQ나 보조 정보처럼 한 번에 다 보일 필요 없는 내용에 적합합니다." />
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
        <SectionHead label="BREADCRUMB" desc="현재 위치와 상위 경로를 보여 줘 깊은 구조에서 길을 잃지 않게 합니다." />
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
      <section style={{ marginBottom: '56px' }}>
        <SectionHead label="CARD" desc="관련 정보를 한 덩어리로 묶는 컨테이너. 그림자·테두리 강도로 화면에서의 중요도를 조절합니다." />
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
        <div style={{ marginTop: '20px', padding: '24px 28px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>
          <UsageRow items={[
            { name: 'Default', use: '배경과 자연스럽게 어울리는 기본 묶음' },
            { name: 'Bordered', use: '테두리로 영역을 또렷이 구분해야 할 때' },
            { name: 'Elevated', use: '그림자로 떠 보이게 — 강조·인터랙티브 카드' },
          ]} />
        </div>
      </section>

      {/* Tabs */}
      <section style={{ marginBottom: '56px' }}>
        <SectionHead label="TABS" desc="같은 맥락의 콘텐츠를 한 자리에서 전환합니다. 탭은 3~5개로 제한하고 레이블은 짧게." />
        <div style={{ padding: '32px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>
          <div style={{ display: 'flex', gap: '4px', borderBottom: `1px solid ${(tabs.list as any).border}` }}>
            {[
              { id: 'tab1', label: '개요' },
              { id: 'tab2', label: '디자인' },
              { id: 'tab3', label: '개발' },
            ].map((t) => {
              const isActive = activeTab === t.id
              const tk = (isActive ? tabs.tab.active : tabs.tab.default) as any
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{
                    height: `${tabs.sizes.md.height}px`,
                    padding: `0 ${tabs.sizes.md.paddingX}px`,
                    fontSize: `${tabs.sizes.md.fontSize}px`,
                    fontFamily: isActive ? F6 : F4,
                    color: tk.text,
                    background: tk.bg,
                    border: 'none',
                    borderBottom: `2px solid ${isActive ? (tabs.indicator as any).color : 'transparent'}`,
                    marginBottom: '-1px',
                    cursor: 'pointer',
                  }}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
          <div style={{ paddingTop: '24px' }}>
            <p style={{ fontFamily: F4, fontSize: '14px', color: (tabs.panel as any).text, lineHeight: '1.75' }}>
              {activeTab === 'tab1' && '개요 탭의 내용입니다. 선택된 탭에 따라 패널이 전환됩니다.'}
              {activeTab === 'tab2' && '디자인 탭의 내용입니다. 컬러, 타이포, 컴포넌트 가이드가 들어갑니다.'}
              {activeTab === 'tab3' && '개발 탭의 내용입니다. 토큰과 구현 가이드가 들어갑니다.'}
            </p>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section style={{ marginBottom: '56px' }}>
        <SectionHead label="DROPDOWN" desc="공간을 아끼며 여러 액션·옵션을 숨겨 둡니다. 자주 쓰는 핵심 기능은 밖에 두는 게 좋습니다." />
        <div style={{ padding: '32px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                height: '40px', padding: '0 16px',
                display: 'flex', alignItems: 'center', gap: '8px',
                background: (dropdown.trigger as any).bg,
                color: (dropdown.trigger as any).text,
                border: `1px solid ${(dropdown.trigger as any).border}`,
                borderRadius: `${(dropdown.trigger as any).borderRadius}px`,
                fontFamily: F4, fontSize: '14px', cursor: 'pointer',
              }}
            >
              메뉴 선택
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 6px)', left: 0, minWidth: '180px',
                background: (dropdown.menu as any).bg,
                border: `1px solid ${(dropdown.menu as any).border}`,
                boxShadow: (dropdown.menu as any).shadow,
                borderRadius: `${(dropdown.menu as any).borderRadius}px`,
                zIndex: (dropdown.menu as any).zIndex,
                overflow: 'hidden', padding: '6px',
              }}>
                {['프로필 편집', '설정', '도움말'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setDropdownOpen(false)}
                    onMouseEnter={(e) => { e.currentTarget.style.background = (dropdown.item.hover as any).bg }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                    style={{
                      width: '100%', textAlign: 'left',
                      padding: `${(dropdown.sizes.item as any).paddingY}px ${(dropdown.sizes.item as any).paddingX}px`,
                      fontSize: `${(dropdown.sizes.item as any).fontSize}px`,
                      color: (dropdown.item.default as any).text,
                      background: 'transparent', border: 'none', borderRadius: '6px',
                      fontFamily: F4, cursor: 'pointer',
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      <section style={{ marginBottom: '56px' }}>
        <SectionHead label="MODAL" desc="흐름을 멈추고 집중시켜야 할 때만 씁니다. 확인·삭제 같은 중요한 결정이나 짧은 입력에 적합합니다." />
        <div style={{ padding: '32px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              height: '40px', padding: '0 16px',
              background: (button.primary.default as any).bg,
              color: (button.primary.default as any).text,
              border: 'none', borderRadius: `${button.sizes.md.borderRadius}px`,
              fontFamily: F5, fontSize: '14px', cursor: 'pointer',
            }}
          >
            모달 열기
          </button>
          {modalOpen && (
            <div
              onClick={() => setModalOpen(false)}
              style={{
                position: 'fixed', inset: 0,
                background: (modal.overlay as any).bg,
                zIndex: (modal.overlay as any).zIndex,
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100%', maxWidth: `${modal.widths.md}px`,
                  background: (modal.container as any).bg,
                  boxShadow: (modal.container as any).shadow,
                  borderRadius: `${(modal.container as any).borderRadius}px`,
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `${modal.padding}px ${modal.padding}px 16px`, borderBottom: `1px solid ${(modal.header as any).border}` }}>
                  <p style={{ fontFamily: F6, fontSize: '17px', color: (modal.header as any).text }}>모달 제목</p>
                  <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: (modal.closeIcon as any).color }}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <div style={{ padding: `20px ${modal.padding}px` }}>
                  <p style={{ fontFamily: F4, fontSize: '14px', color: (modal.body as any).text, lineHeight: '1.75' }}>
                    모달 본문 내용입니다. 오버레이를 클릭하거나 닫기 버튼을 누르면 닫힙니다.
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', padding: `16px ${modal.padding}px ${modal.padding}px`, borderTop: `1px solid ${(modal.footer as any).border}` }}>
                  <button onClick={() => setModalOpen(false)} style={{ height: '40px', padding: '0 16px', background: (button.secondary.default as any).bg, color: (button.secondary.default as any).text, border: `1px solid ${(button.secondary.default as any).border}`, borderRadius: `${button.sizes.md.borderRadius}px`, fontFamily: F5, fontSize: '14px', cursor: 'pointer' }}>취소</button>
                  <button onClick={() => setModalOpen(false)} style={{ height: '40px', padding: '0 16px', background: (button.primary.default as any).bg, color: (button.primary.default as any).text, border: 'none', borderRadius: `${button.sizes.md.borderRadius}px`, fontFamily: F5, fontSize: '14px', cursor: 'pointer' }}>확인</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Empty State */}
      <section>
        <SectionHead label="EMPTY STATE" desc="데이터가 없을 때 막막함을 줄이고 다음 행동을 안내합니다. 항상 액션 버튼을 함께 두세요." />
        <div style={{ border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: `${emptyState.padding}px` }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: (emptyState.icon as any).bg, marginBottom: '20px',
            }}>
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: (emptyState.icon as any).color }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p style={{ fontFamily: F6, fontSize: '16px', color: (emptyState.title as any).text, marginBottom: '8px' }}>아직 항목이 없습니다</p>
            <p style={{ fontFamily: F4, fontSize: '14px', color: (emptyState.description as any).text, lineHeight: '1.6', marginBottom: '20px', maxWidth: '320px' }}>
              첫 번째 항목을 추가하면 여기에 표시됩니다.
            </p>
            <button style={{
              height: '40px', padding: '0 20px',
              background: (button.primary.default as any).bg,
              color: (button.primary.default as any).text,
              border: 'none', borderRadius: `${button.sizes.md.borderRadius}px`,
              fontFamily: F5, fontSize: '14px', cursor: 'pointer',
            }}>항목 추가</button>
          </div>
        </div>
      </section>
    </div>
  )
}