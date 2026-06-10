import { Spacing as SpacingType } from '@/lib/types'
import { buildFontStyle } from '@/lib/svg-generators/font-import'

function xe(s: string): string {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')
}

const C_MAIN         = '#282B32'
const C_SUB          = 'rgba(40,43,50,0.8)'
const C_MUTED        = 'rgba(40,43,50,0.6)'
const C_LABEL        = 'rgba(40,43,50,0.75)'
const C_BORDER       = 'rgba(40,43,50,0.2)'
const C_BORDER_LIGHT = 'rgba(40,43,50,0.1)'
const C_BG_SOFT      = 'rgba(40,43,50,0.03)'
const C_BG_MUTED     = 'rgba(40,43,50,0.05)'
const C_RED          = 'rgba(220,38,38,0.06)'
const C_RED_BORDER   = 'rgba(220,38,38,0.15)'
const PAD = 40, W = 960
const FONT4 = 'SCDream4,sans-serif'
const FONT5 = 'SCDream5,sans-serif'
const FONT6 = 'SCDream6,sans-serif'
const FONT7 = 'SCDream7,sans-serif'

const t = (s:string,x:number,y:number,sz:number,w:number,fill:string,fam=FONT4) =>
  `<text x="${x}" y="${y}" font-family="${xe(fam)}" font-size="${sz}" font-weight="${w}" fill="${fill}">${xe(s)}</text>`
const tm = (s:string,x:number,y:number,sz:number,w:number,fill:string,fam=FONT4) =>
  `<text x="${x}" y="${y}" font-family="${xe(fam)}" font-size="${sz}" font-weight="${w}" fill="${fill}" text-anchor="middle">${xe(s)}</text>`
const sLbl = (s:string,y:number) =>
  `<text x="${PAD}" y="${y}" font-family="${FONT4}" font-size="13" font-weight="400" fill="${C_LABEL}" letter-spacing="1.2">${xe(s.toUpperCase())}</text>`

