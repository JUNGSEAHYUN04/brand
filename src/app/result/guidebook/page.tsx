'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useBrandStore } from '@/store/brand-store'
import BrandStrategy from '../../../components/guidebook/BrandStrategy'
import ColorSystem from '../../../components/guidebook/ColorSystem'
import Typography from '../../../components/guidebook/Typography'
import Spacing from '../../../components/guidebook/Spacing'
import ComponentKit from '../../../components/guidebook/ComponentKit'
import { Spacing as SpacingType } from '@/lib/types'

const SECTIONS = [
  { id: 'brand', label: '브랜드 전략' },
  { id: 'colors', label: '컬러 시스템' },
  { id: 'typography', label: '타이포그래피' },
  { id: 'spacing', label: '여백 & 그리드' },
  { id: 'components', label: 'UI 컴포넌트' },
]

const DEFAULT_SPACING: SpacingType = {
  base: 4,
  scale: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48, '3xl': 64 },
  borderRadius: { sm: 4, md: 8, lg: 12, xl: 16, full: 9999 },
}

export default function GuidebookPage() {
  const router = useRouter()
  const { brandData, status, reset } = useBrandStore()
  const [activeSection, setActiveSection] = useState('brand')

  useEffect(() => {
    if (status === 'idle') router.push('/create')
    if (status === 'loading' || status === 'summary') router.push('/result')
  }, [status, router])

  if (!brandData) return null

  const { brand, colors, typography, logo } = brandData
  const spacing = brandData.spacing ?? DEFAULT_SPACING

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-10 md:px-20 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <span className="text-base font-bold text-gray-900">brandkit</span>
          <div className="hidden md:block w-px h-5 bg-gray-200" />
          <span className="hidden md:block text-base text-gray-600">{brand.name}</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/result')}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← 요약으로
          </button>
          <button
            onClick={() => { reset(); router.push('/create') }}
            className="text-sm px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
          >
            다시 만들기
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* 사이드 네비 — 데스크탑만 */}
        <aside className="hidden md:flex w-64 shrink-0 border-r border-gray-200 py-10 px-6 sticky top-[69px] h-[calc(100vh-69px)] flex-col">
          <div className="mb-10 px-2">
            <p className="text-base font-bold text-gray-900 mb-2">{brand.name}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{brand.slogan.ko}</p>
          </div>

          <nav className="space-y-1">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base transition-all
                  ${activeSection === section.id
                    ? 'bg-gray-950 text-white font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                {section.label}
              </button>
            ))}
          </nav>

          {logo?.url && (
            <div className="mt-10 px-2">
              <p className="text-sm text-gray-600 mb-3">Logo</p>
              <img src={logo.url} alt={`${brand.name} logo`} className="w-full" />
            </div>
          )}
        </aside>

        {/* 모바일 섹션 탭 */}
        <div className="md:hidden w-full">
          <div className="flex overflow-x-auto border-b border-gray-200 bg-white sticky top-[69px] z-10">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`shrink-0 px-6 py-4 text-base transition-all border-b-2
                  ${activeSection === section.id
                    ? 'border-gray-950 text-gray-950 font-medium'
                    : 'border-transparent text-gray-600'
                  }
                `}
              >
                {section.label}
              </button>
            ))}
          </div>

          <main className="px-6 py-10">
            {activeSection === 'brand' && <BrandStrategy brand={brand} colors={colors} />}
            {activeSection === 'colors' && <ColorSystem colors={colors} />}
            {activeSection === 'typography' && <Typography typography={typography} colors={colors} />}
            {activeSection === 'spacing' && <Spacing spacing={spacing} />}
            {activeSection === 'components' && <ComponentKit colors={colors} typography={typography} />}
          </main>
        </div>

        {/* 데스크탑 메인 콘텐츠 */}
        <main className="hidden md:block flex-1 px-16 py-12">
          <div className="max-w-5xl">
            {activeSection === 'brand' && <BrandStrategy brand={brand} colors={colors} />}
            {activeSection === 'colors' && <ColorSystem colors={colors} />}
            {activeSection === 'typography' && <Typography typography={typography} colors={colors} />}
            {activeSection === 'spacing' && <Spacing spacing={spacing} />}
            {activeSection === 'components' && <ComponentKit colors={colors} typography={typography} />}
          </div>
        </main>
      </div>
    </div>
  )
}