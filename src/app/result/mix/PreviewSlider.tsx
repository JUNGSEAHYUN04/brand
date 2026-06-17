'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { BrandIdentitySimple } from '@/lib/types'
import HeroPreview from './HeroPreview'
import ColorPalette from './ColorPalette'
import ColorUsageCard from './ColorUsageCard'
import UIComponentsCard from './UIComponentsCard'
import TypographyCard from './TypographyCard'
import MockupCard from './MockupCard'
import BusinessCardMockup from './BusinessCardMockup'
import PhoneMockup from './PhoneMockup'
import SocialMockup from './SocialMockup'
  import SocialShareMockup from './SocialShareMockup'
// sections 배열에

interface Props {
  mixedBrand: BrandIdentitySimple
}

const C_MAIN = '#282B32'
const C_MUTED = 'rgba(40,43,50,0.5)'
const C_BORDER = 'rgba(40,43,50,0.12)'
const F4 = 'SCDream4, sans-serif'
const F5 = 'SCDream5, sans-serif'

export default function PreviewSlider({ mixedBrand }: Props) {
  const sections = [
    { id: 'hero', label: 'Hero', render: () => <HeroPreview mixedBrand={mixedBrand} /> },
     { id: 'type', label: 'Type', render: () => <TypographyCard mixedBrand={mixedBrand} /> },
    { id: 'usage', label: 'Usage', render: () => <ColorUsageCard mixedBrand={mixedBrand} /> },
    { id: 'components', label: 'Components', render: () => <UIComponentsCard mixedBrand={mixedBrand} /> },
    { id: 'mockup', label: 'Mockup', render: () => <MockupCard mixedBrand={mixedBrand} /> },
    { id: 'card', label: 'Card', render: () => <BusinessCardMockup mixedBrand={mixedBrand} /> },
    { id: 'app', label: 'App', render: () => <PhoneMockup mixedBrand={mixedBrand} /> },
    { id: 'social', label: 'Social', render: () => <SocialMockup mixedBrand={mixedBrand} /> },
{ id: 'share', label: 'Share', render: () => <SocialShareMockup mixedBrand={mixedBrand} /> },
  ]

  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [activeId, setActiveId] = useState(sections[0].id)
  // 탭 클릭으로 스크롤 중일 때 스크롤 핸들러가 active를 덮어쓰지 않도록 잠금
  const lockRef = useRef(false)

  // 탭 클릭 → 해당 섹션으로 스크롤
  const scrollTo = useCallback((id: string) => {
    const el = sectionRefs.current[id]
    const container = scrollRef.current
    if (!el || !container) return
    lockRef.current = true
    setActiveId(id)
    container.scrollTo({ top: el.offsetTop - 8, behavior: 'smooth' })
    window.setTimeout(() => { lockRef.current = false }, 600)
  }, [])

  // 스크롤에 따라 현재 섹션 활성화
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const onScroll = () => {
      if (lockRef.current) return
      const top = container.scrollTop
      let current = sections[0].id
      for (const s of sections) {
        const el = sectionRefs.current[s.id]
        if (el && el.offsetTop - 80 <= top) current = s.id
      }
      setActiveId(current)
    }
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* 상단 sticky 점프 탭 */}
      <style>{`
        .ps-tab:hover { color: ${C_MAIN} !important; background: rgba(40,43,50,0.04) !important; }
        .ps-tab-active:hover { background: rgba(40,43,50,0.05) !important; }
        .ps-tabs::-webkit-scrollbar { display: none; }
      `}</style>
      <div
        className="flex-shrink-0 ps-tabs"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'safe center',
          gap: '4px',
          overflowX: 'auto',
          padding: '8px',
          marginBottom: '20px',
          background: '#fff',
          borderRadius: '12px',
          border: `1px solid ${C_BORDER}`,
          scrollbarWidth: 'none',
        }}
      >
        {sections.map((s) => {
          const active = activeId === s.id
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={active ? 'ps-tab ps-tab-active' : 'ps-tab'}
              style={{
                flexShrink: 0,
                fontFamily: active ? F5 : F4,
                fontSize: '12px',
                letterSpacing: '0.01em',
                padding: '7px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                background: active ? 'rgba(40,43,50,0.05)' : 'transparent',
                color: active ? C_MAIN : C_MUTED,
                border: active ? '1px solid rgba(40,43,50,0.2)' : '1px solid transparent',
                transition: 'all 0.18s',
                whiteSpace: 'nowrap',
              }}
            >
              {s.label}
            </button>
          )
        })}
      </div>

      {/* 세로 스크롤 영역 — 카드 전부 쌓기 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {sections.map((s) => (
            <div
              key={s.id}
              ref={(el) => { sectionRefs.current[s.id] = el }}
            >
              {s.render()}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}