export function generateSpacingSVG(spacing: SpacingType): string {
  const lines: string[] = []
  let y = 0

  // ── 헤더
  y = 48
  lines.push(t('SPACING', PAD, y, 13, 400, C_LABEL, FONT4))
  y += 36
  lines.push(t('여백 & 그리드', PAD, y, 32, 700, C_MAIN, FONT7))
  y += 52

  // ── Spacing Scale
  lines.push(sLbl('Spacing Scale', y))
  y += 28

  const scaleEntries = Object.entries(spacing.scale || {}) as [string, number][]
  const ROW_H = 56
  const tableH = ROW_H * scaleEntries.length
  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${tableH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)

  scaleEntries.forEach(([key, value], idx) => {
    const ry  = y + idx * ROW_H
    const midY = ry + ROW_H / 2

    if (idx < scaleEntries.length - 1) {
      lines.push(`<line x1="${PAD+1}" y1="${ry+ROW_H}" x2="${W-PAD-1}" y2="${ry+ROW_H}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
    }

    lines.push(t(key, PAD+32, midY+5, 13, 500, C_SUB, FONT5))
    const barW = Math.min(value * 2.5, W-PAD*2-240)
    lines.push(`<rect x="${PAD+112}" y="${ry+ROW_H/2-10}" width="${barW}" height="20" rx="4" fill="${C_BORDER}"/>`)
    lines.push(t(`${value}px`, W-PAD-140, midY+5, 13, 500, C_SUB, FONT5))
    lines.push(t(`${(value/(spacing.base||4)).toFixed(0)}x base`, W-PAD-60, midY+5, 11, 400, C_MUTED, FONT4))
  })
  y += tableH + 56

  // ── Visual Guide
  lines.push(sLbl('Visual Guide', y))
  y += 28

  const MAX_SQ   = 110
  const COL_W    = 108
  const chartPadX = 48
  const chartPadT = 60
  const chartPadB = 36
  const chartH    = MAX_SQ + chartPadT + chartPadB + 24
  const maxVal    = Math.max(...scaleEntries.map(([,v]) => v))
  const totalColW = scaleEntries.length * COL_W
  const chartStartX = PAD + Math.floor(((W - PAD*2) - totalColW) / 2)

  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${chartH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  const chartBaseY = y + chartPadT + MAX_SQ + 20

  scaleEntries.forEach(([key, value], i) => {
    const s    = Math.max(Math.round((value / maxVal) * MAX_SQ), 4)
    const xPos = chartStartX + i * COL_W
    lines.push(`<rect x="${xPos}" y="${chartBaseY-s}" width="${s}" height="${s}" rx="4" fill="${C_BORDER}"/>`)
    lines.push(tm(String(value), xPos+s/2, chartBaseY-s-8, 11, 400, C_MUTED, FONT4))
    lines.push(tm(key, xPos+s/2, chartBaseY+20, 12, 500, C_SUB, FONT5))
  })
  y += chartH + 56

  // ── Usage Example
  lines.push(sLbl('Usage Example', y))
  y += 28

  const scale_md = (spacing.scale as any)['md'] ?? 16
  const scale_xl = (spacing.scale as any)['xl'] ?? 32
  const usageW   = Math.floor((W-PAD*2-20) / 2)
  const usageH   = 180

  // Card Padding
  lines.push(`<rect x="${PAD}" y="${y}" width="${usageW}" height="${usageH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  lines.push(`<line x1="${PAD}" y1="${y+44}" x2="${PAD+usageW}" y2="${y+44}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
  lines.push(t(`Card Padding — md (${scale_md}px)`, PAD+16, y+27, 13, 400, C_MUTED, FONT4))
  // 패딩 영역 빨간 하이라이트
  lines.push(`<rect x="${PAD}" y="${y+44}" width="${usageW}" height="${usageH-44}" rx="0" fill="${C_RED}"/>`)
  // Content 박스 흰색
  lines.push(`<rect x="${PAD+scale_md}" y="${y+44+scale_md}" width="${usageW-scale_md*2}" height="${usageH-44-scale_md*2}" rx="8" fill="#fff" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
  lines.push(tm('Content', PAD+usageW/2, y+44+scale_md+(usageH-44-scale_md*2)/2+6, 13, 400, C_MUTED, FONT4))

  // Section Gap
  const c2x = PAD+usageW+20
  lines.push(`<rect x="${c2x}" y="${y}" width="${usageW}" height="${usageH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  lines.push(`<line x1="${c2x}" y1="${y+44}" x2="${c2x+usageW}" y2="${y+44}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
  lines.push(t(`Section Gap — xl (${scale_xl}px)`, c2x+16, y+27, 13, 400, C_MUTED, FONT4))
  const secH = Math.floor((usageH-44-scale_xl-16*2) / 2)
  lines.push(`<rect x="${c2x+16}" y="${y+44+16}" width="${usageW-32}" height="${secH}" rx="0" fill="${C_BG_MUTED}"/>`)
  lines.push(tm('Section A', c2x+usageW/2, y+44+16+secH/2+6, 13, 400, C_MUTED, FONT4))
  // gap 하이라이트
  lines.push(`<rect x="${c2x+16}" y="${y+44+16+secH}" width="${usageW-32}" height="${scale_xl}" rx="0" fill="${C_RED}"/>`)
  lines.push(tm(`${scale_xl}px`, c2x+usageW/2, y+44+16+secH+scale_xl/2+5, 11, 500, 'rgba(185,28,28,0.7)', FONT5))
  lines.push(`<rect x="${c2x+16}" y="${y+44+16+secH+scale_xl}" width="${usageW-32}" height="${secH}" rx="0" fill="${C_BG_MUTED}"/>`)
  lines.push(tm('Section B', c2x+usageW/2, y+44+16+secH+scale_xl+secH/2+6, 13, 400, C_MUTED, FONT4))
  y += usageH + 56

  // ── Border Radius
  lines.push(sLbl('Border Radius', y))
  y += 28

  const radiusEntries = Object.entries(spacing.borderRadius || {}) as [string, number][]
  const rItemW  = 120
  const rGap    = 20
  const totalRW = radiusEntries.length * rItemW + (radiusEntries.length-1) * rGap
  const rStartX = PAD + Math.floor(((W-PAD*2) - totalRW) / 2)
  const rCardH  = 48 + 80 + 16 + 16 + 16 + 20
  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${rCardH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)

  radiusEntries.forEach(([key, value], i) => {
    const xPos = rStartX + i * (rItemW + rGap)
    const r    = key === 'full' ? 40 : Math.min(value, 40)
    lines.push(`<rect x="${xPos+10}" y="${y+32}" width="80" height="80" rx="${r}" fill="${C_BG_MUTED}" stroke="${C_BORDER}" stroke-width="1"/>`)
    lines.push(tm(key, xPos+50, y+32+80+18, 13, 500, C_SUB, FONT5))
    lines.push(tm(key==='full'?'9999px':`${value}px`, xPos+50, y+32+80+34, 11, 400, C_MUTED, FONT4))
  })
  y += rCardH + 48

  const fontStyle = buildFontStyle({ body: 'SCDream4' })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${y}" viewBox="0 0 ${W} ${y}">${fontStyle}<rect width="${W}" height="${y}" fill="#fff"/>${lines.join('')}</svg>`
}