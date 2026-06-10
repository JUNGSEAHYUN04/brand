import { Brand, Colors } from '@/lib/types'
import { buildFontStyle } from '@/lib/svg-generators/font-import'

function xe(s: string): string {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')
}

const C_MAIN  = '#282B32'
const C_SUB   = 'rgba(40,43,50,0.8)'
const C_MUTED = 'rgba(40,43,50,0.6)'
const C_LABEL = 'rgba(40,43,50,0.75)'
const C_BORDER       = 'rgba(40,43,50,0.2)'
const C_BORDER_LIGHT = 'rgba(40,43,50,0.1)'
const C_BG_SOFT      = 'rgba(40,43,50,0.03)'
const C_BG_MUTED     = 'rgba(40,43,50,0.05)'
const PAD = 40, W = 960
const FONT = 'SCDream5,sans-serif'
const FONT4 = 'SCDream4,sans-serif'
const FONT6 = 'SCDream6,sans-serif'
const FONT7 = 'SCDream7,sans-serif'

const t = (s:string,x:number,y:number,sz:number,w:number,fill:string,fam=FONT4) =>
  `<text x="${x}" y="${y}" font-family="${xe(fam)}" font-size="${sz}" font-weight="${w}" fill="${fill}">${xe(s)}</text>`
const tm = (s:string,x:number,y:number,sz:number,w:number,fill:string,fam=FONT4) =>
  `<text x="${x}" y="${y}" font-family="${xe(fam)}" font-size="${sz}" font-weight="${w}" fill="${fill}" text-anchor="middle">${xe(s)}</text>`
const sLbl = (s:string,y:number) =>
  `<text x="${PAD}" y="${y}" font-family="${FONT4}" font-size="13" font-weight="400" fill="${C_LABEL}" letter-spacing="1.2">${xe(s.toUpperCase())}</text>`

function wrapWords(text: string, maxW: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  let currentW = 0
  function charPx(ch: string): number {
    const code = ch.charCodeAt(0)
    if (code >= 0xAC00 && code <= 0xD7A3) return 13
    return 7.8
  }
  function strPx(s: string): number {
    return s.split('').reduce((acc, c) => acc + charPx(c), 0)
  }
  for (const word of words) {
    const wordW = strPx(word)
    const spaceW = current ? 7.8 : 0
    if (currentW + spaceW + wordW > maxW && current.length > 0) {
      lines.push(current)
      current = word
      currentW = wordW
    } else {
      current = current ? current + ' ' + word : word
      currentW += spaceW + wordW
    }
  }
  if (current) lines.push(current)
  return lines
}

