'use client'

import { useState } from 'react'
import { useBrandStore } from '@/store/brand-store'

const KEYWORD_SUGGESTIONS = [
  '혁신적인', '신뢰할 수 있는', '친환경', '럭셔리', '미니멀',
  '따뜻한', '전문적인', '젊은', '대담한', '감성적인',
  '글로벌', '로컬', '지속가능한', '스마트한', '창의적인',
  '활기찬', '고급스러운', '심플한', '트렌디한', '클래식한',
]

const H1 = { fontFamily: 'Oswald-SemiBold, sans-serif', fontSize: '48px', fontWeight: 600, color: '#282B32', lineHeight: 1.1 }
const STEP = { fontFamily: 'SCDream4, sans-serif', fontSize: '14px', color: 'rgba(40,43,50,0.4)' }
const STEP_BOLD = { fontFamily: 'SCDream5, sans-serif', fontSize: '14px', color: '#282B32' }
const DESC = { fontFamily: 'SCDream4, sans-serif', fontSize: '15px', color: 'rgba(40,43,50,0.55)', lineHeight: '1.7' }
const LABEL = { fontFamily: 'SCDream5, sans-serif', fontSize: '13px', color: 'rgba(40,43,50,0.4)', letterSpacing: '0.03em' }
const TAG_ACTIVE = { fontFamily: 'SCDream4, sans-serif', fontSize: '14px', background: '#282B32', color: '#fff' }
const TAG_INACTIVE = { fontFamily: 'SCDream4, sans-serif', fontSize: '14px', background: '#fff', color: '#282B32' }
const HINT = { fontFamily: 'SCDream4, sans-serif', fontSize: '13px', color: 'rgba(40,43,50,0.35)' }

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
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addKeyword(input) }
    if (e.key === 'Backspace' && input === '' && keywords.length > 0) removeKeyword(keywords[keywords.length - 1])
  }

  return (
    <div style={{ color: '#282B32' }}>
      <div className="flex items-start justify-between mb-3">
        <h1 style={H1}>Keywords</h1>
        <p style={{ ...STEP, paddingTop: '8px' }}>
          <span style={STEP_BOLD}>Step 1</span> / 3
        </p>
      </div>

      <p style={{ ...DESC, marginBottom: '28px' }}>
        브랜드를 표현하는 키워드를 입력하세요. 최대 5개까지 추가할 수 있어요.
      </p>

      {/* 키워드 입력창 */}
      <div
        className="flex flex-wrap gap-2 px-4 py-3.5 border rounded-2xl bg-white min-h-[56px] focus-within:border-[#282B32] transition-colors mb-2"
        style={{ borderColor: 'rgba(40,43,50,0.18)' }}
      >
        {keywords.map((keyword) => (
          <span key={keyword} className="flex items-center gap-1.5 px-4 py-1.5 rounded-full" style={TAG_ACTIVE}>
            {keyword}
            <button onClick={() => removeKeyword(keyword)} style={{ opacity: 0.55, lineHeight: 1, fontSize: '12px' }}
              className="hover:opacity-100 transition-opacity">✕</button>
          </span>
        ))}
        {keywords.length < 5 && (
          <input
            type="text" value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={keywords.length === 0 ? '키워드 입력 후 Enter' : '+ 추가'}
            style={{ fontFamily: 'SCDream4, sans-serif', fontSize: '14px', color: '#282B32' }}
            className="flex-1 min-w-[140px] outline-none bg-transparent placeholder:text-[rgba(40,43,50,0.3)]"
          />
        )}
      </div>
      <p style={{ ...HINT, marginBottom: '32px' }}>{keywords.length} / 5개 선택됨</p>

      {/* 추천 키워드 */}
      <p style={{ ...LABEL, marginBottom: '14px' }}>추천 키워드</p>
      <div className="flex flex-wrap gap-2">
        {KEYWORD_SUGGESTIONS.map((keyword) => {
          const isSelected = keywords.includes(keyword)
          return (
            <button
              key={keyword}
              onClick={() => isSelected ? removeKeyword(keyword) : addKeyword(keyword)}
              disabled={!isSelected && keywords.length >= 5}
              className="px-4 py-2 rounded-full border transition-all duration-150 disabled:opacity-25 disabled:cursor-not-allowed"
              style={{
                ...isSelected ? TAG_ACTIVE : TAG_INACTIVE,
                borderColor: isSelected ? '#282B32' : 'rgba(40,43,50,0.15)',
              }}
            >
              {keyword}
            </button>
          )
        })}
      </div>
    </div>
  )
}