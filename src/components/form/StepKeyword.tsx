'use client'

import { useState } from 'react'
import { useBrandStore } from '@/store/brand-store'

const KEYWORD_SUGGESTIONS = [
  '혁신적인', '신뢰할 수 있는', '친환경', '럭셔리', '미니멀',
  '따뜻한', '전문적인', '젊은', '대담한', '감성적인',
  '글로벌', '로컬', '지속가능한', '스마트한', '창의적인',
  '활기찬', '고급스러운', '심플한', '트렌디한', '클래식한',
]

export default function StepKeyword() {
  const { formValues, setFormValues } = useBrandStore()
  const [input, setInput] = useState('')

  const keywords = formValues.keywords || []

  const addKeyword = (keyword: string) => {
    const trimmed = keyword.trim()
    if (!trimmed || keywords.includes(trimmed) || keywords.length >= 5) return
    setFormValues({ keywords: [...keywords, trimmed] })
    setInput('')
  }

  const removeKeyword = (keyword: string) => {
    setFormValues({ keywords: keywords.filter((k) => k !== keyword) })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addKeyword(input)
    }
    if (e.key === 'Backspace' && input === '' && keywords.length > 0) {
      removeKeyword(keywords[keywords.length - 1])
    }
  }

  return (
    <div>
      <div className="mb-10">
        <p className="text-base text-gray-500 mb-2">Step 1 of 3</p>
        <h1 className="text-3xl font-bold text-gray-950 mb-3">브랜드 키워드</h1>
        <p className="text-gray-600 text-base">
          브랜드를 표현하는 키워드를 입력하세요. 최대 5개까지 추가할 수 있어요.
        </p>
      </div>

      {/* 키워드 입력 */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 p-4 border border-gray-200 rounded-xl bg-white min-h-[60px] focus-within:border-gray-950 transition-colors">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="flex items-center gap-2 px-4 py-1.5 bg-gray-950 text-white text-base rounded-full"
            >
              {keyword}
              <button
                onClick={() => removeKeyword(keyword)}
                className="hover:opacity-70 transition-opacity"
              >
                ✕
              </button>
            </span>
          ))}
          {keywords.length < 5 && (
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={keywords.length === 0 ? '키워드 입력 후 Enter...' : '+ 추가'}
              className="flex-1 min-w-[150px] outline-none text-base text-gray-800 placeholder:text-gray-400 bg-transparent"
            />
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">{keywords.length}/5개 선택됨</p>
      </div>

      {/* 추천 키워드 */}
      <div>
        <p className="text-sm text-gray-600 font-medium mb-4">추천 키워드</p>
        <div className="flex flex-wrap gap-3">
          {KEYWORD_SUGGESTIONS.map((keyword) => {
            const isSelected = keywords.includes(keyword)
            return (
              <button
                key={keyword}
                onClick={() => isSelected ? removeKeyword(keyword) : addKeyword(keyword)}
                disabled={!isSelected && keywords.length >= 5}
                className={`px-4 py-2 text-base rounded-full border transition-all
                  ${isSelected
                    ? 'bg-gray-950 text-white border-gray-950'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed'
                  }
                `}
              >
                {keyword}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}