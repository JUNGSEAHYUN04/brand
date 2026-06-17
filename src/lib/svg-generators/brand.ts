import { Brand, Colors } from '@/lib/types'
import { buildFontStyle } from '@/lib/svg-generators/font-import'

function xe(s: string): string {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')
}

const C_MAIN  = '#282B32'
const C_SUB   = 'rgba(40,43,50,0.8)'
const C_MUTED = 'rgba(40,43,50,0.6)'
const C_LABEL = 'rgba(40,43,50,0.45)'
const C_BORDER       = 'rgba(40,43,50,0.2)'
const C_BORDER_LIGHT = 'rgba(40,43,50,0.1)'
const C_BG_SOFT      = 'rgba(40,43,50,0.03)'
const C_BG_MUTED     = 'rgba(40,43,50,0.05)'
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

function charPx(ch: string, sz = 14): number {
  const code = ch.charCodeAt(0)
  const base = (code >= 0xAC00 && code <= 0xD7A3) ? 0.95 : 0.52
  return base * sz
}
function wrapWords(text: string, maxW: number, sz = 14): string[] {
  const words = String(text||'').split(' ')
  const out: string[] = []
  let current = ''
  let currentW = 0
  const strPx = (s: string) => s.split('').reduce((a, c) => a + charPx(c, sz), 0)
  const spaceW0 = charPx(' ', sz)
  for (const word of words) {
    const wordW = strPx(word)
    const spaceW = current ? spaceW0 : 0
    if (currentW + spaceW + wordW > maxW && current.length > 0) {
      out.push(current); current = word; currentW = wordW
    } else {
      current = current ? current + ' ' + word : word
      currentW += spaceW + wordW
    }
  }
  if (current) out.push(current)
  return out
}

