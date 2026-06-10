import { Brand, Colors } from '@/lib/types'
import { buildFontStyle } from '@/lib/svg-generators/font-import'

function xe(s: string): string {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')
}
const G950='#030712',G900='#111827',G800='#1f2937',G700='#374151',G600='#4b5563',G500='#6b7280',G400='#9ca3af',G200='#e5e7eb',G100='#f3f4f6',G50='#f9fafb'
const PAD=40, W=960

const t = (s:string,x:number,y:number,sz:number,w:number,fill:string) =>
  `<text x="${x}" y="${y}" font-family="Inter,sans-serif" font-size="${sz}" font-weight="${w}" fill="${fill}">${xe(s)}</text>`
const tm = (s:string,x:number,y:number,sz:number,w:number,fill:string) =>
  `<text x="${x}" y="${y}" font-family="Inter,sans-serif" font-size="${sz}" font-weight="${w}" fill="${fill}" text-anchor="middle">${xe(s)}</text>`
const sLbl = (s:string,y:number) => t(s.toUpperCase(),PAD,y,11,500,G600)

// 단어 단위 줄바꿈 — 한글/영문 모두 처리
function wrapWords(text: string, maxW: number): string[] {
  // 한글은 어절(공백) 단위, 영문은 단어 단위
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
  lines.push(t('Brand Strategy', PAD, y, 11, 400, G500))
  y += 28
  lines.push(t('브랜드 전략', PAD, y, 30, 700, G950))
  y += 52

  // ── 브랜드 기본 카드
  let cardH = 32 + 48
  if (brand.personality?.length) cardH += 48
  if (brand.slogan) cardH += 86
  if (brand.brandEssence) cardH += 72
  cardH += 32

  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${cardH}" rx="16" fill="#fff" stroke="${G200}" stroke-width="1"/>`)
  let cy = y + 32

  lines.push(t(brand.name||'', PAD+32, cy+28, 24, 700, G950))
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
      lines.push(`<rect x="${kx}" y="${cy}" width="${kw_w}" height="30" rx="15" fill="${G100}"/>`)
      lines.push(tm(kw, kx+kw_w/2, cy+20, 13, 500, G700))
      kx += kw_w+8
    })
    cy += 48
  }

  if (brand.slogan) {
    const sW = Math.floor((W-PAD*2-64-16)/2)
    lines.push(`<rect x="${PAD+32}" y="${cy}" width="${sW}" height="70" rx="12" fill="${G50}"/>`)
    lines.push(t('한국어 슬로건', PAD+52, cy+20, 10, 500, G500))
    lines.push(t(brand.slogan.ko||'', PAD+52, cy+50, 18, 700, G950))
    lines.push(`<rect x="${PAD+32+sW+16}" y="${cy}" width="${sW}" height="70" rx="12" fill="${G50}"/>`)
    lines.push(t('English Slogan', PAD+32+sW+36, cy+20, 10, 500, G500))
    lines.push(t(brand.slogan.en||'', PAD+32+sW+36, cy+50, 18, 700, G950))
    cy += 86
  }

  if (brand.brandEssence) {
    lines.push(`<line x1="${PAD+32}" y1="${cy}" x2="${W-PAD-32}" y2="${cy}" stroke="${G100}" stroke-width="1"/>`)
    cy += 24
    lines.push(t('Brand Essence', PAD+32, cy+16, 11, 500, G500))
    cy += 32
    lines.push(t((brand.brandEssence||'').slice(0,80), PAD+32, cy, 15, 400, G800))
  }

  y += cardH + 56

  // ── Core Values — 단어 단위 줄바꿈
  if (brand.coreValues?.length) {
    lines.push(sLbl('Core Values', y))
    y += 28

    const vW = Math.floor((W-PAD*2-20*2)/3)
    const INNER_W = vW - 48
    const LINE_H = 22

    // 줄바꿈 미리 계산 → 카드 높이 통일
    const allWrapped = brand.coreValues.map((val: any) => wrapWords(val.description||'', INNER_W))
    const maxLines = Math.max(...allWrapped.map((l: string[]) => l.length), 1)
    const vH = 36 + 12 + 30 + 16 + maxLines * LINE_H + 28

    brand.coreValues.forEach((val: any, i: number) => {
      const xPos = PAD+i*(vW+20)
      lines.push(`<rect x="${xPos}" y="${y}" width="${vW}" height="${vH}" rx="12" fill="#fff" stroke="${G200}" stroke-width="1"/>`)
      lines.push(t(`0${i+1}`, xPos+24, y+36, 12, 400, G400))
      lines.push(t(val.title||'', xPos+24, y+36+12+24, 17, 700, G950))
      const wrapped: string[] = allWrapped[i]
      wrapped.forEach((line: string, li: number) => {
        lines.push(t(line, xPos+24, y+36+12+24+16+(li+1)*LINE_H, 13, 400, G600))
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
    lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${toneCardH}" rx="12" fill="#fff" stroke="${G200}" stroke-width="1"/>`)
    const startY = y + (toneCardH - toneContentH) / 2 + LINE_H - 4
    toneWrapped.forEach((line: string, i: number) => lines.push(t(line, PAD+32, startY+i*LINE_H, 15, 400, G800)))
    y += toneCardH + 56
  }

  // ── Design Principles
  if (brand.designPrinciples?.length) {
    lines.push(sLbl('Design Principles', y))
    y += 28
    brand.designPrinciples.forEach((p: string, i: number) => {
      lines.push(`<line x1="${PAD}" y1="${y}" x2="${W-PAD}" y2="${y}" stroke="${G100}" stroke-width="1"/>`)
      lines.push(t(`0${i+1}`, PAD, y+28, 12, 400, G400))
      lines.push(t((p||'').slice(0,90), PAD+40, y+28, 14, 400, G700))
      y += 44
    })
    y += 20
  }

  const fontStyle = buildFontStyle({ body: 'Inter' })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${y}" viewBox="0 0 ${W} ${y}">${fontStyle}<rect width="${W}" height="${y}" fill="#fff"/>${lines.join('')}</svg>`
}