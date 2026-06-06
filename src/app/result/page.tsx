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
      <header className="bg-white border-b border-gray-200 px-10 md:px-20 py-5 flex items-center justify-between">
        <span className="text-base font-bold text-gray-900">brandkit</span>
        <div className="flex items-center gap-4">
          {isComplete ? (
            <span className="text-sm text-green-700 font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
              생성 완료
            </span>
          ) : (
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-full inline-block animate-pulse" />
              생성 중...
            </span>
          )}
          <button
            onClick={() => { reset(); router.push('/create') }}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← 다시 만들기
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16">
        {/* 로딩 상태 */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-12 h-12 border-2 border-gray-200 border-t-gray-950 rounded-full animate-spin mb-8" />
            <p className="text-gray-700 text-lg">브랜드 아이덴티티를 생성하고 있어요...</p>
            <p className="text-gray-500 text-base mt-2">컬러, 슬로건, 폰트 순서로 완성돼요</p>
          </div>
        )}

        {isSummaryReady && (
          <>
            {/* 브랜드명 */}
            {data.brand && (
              <div className="mb-10 md:mb-14 text-center">
                <p className="text-sm text-gray-500 uppercase tracking-widest mb-3">Brand Identity</p>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-950 mb-3">{data.brand.name}</h1>
                {data.brand.nameCandidates && (
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                    <p className="text-sm text-gray-600">후보 브랜드명:</p>
                    {data.brand.nameCandidates.map((name) => (
                      <span key={name} className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {/* 로고 */}
              <div className="col-span-1 md:col-span-2">
                {data.logo ? (
                  <LogoCard logo={data.logo} />
                ) : (
                  <SkeletonCard label="로고" height="h-48" />
                )}
              </div>

              {/* 컬러 */}
              {data.colors ? (
                <ColorCard colors={data.colors} />
              ) : (
                <SkeletonCard label="컬러 팔레트" height="h-56" />
              )}

              {/* 슬로건 */}
              {data.brand?.slogan ? (
                <SloganCard brand={data.brand} />
              ) : (
                <SkeletonCard label="슬로건" height="h-56" />
              )}

              {/* 폰트 */}
              <div className="col-span-1 md:col-span-2">
                {data.typography ? (
                  <FontCard typography={data.typography} colors={data.colors} />
                ) : (
                  <SkeletonCard label="폰트" height="h-40" />
                )}
              </div>
            </div>

            {/* 상세 보기 버튼 */}
            <div className="flex justify-center">
              <button
                onClick={() => router.push('/result/guidebook')}
                disabled={!isComplete}
                className={`px-12 py-4 rounded-xl text-base font-medium transition-all
                  ${isComplete
                    ? 'bg-gray-950 text-white hover:bg-gray-800 cursor-pointer'
                    : 'bg-gray-100 text-gray-500 cursor-not-allowed'
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
    <div className={`${height} bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between animate-pulse`}>
      <p className="text-sm text-gray-500">{label}</p>
      <div className="space-y-3">
        <div className="h-4 bg-gray-100 rounded-full w-3/4" />
        <div className="h-4 bg-gray-100 rounded-full w-1/2" />
      </div>
    </div>
  )
}