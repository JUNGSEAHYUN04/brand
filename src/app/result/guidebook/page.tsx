'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useBrandStore } from '@/store/brand-store'
import BrandStrategy from '@/components/guidebook/BrandStrategy'
import ColorSystem from '@/components/guidebook/ColorSystem'
import Typography from '@/components/guidebook/Typography'
import Spacing from '@/components/guidebook/Spacing'
import ComponentKit from '@/components/guidebook/ComponentKit'
import FigmaExportButton from '@/components/guidebook/FigmaExportButton'
import { Spacing as SpacingType } from '@/lib/types'

const SECTIONS = [
  { id: 'brand',      label: '브랜드 전략' },
  { id: 'colors',     label: '컬러 시스템' },
  { id: 'typography', label: '타이포그래피' },
  { id: 'spacing',    label: '여백 & 그리드' },
  { id: 'components', label: 'UI 컴포넌트' },
]

const DEFAULT_SPACING: SpacingType = {
  base: 4,
  scale: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48, '3xl': 64 },
  borderRadius: { sm: 4, md: 8, lg: 12, xl: 16, full: 9999 },
}

const F4 = 'SCDream4, sans-serif'
const F5 = 'SCDream5, sans-serif'

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
  const guidebook = { brand, colors, typography, spacing, logo }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "rgba(40,43,50,0.04)", color: "#282B32" }}>

      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-white px-6 md:px-10 py-5 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(40,43,50,0.18)' }}>
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" style={{ fontFamily: 'Oswald-SemiBold, sans-serif', fontSize: '20px', color: '#282B32', textDecoration: 'none' }}>
            brandkit
          </Link>
          <div className="hidden md:block w-px h-5" style={{ background: 'rgba(40,43,50,0.25)' }} />
          <span className="hidden md:block" style={{ fontFamily: F4, fontSize: '14px', color: 'rgba(40,43,50,0.65)' }}>
            {brand.name}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/result')}
            style={{ fontFamily: F4, fontSize: '13px', color: 'rgba(40,43,50,0.6)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ← 요약으로
          </button>
          <button
            onClick={() => { reset(); router.push('/create') }}
            className="transition-all"
            style={{ fontFamily: F4, fontSize: '13px', color: 'rgba(40,43,50,0.75)', background: 'none', border: '1px solid rgba(40,43,50,0.3)', borderRadius: '10px', padding: '7px 16px', cursor: 'pointer' }}
          >
            다시 만들기
          </button>
          <FigmaExportButton guidebook={guidebook} />
        </div>
      </header>

      <div className="flex flex-1">

        {/* 사이드 네비 */}
        <aside className="hidden md:flex w-60 shrink-0 py-10 px-5 sticky top-[69px] h-[calc(100vh-69px)] flex-col"
          style={{ borderRight: '1px solid rgba(40,43,50,0.18)', background: '#fff' }}>
          <div className="mb-10 px-2">
            <p style={{ fontFamily: 'SCDream7, sans-serif', fontSize: '18px', color: '#282B32', marginBottom: '2px' }}>{brand.name}</p>
            <p style={{ fontFamily: F4, fontSize: '12px', color: 'rgba(40,43,50,0.65)', lineHeight: '1.6' }}>{brand.slogan.ko}</p>
          </div>

          <nav className="space-y-1">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="w-full text-left px-4 py-3 rounded-xl transition-all"
                style={{
                  fontFamily: activeSection === section.id ? F5 : F4,
                  fontSize: '14px',
                  background: activeSection === section.id ? '#282B32' : 'transparent',
                  color: activeSection === section.id ? '#fff' : 'rgba(40,43,50,0.62)',
                  border: '1px solid transparent',
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* 모바일 탭 */}
        <div className="md:hidden w-full">
          <div className="flex overflow-x-auto bg-white sticky top-[69px] z-10"
            style={{ borderBottom: '1px solid rgba(40,43,50,0.18)' }}>
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="shrink-0 px-6 py-4 transition-all"
                style={{
                  fontFamily: activeSection === section.id ? F5 : F4,
                  fontSize: '14px',
                  color: activeSection === section.id ? '#282B32' : 'rgba(40,43,50,0.62)',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: activeSection === section.id ? '2px solid #282B32' : '2px solid transparent',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                {section.label}
              </button>
            ))}
          </div>
          <main className="px-6 py-10">
            {activeSection === 'brand'      && <BrandStrategy brand={brand} colors={colors} logo={logo} />}
            {activeSection === 'colors'     && <ColorSystem colors={colors} />}
            {activeSection === 'typography' && <Typography typography={typography} colors={colors} />}
            {activeSection === 'spacing'    && <Spacing spacing={spacing} />}
            {activeSection === 'components' && <ComponentKit colors={colors} typography={typography} />}
          </main>
        </div>

        {/* 데스크탑 메인 */}
        <main className="hidden md:block flex-1 px-16 py-12">
          <div className="max-w-5xl">
            {activeSection === 'brand'      && <BrandStrategy brand={brand} colors={colors} logo={logo} />}
            {activeSection === 'colors'     && <ColorSystem colors={colors} />}
            {activeSection === 'typography' && <Typography typography={typography} colors={colors} />}
            {activeSection === 'spacing'    && <Spacing spacing={spacing} />}
            {activeSection === 'components' && <ComponentKit colors={colors} typography={typography} />}
          </div>
        </main>

      </div>
    </div>
  )
}