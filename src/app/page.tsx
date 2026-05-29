import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 헤더 */}
      <header className="px-8 py-5 flex items-center justify-between border-b border-gray-100">
        <span className="text-sm font-semibold tracking-tight text-gray-900">brandkit</span>
        <Link
          href="/create"
          className="text-sm px-4 py-2 bg-gray-950 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          시작하기
        </Link>
      </header>

      {/* 히어로 */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="max-w-lg">
          {/* 배지 */}
          <span className="inline-block text-xs px-3 py-1 border border-gray-200 text-gray-400 rounded-full mb-8">
            AI 브랜드 아이덴티티 생성기
          </span>

          {/* 타이틀 */}
          <h1 className="text-5xl font-bold text-gray-950 leading-tight tracking-tight mb-6">
            키워드 하나로<br />완성되는 브랜드
          </h1>

          {/* 서브타이틀 */}
          <p className="text-gray-400 text-base leading-relaxed mb-10">
            브랜드 키워드를 입력하면 로고, 컬러, 슬로건,<br />
            디자인 가이드북까지 자동으로 생성해드려요.
          </p>

          {/* CTA */}
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-950 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            지금 시작하기
            <span>→</span>
          </Link>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="px-8 py-5 border-t border-gray-100">
        <p className="text-xs text-gray-300 text-center">© 2025 brandkit</p>
      </footer>
    </div>
  )
}