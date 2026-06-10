'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useBrandStore } from '@/store/brand-store'
import StepKeyword from '@/components/form/StepKeyword'
import StepIndustry from '@/components/form/StepIndustry'
import StepBrandName from '@/components/form/StepBrandName'

const STEPS = [
  { id: 1, label: 'Keywords' },
  { id: 2, label: 'Industry', optional: true },
  { id: 3, label: 'Brand Name', optional: true },
]

export default function CreatePage() {
  const router = useRouter()
  const { generate, status, formValues } = useBrandStore()
  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => {
    if (currentStep < STEPS.length) setCurrentStep((prev) => prev + 1)
  }

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1)
  }

  const handleGenerate = async () => {
    generate()
    router.push('/loading-screen')
  }

  const isLastStep = currentStep === STEPS.length
  const canNext = currentStep === 1 ? formValues.keywords.length > 0 : true

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden" style={{ color: '#282B32' }}>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 flex flex-col items-center px-8 md:px-16 overflow-hidden min-h-0">
        <div className="w-full max-w-5xl flex flex-col" style={{ height: '100vh' }}>

          {/* 스텝 콘텐츠 */}
          <div className="flex-1 py-32 min-h-0">
            {currentStep === 1 && <StepKeyword />}
            {currentStep === 2 && <StepIndustry />}
            {currentStep === 3 && <StepBrandName />}
          </div>

          {/* 하단 버튼 */}
          <div className="flex items-center justify-between py-5 shrink-0"
            style={{ borderTop: '1px solid rgba(40,43,50,0.08)', paddingBottom: '48px' }}>

            <button
              onClick={handlePrev}
              className={`transition-colors ${currentStep === 1 ? 'invisible' : ''}`}
              style={{ fontFamily: 'SCDream4, sans-serif', fontSize: '15px', color: 'rgba(40,43,50,0.45)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ← 이전으로
            </button>

            <div className="flex items-center gap-8">
              {currentStep === 2 && (
                <button
                  onClick={handleNext}
                  style={{ fontFamily: 'SCDream4, sans-serif', fontSize: '15px', color: 'rgba(40,43,50,0.45)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  건너뛰기
                </button>
              )}

              {isLastStep ? (
                <button
                  onClick={handleGenerate}
                  disabled={status === 'loading'}
                  className="transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: 'SCDream5, sans-serif',
                    fontSize: '15px',
                    background: '#282B32',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '14px 36px',
                    cursor: 'pointer',
                  }}
                >
                  {status === 'loading' ? '생성 중...' : '생성하기 →'}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!canNext}
                  className="transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: 'SCDream5, sans-serif',
                    fontSize: '15px',
                    background: '#282B32',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '14px 36px',
                    cursor: 'pointer',
                  }}
                >
                  다음 →
                </button>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}