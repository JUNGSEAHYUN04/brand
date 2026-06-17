'use client'

import { useEffect } from 'react'
import { Typography as TypographyType, Colors } from '@/lib/types'

interface Props {
  typography: TypographyType
  colors: Colors
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

export default function Typography({ typography, colors }: Props) {
  const { fonts, scale } = typography
  const fontReasons = (typography as any).fontReasons as
    | { heading?: string; body?: string; mono?: string }
    | undefined

  useEffect(() => {
    const fontNames = [fonts.heading, fonts.body, fonts.mono]
      .filter(Boolean)
      .map((f) => f.replace(/ /g, '+'))
      .join('&family=')

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${fontNames}&display=swap`
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [fonts])

  const scaleEntries = [
    { label: 'Display', key: 'display', data: scale.display, sample: 'Brand Identity' },
    { label: 'H1', key: 'h1', data: scale.h1, sample: 'Heading One' },
    { label: 'H2', key: 'h2', data: scale.h2, sample: 'Heading Two' },
    { label: 'H3', key: 'h3', data: scale.h3, sample: 'Heading Three' },
    { label: 'H4', key: 'h4', data: scale.h4, sample: 'Heading Four' },
    { label: 'Body L', key: 'bodyL', data: scale.bodyL, sample: '브랜드의 이야기를 담은 본문 텍스트입니다.' },
    { label: 'Body M', key: 'bodyM', data: scale.bodyM, sample: '브랜드의 이야기를 담은 본문 텍스트입니다.' },
    { label: 'Body S', key: 'bodyS', data: scale.bodyS, sample: '브랜드의 이야기를 담은 본문 텍스트입니다.' },
    { label: 'Caption', key: 'caption', data: scale.caption, sample: '캡션 텍스트 / 보조 설명' },
    { label: 'Label', key: 'label', data: scale.label, sample: 'LABEL TEXT' },
  ]

  // 폰트별 역할 + 선택 이유 + 사용 가이드
  const fontRoles = [
    {
      role: 'Heading',
      font: fonts.heading,
      reason: fontReasons?.heading,
      use: '제목, 헤드라인, 강조 문구',
      dos: ['페이지 제목·섹션 제목', '짧고 굵게 시선을 잡아야 할 곳'],
      donts: ['긴 본문 전체', '작은 캡션·라벨'],
    },
    {
      role: 'Body',
      font: fonts.body,
      reason: fontReasons?.body,
      use: '본문, 설명, 일반 텍스트',
      dos: ['문단·설명 텍스트', '가독성이 중요한 모든 영역'],
      donts: ['큰 제목에 단독 사용', '코드·숫자 정렬이 필요한 곳'],
    },
    {
      role: 'Mono',
      font: fonts.mono,
      reason: fontReasons?.mono,
      use: '코드, 숫자, 데이터',
      dos: ['코드 스니펫·HEX 값', '표의 숫자 정렬'],
      donts: ['일반 본문', '감성적인 헤드라인'],
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontFamily: F4, fontSize: '13px', color: C_LABEL, letterSpacing: '0.1em', marginBottom: '5px' }}>TYPOGRAPHY</p>
        <h2 style={{ fontFamily: F7, fontSize: '32px', color: C_MAIN }}>타이포그래피</h2>
      </div>

      {/* 폰트 패밀리 + 선택 이유 + 사용 가이드 */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontFamily: F4, fontSize: '12px', color: C_LABEL, letterSpacing: LABEL_LS, marginBottom: '16px' }}>FONT FAMILY</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {fontRoles.map(({ role, font, reason, use, dos, donts }) => (
            <div key={role} style={{ padding: '24px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                <p style={{ fontFamily: F6, fontSize: '14px', color: C_MAIN }}>{role}</p>
                <p style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED }}>{use}</p>
              </div>
              <p style={{
                fontFamily: font,
                fontSize: '36px',
                fontWeight: 'bold',
                color: colors.primary.hex,
                marginBottom: '10px',
              }}>
                Aa Bb Cc
              </p>
              <p style={{ fontFamily: F5, fontSize: '14px', color: C_MAIN, marginBottom: '8px' }}>{font}</p>
              <p style={{ fontFamily: font, fontSize: '13px', color: C_MUTED, lineHeight: '1.8' }}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz<br />
                0123456789
              </p>

              {reason && (
                <p style={{ fontFamily: F4, fontSize: '13px', color: C_SUB, lineHeight: '1.65', marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${C_BORDER_LIGHT}` }}>
                  {reason}
                </p>
              )}

              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${C_BORDER_LIGHT}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <p style={{ fontFamily: F5, fontSize: '11px', color: C_OK, letterSpacing: '0.05em', marginBottom: '6px' }}>DO</p>
                  {dos.map((d, i) => (
                    <p key={i} style={{ fontFamily: F4, fontSize: '12px', color: C_SUB, lineHeight: '1.5', marginBottom: '3px' }}>· {d}</p>
                  ))}
                </div>
                <div>
                  <p style={{ fontFamily: F5, fontSize: '11px', color: C_NO, letterSpacing: '0.05em', marginBottom: '6px' }}>DON&apos;T</p>
                  {donts.map((d, i) => (
                    <p key={i} style={{ fontFamily: F4, fontSize: '12px', color: C_SUB, lineHeight: '1.5', marginBottom: '3px' }}>· {d}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 타입 스케일 */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontFamily: F4, fontSize: '12px', color: C_LABEL, letterSpacing: LABEL_LS, marginBottom: '16px' }}>TYPE SCALE</p>
        <div style={{ border: `1px solid ${C_BORDER}`, borderRadius: '16px', overflow: 'hidden', background: '#fff' }}>
          {scaleEntries.map(({ label, data, sample }, index) => (
            <div
              key={label}
              style={{
                display: 'flex', alignItems: 'center', gap: '24px',
                padding: '24px 32px',
                borderBottom: index !== scaleEntries.length - 1 ? `1px solid ${C_BORDER_LIGHT}` : 'none',
              }}
            >
              <div style={{ width: '80px', flexShrink: 0 }}>
                <p style={{ fontFamily: F5, fontSize: '13px', color: C_MAIN }}>{label}</p>
              </div>
              <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                <p style={{
                  fontFamily: ['Display', 'H1', 'H2', 'H3', 'H4'].includes(label) ? fonts.heading : fonts.body,
                  fontSize: `${Math.min(data.size, 36)}px`,
                  fontWeight: data.weight,
                  lineHeight: '1',
                  letterSpacing: data.letterSpacing,
                  color: C_MAIN,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {sample}
                </p>
              </div>
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <p style={{ fontFamily: F5, fontSize: '13px', color: C_MAIN }}>{data.size}px / {data.weight}</p>
                <p style={{ fontFamily: F4, fontSize: '11px', color: C_MUTED, marginTop: '3px' }}>{data.lineHeight} leading</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 위계 사용 가이드 */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontFamily: F4, fontSize: '12px', color: C_LABEL, letterSpacing: LABEL_LS, marginBottom: '16px' }}>HIERARCHY GUIDE</p>
        <div style={{ padding: '32px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>
          {[
            { tier: 'Display', where: '랜딩 히어로, 표지 — 페이지당 1회, 가장 강한 첫인상' },
            { tier: 'H1 · H2', where: '페이지 제목과 주요 섹션 제목. 문서 구조의 뼈대' },
            { tier: 'H3 · H4', where: '하위 섹션·카드 제목. 본문 그룹을 나누는 소제목' },
            { tier: 'Body L/M/S', where: '본문. L은 리드 문단, M은 기본 본문, S는 보조 설명' },
            { tier: 'Caption · Label', where: '이미지 설명, 폼 라벨, 메타 정보 등 가장 작은 단위' },
          ].map((row, i, arr) => (
            <div key={row.tier} style={{
              display: 'flex', alignItems: 'flex-start', gap: '20px',
              paddingTop: i === 0 ? 0 : '16px',
              paddingBottom: i === arr.length - 1 ? 0 : '16px',
              borderBottom: i === arr.length - 1 ? 'none' : `1px solid ${C_BORDER_LIGHT}`,
            }}>
              <p style={{ fontFamily: F6, fontSize: '14px', color: C_MAIN, width: '130px', flexShrink: 0 }}>{row.tier}</p>
              <p style={{ fontFamily: F4, fontSize: '14px', color: C_SUB, lineHeight: '1.6' }}>{row.where}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 자간 · 행간 가이드 */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontFamily: F4, fontSize: '12px', color: C_LABEL, letterSpacing: LABEL_LS, marginBottom: '16px' }}>SPACING GUIDE</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '28px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>
            <p style={{ fontFamily: F6, fontSize: '14px', color: C_MAIN, marginBottom: '6px' }}>자간 (Letter Spacing)</p>
            <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED, lineHeight: '1.6', marginBottom: '20px' }}>글자 크기가 클수록 자간을 좁혀 단단하게, 작을수록 살짝 넓혀 또렷하게.</p>
            <p style={{ fontFamily: fonts.heading, fontSize: '28px', fontWeight: 700, color: C_MAIN, letterSpacing: '-0.02em', marginBottom: '4px' }}>큰 제목 −2%</p>
            <p style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED, marginBottom: '16px' }}>display · h1 → letter-spacing 좁게</p>
            <p style={{ fontFamily: fonts.body, fontSize: '12px', fontWeight: 500, color: C_MAIN, letterSpacing: '0.08em', marginBottom: '4px' }}>L A B E L  +8%</p>
            <p style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED }}>label · caption → letter-spacing 넓게</p>
          </div>
          <div style={{ padding: '28px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>
            <p style={{ fontFamily: F6, fontSize: '14px', color: C_MAIN, marginBottom: '6px' }}>행간 (Line Height)</p>
            <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED, lineHeight: '1.6', marginBottom: '20px' }}>제목은 행간을 좁게 붙여 덩어리감을, 본문은 넓혀 읽기 편하게.</p>
            <p style={{ fontFamily: fonts.heading, fontSize: '18px', fontWeight: 600, color: C_MAIN, lineHeight: 1.2, marginBottom: '12px' }}>제목은 행간 1.2<br />두 줄도 단단하게</p>
            <p style={{ fontFamily: fonts.body, fontSize: '14px', color: C_SUB, lineHeight: 1.8 }}>본문은 행간 1.7~1.8로 넉넉하게. 여러 줄이 이어질 때 눈이 다음 줄을 편하게 따라갈 수 있습니다.</p>
          </div>
        </div>
      </section>

      {/* 텍스트 조합 프리뷰 */}
      <section>
        <p style={{ fontFamily: F4, fontSize: '12px', color: C_LABEL, letterSpacing: LABEL_LS, marginBottom: '16px' }}>PREVIEW</p>
        <div style={{ padding: '40px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>
          <p style={{
            fontFamily: fonts.heading,
            fontSize: `${scale.h2.size}px`,
            fontWeight: scale.h2.weight,
            lineHeight: scale.h2.lineHeight,
            color: colors.primary.hex,
            marginBottom: '12px',
          }}>
            브랜드의 이야기
          </p>
          <p style={{
            fontFamily: fonts.heading,
            fontSize: `${scale.h4.size}px`,
            fontWeight: scale.h4.weight,
            lineHeight: scale.h4.lineHeight,
            color: C_MAIN,
            marginBottom: '20px',
          }}>
            타이포그래피로 전달하는 브랜드 아이덴티티
          </p>
          <p style={{
            fontFamily: fonts.body,
            fontSize: `${scale.bodyM.size}px`,
            fontWeight: scale.bodyM.weight,
            lineHeight: scale.bodyM.lineHeight,
            color: C_SUB,
          }}>
            브랜드의 가치와 철학을 타이포그래피로 표현합니다.
            일관된 폰트 사용으로 브랜드의 개성을 강화하고
            독자에게 명확한 메시지를 전달할 수 있어요.
          </p>
        </div>
      </section>
    </div>
  )
}