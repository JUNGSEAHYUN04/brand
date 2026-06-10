import { Colors } from '@/lib/types'
import { buildFontStyle } from '@/lib/svg-generators/font-import'

function xe(s: string): string {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')
}

const G950='#030712',G900='#111827',G800='#1f2937',G700='#374151',G600='#4b5563',G500='#6b7280',G400='#9ca3af',G200='#e5e7eb',G100='#f3f4f6',G50='#f9fafb'
const PAD=40, W=960

const t = (s:string,x:number,y:number,sz:number,w:number,fill:string,fam='Inter',anchor:'start'|'middle'='start') =>
  `<text x="${x}" y="${y}" font-family="${xe(fam)},sans-serif" font-size="${sz}" font-weight="${w}" fill="${fill}" text-anchor="${anchor}">${xe(s)}</text>`
const sLbl = (s:string,y:number) => t(s.toUpperCase(),PAD,y,11,500,G600)

export function generateColorSVG(colors: Colors): string {
  const lines: string[] = []
  let y = 0

  // ── 헤더
  y = 48
  lines.push(t('Color System', PAD, y, 11, 400, G500))
  y += 28  // 간격 충분히
  lines.push(t('컬러 시스템', PAD, y, 30, 700, G950))
  y += 52

  // ── Core Colors
  lines.push(sLbl('Core Colors', y))
  y += 28

  const coreColors = [
    { label:'Primary',   ...colors.primary },
    { label:'Secondary', ...colors.secondary },
    { label:'Accent',    ...colors.accent },
  ]

  coreColors.forEach(({ label, hex, name, usage, rgb }:any) => {
    const cardH = 124
    lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${cardH}" rx="12" fill="#fff" stroke="${G200}" stroke-width="1"/>`)
    lines.push(`<rect x="${PAD+20}" y="${y+22}" width="80" height="80" rx="12" fill="${hex}"/>`)
    const tx = PAD+20+80+20
    lines.push(t(label, tx, y+42, 16, 600, G900))
    lines.push(t(name||'', tx+label.length*10+10, y+42, 14, 400, G600))
    lines.push(t(usage||'', tx, y+62, 14, 400, G600))
    const hexW = hex.length*8+24
    lines.push(`<rect x="${tx}" y="${y+76}" width="${hexW}" height="28" rx="8" fill="${G50}"/>`)
    lines.push(t(hex, tx+12, y+94, 13, 400, G700))
    const rgbStr = `rgb(${rgb||''})`
    const rgbW = rgbStr.length*8+24
    lines.push(`<rect x="${tx+hexW+8}" y="${y+76}" width="${rgbW}" height="28" rx="8" fill="${G50}"/>`)
    lines.push(t(rgbStr, tx+hexW+8+12, y+94, 13, 400, G600))
    y += cardH + 16
  })
  y += 40

  // ── Neutral Palette
  lines.push(sLbl('Neutral Palette', y))
  y += 28

  const neutralEntries = Object.entries(colors.neutral) as [string,string][]
  const nCols = neutralEntries.length
  const nGap = 16
  const nColW = Math.floor((W-PAD*2-nGap*(nCols-1))/nCols)

  neutralEntries.forEach(([key, hex], i) => {
    const xPos = PAD+i*(nColW+nGap)
    lines.push(`<rect x="${xPos}" y="${y}" width="${nColW}" height="96" rx="12" fill="${hex}" stroke="rgba(0,0,0,0.05)" stroke-width="1"/>`)
    // 숫자와 hex 사이 여백 충분히: 96(swatch) + 12(gap) = y+108
    lines.push(t(key, xPos+nColW/2, y+112, 14, 400, G600, 'Inter', 'middle'))
    lines.push(t(hex, xPos+nColW/2, y+130, 11, 400, G500, 'Inter', 'middle'))
  })
  y += 96+44+56

  // ── Semantic Colors
  lines.push(sLbl('Semantic Colors', y))
  y += 28

  const semanticColors = [
    { label:'Success', hex: colors.semantic.success },
    { label:'Error',   hex: colors.semantic.error },
    { label:'Warning', hex: colors.semantic.warning },
    { label:'Info',    hex: colors.semantic.info },
  ]
  const semGap = 16
  const semW = Math.floor((W-PAD*2-semGap*3)/4)
  // p-5(20) + h-16(64) + mb-4(16) + text-sm*2(20+18) + p-5(20) = 158
  // 색상~텍스트 거리 줄이기: h-16을 48로
  const swatchH = 48
  const semCardH = 20 + swatchH + 12 + 16 + 18 + 20 // 약 154 → 줄임
  semanticColors.forEach(({ label, hex }, i) => {
    const xPos = PAD+i*(semW+semGap)
    lines.push(`<rect x="${xPos}" y="${y}" width="${semW}" height="${semCardH}" rx="12" fill="#fff" stroke="${G200}" stroke-width="1"/>`)
    lines.push(`<rect x="${xPos+20}" y="${y+20}" width="${semW-40}" height="${swatchH}" rx="8" fill="${hex}" stroke="rgba(0,0,0,0.05)" stroke-width="1"/>`)
    lines.push(t(label, xPos+20, y+20+swatchH+14+14, 14, 500, G800))
    lines.push(t(hex,   xPos+20, y+20+swatchH+14+14+18, 13, 400, G600))
  })
  y += semCardH + 56

  // ── Color Combination
  lines.push(sLbl('Color Combination', y))
  y += 28

  const combGap = 16
  const combW = Math.floor((W-PAD*2-combGap*2)/3)
  const combH = 88

  lines.push(`<rect x="${PAD}" y="${y}" width="${combW}" height="${combH}" rx="12" fill="#fff" stroke="${G200}" stroke-width="1"/>`)
  lines.push(t('Primary on White', PAD+24, y+34, 16, 600, colors.primary.hex))
  lines.push(t('기본 텍스트 조합', PAD+24, y+56, 14, 400, G600))

  const c2x = PAD+combW+combGap
  lines.push(`<rect x="${c2x}" y="${y}" width="${combW}" height="${combH}" rx="12" fill="${colors.primary.hex}"/>`)
  lines.push(t('White on Primary', c2x+24, y+34, 16, 600, '#fff'))
  lines.push(t('버튼, CTA 조합', c2x+24, y+56, 14, 400, 'rgba(255,255,255,0.7)'))

  const c3x = PAD+(combW+combGap)*2
  const n50 = (colors.neutral as any)['50'] || G50
  lines.push(`<rect x="${c3x}" y="${y}" width="${combW}" height="${combH}" rx="12" fill="${n50}"/>`)
  lines.push(t('Accent on Neutral', c3x+24, y+34, 16, 600, colors.accent.hex))
  lines.push(t('강조 요소 조합', c3x+24, y+56, 14, 400, G600))

  y += combH + 48

  const fontStyle = buildFontStyle({ body: 'Inter' })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${y}" viewBox="0 0 ${W} ${y}">${fontStyle}<rect width="${W}" height="${y}" fill="#fff"/>${lines.join('')}</svg>`
}