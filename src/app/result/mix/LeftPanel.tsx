'use client'

import React, { useState, useEffect } from 'react'
import { useBrandStore } from '@/store/brand-store'
import { BrandIdentitySimple } from '@/lib/types'
import ConfirmButton from './ConfirmButton'

interface Props {
  mixedBrand: BrandIdentitySimple
  onConfirm: () => Promise<void>
}

const C_MAIN = '#282B32'
const C_SUB = 'rgba(40,43,50,0.8)'
const C_MUTED = 'rgba(40,43,50,0.55)'
const C_LABEL = 'rgba(40,43,50,0.4)'
const C_BORDER = 'rgba(40,43,50,0.08)'
const C_BORDER_MID = 'rgba(40,43,50,0.16)'
const C_SEL_BG = 'rgba(40,43,50,0.04)'
const C_HOVER = 'rgba(40,43,50,0.025)'

const F4 = 'SCDream4, sans-serif'
const F5 = 'SCDream5, sans-serif'

// 섹션 헤더 라벨 (uppercase) — COLOR PALETTE 느낌
const sectionLabelStyle: React.CSSProperties = {
  fontFamily: F4,
  fontSize: '14px',
  color: 'rgba(40,43,50,0.7)',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
}
// 행 내부 세부 라벨 (PRIMARY, HEADING ...)
const subLabelStyle: React.CSSProperties = {
  fontFamily: F4,
  fontSize: '10px',
  color: 'rgba(40,43,50,0.55)',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
}

type SelKey =
  | 'brandNameIndex' | 'sloganIndex' | 'personalityIndex' | 'toneIndex'
  | 'primaryColorIndex' | 'secondaryColorIndex' | 'accentColorIndex'
  | 'headingFontIndex' | 'bodyFontIndex' | 'monoFontIndex'

