'use client'

import { useEffect, useState } from 'react'

const TIPS = [
  '키워드가 구체적일수록 아이덴티티가 더 정교해져요.',
  '컬러 시스템은 WCAG 2.1 접근성 기준을 충족해요.',
  'Heading과 Body 폰트는 대비되면서 어울리도록 선택돼요.',
  '가이드북은 Figma SVG 파일로 바로 내보낼 수 있어요.',
  '키워드에서 톤앤매너, 컬러, 폰트가 자동으로 결정돼요.',
]

export default function LoadingAnimation() {
  const [tipIdx, setTipIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setTipIdx((prev) => (prev + 1) % TIPS.length)
        setVisible(true)
      }, 450)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#fff',
      textAlign: 'center',
      gap: '20px',
      marginTop: '-40px',
    }}>
      <h1 style={{
        fontFamily: 'Oswald-SemiBold, sans-serif',
        fontSize: '64px',
        fontWeight: 600,
        color: '#282B32',
        lineHeight: 1,
      }}>
        LOADING
      </h1>

      <p style={{
        fontFamily: 'SCDream4, sans-serif',
        fontSize: '16px',
        color: 'rgba(40,43,50,0.5)',
        lineHeight: '1.65',
        whiteSpace: 'nowrap',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.5s, transform 0.5s',
      }}>
        <span style={{ fontFamily: 'SCDream5, sans-serif', color: '#282B32' }}>TIP :</span>{' '}
        {TIPS[tipIdx]}
      </p>
    </div>
  )
}