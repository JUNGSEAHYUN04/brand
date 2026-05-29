'use client'

import { useState } from 'react'
import { useBrandStore } from '@/store/brand-store'

const TONES = [
  {
    id: 'minimal',
    label: '미니멀 & 모던',
    description: '깔끔하고 세련된 느낌. 불필요한 요소를 제거한 본질적인 브랜드',
    keywords: ['심플', '세련된', '현대적'],
  },
  {
    id: 'bold',
    label: '강렬 & 임팩트',
    description: '강하고 대담한 느낌. 첫눈에 강렬한 인상을 남기는 브랜드',
    keywords: ['파워풀', '대담한', '강렬한'],
  },
  {
    id: 'warm',
    label: '따뜻 & 감성적',
    description: '따뜻하고 감성적인 느낌. 사람과 사람을 연결하는 브랜드',
    keywords: ['따뜻한', '감성적', '친근한'],
  },
  {
    id: 'professional',
    label: '전문적 & 신뢰감',
    description: '신뢰감 있고 전문적인 느낌. 믿을 수 있는 브랜드',
    keywords: ['신뢰', '전문적', '안정적'],
  },
  {
    id: 'playful',
    label: '유쾌 & 위트',
    description: '재미있고 유쾌한 느낌. 웃음과 즐거움을 주는 브랜드',
    keywords: ['유쾌한', '위트있는', '재미있는'],
  },
  {
    id: 'luxury',
    label: '럭셔리 & 고급',
    description: '고급스럽고 프리미엄한 느낌. 최상의 가치를 제공하는 브랜드',
    keywords: ['고급스러운', '프리미엄', '우아한'],
  },
  {
    id: 'eco',
    label: '친환경 & 자연',
    description: '자연스럽고 지속가능한 느낌. 지구와 함께하는 브랜드',
    keywords: ['친환경', '자연적', '지속가능한'],
  },
  {
    id: 'tech',
    label: '테크 & 혁신',
    description: '혁신적이고 미래지향적인 느낌. 기술로 세상을 바꾸는 브랜드',
    keywords: ['혁신적', '스마트한', '미래지향적'],
  },
]

export default function StepTone() {
  const { formValues, setFormValues } = useBrandStore()
  const [selected, setSelected] = useState(formValues.tone || '')

  const handleSelect = (tone: typeof TONES[0]) => {
    setSelected(tone.id)
    setFormValues({
      tone: `${tone.label} — ${tone.description} (키워드: ${tone.keywords.join(', ')})`,
    })
  }

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8">
        <p className="text-sm text-gray-400 mb-1">Step 4 of 5</p>
        <h1 className="text-2xl font-bold text-gray-950 mb-2">톤앤매너</h1>
        <p className="text-gray-500 text-sm">
          브랜드의 전반적인 분위기와 성격을 선택하세요.
        </p>
      </div>

      {/* 톤 그리드 */}
      <div className="grid grid-cols-2 gap-3">
        {TONES.map((tone) => {
          const isSelected = selected === tone.id
          return (
            <button
              key={tone.id}
              onClick={() => handleSelect(tone)}
              className={`flex flex-col items-start gap-2 p-4 rounded-xl border text-left transition-all
                ${isSelected
                  ? 'bg-gray-950 text-white border-gray-950'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                }
              `}
            >
              <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                {tone.label}
              </span>
              <span className={`text-xs leading-relaxed ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                {tone.description}
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {tone.keywords.map((kw) => (
                  <span
                    key={kw}
                    className={`text-xs px-2 py-0.5 rounded-full
                      ${isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-500'
                      }
                    `}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}