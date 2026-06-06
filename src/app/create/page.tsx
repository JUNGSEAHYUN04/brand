'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useBrandStore } from '@/store/brand-store'
import { Check } from 'lucide-react'
import StepKeyword from '@/components/form/StepKeyword'
import StepIndustry from '@/components/form/StepIndustry'
import StepBrandName from '@/components/form/StepBrandName'

const STEPS = [
  { id: 1, label: '브랜드 키워드' },
  { id: 2, label: '업종', optional: true },
  { id: 3, label: '브랜드명', optional: true },
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
    await generate()
    router.push('/result')
  }

  const isLastStep = currentStep === STEPS.length
  const canNext = currentStep === 1 ? formValues.keywords.length > 0 : true

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* 헤더 */}
      <header className="px-6 md:px-10 py-4 border-b border-gray-200 flex items-center justify-between shrink-0">
        <span className="text-base font-bold text-gray-900">brandkit</span>
      </header>

      {/* 스텝 인디케이터 */}
      <div className="px-6 md:px-10 py-5 shrink-0">
        <div className="flex items-center justify-center max-w-lg mx-auto">
          {STEPS.map((step, index) => {
            const isCompleted = step.id < currentStep
            const isActive = step.id === currentStep
            return (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => isCompleted && setCurrentStep(step.id)}
                  className="flex items-center gap-2.5"
                  disabled={!isCompleted}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all shrink-0
                    ${isActive ? 'bg-gray-950 text-white' : ''}
                    ${isCompleted ? 'bg-gray-950 text-white' : ''}
                    ${!isActive && !isCompleted ? 'bg-gray-100 border-2 border-gray-200 text-gray-400' : ''}
                  `}>
                    {isCompleted ? <Check size={14} strokeWidth={3} /> : step.id}
                  </span>
                  <span className={`text-sm font-medium whitespace-nowrap
                    ${isActive ? 'text-gray-950' : ''}
                    ${isCompleted ? 'text-gray-600 cursor-pointer' : ''}
                    ${!isActive && !isCompleted ? 'text-gray-400' : ''}
                  `}>
                    {step.label}
                    {step.optional && <span className="text-gray-400 ml-1">선택</span>}
                  </span>
                </button>

                {index < STEPS.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className={`h-px w-16 md:w-24 transition-all
                      ${isCompleted ? 'bg-gray-950' : 'bg-gray-200'}
                    `} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 flex flex-col items-center px-6 md:px-16 overflow-hidden min-h-0">
        <div className="w-full max-w-5xl flex flex-col" style={{ height: 'calc(100vh - 160px)' }}>

          {/* 스텝 콘텐츠 */}
          <div className="flex-1 overflow-y-auto py-8 min-h-0">
            {currentStep === 1 && <StepKeyword />}
            {currentStep === 2 && <StepIndustry />}
            {currentStep === 3 && <StepBrandName />}
          </div>

          {/* 하단 버튼 */}
          <div className="flex items-center justify-between py-4 border-t border-gray-100 shrink-0">
            <button
              onClick={handlePrev}
              className={`px-6 py-3 text-base text-gray-600 hover:text-gray-900 transition-colors
                ${currentStep === 1 ? 'invisible' : ''}
              `}
            >
              ← 이전
            </button>

            <div className="flex gap-4">
              {/* 건너뛰기 — 업종(2번)만 */}
              {currentStep === 2 && (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 text-base text-gray-500 hover:text-gray-800 transition-colors"
                >
                  건너뛰기
                </button>
              )}

              {isLastStep ? (
                <button
                  onClick={handleGenerate}
                  disabled={status === 'loading'}
                  className="px-10 py-3.5 bg-gray-950 text-white text-base font-medium rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? '생성 중...' : '생성하기 →'}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!canNext}
                  className="px-10 py-3.5 bg-gray-950 text-white text-base font-medium rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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