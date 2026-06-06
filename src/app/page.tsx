import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 헤더 */}
      <header className="px-6 md:px-8 py-5 flex items-center justify-between border-b border-gray-200">
        <span className="text-sm font-semibold tracking-tight text-gray-900">brandkit</span>
      </header>

      {/* 히어로 */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-8 text-center">
        <div className="w-full max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-950 leading-tight tracking-tight mb-6">
            키워드 하나로<br />완성되는 브랜드
          </h1>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-12">
            브랜드 키워드를 입력하면 로고, 컬러, 슬로건,<br className="hidden md:block" />
            디자인 가이드북까지 자동으로 생성해드려요.
          </p>

          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-950 text-white text-base font-medium rounded-xl hover:bg-gray-800 transition-colors"
          >
            시작하기 →
          </Link>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="px-6 md:px-8 py-5 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">© 2025 brandkit</p>
      </footer>
    </div>
  )
}