export default function LeftPanel({ mixedBrand, onConfirm }: Props) {
  const { candidates, selected, setSelected } = useBrandStore()

  // 피그마 좌측 패널처럼 기본적으로 모든 섹션이 펼쳐진 상태
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const allFonts = candidates.flatMap((c) => [
      c.typography.heading.name,
      c.typography.body.name,
      c.typography.mono.name,
    ])
    const uniqueFamilies = Array.from(new Set(allFonts.filter(Boolean)))
      .map((f) => f.trim().replace(/\s+/g, '+'))
    if (uniqueFamilies.length === 0) return

    const href =
      'https://fonts.googleapis.com/css2?family=' +
      uniqueFamilies.join('&family=') +
      '&display=swap'
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [candidates])

  const updateSelected = (key: SelKey, index: number) => {
    setSelected({ ...selected, [key]: index } as typeof selected)
  }
  const getIdx = (key: SelKey) => (selected as any)[key] as number
  const toggle = (label: string) =>
    setCollapsed((p) => ({ ...p, [label]: !p[label] }))

  const Swatch = ({ hex, size = 16 }: { hex: string; size?: number }) => (
    <div style={{ width: size, height: size, background: hex, borderRadius: '4px', flexShrink: 0, border: `1px solid ${C_BORDER_MID}` }} />
  )

  /* ---------- 컴팩트한 행(row) 단위 선택지 ---------- */

  // 텍스트형 행: 좌측 미리보기 + 우측 체크 (브랜드명/슬로건/톤)
  const TextRow = ({
    sKey, index, isSel, primary, secondary, meta,
  }: {
    sKey: SelKey; index: number; isSel: boolean
    primary: React.ReactNode; secondary?: React.ReactNode; meta?: React.ReactNode
  }) => (
    <button
      onClick={() => updateSelected(sKey, index)}
      className="brow"
      style={{
        display: 'flex', alignItems: 'flex-start', gap: '12px',
        width: '100%', textAlign: 'left', padding: '12px 12px',
        background: isSel ? C_SEL_BG : 'transparent',
        border: 'none', borderRadius: '8px', cursor: 'pointer',
      }}
    >
      <span style={{
        flexShrink: 0, marginTop: '2px', width: '15px', height: '15px',
        borderRadius: '50%', border: isSel ? 'none' : `1.5px solid ${C_BORDER_MID}`,
        background: isSel ? C_MAIN : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {isSel && (
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontFamily: F5, fontSize: '13px', color: C_MAIN, lineHeight: 1.4 }}>{primary}</span>
        {secondary && <span style={{ display: 'block', fontFamily: F4, fontSize: '11px', color: C_MUTED, marginTop: '2px' }}>{secondary}</span>}
        {meta && <span style={{ display: 'block', fontFamily: F4, fontSize: '11px', color: C_MUTED, marginTop: '6px', lineHeight: 1.55 }}>{meta}</span>}
      </span>
    </button>
  )

  // 성격: 태그 칩 행
  const TagRow = ({ sKey, index, isSel, items }: { sKey: SelKey; index: number; isSel: boolean; items: string[] }) => (
    <button
      onClick={() => updateSelected(sKey, index)}
      className="brow"
      style={{
        display: 'flex', alignItems: 'flex-start', gap: '12px',
        width: '100%', textAlign: 'left', padding: '12px 12px',
        background: isSel ? C_SEL_BG : 'transparent',
        border: 'none', borderRadius: '8px', cursor: 'pointer',
      }}
    >
      <span style={{
        flexShrink: 0, marginTop: '2px', width: '15px', height: '15px',
        borderRadius: '50%', border: isSel ? 'none' : `1.5px solid ${C_BORDER_MID}`,
        background: isSel ? C_MAIN : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {isSel && (
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      <span className="flex flex-wrap gap-1.5" style={{ flex: 1 }}>
        {items.map((item) => (
          <span key={item} style={{ fontFamily: F4, fontSize: '11px', color: C_SUB, background: 'rgba(40,43,50,0.05)', padding: '4px 11px', borderRadius: '999px' }}>{item}</span>
        ))}
      </span>
    </button>
  )

  // 색상 한 줄: 세부 라벨 + 후보 3개 스와치 가로
  const ColorRow = ({ label, sKey, pick }: { label: string; sKey: SelKey; pick: (c: any) => any }) => {
    const selIdx = getIdx(sKey)
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 12px' }}>
        <span style={{ ...subLabelStyle, width: '70px', flexShrink: 0 }}>{label}</span>
        <div className="flex gap-2" style={{ flex: 1 }}>
          {candidates.map((c, i) => {
            const col = pick(c)
            const isSel = selIdx === i
            return (
              <button
                key={`${sKey}-${i}`}
                onClick={() => updateSelected(sKey, i)}
                title={`${col.name} ${col.hex}`}
                style={{
                  flex: 1, cursor: 'pointer', padding: '3px',
                  borderRadius: '8px', background: 'transparent',
                  border: isSel ? `1.5px solid ${C_MAIN}` : `1px solid ${C_BORDER}`,
                  lineHeight: 0,
                }}
              >
                <div style={{ width: '100%', height: '32px', background: col.hex, borderRadius: '4px' }} />
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // 폰트 한 행: 라벨 + 후보 인라인
  const FontRow = ({ label, sKey, pick }: { label: string; sKey: SelKey; pick: (c: any) => any }) => {
    const selIdx = getIdx(sKey)
    return (
      <div style={{ padding: '10px 12px' }}>
        <p style={{ ...subLabelStyle, marginBottom: '10px' }}>{label}</p>
        <div className="flex flex-col gap-1.5">
          {candidates.map((c, i) => {
            const f = pick(c)
            const isSel = selIdx === i
            return (
              <button
                key={`${sKey}-${i}`}
                onClick={() => updateSelected(sKey, i)}
                className="brow"
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  width: '100%', textAlign: 'left', padding: '10px 12px',
                  background: isSel ? C_SEL_BG : 'transparent',
                  border: isSel ? `1px solid ${C_BORDER_MID}` : `1px solid transparent`,
                  borderRadius: '8px', cursor: 'pointer',
                }}
              >
                <span style={{
                  flexShrink: 0, width: '15px', height: '15px',
                  borderRadius: '50%', border: isSel ? 'none' : `1.5px solid ${C_BORDER_MID}`,
                  background: isSel ? C_MAIN : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {isSel && (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontFamily: `"${f.name}", sans-serif`, fontSize: '15px', color: C_MAIN, fontWeight: 600 }}>{f.name}</span>
                  {f.reason && <span style={{ display: 'block', fontFamily: F4, fontSize: '11px', color: C_MUTED, marginTop: '3px', lineHeight: 1.5 }}>{f.reason}</span>}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  /* ---------- 섹션 정의 ---------- */
  const sections: { label: string; body: () => React.ReactNode }[] = [
    {
      label: 'Brand name',
      body: () => candidates.map((c, i) => (
        <TextRow key={i} sKey="brandNameIndex" index={i} isSel={getIdx('brandNameIndex') === i}
          primary={c.brand.name} meta={c.brand.nameReason} />
      )),
    },
    {
      label: 'Slogan',
      body: () => candidates.map((c, i) => (
        <TextRow key={i} sKey="sloganIndex" index={i} isSel={getIdx('sloganIndex') === i}
          primary={c.brand.slogan.ko} secondary={c.brand.slogan.en} meta={c.brand.sloganReason} />
      )),
    },
    {
      label: 'Personality',
      body: () => candidates.map((c, i) => (
        <TagRow key={i} sKey="personalityIndex" index={i} isSel={getIdx('personalityIndex') === i} items={c.brand.personality} />
      )),
    },
    {
      label: 'Tone & manner',
      body: () => candidates.map((c, i) => (
        <TextRow key={i} sKey="toneIndex" index={i} isSel={getIdx('toneIndex') === i} primary={c.brand.tone} />
      )),
    },
    {
      label: 'Colors',
      body: () => (
        <div className="flex flex-col gap-1">
          <ColorRow label="Primary" sKey="primaryColorIndex" pick={(c) => c.colors.primary} />
          <ColorRow label="Secondary" sKey="secondaryColorIndex" pick={(c) => c.colors.secondary} />
          <ColorRow label="Accent" sKey="accentColorIndex" pick={(c) => c.colors.accent} />
        </div>
      ),
    },
    {
      label: 'Typography',
      body: () => (
        <div className="flex flex-col">
          <FontRow label="Heading" sKey="headingFontIndex" pick={(c) => c.typography.heading} />
          <FontRow label="Body" sKey="bodyFontIndex" pick={(c) => c.typography.body} />
          <FontRow label="Mono" sKey="monoFontIndex" pick={(c) => c.typography.mono} />
        </div>
      ),
    },
  ]

  return (
    <div className="lg:fixed lg:top-[88px] lg:left-8 lg:w-[320px] mb-8 lg:mb-0">
      <style>{`.brow:hover{background:${C_HOVER} !important;}`}</style>

      <div
        className="flex flex-col max-h-[calc(100vh-110px)]"
        style={{ background: '#fff', border: `1px solid ${C_BORDER_MID}`, borderRadius: '12px', overflow: 'hidden' }}
      >
        {/* 패널 헤더 — 브랜드 스냅샷 (고정) */}
        <div className="flex-shrink-0" style={{ padding: '24px', borderBottom: `1px solid ${C_BORDER}` }}>
          <p style={{ ...sectionLabelStyle, marginBottom: '14px' }}>Brand snapshot</p>
          <h3 style={{ fontFamily: `"${mixedBrand.typography.heading.name}", sans-serif`, fontSize: '26px', fontWeight: 600, color: C_MAIN, marginBottom: '6px', lineHeight: 1.15 }}>
            {mixedBrand.brand.name}
          </h3>
          {mixedBrand.brand.slogan && (
            <p style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED, marginBottom: '16px' }}>{mixedBrand.brand.slogan.ko}</p>
          )}
          <div className="flex gap-2 items-center" style={{ marginBottom: '16px' }}>
            <Swatch hex={mixedBrand.colors.primary.hex} size={26} />
            <Swatch hex={mixedBrand.colors.secondary.hex} size={26} />
            <Swatch hex={mixedBrand.colors.accent.hex} size={26} />
          </div>
          <p style={{ fontFamily: F4, fontSize: '11px', color: C_LABEL }}>
            {mixedBrand.typography.heading.name} / {mixedBrand.typography.body.name}
          </p>
        </div>

        {/* 확정 버튼 (고정) */}
        <div className="flex-shrink-0" style={{ padding: '18px 24px', borderBottom: `1px solid ${C_BORDER}` }}>
          <ConfirmButton onConfirm={onConfirm} />
        </div>

        {/* 섹션 목록 (이 영역만 스크롤) */}
        <div className="flex-1 overflow-y-auto" style={{ scrollbarGutter: 'stable' }}>
        {sections.map((sec) => {
          const isCollapsed = collapsed[sec.label]
          return (
            <div key={sec.label} style={{ borderBottom: `1px solid ${C_BORDER}` }}>
              <button
                onClick={() => toggle(sec.label)}
                className="brow"
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  width: '100%', textAlign: 'left', padding: '16px 24px',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(40,43,50,0.5)" strokeWidth={2.5}
                  style={{ flexShrink: 0, transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
                <span style={sectionLabelStyle}>{sec.label}</span>
              </button>
              {!isCollapsed && (
                <div style={{ padding: '4px 14px 16px' }}>
                  {sec.body()}
                </div>
              )}
            </div>
          )
        })}
        </div>
      </div>
    </div>
  )
}