'use client'

import { useEffect } from 'react'
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
    if (status === 'idle') router.push('/create')
  }, [status, router])

  const isLoading = status === 'loading'
  const isSummaryReady = status === 'summary' || status === 'complete'
  const isComplete = status === 'complete'
  const data = partialData

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-100 px-6 md:px-8 py-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">brandkit</span>
        <div className="flex items-center gap-3 md:gap-4">
          {isComplete ? (
            <span className="text-xs text-green-600 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
              생성 완료
            </span>
          ) : (
            <span className="text-xs text-gray-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full inline-block animate-pulse" />
              생성 중...
            </span>
          )}
          <button
            onClick={() => { reset(); router.push('/create') }}
            className="text-xs md:text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← 다시 만들기
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* 로딩 상태 */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-10 h-10 border-2 border-gray-200 border-t-gray-950 rounded-full animate-spin mb-6" />
            <p className="text-gray-500 text-sm">브랜드 아이덴티티를 생성하고 있어요...</p>
            <p className="text-gray-300 text-xs mt-2">로고, 컬러, 슬로건, 폰트 순서로 완성돼요</p>
          </div>
        )}

        {isSummaryReady && (
          <>
            {/* 브랜드명 */}
            {data.brand && (
              <div className="mb-8 md:mb-10 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Brand Identity</p>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-950 mb-2">{data.brand.name}</h1>
                {data.brand.nameCandidates && (
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                    <p className="text-xs text-gray-400">후보 브랜드명:</p>
                    {data.brand.nameCandidates.map((name) => (
                      <span key={name} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                        {name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* 로고 */}
              <div className="col-span-1 md:col-span-2">
                {data.logo ? (
                  <LogoCard logo={data.logo} />
                ) : (
                  <SkeletonCard label="로고" height="h-40" />
                )}
              </div>

              {/* 컬러 */}
              {data.colors ? (
                <ColorCard colors={data.colors} />
              ) : (
                <SkeletonCard label="컬러 팔레트" height="h-48" />
              )}

              {/* 슬로건 */}
              {data.brand?.slogan ? (
                <SloganCard brand={data.brand} />
              ) : (
                <SkeletonCard label="슬로건" height="h-48" />
              )}

              {/* 폰트 */}
              <div className="col-span-1 md:col-span-2">
                {data.typography ? (
                  <FontCard typography={data.typography} colors={data.colors} />
                ) : (
                  <SkeletonCard label="폰트" height="h-32" />
                )}
              </div>
            </div>

            {/* 상세 보기 버튼 */}
            <div className="flex justify-center">
              <button
                onClick={() => router.push('/result/guidebook')}
                disabled={!isComplete}
                className={`px-8 py-3.5 rounded-xl text-sm font-medium transition-all
                  ${isComplete
                    ? 'bg-gray-950 text-white hover:bg-gray-800 cursor-pointer'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }
                `}
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
    <div className={`${height} bg-white border border-gray-100 rounded-2xl p-5 flex flex-col justify-between animate-pulse`}>
      <p className="text-xs text-gray-300">{label}</p>
      <div className="space-y-2">
        <div className="h-3 bg-gray-100 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
      </div>
    </div>
  )
}