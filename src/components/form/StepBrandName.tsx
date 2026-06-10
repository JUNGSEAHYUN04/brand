'use client'

import { useState } from 'react'
import { useBrandStore } from '@/store/brand-store'
import { X } from 'lucide-react'

const H1 = { fontFamily: 'Oswald-SemiBold, sans-serif', fontSize: '48px', fontWeight: 600, color: '#282B32', lineHeight: 1.1 }
const STEP = { fontFamily: 'SCDream4, sans-serif', fontSize: '14px', color: 'rgba(40,43,50,0.4)' }
const STEP_BOLD = { fontFamily: 'SCDream5, sans-serif', fontSize: '14px', color: '#282B32' }
const DESC = { fontFamily: 'SCDream4, sans-serif', fontSize: '15px', color: 'rgba(40,43,50,0.55)', lineHeight: '1.7' }
const CARD_TITLE = { fontFamily: 'SCDream5, sans-serif', fontSize: '16px', color: '#282B32', marginBottom: '1px' }
const CARD_DESC = { fontFamily: 'SCDream4, sans-serif', fontSize: '13px', color: 'rgba(40,43,50,0.5)', lineHeight: '1.6', marginTop: '2px' }

const activeCard = { borderColor: '#282B32', background: '#fff' }
const inactiveCard = { borderColor: 'rgba(40,43,50,0.12)', background: 'rgba(40,43,50,0.03)' }

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
    <div style={{ color: '#282B32' }}>
      <div className="flex items-start justify-between mb-3">
        <h1 style={H1}>Brand Name</h1>
        <p style={{ ...STEP, paddingTop: '8px' }}>
          <span style={STEP_BOLD}>Step 3</span> / 3
        </p>
      </div>

      <p style={{ ...DESC, marginBottom: '28px' }}>
        이미 브랜드명이 있다면 입력하세요. 없으면 건너뛰어도 돼요 — AI가 키워드를 바탕으로 제안해드려요.
      </p>

      {/* 입력 필드 */}
      <div className="relative">
        <input
          type="text" value={input} onChange={handleChange}
          placeholder="브랜드명을 입력하세요"
          style={{ fontFamily: 'SCDream4, sans-serif', fontSize: '15px', color: '#282B32' }}
          className="w-full px-5 py-5 border rounded-2xl outline-none focus:border-[#282B32] transition-colors bg-white placeholder:text-[rgba(40,43,50,0.3)]"
          onFocus={(e) => e.target.style.borderColor = '#282B32'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(40,43,50,0.18)'}
        />
        {!input && (
          <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ fontFamily: 'SCDream3, sans-serif', fontSize: '12px', color: 'rgba(40,43,50,0.3)' }}>
            (한글, 영어 다 가능)
          </span>
        )}
        {input && (
          <button onClick={handleClear} className="absolute right-5 top-1/2 -translate-y-1/2 transition-colors"
            style={{ color: 'rgba(40,43,50,0.3)', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={15} />
          </button>
        )}
      </div>

      {/* 안내 카드 */}
      <div className="flex flex-col gap-2" style={{ marginTop: '40px' }}>
        <div className="pl-6 pr-12 py-6 rounded-2xl border transition-all duration-150"
          style={input ? activeCard : inactiveCard}>
          <p style={CARD_TITLE}>브랜드명 직접 입력</p>
          <p style={CARD_DESC}>입력한 브랜드명으로 브랜드의 로고, 슬로건, 컬러, 폰트 등 전체 아이덴티티를 생성해요</p>
        </div>

        <div className="pl-6 pr-12 py-6 rounded-2xl border transition-all duration-150"
          style={!input ? activeCard : inactiveCard}>
          <p style={CARD_TITLE}>AI의 브랜드명 추천</p>
          <p style={CARD_DESC}>입력한 키워드, 업종을 분석해서 브랜드명 후보 3개를 제안하고 그 중 가장 적합한 브랜드명으로 디자인 가이드북을 생성해요</p>
        </div>
      </div>
    </div>
  )
}