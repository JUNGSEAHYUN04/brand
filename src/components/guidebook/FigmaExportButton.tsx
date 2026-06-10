'use client'

import { useState } from 'react'

interface Props {
  guidebook: {
    brand: any
    colors: any
    typography: any
    spacing: any
    logo?: { url?: string }
  }
}

const F4 = 'SCDream4, sans-serif'

export default function FigmaExportButton({ guidebook }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [hovered, setHovered] = useState(false)

  const handleExport = async () => {
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/export-figma-svg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guidebook }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || '내보내기 실패')
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${guidebook.brand?.name || 'guidebook'}-figma.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setStatus('done')
      setTimeout(() => setStatus('idle'), 3000)
    } catch (err: any) {
      setErrorMsg(err.message)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <div className="inline-flex flex-col items-start gap-2">
      <button
        onClick={handleExport}
        disabled={status === 'loading'}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          fontFamily: F4,
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          border: `1px solid ${hovered ? 'rgba(40,43,50,0.45)' : 'rgba(40,43,50,0.3)'}`,
          background: '#fff',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.5 : 1,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 0.15s',
        }}
      >
        {status === 'loading' ? (
          <span style={{
            width: '14px', height: '14px',
            border: '2px solid rgba(40,43,50,0.2)',
            borderTopColor: 'rgba(40,43,50,0.7)',
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'spin 0.7s linear infinite',
          }} />
        ) : status === 'done' ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7L6 11L12 3" stroke="#282B32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="10" height="14" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill="#282B32"/>
            <path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill="#282B32"/>
            <path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill="#282B32"/>
            <path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill="#282B32"/>
            <path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill="#282B32"/>
          </svg>
        )}
      </button>

      {status === 'error' && (
        <p style={{ fontFamily: F4, fontSize: '12px', color: 'rgba(220,60,60,0.8)' }}>{errorMsg}</p>
      )}

      {status === 'done' && (
        <p style={{ fontFamily: F4, fontSize: '12px', color: 'rgba(40,43,50,0.5)' }}>
          ZIP 파일을 Figma에 드래그앤드롭하세요
        </p>
      )}
    </div>
  )
}