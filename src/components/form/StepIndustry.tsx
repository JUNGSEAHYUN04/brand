'use client'

import { useState } from 'react'
import { useBrandStore } from '@/store/brand-store'
import {
  UtensilsCrossed, Shirt, HeartPulse, Monitor, Home,
  BookOpen, Plane, Banknote, Palette, ShoppingCart,
  Dumbbell, Leaf, Gamepad2, PawPrint, Factory, Music, Pencil, X
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

const H1 = { fontFamily: 'Oswald-SemiBold, sans-serif', fontSize: '48px', fontWeight: 600, color: '#282B32', lineHeight: 1.1 }
const STEP = { fontFamily: 'SCDream4, sans-serif', fontSize: '14px', color: 'rgba(40,43,50,0.4)' }
const STEP_BOLD = { fontFamily: 'SCDream5, sans-serif', fontSize: '14px', color: '#282B32' }
const DESC = { fontFamily: 'SCDream4, sans-serif', fontSize: '15px', color: 'rgba(40,43,50,0.55)', lineHeight: '1.7' }

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
    if (customInput.trim()) setFormValues({ industry: customInput.trim() })
  }

  const isCustomSelected = showCustom || (!INDUSTRIES.find(i => i.label === selected) && !!selected)

  return (
    <div style={{ color: '#282B32' }}>
      <div className="flex items-start justify-between mb-3">
        <h1 style={H1}>Industry</h1>
        <p style={{ ...STEP, paddingTop: '8px' }}>
          <span style={STEP_BOLD}>Step 2</span> / 3
        </p>
      </div>

      <p style={{ ...DESC, marginBottom: '28px' }}>
        브랜드가 속한 업종을 선택하세요. 없으면 건너뛰어도 돼요.
      </p>

      {/* 업종 그리드 */}
      <div className="pr-1">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {INDUSTRIES.map(({ icon: Icon, label }) => {
            const isSelected = selected === label
            return (
              <button
                key={label}
                onClick={() => handleSelect(label)}
                className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl border text-left transition-all duration-150"
                style={{
                  fontFamily: 'SCDream4, sans-serif',
                  fontSize: '14px',
                  borderColor: isSelected ? '#282B32' : 'rgba(40,43,50,0.15)',
                  background: isSelected ? '#282B32' : '#fff',
                  color: isSelected ? '#fff' : '#282B32',
                }}
              >
                <Icon size={16} className="shrink-0" style={{ opacity: isSelected ? 1 : 0.45 }} />
                <span>{label}</span>
              </button>
            )
          })}

          <button
            onClick={() => setShowCustom(true)}
            className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl border text-left transition-all duration-150"
            style={{
              fontFamily: 'SCDream4, sans-serif',
              fontSize: '14px',
              borderColor: isCustomSelected ? '#282B32' : 'rgba(40,43,50,0.15)',
              borderStyle: isCustomSelected ? 'solid' : 'dashed',
              background: isCustomSelected ? '#282B32' : '#fff',
              color: isCustomSelected ? '#fff' : 'rgba(40,43,50,0.45)',
            }}
          >
            <Pencil size={16} className="shrink-0" style={{ opacity: 0.6 }} />
            <span>직접 입력</span>
          </button>
        </div>
      </div>

      {/* 직접 입력 필드 */}
      {showCustom && (
        <div className="flex gap-2 mt-4">
          <input
            type="text" value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCustomSubmit()}
            placeholder="업종을 직접 입력하세요"
            autoFocus
            style={{ fontFamily: 'SCDream4, sans-serif', fontSize: '14px', color: '#282B32' }}
            className="flex-1 px-5 py-4 border rounded-xl outline-none focus:border-[#282B32] transition-colors bg-white placeholder:text-[rgba(40,43,50,0.3)]"
            onFocus={(e) => e.target.style.borderColor = '#282B32'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(40,43,50,0.18)'}
          />
          <button
            onClick={handleCustomSubmit}
            className="px-6 py-4 rounded-xl transition-colors"
            style={{ fontFamily: 'SCDream5, sans-serif', fontSize: '14px', background: '#282B32', color: '#fff', border: 'none', cursor: 'pointer' }}
          >
            확인
          </button>
        </div>
      )}

      {selected && (
        <p style={{ fontFamily: 'SCDream4, sans-serif', fontSize: '13px', color: 'rgba(40,43,50,0.4)', marginTop: '14px' }}>
          선택됨: <span style={{ fontFamily: 'SCDream5, sans-serif', color: '#282B32' }}>{selected}</span>
        </p>
      )}
    </div>
  )
}