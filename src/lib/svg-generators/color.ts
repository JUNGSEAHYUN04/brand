import { Colors } from '@/lib/types'
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
const PAD = 40, W = 960
const FONT4 = 'SCDream4,sans-serif'
const FONT5 = 'SCDream5,sans-serif'
const FONT6 = 'SCDream6,sans-serif'
const FONT7 = 'SCDream7,sans-serif'

const t = (s:string,x:number,y:number,sz:number,w:number,fill:string,fam=FONT4,anchor:'start'|'middle'='start') =>
  `<text x="${x}" y="${y}" font-family="${xe(fam)}" font-size="${sz}" font-weight="${w}" fill="${fill}" text-anchor="${anchor}">${xe(s)}</text>`
const sLbl = (s:string,y:number) =>
  `<text x="${PAD}" y="${y}" font-family="${FONT4}" font-size="13" font-weight="400" fill="${C_LABEL}" letter-spacing="1.2">${xe(s.toUpperCase())}</text>`

export function generateColorSVG(colors: Colors): string {
  const lines: string[] = []
  let y = 0

  // ── 헤더
  y = 48
  lines.push(t('COLOR SYSTEM', PAD, y, 13, 400, C_LABEL, FONT4))
  y += 36
  lines.push(t('컬러 시스템', PAD, y, 32, 700, C_MAIN, FONT7))
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
    lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${cardH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
    lines.push(`<rect x="${PAD+20}" y="${y+22}" width="80" height="80" rx="12" fill="${hex}"/>`)
    const tx = PAD+20+80+20
    lines.push(t(label, tx, y+42, 16, 600, C_MAIN, FONT6))
    lines.push(t(name||'', tx+label.length*10+10, y+42, 14, 400, C_MUTED, FONT4))
    lines.push(t(usage||'', tx, y+62, 14, 400, C_SUB, FONT4))
    const hexW = hex.length*8+24
    lines.push(`<rect x="${tx}" y="${y+76}" width="${hexW}" height="28" rx="8" fill="${C_BG_MUTED}"/>`)
    lines.push(t(hex, tx+12, y+94, 13, 400, C_SUB, FONT4))
    const rgbStr = `rgb(${rgb||''})`
    const rgbW = rgbStr.length*8+24
    lines.push(`<rect x="${tx+hexW+8}" y="${y+76}" width="${rgbW}" height="28" rx="8" fill="${C_BG_MUTED}"/>`)
    lines.push(t(rgbStr, tx+hexW+8+12, y+94, 13, 400, C_MUTED, FONT4))
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
    lines.push(`<rect x="${xPos}" y="${y}" width="${nColW}" height="96" rx="12" fill="${hex}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
    lines.push(t(key,  xPos+nColW/2, y+112, 13, 500, C_MAIN, FONT5, 'middle'))
    lines.push(t(hex,  xPos+nColW/2, y+130, 11, 400, C_MUTED, FONT4, 'middle'))
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
  const swatchH = 48
  const semCardH = 20 + swatchH + 12 + 16 + 18 + 20
  semanticColors.forEach(({ label, hex }, i) => {
    const xPos = PAD+i*(semW+semGap)
    lines.push(`<rect x="${xPos}" y="${y}" width="${semW}" height="${semCardH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
    lines.push(`<rect x="${xPos+20}" y="${y+20}" width="${semW-40}" height="${swatchH}" rx="8" fill="${hex}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
    lines.push(t(label, xPos+20, y+20+swatchH+14+14, 14, 500, C_MAIN, FONT5))
    lines.push(t(hex,   xPos+20, y+20+swatchH+14+14+18, 13, 400, C_MUTED, FONT4))
  })
  y += semCardH + 56

  // ── Color Combination
  lines.push(sLbl('Color Combination', y))
  y += 28

  const combGap = 16
  const combW = Math.floor((W-PAD*2-combGap*2)/3)
  const combH = 88

  lines.push(`<rect x="${PAD}" y="${y}" width="${combW}" height="${combH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  lines.push(t('Primary on White', PAD+24, y+34, 16, 600, colors.primary.hex, FONT6))
  lines.push(t('기본 텍스트 조합', PAD+24, y+56, 14, 400, C_SUB, FONT4))

  const c2x = PAD+combW+combGap
  lines.push(`<rect x="${c2x}" y="${y}" width="${combW}" height="${combH}" rx="12" fill="${colors.primary.hex}"/>`)
  lines.push(t('White on Primary', c2x+24, y+34, 16, 600, '#fff', FONT6))
  lines.push(t('버튼, CTA 조합', c2x+24, y+56, 14, 400, 'rgba(255,255,255,0.7)', FONT4))

  const c3x = PAD+(combW+combGap)*2
  const n50 = (colors.neutral as any)['50'] || C_BG_SOFT
  lines.push(`<rect x="${c3x}" y="${y}" width="${combW}" height="${combH}" rx="12" fill="${n50}"/>`)
  lines.push(t('Accent on Neutral', c3x+24, y+34, 16, 600, colors.accent.hex, FONT6))
  lines.push(t('강조 요소 조합', c3x+24, y+56, 14, 400, C_SUB, FONT4))

  y += combH + 48

  const fontStyle = buildFontStyle({ body: 'SCDream4' })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${y}" viewBox="0 0 ${W} ${y}">${fontStyle}<rect width="${W}" height="${y}" fill="#fff"/>${lines.join('')}</svg>`
}