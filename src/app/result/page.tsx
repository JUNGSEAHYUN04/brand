'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useBrandStore } from '@/store/brand-store'
import LogoCard from '@/components/result/LogoCard'
import ColorCard from '@/components/result/ColorCard'
import SloganCard from '@/components/result/SloganCard'
import FontCard from '@/components/result/FontCard'

export default function ResultPage() {
  const router = useRouter()
  const { status, partialData, brandData, reset } = useBrandStore()

  useEffect(() => {
    console.log('status:', status, 'partialData:', partialData)
  }, [status, partialData])

  useEffect(() => {
    if (status === 'idle') router.push('/create')
  }, [status, router])

  const isSummaryReady = status === 'summary' || status === 'complete'
  const isComplete = status === 'complete'
  const data = partialData

  return (
    <div className="min-h-screen" style={{ background: '#f9f9f9' }}>

      {/* 헤더 */}
      <header
        className="px-10 md:px-20 py-5 flex items-center justify-between"
        style={{ background: '#fff', borderBottom: '1px solid rgba(40,43,50,0.08)' }}
      >
        <Link href="/" style={{ fontFamily: 'Oswald-SemiBold, sans-serif', fontSize: '20px', color: '#282B32', textDecoration: 'none' }}>
          brandkit
        </Link>
        <button
          onClick={() => { reset(); router.push('/create') }}
          style={{ fontFamily: 'SCDream4, sans-serif', fontSize: '13px', color: 'rgba(40,43,50,0.45)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ← 다시 만들기
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16">

        {isSummaryReady && (
          <>
            {/* 브랜드명 */}
            {data.brand && (
              <div className="mb-10 md:mb-14 text-center">
                <p style={{ fontFamily: 'SCDream4, sans-serif', fontSize: '12px', color: 'rgba(40,43,50,0.4)', letterSpacing: '0.1em', marginBottom: '12px' }}>
                  BRAND IDENTITY
                </p>
                <h1 style={{ fontFamily: 'Oswald-SemiBold, sans-serif', fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 600, color: '#282B32', lineHeight: 1.05, marginBottom: '16px' }}>
                  {data.brand.name}
                </h1>
                {data.brand.nameCandidates && (
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                    <p style={{ fontFamily: 'SCDream4, sans-serif', fontSize: '13px', color: 'rgba(40,43,50,0.45)' }}>후보 브랜드명:</p>
                    {data.brand.nameCandidates.map((name: string) => (
                      <span
                        key={name}
                        style={{ fontFamily: 'SCDream4, sans-serif', fontSize: '13px', color: 'rgba(40,43,50,0.6)', background: 'rgba(40,43,50,0.06)', padding: '4px 14px', borderRadius: '99px' }}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              <div className="col-span-1 md:col-span-2">
                {data.logo && <LogoCard logo={data.logo} brand={data.brand} />}
              </div>

              {data.colors ? (
                <ColorCard colors={data.colors} />
              ) : (
                <SkeletonCard label="컬러 팔레트" height="h-56" />
              )}

              {data.brand?.slogan ? (
                <SloganCard brand={data.brand} />
              ) : (
                <SkeletonCard label="슬로건" height="h-56" />
              )}

              <div className="col-span-1 md:col-span-2">
                {data.typography ? (
                  <FontCard typography={data.typography} colors={data.colors} />
                ) : (
                  <SkeletonCard label="폰트" height="h-40" />
                )}
              </div>
            </div>

            {/* 가이드북 버튼 */}
            <div className="flex justify-center">
              <button
                onClick={() => router.push('/result/guidebook')}
                disabled={!isComplete}
                className="transition-all"
                style={{
                  fontFamily: 'SCDream5, sans-serif',
                  fontSize: '15px',
                  padding: '16px 48px',
                  borderRadius: '14px',
                  border: 'none',
                  cursor: isComplete ? 'pointer' : 'not-allowed',
                  background: isComplete ? '#282B32' : 'rgba(40,43,50,0.08)',
                  color: isComplete ? '#fff' : 'rgba(40,43,50,0.35)',
                }}
              >
                {isComplete ? '전체 가이드북 보기 →' : '가이드북 생성 중...'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function SkeletonCard({ label, height }: { label: string; height: string }) {
  return (
    <div className={`${height} bg-white rounded-2xl p-6 flex flex-col justify-between animate-pulse`}
      style={{ border: '1px solid rgba(40,43,50,0.08)' }}>
      <p style={{ fontFamily: 'SCDream4, sans-serif', fontSize: '13px', color: 'rgba(40,43,50,0.4)' }}>{label}</p>
      <div className="space-y-3">
        <div className="h-3 bg-gray-100 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
      </div>
    </div>
  )
}