'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useBrandStore } from '@/store/brand-store'
import Header from './Header'
import LeftPanel from './LeftPanel'
import PreviewSlider from './PreviewSlider'
import LoadingAnimation from '@/components/ui/LoadingAnimation'

export default function MixPage() {
  const router = useRouter()
  const { candidates, getMixedBrand, setBrandData, setPartialData, setIsMixed, formValues } = useBrandStore()
  
  const [isLoading, setIsLoading] = useState(false)
  // 💡 페이드아웃 상태 추가
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    if (candidates.length === 0) {
      router.push('/create')
    }
  }, [candidates.length, router])

  const mixedBrand = getMixedBrand()

  if (!mixedBrand) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>브랜드 데이터를 불러오는 중...</p>
      </div>
    )
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    setIsFadingOut(false) // 시작할 땐 페이드아웃 끄기
    
    try {
      setPartialData(mixedBrand)
      setIsMixed(true)

      const expandRes = await fetch('/api/expand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...mixedBrand,
          keywords: formValues.keywords,
          industry: formValues.industry,
          brandName: formValues.brandName,
        }),
      })

      if (!expandRes.ok) {
        const errorData = await expandRes.json()
        throw new Error(errorData.error || '확장 실패')
      }
      const fullBrand = await expandRes.json()

      let logoData = null
      try {
        const logoRes = await fetch('/api/generate-logo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            brand: fullBrand.brand,
            colors: fullBrand.colors,
            industry: formValues.industry,
          }),
        })
        if (logoRes.ok) {
          logoData = await logoRes.json()
        }
      } catch (logoErr) {
        console.error('Logo generation failed:', logoErr)
      }

      setBrandData(logoData ? { ...fullBrand, logo: logoData } : fullBrand)
      
      // 💡 [핵심] 바로 이동하지 않고 페이드아웃 상태로 변경
      setIsFadingOut(true)

      // 💡 0.5초(500ms) 대기 후 페이지 이동
      setTimeout(() => {
        router.push('/result')
      }, 500)

    } catch (error) {
      console.error('Error details:', error)
      alert(error instanceof Error ? error.message : '오류 발생')
      setIsLoading(false)
      setIsFadingOut(false)
    }
  }

  // 💡 LoadingAnimation에 isFadingOut 상태를 전달합니다
  if (isLoading) {
    return <LoadingAnimation isFadingOut={isFadingOut} />
  }

  return (
    <div style={{ background: '#f9f9fb', minHeight: '100vh' }}>
      <Header />
      <div className="pt-[88px] px-6 md:px-10">
        <div className="w-full">
          <LeftPanel mixedBrand={mixedBrand} onConfirm={handleConfirm} />
          <div className="lg:ml-[330px] lg:pl-8">
            <PreviewSlider mixedBrand={mixedBrand} />
          </div>
        </div>
      </div>
    </div>
  )
}