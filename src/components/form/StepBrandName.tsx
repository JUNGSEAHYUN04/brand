'use client'

import { useState } from 'react'
import { useBrandStore } from '@/store/brand-store'
import { Pencil, Sparkles, X } from 'lucide-react'

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
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <p className="text-base text-gray-500">Step 3 of 3</p>
          <span className="text-sm px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full">선택</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-950 mb-3">브랜드명</h1>
        <p className="text-gray-600 text-base">
          이미 브랜드명이 있다면 입력하세요. 없으면 건너뛰어도 돼요 — AI가 키워드를 바탕으로 제안해드려요.
        </p>
      </div>

      {/* 입력 필드 */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="브랜드명을 입력하세요"
            className="w-full px-5 py-4 border border-gray-200 rounded-xl text-base outline-none focus:border-gray-950 transition-colors pr-12 text-gray-900"
          />
          {input && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          영문, 한글, 숫자 모두 가능해요
        </p>
      </div>

      {/* 안내 카드 */}
      <div className="space-y-4">
        <div className={`p-5 rounded-xl border transition-all ${
          input ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50'
        }`}>
          <div className="flex items-start gap-4">
            <Pencil size={20} className="text-gray-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-base font-medium text-gray-900 mb-1">브랜드명 직접 입력</p>
              <p className="text-sm text-gray-600">
                입력한 브랜드명으로 로고, 슬로건, 컬러 등 전체 아이덴티티를 생성해요.
              </p>
            </div>
            {input && (
              <span className="ml-auto text-sm px-3 py-1 bg-gray-950 text-white rounded-full shrink-0">
                선택됨
              </span>
            )}
          </div>
        </div>

        <div className={`p-5 rounded-xl border transition-all ${
          !input ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50'
        }`}>
          <div className="flex items-start gap-4">
            <Sparkles size={20} className="text-gray-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-base font-medium text-gray-900 mb-1">AI 브랜드명 추천</p>
              <p className="text-sm text-gray-600">
                입력한 키워드, 업종을 분석해서 브랜드명 후보 3개를 제안하고 가장 적합한 1개로 가이드북을 생성해요.
              </p>
            </div>
            {!input && (
              <span className="ml-auto text-sm px-3 py-1 bg-gray-950 text-white rounded-full shrink-0">
                선택됨
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}