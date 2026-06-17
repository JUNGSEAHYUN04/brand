'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useBrandStore } from '@/store/brand-store'
import LoadingAnimation from '@/components/ui/LoadingAnimation'
import PageTransition from '@/components/ui/PageTransition'

export default function LoadingScreenPage() {
  const router = useRouter()
  const { status } = useBrandStore()

  useEffect(() => {
    if (status === 'idle') router.push('/create')
    if (status === 'error') router.push('/create')
    if (status === 'complete') router.push('/result/mix')
  }, [status, router])

  return (
    <PageTransition>
      <div className="h-screen bg-white flex flex-col items-center justify-center">
        <LoadingAnimation />
      </div>
    </PageTransition>
  )
}