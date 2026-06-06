'use client'

import { useState } from 'react'
import { useBrandStore } from '@/store/brand-store'
import {
  UtensilsCrossed, Shirt, HeartPulse, Monitor, Home,
  BookOpen, Plane, Banknote, Palette, ShoppingCart,
  Dumbbell, Leaf, Gamepad2, PawPrint, Factory, Music, Pencil
} from 'lucide-react'

const INDUSTRIES = [
  { icon: UtensilsCrossed, label: '푸드 & 음료' },
  { icon: Shirt, label: '패션 & 뷰티' },
  { icon: HeartPulse, label: '헬스 & 의료' },
  { icon: Monitor, label: 'IT & 테크' },
  { icon: Home, label: '인테리어 & 부동산' },
  { icon: BookOpen, label: '교육 & 이러닝' },
  { icon: Plane, label: '여행 & 레저' },
  { icon: Banknote, label: '금융 & 핀테크' },
  { icon: Palette, label: '크리에이티브 & 디자인' },
  { icon: ShoppingCart, label: '이커머스 & 리테일' },
  { icon: Dumbbell, label: '스포츠 & 피트니스' },
  { icon: Leaf, label: '친환경 & 지속가능' },
  { icon: Gamepad2, label: '게임 & 엔터테인먼트' },
  { icon: PawPrint, label: '펫 & 동물' },
  { icon: Factory, label: 'B2B & 제조' },
  { icon: Music, label: '음악 & 아트' },
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
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <p className="text-base text-gray-500">Step 2 of 3</p>
          <span className="text-sm px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full">선택</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-950 mb-3">업종</h1>
        <p className="text-gray-600 text-base">
          브랜드가 속한 업종을 선택하세요. 없으면 건너뛰어도 돼요.
        </p>
      </div>

      {/* 업종 그리드 — 스크롤 가능 */}
      <div className="overflow-y-auto max-h-[420px] pr-1">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {INDUSTRIES.map((industry) => {
            const isSelected = selected === industry.label
            const Icon = industry.icon
            return (
              <button
                key={industry.label}
                onClick={() => handleSelect(industry.label)}
                className={`flex items-center gap-3 px-5 py-4 rounded-xl border text-base text-left transition-all
                  ${isSelected
                    ? 'bg-gray-950 text-white border-gray-950'
                    : 'bg-white text-gray-800 border-gray-200 hover:border-gray-500'
                  }
                `}
              >
                <Icon size={20} className="shrink-0" />
                <span className="font-medium">{industry.label}</span>
              </button>
            )
          })}

          <button
            onClick={() => setShowCustom(true)}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl border text-base text-left transition-all
              ${showCustom || (!INDUSTRIES.find(i => i.label === selected) && selected)
                ? 'bg-gray-950 text-white border-gray-950'
                : 'bg-white text-gray-700 border-gray-200 border-dashed hover:border-gray-500'
              }
            `}
          >
            <Pencil size={20} className="shrink-0" />
            <span>직접 입력</span>
          </button>
        </div>
      </div>

      {/* 직접 입력 필드 */}
      {showCustom && (
        <div className="flex gap-3 mt-4">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
            placeholder="업종을 직접 입력하세요"
            autoFocus
            className="flex-1 px-5 py-3 border border-gray-200 rounded-xl text-base outline-none focus:border-gray-950 transition-colors text-gray-800"
          />
          <button
            onClick={handleCustomSubmit}
            className="px-6 py-3 bg-gray-950 text-white text-base rounded-xl hover:bg-gray-800 transition-colors"
          >
            확인
          </button>
        </div>
      )}

      {selected && (
        <p className="text-sm text-gray-500 mt-4">
          선택됨: <span className="text-gray-800 font-medium">{selected}</span>
        </p>
      )}
    </div>
  )
}