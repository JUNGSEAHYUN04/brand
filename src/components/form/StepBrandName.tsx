'use client'

import { useState } from 'react'
import { useBrandStore } from '@/store/brand-store'

export default function StepBrandName() {
  const { formValues, setFormValues } = useBrandStore()
  const [input, setInput] = useState(formValues.brandName || '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setFormValues({ brandName: e.target.value })
  }

  const handleClear = () => {
    setInput('')
    setFormValues({ brandName: '' })
  }

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm text-gray-400">Step 5 of 5</p>
          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full">선택</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-950 mb-2">브랜드명</h1>
        <p className="text-gray-500 text-sm">
          이미 브랜드명이 있다면 입력하세요. 없으면 건너뛰어도 돼요 — AI가 키워드를 바탕으로 제안해드려요.
        </p>
      </div>

      {/* 입력 필드 */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="브랜드명을 입력하세요"
            className="w-full px-4 py-3.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-gray-950 transition-colors pr-10"
          />
          {input && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          영문, 한글, 숫자 모두 가능해요
        </p>
      </div>

      {/* 안내 카드 */}
      <div className="space-y-3">
        <div className={`p-4 rounded-xl border transition-all ${
          input ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50'
        }`}>
          <div className="flex items-start gap-3">
            <span className="text-lg">✏️</span>
            <div>
              <p className="text-sm font-medium text-gray-800 mb-0.5">브랜드명 직접 입력</p>
              <p className="text-xs text-gray-400">
                입력한 브랜드명으로 로고, 슬로건, 컬러 등 전체 아이덴티티를 생성해요.
              </p>
            </div>
            {input && (
              <span className="ml-auto text-xs px-2 py-0.5 bg-gray-950 text-white rounded-full shrink-0">
                선택됨
              </span>
            )}
          </div>
        </div>

        <div className={`p-4 rounded-xl border transition-all ${
          !input ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50'
        }`}>
          <div className="flex items-start gap-3">
            <span className="text-lg">✨</span>
            <div>
              <p className="text-sm font-medium text-gray-800 mb-0.5">AI 브랜드명 추천</p>
              <p className="text-xs text-gray-400">
                입력한 키워드, 업종, 타겟을 분석해서 브랜드명 후보 3개를 제안하고 가장 적합한 1개로 가이드북을 생성해요.
              </p>
            </div>
            {!input && (
              <span className="ml-auto text-xs px-2 py-0.5 bg-gray-950 text-white rounded-full shrink-0">
                선택됨
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}