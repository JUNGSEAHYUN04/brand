import { Colors, Typography } from '@/lib/types'
import { buildDesignSystem } from '@/lib/component-tokens'
import { buildFontStyle } from '@/lib/svg-generators/font-import'

function xe(s: string): string {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')
}
const G950='#030712',G900='#111827',G600='#4b5563',G500='#6b7280',G400='#9ca3af',G200='#e5e7eb',G100='#f3f4f6',G50='#f9fafb'
const PAD=40, W=960

const t = (s:string,x:number,y:number,sz:number,w:number,fill:string,fam='Inter') =>
  `<text x="${x}" y="${y}" font-family="${xe(fam)},sans-serif" font-size="${sz}" font-weight="${w}" fill="${fill}">${xe(s)}</text>`
const tm = (s:string,x:number,y:number,sz:number,w:number,fill:string,fam='Inter') =>
  `<text x="${x}" y="${y}" font-family="${xe(fam)},sans-serif" font-size="${sz}" font-weight="${w}" fill="${fill}" text-anchor="middle">${xe(s)}</text>`
const sLbl = (s:string,y:number) => t(s.toUpperCase(),PAD,y,11,500,G600)

export function generateComponentSVG(colors: Colors, typography: Typography): string {
  const lines: string[] = []
  let y = 0

  const { component, foundation } = buildDesignSystem(colors, typography)
  const { button, input, badge, card, tag } = component as any
  const bodyFont = foundation.typography.fonts.body || 'Inter'

  y = 48
  lines.push(t('UI Components', PAD, y, 11, 400, G500))
  y += 28
  lines.push(t('UI 컴포넌트', PAD, y, 30, 700, G950))
  y += 52

  // ── Button
  lines.push(sLbl('Button', y))
  y += 28

  const varH = button.sizes.lg.height
  const mdH  = button.sizes.md.height
  const btnCardH = 32 + 20+16+varH + 24 + 20+16+varH + 24 + 20+16+mdH + 32
  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${btnCardH}" rx="12" fill="#fff" stroke="${G200}" stroke-width="1"/>`)
  let by = y + 32

  for (const [secLabel, secIdx] of [['Variants',0],['Sizes',1],['States',2]] as [string,number][]) {
    lines.push(t(secLabel, PAD+32, by+14, 13, 500, G600))
    by += 32
    if (secIdx === 0) {
      ;(['primary','secondary','ghost','danger'] as const).forEach((variant, i) => {
        const s = button[variant].default as any
        const sz = button.sizes.lg
        const bW = sz.paddingX*2+80
        const xPos = PAD+32+i*(bW+16)
        const hasBorder = s.border && s.border !== 'transparent'
        lines.push(`<rect x="${xPos}" y="${by}" width="${bW}" height="${sz.height}" rx="${sz.borderRadius}" fill="${s.bg}" ${hasBorder?`stroke="${s.border}" stroke-width="1"`:''} />`)
        lines.push(tm(variant.charAt(0).toUpperCase()+variant.slice(1), xPos+bW/2, by+sz.height/2+6, sz.fontSize, 500, s.text, bodyFont))
      })
      by += varH + 24
    } else if (secIdx === 1) {
      ;(['sm','md','lg'] as const).forEach((size, i) => {
        const sz = button.sizes[size]
        const d = button.primary.default as any
        const bW = sz.paddingX*2+60
        const xPos = PAD+32+i*(bW+16)
        const yOff = (varH-sz.height)/2
        lines.push(`<rect x="${xPos}" y="${by+yOff}" width="${bW}" height="${sz.height}" rx="${sz.borderRadius}" fill="${d.bg}"/>`)
        lines.push(tm(size.toUpperCase(), xPos+bW/2, by+yOff+sz.height/2+6, sz.fontSize, 500, d.text, bodyFont))
      })
      by += varH + 24
    } else {
      ;([
        { label:'Default',  token: button.primary.default  as any },
        { label:'Hover',    token: button.primary.hover    as any },
        { label:'Pressed',  token: button.primary.pressed  as any },
        { label:'Disabled', token: button.primary.disabled as any },
      ]).forEach(({ label, token }, i) => {
        const sz = button.sizes.md
        const bW = sz.paddingX*2+64
        const xPos = PAD+32+i*(bW+16)
        const hasBorder = token.border && token.border !== 'transparent'
        lines.push(`<rect x="${xPos}" y="${by}" width="${bW}" height="${sz.height}" rx="${sz.borderRadius}" fill="${token.bg}" ${hasBorder?`stroke="${token.border}" stroke-width="1"`:''} />`)
        lines.push(tm(label, xPos+bW/2, by+sz.height/2+6, sz.fontSize, 500, token.text, bodyFont))
      })
      by += mdH
    }
  }
  y += btnCardH + 56

  // ── Text Input
  lines.push(sLbl('Text Input', y))
  y += 28

  const inputStates = [
    { label:'Default',  token: input.default  as any, placeholder:'텍스트를 입력하세요' },
    { label:'Focus',    token: input.focus    as any, placeholder:'포커스 상태' },
    { label:'Error',    token: input.error    as any, placeholder:'오류 상태' },
    { label:'Success',  token: input.success  as any, placeholder:'성공 상태' },
    { label:'Disabled', token: input.disabled as any, placeholder:'비활성화 상태' },
  ]
  const iH = input.sizes.lg.height
  const inputCardH = 32 + inputStates.length*(20+8+iH+20) - 20 + 32
  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${inputCardH}" rx="12" fill="#fff" stroke="${G200}" stroke-width="1"/>`)
  let iy = y + 32

  inputStates.forEach(({ label, token, placeholder }) => {
    lines.push(t(label, PAD+32, iy+14, 13, 500, G600))
    iy += 28
    const iW = W-PAD*2-64
    lines.push(`<rect x="${PAD+32}" y="${iy}" width="${iW}" height="${iH}" rx="${input.sizes.lg.borderRadius}" fill="${token.bg}" stroke="${token.border}" stroke-width="1.5"/>`)
    lines.push(t(placeholder, PAD+32+input.sizes.lg.paddingX, iy+iH/2+6, input.sizes.lg.fontSize, 400, G400, bodyFont))
    iy += iH + 20
  })
  y += inputCardH + 56

  // ── Badge & Tag
  lines.push(sLbl('Badge & Tag', y))
  y += 28

  const bdSz = badge.sizes.md
  const bdH = bdSz.paddingY*2+28
  const tagItemH = 34
  const btCardH = 32 + 20+16+bdH + 32 + 20+16+tagItemH + 32
  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${btCardH}" rx="12" fill="#fff" stroke="${G200}" stroke-width="1"/>`)
  let bty = y + 32

  // Badge
  lines.push(t('Badge', PAD+32, bty+14, 13, 500, G600))
  bty += 32
  let bdx = PAD+32
  ;(['filled','outline','soft'] as const).forEach((key) => {
    const b = (badge as any).primary[key]
    const blabel = key.charAt(0).toUpperCase()+key.slice(1)
    const hasBorder = b.border && b.border !== 'transparent'
    const bW = blabel.length*8 + bdSz.paddingX*2 + 4
    lines.push(`<rect x="${bdx}" y="${bty}" width="${bW}" height="${bdH}" rx="${bdH/2}" fill="${b.bg}" ${hasBorder?`stroke="${b.border}" stroke-width="1"`:''} />`)
    lines.push(tm(blabel, bdx+bW/2, bty+bdH/2+5, bdSz.fontSize, 500, b.text, bodyFont))
    bdx += bW + 16
  })
  bty += bdH + 32

  // Tag
  lines.push(t('Tag', PAD+32, bty+14, 13, 500, G600))
  bty += 32
  const tagDefault = tag ? (tag.default as any) : { bg:'#fff', border:G200, text:G950 }
  const tagColored = tag ? (tag.colored as any) : { bg:(badge as any).primary.soft.bg, border:(badge as any).primary.soft.bg, text:(badge as any).primary.soft.text }
  let tx2 = PAD+32
  ;(['디자인','브랜딩','마케팅','UI/UX']).forEach((lbl) => {
    const lW = lbl.split('').reduce((a,c)=>{const code=c.charCodeAt(0);return a+(code>=0xAC00&&code<=0xD7A3?13:7.8)},0)+28+20
    lines.push(`<rect x="${tx2}" y="${bty}" width="${lW}" height="${tagItemH}" rx="${tagItemH/2}" fill="${tagDefault.bg}" stroke="${tagDefault.border}" stroke-width="1"/>`)
    lines.push(t(lbl, tx2+14, bty+tagItemH/2+5, 13, 500, tagDefault.text, bodyFont))
    lines.push(t('✕', tx2+lW-18, bty+tagItemH/2+5, 11, 400, G400, bodyFont))
    tx2 += lW+8
  })
  const clbl = '컬러 태그'
  const clW = clbl.split('').reduce((a,c)=>{const code=c.charCodeAt(0);return a+(code>=0xAC00&&code<=0xD7A3?13:7.8)},0)+28+20
  lines.push(`<rect x="${tx2}" y="${bty}" width="${clW}" height="${tagItemH}" rx="${tagItemH/2}" fill="${tagColored.bg}" stroke="${tagColored.border||tagColored.bg}" stroke-width="1"/>`)
  lines.push(t(clbl, tx2+14, bty+tagItemH/2+5, 13, 500, tagColored.text, bodyFont))
  lines.push(t('✕', tx2+clW-18, bty+tagItemH/2+5, 11, 400, tagColored.text, bodyFont))

  y += btCardH + 56

  // ── Card
  lines.push(sLbl('Card', y))
  y += 28

  const cW = Math.floor((W-PAD*2-20*2)/3)
  const cH = 210
  const defsLines: string[] = []
  defsLines.push(`<filter id="sh0" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="1" stdDeviation="3" flood-color="#000" flood-opacity="0.06"/></filter>`)
  defsLines.push(`<filter id="sh2" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#000" flood-opacity="0.10"/></filter>`)

  ;(['default','bordered','elevated'] as const).forEach((variant, i) => {
    const c = (card as any)[variant]
    const xPos = PAD+i*(cW+20)
    const hasBorder = c.border && c.border !== 'transparent'
    const filterAttr = variant==='default'?`filter="url(#sh0)"`:variant==='elevated'?`filter="url(#sh2)"`:''
    const cardPad = card.padding.lg
    lines.push(`<rect x="${xPos}" y="${y}" width="${cW}" height="${cH}" rx="${c.borderRadius}" fill="${c.bg}" ${hasBorder?`stroke="${c.border}" stroke-width="1"`:''} ${filterAttr}/>`)
    lines.push(t(variant, xPos+cardPad, y+cardPad+14, 13, 400, G600))
    lines.push(`<rect x="${xPos+cardPad}" y="${y+cardPad+28}" width="${cW-cardPad*2}" height="72" rx="8" fill="${(button.primary.default as any).bg}15"/>`)
    lines.push(t('카드 타이틀', xPos+cardPad, y+cardPad+28+72+22, 16, 500, G900, bodyFont))
    lines.push(t('카드 설명 텍스트입니다.', xPos+cardPad, y+cardPad+28+72+22+20, 13, 400, G600, bodyFont))
  })
  y += cH + 48

  const fontStyle = buildFontStyle({ heading: foundation.typography.fonts.heading, body: bodyFont })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${y}" viewBox="0 0 ${W} ${y}"><defs>${defsLines.join('')}</defs>${fontStyle}<rect width="${W}" height="${y}" fill="#fff"/>${lines.join('')}</svg>`
}