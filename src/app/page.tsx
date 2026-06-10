import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ color: '#282B32' }}>
      <style>{`
        .start-btn:hover { opacity: 0.8; }
      `}</style>

      <main className="flex-1 flex flex-col items-center justify-center px-10 md:px-20">
        <div className="max-w-2xl w-full" style={{ textAlign: "center" }}>

          <p style={{ fontFamily: 'SCDream4, sans-serif', fontSize: '15px', color: 'rgba(40,43,50,0.4)', marginBottom: '16px' }}>
            AI Brand Identity Generator
          </p>

          <h1 style={{ fontFamily: 'Oswald-SemiBold, sans-serif', fontSize: 'clamp(52px, 7vw, 88px)', fontWeight: 600, color: '#282B32', lineHeight: 1.05, marginBottom: '24px' }}>
            키워드 하나로<br />완성되는 브랜드
          </h1>

          <p style={{ fontFamily: 'SCDream4, sans-serif', fontSize: '16px', color: 'rgba(40,43,50,0.5)', lineHeight: '1.75', marginBottom: '44px' }}>
            키워드를 입력하면 로고, 컬러, 슬로건, 디자인 가이드북까지 자동으로 생성돼요.
          </p>

          <Link
            href="/create"
            className="start-btn"
            style={{
              fontFamily: 'SCDream5, sans-serif',
              fontSize: '15px',
              background: '#282B32',
              color: '#fff',
              borderRadius: '14px',
              padding: '16px 40px',
              display: 'inline-block',
              textDecoration: 'none',
              transition: 'opacity 0.15s',
            }}
          >
            시작하기 →
          </Link>
        </div>
      </main>

      <footer className="px-10 md:px-20 py-6">
        <p style={{ fontFamily: 'SCDream4, sans-serif', fontSize: '12px', color: 'rgba(40,43,50,0.25)', textAlign: 'center' }}>
          © 2025 brandkit
        </p>
      </footer>
    </div>
  )
}