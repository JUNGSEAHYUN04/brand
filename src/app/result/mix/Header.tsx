import Link from 'next/link'

export default function Header() {
  return (
    <header
  className="px-6 md:px-10 py-5 flex items-center justify-between fixed top-0 w-full z-50"
  style={{
    background: '#fff',
    borderBottom: '1px solid rgba(40,43,50,0.08)',
  }}
>
      <Link
        href="/"
        style={{
          fontFamily: 'Oswald-SemiBold, sans-serif',
          fontSize: '20px',
          color: '#282B32',
          textDecoration: 'none',
        }}
      >
        brandkit
      </Link>
      <p
        style={{
          fontFamily: 'SCDream4, sans-serif',
          fontSize: '13px',
          color: 'rgba(40,43,50,0.45)',
        }}
      >
        3개 후보 중 원하는 요소 조합하기
      </p>
    </header>
  )
}
