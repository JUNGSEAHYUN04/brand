'use client'

import { useState } from 'react'
import { useBrandStore } from '@/store/brand-store'

const AGE_GROUPS = ['10대', '20대', '30대', '40대', '50대 이상']

const GENDERS = ['전체', '남성', '여성']

const INTERESTS = [
  '패션 & 스타일', '건강 & 웰니스', '테크 & 가젯', '여행 & 모험',
  '음식 & 요리', '아트 & 문화', '스포츠 & 피트니스', '비즈니스 & 커리어',
  '육아 & 가족', '환경 & 지속가능성', '게임 & 엔터', '뷰티 & 스킨케어',
]

const LIFESTYLES = [
  '도시 직장인', '학생', '프리랜서', '자영업자', '주부',
  '액티브 시니어', 'MZ세대', '하이엔드 소비자',
]

export default function StepTarget() {
  const { formValues, setFormValues } = useBrandStore()

  const target = formValues.targetAudience || ''

  // 로컬 상태로 각 항목 관리
  const [selectedAges, setSelectedAges] = useState<string[]>([])
  const [selectedGender, setSelectedGender] = useState('')
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedLifestyle, setSelectedLifestyle] = useState('')

  // 선택값 조합해서 store에 저장
  const updateTarget = (
    ages: string[],
    gender: string,
    interests: string[],
    lifestyle: string
  ) => {
    const parts = []
    if (ages.length) parts.push(ages.join(', '))
    if (gender) parts.push(gender)
    if (lifestyle) parts.push(lifestyle)
    if (interests.length) parts.push(`${interests.join(', ')} 관심`)
    setFormValues({ targetAudience: parts.join(' / ') })
  }

  const toggleAge = (age: string) => {
    const next = selectedAges.includes(age)
      ? selectedAges.filter((a) => a !== age)
      : [...selectedAges, age]
    setSelectedAges(next)
    updateTarget(next, selectedGender, selectedInterests, selectedLifestyle)
  }

  const selectGender = (gender: string) => {
    setSelectedGender(gender)
    updateTarget(selectedAges, gender, selectedInterests, selectedLifestyle)
  }

  const toggleInterest = (interest: string) => {
    const next = selectedInterests.includes(interest)
      ? selectedInterests.filter((i) => i !== interest)
      : selectedInterests.length < 3
      ? [...selectedInterests, interest]
      : selectedInterests
    setSelectedInterests(next)
    updateTarget(selectedAges, selectedGender, next, selectedLifestyle)
  }

  const selectLifestyle = (lifestyle: string) => {
    const next = selectedLifestyle === lifestyle ? '' : lifestyle
    setSelectedLifestyle(next)
    updateTarget(selectedAges, selectedGender, selectedInterests, next)
  }

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8">
        <p className="text-sm text-gray-400 mb-1">Step 3 of 5</p>
        <h1 className="text-2xl font-bold text-gray-950 mb-2">타겟 고객</h1>
        <p className="text-gray-500 text-sm">
          브랜드의 주요 타겟 고객을 선택하세요.
        </p>
      </div>

      {/* 연령대 */}
      <div className="mb-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">연령대 (복수 선택)</p>
        <div className="flex flex-wrap gap-2">
          {AGE_GROUPS.map((age) => (
            <button
              key={age}
              onClick={() => toggleAge(age)}
              className={`px-4 py-2 text-sm rounded-full border transition-all
                ${selectedAges.includes(age)
                  ? 'bg-gray-950 text-white border-gray-950'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }
              `}
            >
              {age}
            </button>
          ))}
        </div>
      </div>

      {/* 성별 */}
      <div className="mb-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">성별</p>
        <div className="flex gap-2">
          {GENDERS.map((gender) => (
            <button
              key={gender}
              onClick={() => selectGender(gender)}
              className={`px-4 py-2 text-sm rounded-full border transition-all
                ${selectedGender === gender
                  ? 'bg-gray-950 text-white border-gray-950'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }
              `}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      {/* 라이프스타일 */}
      <div className="mb-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">라이프스타일</p>
        <div className="flex flex-wrap gap-2">
          {LIFESTYLES.map((lifestyle) => (
            <button
              key={lifestyle}
              onClick={() => selectLifestyle(lifestyle)}
              className={`px-4 py-2 text-sm rounded-full border transition-all
                ${selectedLifestyle === lifestyle
                  ? 'bg-gray-950 text-white border-gray-950'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }
              `}
            >
              {lifestyle}
            </button>
          ))}
        </div>
      </div>

      {/* 관심사 */}
      <div className="mb-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
          관심사 <span className="text-gray-300 normal-case">(최대 3개)</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((interest) => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              disabled={!selectedInterests.includes(interest) && selectedInterests.length >= 3}
              className={`px-4 py-2 text-sm rounded-full border transition-all
                ${selectedInterests.includes(interest)
                  ? 'bg-gray-950 text-white border-gray-950'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 disabled:opacity-30 disabled:cursor-not-allowed'
                }
              `}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* 선택된 타겟 미리보기 */}
      {target && (
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-xs text-gray-400 mb-1">타겟 요약</p>
          <p className="text-sm text-gray-700 font-medium">{target}</p>
        </div>
      )}
    </div>
  )
}