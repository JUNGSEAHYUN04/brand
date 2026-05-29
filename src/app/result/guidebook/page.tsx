'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useBrandStore } from '@/store/brand-store'
import ColorSystem from '@/components/guidebook/ColorSystem'
import Typography from '@/components/guidebook/Typography'
import Spacing from '@/components/guidebook/Spacing'
import ComponentKit from '@/components/guidebook/ComponentKit'

const SECTIONS = [
  { id: 'colors', label: '컬러 시스템' },
  { id: 'typography', label: '타이포그래피' },
  { id: 'spacing', label: '여백 & 그리드' },
  { id: 'components', label: 'UI 컴포넌트' },
]

export default function GuidebookPage() {
  const router = useRouter()
  const { brandData, status, reset } = useBrandStore()
  const [activeSection, setActiveSection] = useState('colors')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (status === 'idle') router.push('/create')
    if (status === 'loading' || status === 'summary') router.push('/result')
  }, [status, router])

  if (!brandData) return null

  const { brand, colors, typography, spacing, components, logo } = brandData

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-6">
          <span className="text-sm font-semibold text-gray-900">brandkit</span>
          <div className="hidden md:block w-px h-4 bg-gray-200" />
          <span className="hidden md:block text-sm text-gray-400">{brand.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/result')}
            className="text-xs md:text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            ← 요약으로
          </button>
          <button
            onClick={() => { reset(); router.push('/create') }}
            className="text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 border border-gray-200 text-gray-600 rounded-lg hover:border-gray-400 transition-colors"
          >
            다시 만들기
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* 사이드 네비 — 데스크탑만 */}
        <aside className="hidden md:flex w-56 shrink-0 border-r border-gray-100 py-8 px-4 sticky top-[57px] h-[calc(100vh-57px)] flex-col">
          <div className="mb-8 px-2">
            <p className="text-sm font-semibold text-gray-900 mb-1">{brand.name}</p>
            <p className="text-xs text-gray-400 leading-relaxed">{brand.slogan.ko}</p>
          </div>

          <nav className="space-y-0.5">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                  ${activeSection === section.id
                    ? 'bg-gray-950 text-white font-medium'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 px-2">
            <p className="text-xs text-gray-400 mb-3">Logo</p>
            <div
              className="w-full"
              dangerouslySetInnerHTML={{ __html: logo.svg }}
            />
          </div>
        </aside>

        {/* 모바일 섹션 탭 */}
        <div className="md:hidden w-full">
          <div className="flex overflow-x-auto border-b border-gray-100 bg-white sticky top-[57px] z-10">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`shrink-0 px-4 py-3 text-sm transition-all border-b-2
                  ${activeSection === section.id
                    ? 'border-gray-950 text-gray-950 font-medium'
                    : 'border-transparent text-gray-400'
                  }
                `}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* 모바일 메인 콘텐츠 */}
          <main className="px-4 py-8">
            <div className="mb-8 pb-6 border-b border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Brand Identity</p>
              <h1 className="text-2xl font-bold text-gray-950 mb-3">{brand.name}</h1>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{brand.tone}</p>
              <div className="flex flex-wrap gap-2">
                {brand.personality.map((keyword) => (
                  <span key={keyword} className="text-xs px-3 py-1 border border-gray-200 text-gray-500 rounded-full">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {activeSection === 'colors' && <ColorSystem colors={colors} />}
            {activeSection === 'typography' && <Typography typography={typography} colors={colors} />}
            {activeSection === 'spacing' && <Spacing spacing={spacing} />}
            {activeSection === 'components' && <ComponentKit components={components} colors={colors} typography={typography} />}
          </main>
        </div>

        {/* 데스크탑 메인 콘텐츠 */}
        <main className="hidden md:block flex-1 px-12 py-10 max-w-4xl">
          <div className="mb-12 pb-10 border-b border-gray-100">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Brand Identity</p>
            <h1 className="text-3xl font-bold text-gray-950 mb-3">{brand.name}</h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{brand.tone}</p>
            <div className="flex flex-wrap gap-2">
              {brand.personality.map((keyword) => (
                <span key={keyword} className="text-xs px-3 py-1 border border-gray-200 text-gray-500 rounded-full">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {activeSection === 'colors' && <ColorSystem colors={colors} />}
          {activeSection === 'typography' && <Typography typography={typography} colors={colors} />}
          {activeSection === 'spacing' && <Spacing spacing={spacing} />}
          {activeSection === 'components' && <ComponentKit components={components} colors={colors} typography={typography} />}
        </main>
      </div>
    </div>
  )
}