export function generateBrandSVG(brand: Brand, colors: Colors): string {
  const lines: string[] = []
  let y = 0

  y = 48
  lines.push(t('BRAND STRATEGY', PAD, y, 13, 400, C_LABEL, FONT4))
  y += 36
  lines.push(t('브랜드 전략', PAD, y, 32, 700, C_MAIN, FONT7))
  y += 52

  // ── 브랜드 기본 카드
  let cardH = 32 + 48
  if (brand.personality?.length) cardH += 48
  if (brand.slogan) cardH += 86
  if (brand.brandEssence) cardH += 72
  cardH += 32

  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${cardH}" rx="16" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  let cy = y + 32

  lines.push(t(brand.name||'', PAD+32, cy+28, 24, 700, C_MAIN, FONT7))
  cy += 48

  if (brand.personality?.length) {
    const tagWidths = brand.personality.map((kw: string) => {
      const px = kw.split('').reduce((a:number,c:string)=>{
        const code=c.charCodeAt(0); return a+(code>=0xAC00&&code<=0xD7A3?13:7.8)
      },0)
      return px + 32
    })
    const totalW = tagWidths.reduce((a:number,b:number)=>a+b,0)+(tagWidths.length-1)*8
    let kx = PAD+32+Math.max(0,((W-PAD*2-64)-totalW)/2)
    brand.personality.forEach((kw: string, ki: number) => {
      const kw_w = tagWidths[ki]
      lines.push(`<rect x="${kx}" y="${cy}" width="${kw_w}" height="30" rx="15" fill="${C_BG_MUTED}"/>`)
      lines.push(tm(kw, kx+kw_w/2, cy+20, 13, 400, C_SUB, FONT4))
      kx += kw_w+8
    })
    cy += 48
  }

  if (brand.slogan) {
    const sW = Math.floor((W-PAD*2-64-16)/2)
    lines.push(`<rect x="${PAD+32}" y="${cy}" width="${sW}" height="70" rx="12" fill="${C_BG_SOFT}" stroke="${C_BORDER}" stroke-width="1"/>`)
    lines.push(t('한국어 슬로건', PAD+52, cy+20, 10, 400, C_MUTED, FONT4))
    lines.push(t(brand.slogan.ko||'', PAD+52, cy+50, 18, 600, C_MAIN, FONT6))
    lines.push(`<rect x="${PAD+32+sW+16}" y="${cy}" width="${sW}" height="70" rx="12" fill="${C_BG_SOFT}" stroke="${C_BORDER}" stroke-width="1"/>`)
    lines.push(t('ENGLISH SLOGAN', PAD+32+sW+36, cy+20, 10, 400, C_MUTED, FONT4))
    lines.push(t(brand.slogan.en||'', PAD+32+sW+36, cy+50, 18, 600, C_MAIN, FONT6))
    cy += 86
  }

  if (brand.brandEssence) {
    lines.push(`<line x1="${PAD+32}" y1="${cy}" x2="${W-PAD-32}" y2="${cy}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
    cy += 24
    lines.push(t('BRAND ESSENCE', PAD+32, cy+16, 11, 400, C_MUTED, FONT4))
    cy += 38
    lines.push(t((brand.brandEssence||'').slice(0,80), PAD+32, cy, 15, 400, C_SUB, FONT4))
  }

  y += cardH + 56

  // ── Core Values
  if (brand.coreValues?.length) {
    lines.push(sLbl('Core Values', y))
    y += 28

    const vW = Math.floor((W-PAD*2-20*2)/3)
    const INNER_W = vW - 48
    const LINE_H = 22

    const allWrapped = brand.coreValues.map((val: any) => wrapWords(val.description||'', INNER_W))
    const maxLines = Math.max(...allWrapped.map((l: string[]) => l.length), 1)
    const vH = 36 + 12 + 30 + 16 + maxLines * LINE_H + 28

    brand.coreValues.forEach((val: any, i: number) => {
      const xPos = PAD+i*(vW+20)
      lines.push(`<rect x="${xPos}" y="${y}" width="${vW}" height="${vH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
      lines.push(t(`0${i+1}`, xPos+24, y+36, 12, 400, C_MUTED, FONT4))
      lines.push(t(val.title||'', xPos+24, y+36+12+24, 17, 600, C_MAIN, FONT6))
      const wrapped: string[] = allWrapped[i]
      wrapped.forEach((line: string, li: number) => {
        lines.push(t(line, xPos+24, y+36+12+24+16+(li+1)*LINE_H, 13, 400, C_SUB, FONT4))
      })
    })
    y += vH + 56
  }

  // ── Tone & Manner
  if (brand.tone) {
    lines.push(sLbl('Tone & Manner', y))
    y += 28
    const toneWrapped = wrapWords(brand.tone||'', W-PAD*2-64)
    const LINE_H = 24
    const toneContentH = toneWrapped.length * LINE_H
    const toneCardH = Math.max(toneContentH + 64, 100)
    lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${toneCardH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
    const startY = y + (toneCardH - toneContentH) / 2 + LINE_H - 4
    toneWrapped.forEach((line: string, i: number) => lines.push(t(line, PAD+32, startY+i*LINE_H, 15, 400, C_SUB, FONT4)))
    y += toneCardH + 56
  }

  // ── Design Principles
  if (brand.designPrinciples?.length) {
    lines.push(sLbl('Design Principles', y))
    y += 28
    brand.designPrinciples.forEach((p: string, i: number) => {
      lines.push(`<line x1="${PAD}" y1="${y}" x2="${W-PAD}" y2="${y}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
      lines.push(t(`0${i+1}`, PAD, y+28, 12, 400, C_MUTED, FONT4))
      lines.push(t((p||'').slice(0,90), PAD+40, y+28, 14, 400, C_SUB, FONT4))
      y += 44
    })
    y += 20
  }

  const fontStyle = buildFontStyle({ body: 'SCDream4' })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${y}" viewBox="0 0 ${W} ${y}">${fontStyle}<rect width="${W}" height="${y}" fill="#fff"/>${lines.join('')}</svg>`
}