export function generateBrandSVG(brand: Brand, colors: Colors): string {
  const lines: string[] = []
  let y = 0

  y = 48
  lines.push(t('BRAND STRATEGY', PAD, y, 13, 400, C_LABEL, FONT4))
  y += 36
  lines.push(t('브랜드 전략', PAD, y, 32, 700, C_MAIN, FONT7))
  y += 52

  const INNER = 32
  const cardInnerW = W-PAD*2-INNER*2

  // ── 브랜드 기본 카드
  const nameReasonWrap = brand.nameReason ? wrapWords(brand.nameReason, cardInnerW, 13) : []
  let cardH = 32 + 36
  if (nameReasonWrap.length) cardH += nameReasonWrap.length*18 + 8
  if (brand.personality?.length) cardH += 46
  if (brand.slogan) cardH += 86
  if (brand.brandEssence) cardH += 24 + 20 + 38
  cardH += 32

  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${cardH}" rx="16" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  let cy = y + 32

  lines.push(t(brand.name||'', PAD+INNER, cy+24, 24, 700, C_MAIN, FONT7))
  cy += 36
  if (nameReasonWrap.length) {
    nameReasonWrap.forEach((wl, i) => lines.push(t(wl, PAD+INNER, cy+14+i*18, 13, 400, C_MUTED, FONT4)))
    cy += nameReasonWrap.length*18 + 8
  }

  if (brand.personality?.length) {
    let kx = PAD+INNER
    brand.personality.forEach((kw: string) => {
      const kw_w = kw.split('').reduce((a:number,c:string)=>{const code=c.charCodeAt(0);return a+(code>=0xAC00&&code<=0xD7A3?13:7.8)},0)+28
      lines.push(`<rect x="${kx}" y="${cy+6}" width="${kw_w}" height="30" rx="15" fill="${C_BG_MUTED}"/>`)
      lines.push(tm(kw, kx+kw_w/2, cy+26, 13, 400, C_SUB, FONT4))
      kx += kw_w+8
    })
    cy += 46
  }

  if (brand.slogan) {
    const sW = Math.floor((cardInnerW-16)/2)
    lines.push(`<rect x="${PAD+INNER}" y="${cy}" width="${sW}" height="70" rx="12" fill="${C_BG_SOFT}" stroke="${C_BORDER}" stroke-width="1"/>`)
    lines.push(t('한국어 슬로건', PAD+INNER+20, cy+24, 10, 400, C_LABEL, FONT4))
    lines.push(t(brand.slogan.ko||'', PAD+INNER+20, cy+52, 17, 500, C_MAIN, FONT5))
    lines.push(`<rect x="${PAD+INNER+sW+16}" y="${cy}" width="${sW}" height="70" rx="12" fill="${C_BG_SOFT}" stroke="${C_BORDER}" stroke-width="1"/>`)
    lines.push(t('ENGLISH SLOGAN', PAD+INNER+sW+36, cy+24, 10, 400, C_LABEL, FONT4))
    lines.push(t(brand.slogan.en||'', PAD+INNER+sW+36, cy+52, 17, 500, C_MAIN, FONT5))
    cy += 86
  }

  if (brand.brandEssence) {
    lines.push(`<line x1="${PAD+INNER}" y1="${cy}" x2="${W-PAD-INNER}" y2="${cy}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
    cy += 24
    lines.push(t('BRAND ESSENCE', PAD+INNER, cy+12, 11, 400, C_LABEL, FONT4))
    cy += 30
    lines.push(t((brand.brandEssence||'').slice(0,80), PAD+INNER, cy, 15, 400, C_SUB, FONT4))
  }
  y += cardH + 56

  // ── Mission & Vision
  if (brand.mission || brand.vision) {
    lines.push(sLbl('Mission & Vision', y))
    y += 28
    const mvGap = 20
    const mvW = Math.floor((W-PAD*2-mvGap)/2)
    const mvInner = mvW - 56
    const mWrap = brand.mission ? wrapWords(brand.mission, mvInner, 15) : []
    const vWrap = brand.vision ? wrapWords(brand.vision, mvInner, 15) : []
    const mvLines = Math.max(mWrap.length, vWrap.length, 1)
    const mvH = 28 + 20 + mvLines*24 + 28
    const drawMV = (xPos:number, label:string, wrap:string[]) => {
      lines.push(`<rect x="${xPos}" y="${y}" width="${mvW}" height="${mvH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
      lines.push(t(label, xPos+28, y+30, 11, 400, C_LABEL, FONT4))
      wrap.forEach((wl, i) => lines.push(t(wl, xPos+28, y+30+24+i*24, 15, 500, C_SUB, FONT5)))
    }
    if (brand.mission) drawMV(PAD, 'MISSION', mWrap)
    if (brand.vision)  drawMV(PAD+mvW+mvGap, 'VISION', vWrap)
    y += mvH + 56
  }

  // ── Positioning
  if (brand.positioning) {
    lines.push(sLbl('Positioning', y))
    y += 28
    const p = brand.positioning as any
    const stmtWrap = p.statement ? wrapWords(p.statement, cardInnerW, 17) : []
    const cols = [
      ['CATEGORY', p.category],
      ['COMPETITORS', p.competitors],
      ['DIFFERENTIATION', p.differentiation],
    ].filter(c => c[1]) as [string,string][]
    const colGap = 20
    const colW = Math.floor((cardInnerW - colGap*(Math.max(cols.length,1)-1))/Math.max(cols.length,1))
    const colWraps = cols.map(([,v]) => wrapWords(v, colW, 14))
    const colMaxLines = Math.max(...colWraps.map(w => w.length), 0)
    const posH = 32 + (stmtWrap.length ? stmtWrap.length*26 + 24 : 0)
      + (cols.length ? 24 + 18 + 8 + colMaxLines*20 : 0) + 32
    lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${posH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
    let py = y + 32
    if (stmtWrap.length) {
      stmtWrap.forEach((wl, i) => lines.push(t(wl, PAD+INNER, py+14+i*26, 17, 500, C_MAIN, FONT5)))
      py += stmtWrap.length*26 + 24
    }
    if (cols.length) {
      lines.push(`<line x1="${PAD+INNER}" y1="${py}" x2="${W-PAD-INNER}" y2="${py}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
      py += 24
      cols.forEach(([label], ci) => {
        const cx = PAD+INNER+ci*(colW+colGap)
        lines.push(t(label, cx, py, 11, 400, C_LABEL, FONT4))
        colWraps[ci].forEach((wl, li) => lines.push(t(wl, cx, py+8+18+li*20, 14, 400, C_SUB, FONT4)))
      })
      py += 18 + 8 + colMaxLines*20
    }
    y += posH + 56
  }

  // ── Target Profile
  if (brand.targetProfile) {
    lines.push(sLbl('Target Profile', y))
    y += 28
    const tp = brand.targetProfile as any
    const fields = [
      ['DEMOGRAPHICS', tp.demographics],
      ['OCCUPATION', tp.occupation],
      ['NEEDS', tp.needs],
      ['PAIN POINTS', tp.painPoints],
    ].filter(f => f[1]) as [string,string][]
    const tpGap = 32
    const tpColW = Math.floor((cardInnerW - tpGap)/2)
    const fieldWraps = fields.map(([,v]) => wrapWords(v, tpColW, 14))
    // 2열 배치 — 행별 최대 줄 수
    let rowsH = 0
    for (let r=0; r<Math.ceil(fields.length/2); r++) {
      const l = fieldWraps[r*2]?.length || 0
      const rr = fieldWraps[r*2+1]?.length || 0
      rowsH += 18 + 8 + Math.max(l, rr)*20 + 20
    }
    const goalsWrap = tp.goals ? wrapWords(tp.goals, cardInnerW, 14) : []
    const goalsH = goalsWrap.length ? 24 + 18 + 8 + goalsWrap.length*20 : 0
    const tpH = 32 + rowsH + goalsH + 24
    lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${tpH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
    let ty = y + 32
    for (let r=0; r<Math.ceil(fields.length/2); r++) {
      const left = fields[r*2], right = fields[r*2+1]
      const leftWrap = fieldWraps[r*2], rightWrap = fieldWraps[r*2+1]
      const rowLines = Math.max(leftWrap?.length||0, rightWrap?.length||0)
      if (left) {
        lines.push(t(left[0], PAD+INNER, ty, 11, 400, C_LABEL, FONT4))
        leftWrap.forEach((wl, li) => lines.push(t(wl, PAD+INNER, ty+8+18+li*20, 14, 400, C_MAIN, FONT4)))
      }
      if (right) {
        const rx = PAD+INNER+tpColW+tpGap
        lines.push(t(right[0], rx, ty, 11, 400, C_LABEL, FONT4))
        rightWrap.forEach((wl, li) => lines.push(t(wl, rx, ty+8+18+li*20, 14, 400, C_MAIN, FONT4)))
      }
      ty += 18 + 8 + rowLines*20 + 20
    }
    if (goalsWrap.length) {
      lines.push(`<line x1="${PAD+INNER}" y1="${ty-4}" x2="${W-PAD-INNER}" y2="${ty-4}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
      ty += 20
      lines.push(t('GOALS', PAD+INNER, ty, 11, 400, C_LABEL, FONT4))
      goalsWrap.forEach((wl, li) => lines.push(t(wl, PAD+INNER, ty+8+18+li*20, 14, 400, C_MAIN, FONT4)))
    }
    y += tpH + 56
  }

  // ── Core Values
  if (brand.coreValues?.length) {
    lines.push(sLbl('Core Values', y))
    y += 28
    const vW = Math.floor((W-PAD*2-20*2)/3)
    const INNER_W = vW - 48
    const LINE_H = 22
    const allWrapped = brand.coreValues.map((val: any) => wrapWords(val.description||'', INNER_W, 13))
    const maxLines = Math.max(...allWrapped.map((l: string[]) => l.length), 1)
    const vH = 36 + 12 + 30 + 16 + maxLines * LINE_H + 28
    brand.coreValues.forEach((val: any, i: number) => {
      const xPos = PAD+i*(vW+20)
      lines.push(`<rect x="${xPos}" y="${y}" width="${vW}" height="${vH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
      lines.push(t(`0${i+1}`, xPos+24, y+36, 12, 400, C_MUTED, FONT4))
      lines.push(t(val.title||'', xPos+24, y+36+12+24, 15, 500, C_MAIN, FONT5))
      allWrapped[i].forEach((line: string, li: number) => {
        lines.push(t(line, xPos+24, y+36+12+24+16+(li+1)*LINE_H, 13, 400, C_SUB, FONT4))
      })
    })
    y += vH + 56
  }

  // ── Tone & Manner
  if (brand.tone) {
    lines.push(sLbl('Tone & Manner', y))
    y += 28
    const toneWrapped = wrapWords(brand.tone||'', cardInnerW, 14)
    const LINE_H = 24
    const coreTone = (brand as any).coreTone as string[] | undefined
    const toneContentH = toneWrapped.length * LINE_H
    const toneCardH = 32 + toneContentH + (coreTone?.length ? 24 + 20 + 34 : 0) + 24
    lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${toneCardH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
    let toy = y + 32
    toneWrapped.forEach((line: string, i: number) => lines.push(t(line, PAD+INNER, toy+i*LINE_H, 15, 400, C_SUB, FONT4)))
    toy += toneContentH
    if (coreTone?.length) {
      toy += 16
      lines.push(`<line x1="${PAD+INNER}" y1="${toy}" x2="${W-PAD-INNER}" y2="${toy}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
      toy += 24
      lines.push(t('CORE TONE', PAD+INNER, toy, 11, 400, C_LABEL, FONT4))
      toy += 16
      let ctx = PAD+INNER
      coreTone.forEach((ct) => {
        const cw = ct.split('').reduce((a,c)=>{const code=c.charCodeAt(0);return a+(code>=0xAC00&&code<=0xD7A3?13:7.8)},0)+32
        lines.push(`<rect x="${ctx}" y="${toy}" width="${cw}" height="30" rx="15" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
        lines.push(tm(ct, ctx+cw/2, toy+20, 13, 400, C_SUB, FONT4))
        ctx += cw+8
      })
    }
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