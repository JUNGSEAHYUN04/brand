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

const C_MAIN = 'rgba(40,43,50,0.9)'
const C_SUB = 'rgba(40,43,50,0.75)'
const C_MUTED = 'rgba(40,43,50,0.55)'
const C_LABEL = 'rgba(40,43,50,0.75)'
const C_BORDER = 'rgba(40,43,50,0.2)'
const C_BORDER_LIGHT = 'rgba(40,43,50,0.1)'

export default function Typography({ typography, colors }: Props) {
  const { fonts, scale } = typography

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

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontFamily: F4, fontSize: '13px', color: C_LABEL, letterSpacing: '0.1em', marginBottom: '5px' }}>TYPOGRAPHY</p>
        <h2 style={{ fontFamily: F7, fontSize: '32px', color: C_MAIN }}>타이포그래피</h2>
      </div>

      {/* 폰트 패밀리 */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontFamily: F4, fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>FONT FAMILY</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {[
            { role: 'Heading', font: fonts.heading, sample: 'Aa Bb Cc' },
            { role: 'Body', font: fonts.body, sample: 'Aa Bb Cc' },
            { role: 'Mono', font: fonts.mono, sample: 'Aa Bb Cc' },
          ].map(({ role, font, sample }) => (
            <div key={role} style={{ padding: '24px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>
              <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED, marginBottom: '16px' }}>{role}</p>
              <p style={{
                fontFamily: font,
                fontSize: '36px',
                fontWeight: 'bold',
                color: colors.primary.hex,
                marginBottom: '12px',
              }}>
                {sample}
              </p>
              <p style={{ fontFamily: F5, fontSize: '14px', color: C_MAIN, marginBottom: '8px' }}>{font}</p>
              <p style={{ fontFamily: font, fontSize: '13px', color: C_MUTED, lineHeight: '1.8' }}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                abcdefghijklmnopqrstuvwxyz<br />
                0123456789
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 타입 스케일 */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontFamily: F4, fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>TYPE SCALE</p>
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

      {/* 텍스트 조합 프리뷰 */}
      <section>
        <p style={{ fontFamily: F4, fontSize: '13px', color: C_LABEL, letterSpacing: '0.08em', marginBottom: '16px' }}>PREVIEW</p>
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