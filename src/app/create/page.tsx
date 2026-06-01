'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useBrandStore } from '@/store/brand-store'
import StepKeyword from '@/components/form/StepKeyword'
import StepIndustry from '@/components/form/StepIndustry'
import StepBrandName from '@/components/form/StepBrandName'

const STEPS = [
  { id: 1, key: 'keyword', label: '브랜드 키워드' },
  { id: 2, key: 'industry', label: '업종', optional: true },
  { id: 3, key: 'brandName', label: '브랜드명', optional: true },
]

export default function CreatePage() {
  const router = useRouter()
  const { generate, status } = useBrandStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [menuOpen, setMenuOpen] = useState(false)

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

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* 모바일 헤더 */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
        <span className="text-sm font-semibold text-gray-900">brandkit</span>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-sm text-gray-500"
        >
          {menuOpen ? '닫기' : `${currentStep}/${STEPS.length} ☰`}
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4">
          <nav className="space-y-1">
            {STEPS.map((step) => {
              const isCompleted = step.id < currentStep
              const isActive = step.id === currentStep
              const isLocked = step.id > currentStep
              return (
                <button
                  key={step.id}
                  onClick={() => { if (isCompleted) { setCurrentStep(step.id); setMenuOpen(false) } }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all
                    ${isActive ? 'bg-gray-950 text-white font-medium' : ''}
                    ${isCompleted ? 'text-gray-700 hover:bg-gray-50' : ''}
                    ${isLocked ? 'text-gray-300 cursor-not-allowed' : ''}
                  `}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0
                    ${isActive ? 'bg-white text-gray-950 font-bold' : ''}
                    ${isCompleted ? 'bg-gray-950 text-white' : ''}
                    ${isLocked ? 'border border-gray-200 text-gray-300' : ''}
                  `}>
                    {isCompleted ? '✓' : step.id}
                  </span>
                  <span>{step.label}</span>
                  {step.optional && <span className="ml-auto text-xs text-gray-400">선택</span>}
                </button>
              )
            })}
          </nav>
        </div>
      )}

      {/* 사이드 네비게이션 — 데스크탑만 */}
      <aside className="hidden md:flex w-64 border-r border-gray-100 bg-white flex-col justify-between py-10 px-6 shrink-0">
        <div>
          <div className="mb-12">
            <span className="text-sm font-semibold tracking-tight text-gray-900">brandkit</span>
          </div>
          <nav className="space-y-1">
            {STEPS.map((step) => {
              const isCompleted = step.id < currentStep
              const isActive = step.id === currentStep
              const isLocked = step.id > currentStep
              return (
                <button
                  key={step.id}
                  onClick={() => isCompleted && setCurrentStep(step.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
                    ${isActive ? 'bg-gray-950 text-white font-medium' : ''}
                    ${isCompleted ? 'text-gray-700 hover:bg-gray-50 cursor-pointer' : ''}
                    ${isLocked ? 'text-gray-300 cursor-not-allowed' : ''}
                  `}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0
                    ${isActive ? 'bg-white text-gray-950 font-bold' : ''}
                    ${isCompleted ? 'bg-gray-950 text-white' : ''}
                    ${isLocked ? 'border border-gray-200 text-gray-300' : ''}
                  `}>
                    {isCompleted ? '✓' : step.id}
                  </span>
                  <span>{step.label}</span>
                  {step.optional && <span className="ml-auto text-xs text-gray-400">선택</span>}
                </button>
              )
            })}
          </nav>
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>진행률</span>
            <span>{Math.round(((currentStep - 1) / STEPS.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1">
            <div
              className="bg-gray-950 h-1 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep - 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 py-10 bg-gray-50">
        <div className="w-full max-w-xl">
          <div className="mb-10">
            {currentStep === 1 && <StepKeyword />}
            {currentStep === 2 && <StepIndustry />}
            {currentStep === 3 && <StepBrandName />}
          </div>

          {/* 하단 버튼 */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrev}
              className={`px-5 py-2.5 text-sm text-gray-500 hover:text-gray-900 transition-colors
                ${currentStep === 1 ? 'invisible' : ''}
              `}
            >
              ← 이전
            </button>

            <div className="flex gap-3">
              {/* 2, 3스텝은 스킵 가능 */}
              {currentStep > 1 && (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
                >
                  건너뛰기
                </button>
              )}

              {isLastStep ? (
                <button
                  onClick={handleGenerate}
                  disabled={status === 'loading'}
                  className="px-6 py-2.5 bg-gray-950 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? '생성 중...' : '생성하기 →'}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-gray-950 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
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