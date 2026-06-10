'use client'

import { useEffect } from 'react'
import { Typography, Colors } from '@/lib/types'

interface Props {
  typography: Typography
  colors?: Colors
}

const F4 = 'SCDream4, sans-serif'
const F5 = 'SCDream5, sans-serif'

export default function FontCard({ typography, colors }: Props) {
  const { fonts, scale } = typography

  useEffect(() => {
    const fontNames = [fonts.heading, fonts.body, fonts.mono]
      .filter(Boolean)
      .map((f) => f.replace(/ /g, '+'))
      .join('&family=')

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${fontNames}&display=swap`
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [fonts])

  const primaryColor = colors?.primary?.hex || '#282B32'

  return (
    <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid rgba(40,43,50,0.08)' }}>

      <div className="mb-6">
        <p style={{ fontFamily: F4, fontSize: '11px', color: 'rgba(40,43,50,0.7)', letterSpacing: '0.1em' }}>
          TYPOGRAPHY
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {/* Heading */}
        <div className="p-4 rounded-xl" style={{ background: 'rgba(40,43,50,0.03)' }}>
          <p style={{ fontFamily: F4, fontSize: '11px', color: 'rgba(40,43,50,0.45)', marginBottom: '12px' }}>Heading</p>
          <p className="text-2xl font-bold leading-tight mb-2 truncate"
            style={{ fontFamily: fonts.heading, color: primaryColor }}>
            {fonts.heading}
          </p>
          <p className="text-xs leading-relaxed" style={{ fontFamily: fonts.heading, color: 'rgba(40,43,50,0.5)' }}>
            ABCDEFGHIJKLM<br />NOPQRSTUVWXYZ
          </p>
        </div>

        {/* Body */}
        <div className="p-4 rounded-xl" style={{ background: 'rgba(40,43,50,0.03)' }}>
          <p style={{ fontFamily: F4, fontSize: '11px', color: 'rgba(40,43,50,0.45)', marginBottom: '12px' }}>Body</p>
          <p className="text-2xl font-bold leading-tight mb-2 truncate"
            style={{ fontFamily: fonts.body, color: '#282B32' }}>
            {fonts.body}
          </p>
          <p className="text-xs leading-relaxed" style={{ fontFamily: fonts.body, color: 'rgba(40,43,50,0.5)' }}>
            The quick brown fox<br />jumps over the lazy dog
          </p>
        </div>

        {/* Mono */}
        <div className="p-4 rounded-xl" style={{ background: 'rgba(40,43,50,0.03)' }}>
          <p style={{ fontFamily: F4, fontSize: '11px', color: 'rgba(40,43,50,0.45)', marginBottom: '12px' }}>Mono</p>
          <p className="text-xl font-bold leading-tight mb-2 truncate"
            style={{ fontFamily: fonts.mono, color: '#282B32' }}>
            {fonts.mono}
          </p>
          <p className="text-xs leading-relaxed" style={{ fontFamily: fonts.mono, color: 'rgba(40,43,50,0.5)' }}>
            const brand =<br />'identity'
          </p>
        </div>

        {/* Type Scale */}
        <div className="p-4 rounded-xl" style={{ background: 'rgba(40,43,50,0.03)' }}>
          <p style={{ fontFamily: F4, fontSize: '11px', color: 'rgba(40,43,50,0.45)', marginBottom: '12px' }}>Type Scale</p>
          <div className="space-y-1.5">
            {[
              { label: 'Display', data: scale.display },
              { label: 'H1',      data: scale.h1 },
              { label: 'H2',      data: scale.h2 },
              { label: 'H3',      data: scale.h3 },
              { label: 'Body L',  data: scale.bodyL },
              { label: 'Body M',  data: scale.bodyM },
              { label: 'Caption', data: scale.caption },
            ].map(({ label, data }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="truncate flex-1" style={{
                  fontFamily: fonts.heading,
                  fontSize: `${Math.min(data.size, 16)}px`,
                  fontWeight: data.weight,
                  lineHeight: data.lineHeight,
                  color: '#282B32',
                }}>
                  {label}
                </span>
                <span style={{ fontFamily: F4, fontSize: '11px', color: 'rgba(40,43,50,0.4)', marginLeft: '8px', flexShrink: 0 }}>
                  {data.size}px
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}