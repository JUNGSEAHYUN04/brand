import { useState } from 'react'

interface Props {
  onConfirm: () => Promise<void>
}

const C_MAIN = '#282B32'

export default function ConfirmButton({ onConfirm }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [hover, setHover] = useState(false)

  const handleClick = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      await onConfirm()
    } catch (error) {
      console.error('Error:', error)
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '15px 20px',
        borderRadius: '10px',
        fontFamily: 'SCDream5, sans-serif',
        fontSize: '15px',
        background: isLoading ? 'rgba(40,43,50,0.55)' : hover ? '#1f2228' : C_MAIN,
        color: '#fff',
        border: 'none',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        transition: 'background 0.18s',
      }}
    >
      {isLoading ? (
        <>
          <span
            style={{
              width: '15px',
              height: '15px',
              border: '2px solid rgba(255,255,255,0.35)',
              borderTopColor: '#fff',
              borderRadius: '50%',
              display: 'inline-block',
              animation: 'cb-spin 0.7s linear infinite',
            }}
          />
          확장 중...
        </>
      ) : (
        <>
          이 조합으로 확정
          <span
            style={{
              display: 'inline-block',
              transition: 'transform 0.18s',
              transform: hover ? 'translateX(3px)' : 'translateX(0)',
            }}
          >
            →
          </span>
        </>
      )}
      <style>{`
        @keyframes cb-spin { to { transform: rotate(360deg); } }
      `}</style>
    </button>
  )
}