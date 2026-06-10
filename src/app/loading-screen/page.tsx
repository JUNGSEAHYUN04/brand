'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useBrandStore } from '@/store/brand-store'
import LoadingAnimation from '@/components/ui/LoadingAnimation'

export default function LoadingScreenPage() {
  const router = useRouter()
  const { status, brandData } = useBrandStore()

  useEffect(() => {
    if (status === 'idle') router.push('/create')
    if (status === 'error') router.push('/create')
    if (status === 'complete' && brandData?.logo?.url) router.push('/result')
  }, [status, brandData, router])

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center">
      <LoadingAnimation />
    </div>
  )
}