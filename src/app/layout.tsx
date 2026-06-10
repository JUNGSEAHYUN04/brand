import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AnimatePresence } from 'framer-motion'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'brandkit',
  description: 'AI 브랜드 아이덴티티 생성기',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div>
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </div>
      </body>
    </html>
  )
}