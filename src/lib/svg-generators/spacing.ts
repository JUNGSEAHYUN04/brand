import { Spacing as SpacingType } from '@/lib/types'
import { buildFontStyle } from '@/lib/svg-generators/font-import'

function xe(s: string): string {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')
}
const G950='#030712',G700='#374151',G600='#4b5563',G500='#6b7280',G400='#9ca3af',G200='#e5e7eb',G100='#f3f4f6',G50='#f9fafb'
const PAD=40, W=960

const t = (s:string,x:number,y:number,sz:number,w:number,fill:string,fam='Inter') =>
  `<text x="${x}" y="${y}" font-family="${xe(fam)},sans-serif" font-size="${sz}" font-weight="${w}" fill="${fill}">${xe(s)}</text>`
const tm = (s:string,x:number,y:number,sz:number,w:number,fill:string) =>
  `<text x="${x}" y="${y}" font-family="Inter,sans-serif" font-size="${sz}" font-weight="${w}" fill="${fill}" text-anchor="middle">${xe(s)}</text>`
const sLbl = (s:string,y:number) => t(s.toUpperCase(),PAD,y,11,500,G600)

export function generateSpacingSVG(spacing: SpacingType): string {
  const lines: string[] = []
  let y = 0

  y = 48
  lines.push(t('Spacing', PAD, y, 11, 400, G500))
  y += 28
  lines.push(t('여백 & 그리드', PAD, y, 30, 700, G950))
  y += 52

  // ── Spacing Scale
  lines.push(sLbl('Spacing Scale', y))
  y += 28

  const scaleEntries = Object.entries(spacing.scale || {}) as [string, number][]
  const ROW_H = 56
  const tableH = ROW_H * scaleEntries.length
  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${tableH}" rx="12" fill="#fff" stroke="${G200}" stroke-width="1"/>`)

  scaleEntries.forEach(([key, value], idx) => {
    const ry = y + idx*ROW_H
    if (idx%2!==0) lines.push(`<rect x="${PAD+1}" y="${ry}" width="${W-PAD*2-2}" height="${ROW_H}" fill="${G50}"/>`)
    if (idx<scaleEntries.length-1) lines.push(`<line x1="${PAD+1}" y1="${ry+ROW_H}" x2="${W-PAD-1}" y2="${ry+ROW_H}" stroke="${G100}" stroke-width="1"/>`)
    const midY = ry + ROW_H/2
    lines.push(t(key, PAD+32, midY+5, 13, 500, G700))
    const barW = Math.min(value*2.5, W-PAD*2-240)
    lines.push(`<rect x="${PAD+112}" y="${ry+ROW_H/2-12}" width="${barW}" height="24" rx="2" fill="${G200}"/>`)
    lines.push(t(`${value}px`, W-PAD-130, midY+5, 13, 400, G700))
    lines.push(t(`${(value/(spacing.base||4)).toFixed(0)}x base`, W-PAD-60, midY+5, 12, 400, G500))
  })
  y += tableH + 56

  // ── Visual Guide
  lines.push(sLbl('Visual Guide', y))
  y += 28

  const MAX_SQ = 110
  const COL_W = 108
  const chartPadX = 48
  const chartPadT = 60   // 위 여백
  const chartPadB = 36   // 아래 여백 줄이기
  const chartH = MAX_SQ + chartPadT + chartPadB + 24
  const maxVal = Math.max(...scaleEntries.map(([,v]) => v))

  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${chartH}" rx="12" fill="${G50}"/>`)
  const chartBaseY = y + chartPadT + MAX_SQ + 20  // 정사각형들 아래로 내리기

  scaleEntries.forEach(([key, value], i) => {
    const s = Math.max(Math.round((value / maxVal) * MAX_SQ), 4)
    const xPos = PAD + chartPadX + i * COL_W
    lines.push(`<rect x="${xPos}" y="${chartBaseY-s}" width="${s}" height="${s}" rx="4" fill="${G400}"/>`)
    lines.push(tm(String(value), xPos+s/2, chartBaseY-s-8, 10, 400, G500))
    lines.push(tm(key, xPos+s/2, chartBaseY+20, 11, 500, G700))
  })
  y += chartH + 56

  // ── Usage Example
  lines.push(sLbl('Usage Example', y))
  y += 28

  const scale_md = (spacing.scale as any)['md'] ?? 16
  const scale_xl = (spacing.scale as any)['xl'] ?? 32
  const usageW = Math.floor((W-PAD*2-20)/2)
  const usageH = 180

  // Card Padding
  lines.push(`<rect x="${PAD}" y="${y}" width="${usageW}" height="${usageH}" rx="12" fill="#fff" stroke="${G200}" stroke-width="1"/>`)
  lines.push(`<rect x="${PAD}" y="${y}" width="${usageW}" height="44" rx="12" fill="${G50}"/>`)
  lines.push(`<line x1="${PAD}" y1="${y+44}" x2="${PAD+usageW}" y2="${y+44}" stroke="${G200}" stroke-width="1"/>`)
  lines.push(t(`Card Padding — md (${scale_md}px)`, PAD+16, y+27, 13, 400, G600))
  lines.push(`<rect x="${PAD+scale_md}" y="${y+44+scale_md}" width="${usageW-scale_md*2}" height="${usageH-44-scale_md*2}" rx="8" fill="${G100}"/>`)
  lines.push(tm('Content', PAD+usageW/2, y+44+scale_md+(usageH-44-scale_md*2)/2+6, 14, 400, G600))

  // Section Gap
  const c2x = PAD+usageW+20
  lines.push(`<rect x="${c2x}" y="${y}" width="${usageW}" height="${usageH}" rx="12" fill="#fff" stroke="${G200}" stroke-width="1"/>`)
  lines.push(`<rect x="${c2x}" y="${y}" width="${usageW}" height="44" rx="12" fill="${G50}"/>`)
  lines.push(`<line x1="${c2x}" y1="${y+44}" x2="${c2x+usageW}" y2="${y+44}" stroke="${G200}" stroke-width="1"/>`)
  lines.push(t(`Section Gap — xl (${scale_xl}px)`, c2x+16, y+27, 13, 400, G600))
  const secH = Math.floor((usageH-44-scale_xl-16*2)/2)
  lines.push(`<rect x="${c2x+16}" y="${y+44+16}" width="${usageW-32}" height="${secH}" rx="8" fill="${G100}"/>`)
  lines.push(tm('Section A', c2x+usageW/2, y+44+16+secH/2+6, 14, 400, G600))
  lines.push(`<rect x="${c2x+16}" y="${y+44+16+secH+scale_xl}" width="${usageW-32}" height="${secH}" rx="8" fill="${G100}"/>`)
  lines.push(tm('Section B', c2x+usageW/2, y+44+16+secH+scale_xl+secH/2+6, 14, 400, G600))
  y += usageH + 56

  // ── Border Radius
  lines.push(sLbl('Border Radius', y))
  y += 28

  const radiusEntries = Object.entries(spacing.borderRadius || {}) as [string, number][]
  radiusEntries.forEach(([key, value], i) => {
    const xPos = PAD + i*130
    const r = key==='full' ? 40 : Math.min(value, 40)
    lines.push(`<rect x="${xPos}" y="${y}" width="100" height="100" rx="${r}" fill="${G100}" stroke="${G200}" stroke-width="1"/>`)
    lines.push(tm(key, xPos+50, y+116, 12, 500, G700))
    lines.push(tm(key==='full'?'9999px':`${value}px`, xPos+50, y+132, 11, 400, G500))
  })
  y += 152

  const fontStyle = buildFontStyle({ body: 'Inter' })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${y}" viewBox="0 0 ${W} ${y}">${fontStyle}<rect width="${W}" height="${y}" fill="#fff"/>${lines.join('')}</svg>`
}