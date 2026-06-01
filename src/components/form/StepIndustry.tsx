'use client'

import { useState } from 'react'
import { useBrandStore } from '@/store/brand-store'

const INDUSTRIES = [
  { emoji: '🍽️', label: '푸드 & 음료' },
  { emoji: '👗', label: '패션 & 뷰티' },
  { emoji: '💊', label: '헬스 & 의료' },
  { emoji: '💻', label: 'IT & 테크' },
  { emoji: '🏠', label: '인테리어 & 부동산' },
  { emoji: '📚', label: '교육 & 이러닝' },
  { emoji: '✈️', label: '여행 & 레저' },
  { emoji: '💰', label: '금융 & 핀테크' },
  { emoji: '🎨', label: '크리에이티브 & 디자인' },
  { emoji: '🛒', label: '이커머스 & 리테일' },
  { emoji: '🏋️', label: '스포츠 & 피트니스' },
  { emoji: '🌿', label: '친환경 & 지속가능' },
  { emoji: '🎮', label: '게임 & 엔터테인먼트' },
  { emoji: '🐾', label: '펫 & 동물' },
  { emoji: '🏭', label: 'B2B & 제조' },
  { emoji: '🎵', label: '음악 & 아트' },
]

export default function StepIndustry() {
  const { formValues, setFormValues } = useBrandStore()
  const [customInput, setCustomInput] = useState('')
  const [showCustom, setShowCustom] = useState(false)

  const selected = formValues.industry || ''

  const handleSelect = (label: string) => {
    setFormValues({ industry: label })
    setShowCustom(false)
  }

  const handleCustomSubmit = () => {
    if (customInput.trim()) {
      setFormValues({ industry: customInput.trim() })
    }
  }

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8">
  <div className="flex items-center gap-2 mb-1">
    <p className="text-sm text-gray-400">Step 2 of 3</p>
    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full">선택</span>
  </div>
  <h1 className="text-2xl font-bold text-gray-950 mb-2">업종</h1>
  <p className="text-gray-500 text-sm">
    브랜드가 속한 업종을 선택하세요. 없으면 건너뛰어도 돼요.
  </p>
</div>

      {/* 업종 그리드 */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {INDUSTRIES.map((industry) => {
          const isSelected = selected === industry.label
          return (
            <button
              key={industry.label}
              onClick={() => handleSelect(industry.label)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all
                ${isSelected
                  ? 'bg-gray-950 text-white border-gray-950'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                }
              `}
            >
              <span className="text-lg">{industry.emoji}</span>
              <span className="font-medium">{industry.label}</span>
            </button>
          )
        })}

        {/* 직접 입력 */}
        <button
          onClick={() => setShowCustom(true)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all
            ${showCustom || (!INDUSTRIES.find(i => i.label === selected) && selected)
              ? 'bg-gray-950 text-white border-gray-950'
              : 'bg-white text-gray-500 border-gray-200 border-dashed hover:border-gray-400'
            }
          `}
        >
          <span className="text-lg">✏️</span>
          <span>직접 입력</span>
        </button>
      </div>

      {/* 직접 입력 필드 */}
      {showCustom && (
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
            placeholder="업종을 직접 입력하세요"
            autoFocus
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-gray-950 transition-colors"
          />
          <button
            onClick={handleCustomSubmit}
            className="px-4 py-2.5 bg-gray-950 text-white text-sm rounded-xl hover:bg-gray-800 transition-colors"
          >
            확인
          </button>
        </div>
      )}

      {/* 선택된 업종 표시 */}
      {selected && (
        <p className="text-xs text-gray-400 mt-3">
          선택됨: <span className="text-gray-700 font-medium">{selected}</span>
        </p>
      )}
    </div>
  )
}