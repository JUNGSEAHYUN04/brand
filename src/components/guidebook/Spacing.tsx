'use client'

import { Spacing as SpacingType } from '@/lib/types'
import { FoundationTokens } from '@/lib/component-tokens'

interface Props {
  spacing: SpacingType
  grid: FoundationTokens['grid']
  breakpoints: FoundationTokens['breakpoints']
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

const GAP_BG = 'rgba(220,38,38,0.06)'
const GAP_TEXT = 'rgba(185,28,28,0.7)'

const LABEL_LS = '0.08em'

const SCALE_USAGE: Record<string, string> = {
  xs: '아이콘과 텍스트 사이, 태그 안쪽 여백',
  sm: '연관된 요소 사이 (라벨–입력칸)',
  md: '카드 안쪽 기본 여백, 버튼 패딩',
  lg: '카드와 카드 사이, 그룹 간격',
  xl: '섹션과 섹션 사이',
  '2xl': '큰 블록 구분, 페이지 상하 여백',
  '3xl': '히어로·랜딩 등 넓은 호흡이 필요한 곳',
}

const RADIUS_USAGE: Record<string, string> = {
  sm: '태그, 배지, 작은 칩',
  md: '버튼, 입력칸',
  lg: '카드, 모달',
  xl: '큰 카드, 이미지 컨테이너',
  full: '아바타, 원형 버튼, 토글',
}

export default function Spacing({ spacing, grid, breakpoints }: Props) {
  const { scale, borderRadius } = spacing

  const scaleEntries = Object.entries(scale) as [string, number][]
  const borderRadiusEntries = Object.entries(borderRadius) as [string, number][]
  const breakpointEntries = Object.entries(breakpoints) as [string, number][]

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontFamily: F4, fontSize: '13px', color: C_LABEL, letterSpacing: '0.1em', marginBottom: '5px' }}>SPACING</p>
        <h2 style={{ fontFamily: F7, fontSize: '32px', color: C_MAIN }}>여백 & 그리드</h2>
      </div>

      {/* 스페이싱 스케일 + 용도 */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontFamily: F4, fontSize: '12px', color: C_LABEL, letterSpacing: LABEL_LS, marginBottom: '16px' }}>SPACING SCALE</p>
        <div style={{ border: `1px solid ${C_BORDER}`, borderRadius: '16px', overflow: 'hidden', background: '#fff' }}>
          {scaleEntries.map(([key, value], index) => (
            <div
              key={key}
              style={{
                display: 'flex', alignItems: 'center', gap: '24px',
                padding: '18px 32px',
                borderBottom: index !== scaleEntries.length - 1 ? `1px solid ${C_BORDER_LIGHT}` : 'none',
              }}
            >
              <div style={{ width: '64px', flexShrink: 0 }}>
                <p style={{ fontFamily: F5, fontSize: '13px', color: C_MAIN }}>{key}</p>
                <p style={{ fontFamily: F4, fontSize: '11px', color: C_MUTED, marginTop: '2px' }}>{value}px</p>
              </div>
              <div style={{ width: '120px', flexShrink: 0 }}>
                <div style={{
                  width: `${Math.min(value * 2.5, 120)}px`,
                  height: '18px',
                  backgroundColor: C_BORDER,
                  borderRadius: '4px',
                }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: F4, fontSize: '13px', color: C_SUB, lineHeight: '1.55' }}>{SCALE_USAGE[key] || ''}</p>
              </div>
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <p style={{ fontFamily: F4, fontSize: '11px', color: C_MUTED }}>{value / spacing.base}x</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 여백 사용 원칙 Do/Don't */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontFamily: F4, fontSize: '12px', color: C_LABEL, letterSpacing: LABEL_LS, marginBottom: '16px' }}>SPACING PRINCIPLES</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '28px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>
            <p style={{ fontFamily: F5, fontSize: '12px', color: C_OK, letterSpacing: '0.05em', marginBottom: '14px' }}>DO</p>
            {[
              '같은 base의 배수만 사용해 리듬을 유지',
              '연관된 요소는 좁게, 무관한 요소는 넓게 (근접성)',
              '제목과 본문 사이는 본문 줄 간격보다 넓게',
            ].map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <span style={{ color: C_OK, fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>✓</span>
                <span style={{ fontFamily: F4, fontSize: '13px', color: C_SUB, lineHeight: '1.6' }}>{d}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '28px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>
            <p style={{ fontFamily: F5, fontSize: '12px', color: C_NO, letterSpacing: '0.05em', marginBottom: '14px' }}>DON&apos;T</p>
            {[
              '13px·19px 같은 스케일 밖 임의 값 사용',
              '모든 간격을 똑같이 줘서 위계를 없애기',
              '관련 없는 요소를 너무 붙여 그룹처럼 보이게',
            ].map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <span style={{ color: C_NO, fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>✕</span>
                <span style={{ fontFamily: F4, fontSize: '13px', color: C_SUB, lineHeight: '1.6' }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 스페이싱 시각화 */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontFamily: F4, fontSize: '12px', color: C_LABEL, letterSpacing: LABEL_LS, marginBottom: '16px' }}>VISUAL GUIDE</p>
        <div style={{ padding: '48px 40px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '28px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {scaleEntries.map(([key, value]) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <p style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED }}>{value}</p>
                <div style={{
                  width: '36px',
                  height: `${Math.min(value * 1.8, 144)}px`,
                  backgroundColor: C_BORDER,
                  borderRadius: '4px',
                }} />
                <p style={{ fontFamily: F5, fontSize: '12px', color: C_MAIN }}>{key}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Border Radius + 용도 */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontFamily: F4, fontSize: '12px', color: C_LABEL, letterSpacing: LABEL_LS, marginBottom: '16px' }}>BORDER RADIUS</p>
        <div style={{ padding: '40px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', justifyContent: 'center', alignItems: 'flex-start' }}>
            {borderRadiusEntries.map(([key, value]) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', width: '150px' }}>
                <div style={{
                  width: '80px', height: '80px',
                  backgroundColor: 'rgba(40,43,50,0.05)',
                  border: `1px solid ${C_BORDER}`,
                  borderRadius: key === 'full' ? '9999px' : `${value}px`,
                }} />
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: F5, fontSize: '13px', color: C_MAIN }}>{key}
                    <span style={{ fontFamily: F4, color: C_MUTED }}> · {key === 'full' ? '9999px' : `${value}px`}</span>
                  </p>
                  <p style={{ fontFamily: F4, fontSize: '12px', color: C_SUB, marginTop: '4px', lineHeight: '1.5' }}>{RADIUS_USAGE[key] || ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid System */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontFamily: F4, fontSize: '12px', color: C_LABEL, letterSpacing: LABEL_LS, marginBottom: '16px' }}>GRID SYSTEM</p>
        <div style={{ padding: '32px', border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff' }}>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', marginBottom: '32px' }}>
            {[
              { label: 'COLUMNS',   value: `${grid.columns}` },
              { label: 'GUTTER',    value: `${grid.gutter}px` },
              { label: 'MARGIN',    value: `${grid.margin}px` },
              { label: 'MAX WIDTH', value: `${grid.maxWidth}px` },
            ].map((item) => (
              <div key={item.label}>
                <p style={{ fontFamily: F4, fontSize: '12px', color: C_LABEL, letterSpacing: LABEL_LS, marginBottom: '6px' }}>{item.label}</p>
                <p style={{ fontFamily: F6, fontSize: '18px', color: C_MAIN }}>{item.value}</p>
              </div>
            ))}
          </div>

          <div style={{ paddingTop: '28px', borderTop: `1px solid ${C_BORDER_LIGHT}` }}>
            <p style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED, marginBottom: '14px' }}>{grid.columns}-column grid · {grid.gutter}px gutter</p>
            <div style={{ display: 'flex', gap: `${grid.gutter}px`, width: '100%' }}>
              {Array.from({ length: grid.columns }).map((_, i) => (
                <div key={i} style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    height: '72px',
                    background: 'rgba(40,43,50,0.05)',
                    border: `1px solid ${C_BORDER_LIGHT}`,
                    borderRadius: '6px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <p style={{ fontFamily: F4, fontSize: '11px', color: C_MUTED }}>{i + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ paddingTop: '28px', marginTop: '28px', borderTop: `1px solid ${C_BORDER_LIGHT}` }}>
            <p style={{ fontFamily: F4, fontSize: '12px', color: C_LABEL, letterSpacing: LABEL_LS, marginBottom: '16px' }}>RESPONSIVE COLUMNS</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {([
                { bp: 'sm', cols: grid.responsive.sm },
                { bp: 'md', cols: grid.responsive.md },
                { bp: 'lg', cols: grid.responsive.lg },
              ] as const).map(({ bp, cols }) => (
                <div key={bp} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '120px', flexShrink: 0 }}>
                    <p style={{ fontFamily: F5, fontSize: '13px', color: C_MAIN }}>{bp}</p>
                    <p style={{ fontFamily: F4, fontSize: '11px', color: C_MUTED }}>≥ {breakpoints[bp]}px · {cols}col</p>
                  </div>
                  <div style={{ flex: 1, display: 'flex', gap: '6px' }}>
                    {Array.from({ length: cols }).map((_, i) => (
                      <div key={i} style={{ flex: 1, height: '28px', background: 'rgba(40,43,50,0.05)', border: `1px solid ${C_BORDER_LIGHT}`, borderRadius: '4px' }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ paddingTop: '28px', marginTop: '28px', borderTop: `1px solid ${C_BORDER_LIGHT}` }}>
            <p style={{ fontFamily: F4, fontSize: '12px', color: C_LABEL, letterSpacing: LABEL_LS, marginBottom: '16px' }}>BREAKPOINTS</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {breakpointEntries.map(([key, value]) => (
                <div key={key} style={{
                  display: 'flex', alignItems: 'baseline', gap: '8px',
                  padding: '8px 16px',
                  border: `1px solid ${C_BORDER}`, borderRadius: '8px',
                }}>
                  <span style={{ fontFamily: F5, fontSize: '13px', color: C_MAIN }}>{key}</span>
                  <span style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED }}>{value}px</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 여백 적용 예시 — 여백은 빨강으로 표시 */}
      <section style={{ marginBottom: '56px' }}>
        <p style={{ fontFamily: F4, fontSize: '12px', color: C_LABEL, letterSpacing: LABEL_LS, marginBottom: '16px' }}>USAGE EXAMPLE</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>

          {/* Card Padding — 카드 안쪽 패딩이 여백 */}
          <div style={{ border: `1px solid ${C_BORDER}`, borderRadius: '16px', overflow: 'hidden', background: '#fff' }}>
            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${C_BORDER_LIGHT}`, background: '#fff' }}>
              <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED }}>Card Padding — md ({scale.md}px)</p>
            </div>
            <div style={{ padding: `${scale.md}px`, background: GAP_BG }}>
              <div style={{
                backgroundColor: '#fff',
                border: `1px solid ${C_BORDER_LIGHT}`,
                borderRadius: '10px', height: '96px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED }}>Content</p>
              </div>
            </div>
          </div>

          {/* Section Gap — 섹션 사이 간격이 여백 */}
          <div style={{ border: `1px solid ${C_BORDER}`, borderRadius: '16px', overflow: 'hidden', background: '#fff' }}>
            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${C_BORDER_LIGHT}`, background: '#fff' }}>
              <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED }}>Section Gap — xl ({scale.xl}px)</p>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', background: '#fff' }}>
              <div style={{ backgroundColor: 'rgba(40,43,50,0.05)', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED }}>Section A</p>
              </div>
              <div style={{ height: `${scale.xl}px`, background: GAP_BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontFamily: F5, fontSize: '11px', color: GAP_TEXT }}>{scale.xl}px</p>
              </div>
              <div style={{ backgroundColor: 'rgba(40,43,50,0.05)', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED }}>Section B</p>
              </div>
            </div>
          </div>

          {/* List Gap — 항목 사이 간격이 여백 */}
          <div style={{ border: `1px solid ${C_BORDER}`, borderRadius: '16px', overflow: 'hidden', background: '#fff' }}>
            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${C_BORDER_LIGHT}`, background: '#fff' }}>
              <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED }}>List Gap — sm ({scale.sm}px)</p>
            </div>
            <div style={{ padding: '20px', background: '#fff' }}>
              {['항목 하나', '항목 둘', '항목 셋'].map((t, i, arr) => (
                <div key={t}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'rgba(40,43,50,0.05)' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '4px', background: C_BORDER, flexShrink: 0 }} />
                    <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED }}>{t}</p>
                  </div>
                  {i !== arr.length - 1 && (
                    <div style={{ height: `${scale.sm}px`, background: GAP_BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Field — 라벨과 인풋 사이 간격이 여백 */}
          <div style={{ border: `1px solid ${C_BORDER}`, borderRadius: '16px', overflow: 'hidden', background: '#fff' }}>
            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${C_BORDER_LIGHT}`, background: '#fff' }}>
              <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED }}>Form Field — sm ({scale.sm}px)</p>
            </div>
            <div style={{ padding: '20px', background: '#fff' }}>
              <div style={{ background: 'rgba(40,43,50,0.05)', padding: '8px 12px', display: 'flex', alignItems: 'center' }}>
                <p style={{ fontFamily: F5, fontSize: '12px', color: C_MUTED }}>이메일</p>
              </div>
              <div style={{ height: `${scale.sm}px`, background: GAP_BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    
              </div>
              <div style={{ height: '40px', border: `1px solid ${C_BORDER}`, display: 'flex', alignItems: 'center', padding: '0 14px' }}>
                <p style={{ fontFamily: F4, fontSize: '13px', color: C_MUTED }}>name@example.com</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 레이아웃 예시 */}
      <section>
        <p style={{ fontFamily: F4, fontSize: '12px', color: C_LABEL, letterSpacing: LABEL_LS, marginBottom: '16px' }}>LAYOUT EXAMPLE</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>

          {/* 프로필 카드 레이아웃 */}
          <div style={{ border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff', padding: `${scale.md}px` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: `${scale.sm}px`, marginBottom: `${scale.md}px` }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '9999px', background: 'rgba(40,43,50,0.08)', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: `${scale.xs}px` }}>
                <p style={{ fontFamily: F6, fontSize: '15px', color: C_MAIN }}>프로필 카드</p>
                <p style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED }}>md 패딩 · sm 요소 간격 · xs 라벨 간격</p>
              </div>
            </div>
            <div style={{ height: '1px', background: C_BORDER_LIGHT, marginBottom: `${scale.md}px` }} />
            <p style={{ fontFamily: F4, fontSize: '13px', color: C_SUB, lineHeight: '1.7', marginBottom: `${scale.md}px` }}>
              아바타·이름·설명은 가깝게 묶고, 구분선과 본문 사이는 한 단계 넓혀 그룹을 나눕니다.
            </p>
            <div style={{ display: 'flex', gap: `${scale.sm}px` }}>
              <div style={{ flex: 1, height: '38px', borderRadius: '8px', background: C_MAIN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontFamily: F5, fontSize: '13px', color: '#fff' }}>기본</p>
              </div>
              <div style={{ flex: 1, height: '38px', borderRadius: '8px', border: `1px solid ${C_BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontFamily: F5, fontSize: '13px', color: C_SUB }}>보조</p>
              </div>
            </div>
          </div>

          {/* 본문 글 레이아웃 */}
          <div style={{ border: `1px solid ${C_BORDER}`, borderRadius: '16px', background: '#fff', padding: `${scale.md}px` }}>
            <p style={{ fontFamily: F4, fontSize: '11px', color: C_LABEL, letterSpacing: LABEL_LS, marginBottom: `${scale.xs}px` }}>ARTICLE</p>
            <p style={{ fontFamily: F6, fontSize: '18px', color: C_MAIN, marginBottom: `${scale.sm}px`, lineHeight: 1.3 }}>제목과 본문의 간격</p>
            <p style={{ fontFamily: F4, fontSize: '13px', color: C_SUB, lineHeight: '1.8', marginBottom: `${scale.lg}px` }}>
              제목 아래 본문은 sm으로 붙이고, 문단과 다음 블록 사이는 lg로 넓혀 호흡을 줍니다. 같은 글 안에서도 간격의 위계가 읽기 흐름을 만듭니다.
            </p>
            <div style={{ paddingTop: `${scale.md}px`, borderTop: `1px solid ${C_BORDER_LIGHT}`, display: 'flex', alignItems: 'center', gap: `${scale.xs}px` }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '9999px', background: 'rgba(40,43,50,0.08)' }} />
              <p style={{ fontFamily: F4, fontSize: '12px', color: C_MUTED }}>작성자 · 5분 읽기</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}