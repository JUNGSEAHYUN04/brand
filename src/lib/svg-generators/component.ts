import { Colors, Typography } from '@/lib/types'
import { buildDesignSystem } from '@/lib/component-tokens'
import { buildFontStyle } from '@/lib/svg-generators/font-import'

function xe(s: string): string {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')
}

const C_MAIN         = '#282B32'
const C_SUB          = 'rgba(40,43,50,0.8)'
const C_MUTED        = 'rgba(40,43,50,0.6)'
const C_LABEL        = 'rgba(40,43,50,0.45)'
const C_BORDER       = 'rgba(40,43,50,0.2)'
const C_BORDER_LIGHT = 'rgba(40,43,50,0.1)'
const C_BG_SOFT      = 'rgba(40,43,50,0.03)'
const C_BG_MUTED     = 'rgba(40,43,50,0.05)'
const C_OK           = '#16A34A'
const C_NO           = '#DC2626'
const PAD = 40, W = 960
const FONT4 = 'SCDream4,sans-serif'
const FONT5 = 'SCDream5,sans-serif'
const FONT6 = 'SCDream6,sans-serif'
const FONT7 = 'SCDream7,sans-serif'

const t = (s:string,x:number,y:number,sz:number,w:number,fill:string,fam=FONT4) =>
  `<text x="${x}" y="${y}" font-family="${xe(fam)}" font-size="${sz}" font-weight="${w}" fill="${fill}">${xe(s)}</text>`
const tm = (s:string,x:number,y:number,sz:number,w:number,fill:string,fam=FONT4) =>
  `<text x="${x}" y="${y}" font-family="${xe(fam)}" font-size="${sz}" font-weight="${w}" fill="${fill}" text-anchor="middle">${xe(s)}</text>`

function charPx(ch: string, sz: number): number {
  const code = ch.charCodeAt(0)
  const base = (code >= 0xAC00 && code <= 0xD7A3) ? 1.0 : 0.55
  return base * sz
}
function wrapWords(text: string, maxW: number, sz = 13): string[] {
  const words = text.split(' ')
  const out: string[] = []
  let current = ''
  let currentW = 0
  const strPx = (s: string) => s.split('').reduce((a, c) => a + charPx(c, sz), 0)
  const spacePx = charPx(' ', sz)
  for (const word of words) {
    const wordW = strPx(word)
    const spaceW = current ? spacePx : 0
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

// 섹션 헤더: 라벨 + 한 줄 설명, 반환값은 증가한 y
function sectionHead(lines: string[], label: string, desc: string, y: number): number {
  lines.push(`<text x="${PAD}" y="${y}" font-family="${FONT4}" font-size="13" font-weight="400" fill="${C_LABEL}" letter-spacing="1.2">${xe(label.toUpperCase())}</text>`)
  y += 22
  if (desc) {
    wrapWords(desc, W-PAD*2, 13).forEach((wl, i) => {
      lines.push(t(wl, PAD, y + i*18, 13, 400, C_MUTED, FONT4))
    })
    y += wrapWords(desc, W-PAD*2, 13).length * 18 + 10
  }
  return y
}

// Do / Don't 블록 — 카드 내부에서 호출, 반환값은 증가한 by
function doDont(lines: string[], xLeft: number, innerW: number, by: number, dos: string[], donts: string[]): number {
  lines.push(`<line x1="${xLeft}" y1="${by}" x2="${xLeft+innerW}" y2="${by}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
  by += 24
  const half = innerW/2
  lines.push(t('DO', xLeft, by, 11, 500, C_OK, FONT5))
  lines.push(t("DON'T", xLeft+half, by, 11, 500, C_NO, FONT5))
  by += 18
  const n = Math.max(dos.length, donts.length)
  for (let i=0;i<n;i++){
    if (dos[i])  lines.push(t('· '+dos[i],  xLeft,      by+i*18, 12, 400, C_SUB, FONT4))
    if (donts[i])lines.push(t('· '+donts[i],xLeft+half, by+i*18, 12, 400, C_SUB, FONT4))
  }
  by += n*18
  return by
}

export function generateComponentSVG(colors: Colors, typography: Typography): string {
  const lines: string[] = []
  let y = 0

  const { component, foundation } = buildDesignSystem(colors, typography)
  const { button, input, badge, card, tag } = component as any
  const bodyFont = (foundation.typography.fonts.body || 'SCDream4') + ',sans-serif'

  y = 48
  lines.push(t('UI COMPONENTS', PAD, y, 13, 400, C_LABEL, FONT4))
  y += 36
  lines.push(t('UI 컴포넌트', PAD, y, 32, 700, C_MAIN, FONT7))
  y += 52

  const INNER_PAD = 32
  const SEC_GAP   = 24
  const LBL_H     = 36
  const innerW    = W-PAD*2-INNER_PAD*2

  // ── Button
  y = sectionHead(lines, 'Button', '사용자의 행동을 유도하는 가장 기본 요소입니다. 화면당 주요 액션(primary)은 하나로 제한해 시선을 모읍니다.', y)
  const varH = button.sizes.lg.height
  const mdH  = button.sizes.md.height
  const btnUsage = [
    ['Primary','저장·제출·다음처럼 가장 중요한 단 하나의 액션'],
    ['Secondary','취소·뒤로처럼 primary를 보조하는 액션'],
    ['Ghost','더보기·필터처럼 약한 보조 액션'],
    ['Danger','삭제·탈퇴처럼 되돌리기 어려운 액션'],
  ]
  const btnCardH = 32 + LBL_H + varH + SEC_GAP + LBL_H + varH + SEC_GAP + LBL_H + mdH + 24
    + 24 + btnUsage.length*22 + 24 + 18 + 3*18 + 24
  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${btnCardH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  let by = y + 32

  // Variants
  lines.push(t('Variants', PAD+INNER_PAD, by+16, 13, 400, C_MUTED, FONT4)); by += LBL_H
  ;(['primary','secondary','ghost','danger'] as const).forEach((variant, i) => {
    const s = button[variant].default as any
    const sz = button.sizes.lg
    const bW = sz.paddingX*2+80
    const xPos = PAD+INNER_PAD+i*(bW+16)
    const hasBorder = s.border && s.border !== 'transparent'
    lines.push(`<rect x="${xPos}" y="${by}" width="${bW}" height="${sz.height}" rx="${sz.borderRadius}" fill="${s.bg}" ${hasBorder?`stroke="${s.border}" stroke-width="1"`:''} />`)
    lines.push(tm(variant.charAt(0).toUpperCase()+variant.slice(1), xPos+bW/2, by+sz.height/2+6, sz.fontSize, 500, s.text, bodyFont))
  })
  by += varH
  lines.push(`<line x1="${PAD+1}" y1="${by+SEC_GAP/2}" x2="${W-PAD-1}" y2="${by+SEC_GAP/2}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`); by += SEC_GAP

  // Sizes
  lines.push(t('Sizes', PAD+INNER_PAD, by+16, 13, 400, C_MUTED, FONT4)); by += LBL_H
  ;(['sm','md','lg'] as const).forEach((size, i) => {
    const sz = button.sizes[size]; const d = button.primary.default as any
    const bW = sz.paddingX*2+60
    const xPos = PAD+INNER_PAD+i*(bW+16)
    const yOff = (varH-sz.height)/2
    lines.push(`<rect x="${xPos}" y="${by+yOff}" width="${bW}" height="${sz.height}" rx="${sz.borderRadius}" fill="${d.bg}"/>`)
    lines.push(tm(size.toUpperCase(), xPos+bW/2, by+yOff+sz.height/2+6, sz.fontSize, 500, d.text, bodyFont))
  })
  by += varH
  lines.push(`<line x1="${PAD+1}" y1="${by+SEC_GAP/2}" x2="${W-PAD-1}" y2="${by+SEC_GAP/2}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`); by += SEC_GAP

  // States
  lines.push(t('States', PAD+INNER_PAD, by+16, 13, 400, C_MUTED, FONT4)); by += LBL_H
  ;([
    { label:'Default',  token: button.primary.default  as any },
    { label:'Hover',    token: button.primary.hover    as any },
    { label:'Pressed',  token: button.primary.pressed  as any },
    { label:'Disabled', token: button.primary.disabled as any },
  ]).forEach(({ label, token }, i) => {
    const sz = button.sizes.md
    const bW = sz.paddingX*2+64
    const xPos = PAD+INNER_PAD+i*(bW+16)
    const hasBorder = token.border && token.border !== 'transparent'
    lines.push(`<rect x="${xPos}" y="${by}" width="${bW}" height="${sz.height}" rx="${sz.borderRadius}" fill="${token.bg}" ${hasBorder?`stroke="${token.border}" stroke-width="1"`:''} />`)
    lines.push(tm(label, xPos+bW/2, by+sz.height/2+6, sz.fontSize, 500, token.text, bodyFont))
  })
  by += mdH + 24

  // Usage rows
  btnUsage.forEach(([name, use]) => {
    lines.push(t(name, PAD+INNER_PAD, by, 13, 600, C_MAIN, FONT6))
    lines.push(t(use, PAD+INNER_PAD+100, by, 13, 400, C_SUB, FONT4))
    by += 22
  })
  by += 2
  doDont(lines, PAD+INNER_PAD, innerW, by,
    ['한 화면에 primary는 하나만','레이블은 동사로 명확하게','로딩 중엔 비활성화'],
    ['primary를 여러 개 나열','“확인”처럼 모호한 레이블','danger를 일반 액션에 사용'])
  y += btnCardH + 56

  // ── Text Input
  y = sectionHead(lines, 'Text Input', '사용자 입력을 받는 필드입니다. 상태(focus·error·success)로 현재 상황을 분명히 알려 줍니다.', y)
  const inputStates = [
    { label:'Default',  token: input.default  as any, placeholder:'텍스트를 입력하세요' },
    { label:'Focus',    token: input.focus    as any, placeholder:'포커스 상태' },
    { label:'Error',    token: input.error    as any, placeholder:'오류 상태' },
    { label:'Success',  token: input.success  as any, placeholder:'성공 상태' },
    { label:'Disabled', token: input.disabled as any, placeholder:'비활성화 상태' },
  ]
  const iH = input.sizes.lg.height
  const INPUT_LBL_H = 32
  const INPUT_GAP   = 18
  const inUsage = [
    ['Focus','현재 입력 중인 필드. 테두리 강조로 위치를 알림'],
    ['Error','검증 실패. 무엇이 잘못됐는지 메시지를 함께'],
    ['Success','검증 통과를 즉시 확인시켜야 할 때만 절제해서'],
    ['Disabled','지금 입력할 수 없는 필드. 이유가 있으면 안내'],
  ]
  const inputCardH = 32 + inputStates.length*(INPUT_LBL_H+iH) + (inputStates.length-1)*INPUT_GAP + 24
    + 24 + inUsage.length*22 + 24 + 18 + 3*18 + 24
  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${inputCardH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  let iy = y + 32
  inputStates.forEach(({ label, token, placeholder }, idx) => {
    lines.push(t(label, PAD+INNER_PAD, iy+14, 13, 400, C_MUTED, FONT4))
    iy += INPUT_LBL_H
    const iW = W-PAD*2-INNER_PAD*2
    lines.push(`<rect x="${PAD+INNER_PAD}" y="${iy}" width="${iW}" height="${iH}" rx="${input.sizes.lg.borderRadius}" fill="${token.bg}" stroke="${token.border}" stroke-width="1.5"/>`)
    lines.push(t(placeholder, PAD+INNER_PAD+input.sizes.lg.paddingX, iy+iH/2+6, input.sizes.lg.fontSize, 400, C_MUTED, bodyFont))
    iy += iH + (idx < inputStates.length-1 ? INPUT_GAP : 0)
  })
  iy += 24
  inUsage.forEach(([name, use]) => {
    lines.push(t(name, PAD+INNER_PAD, iy, 13, 600, C_MAIN, FONT6))
    lines.push(t(use, PAD+INNER_PAD+100, iy, 13, 400, C_SUB, FONT4))
    iy += 22
  })
  iy += 2
  doDont(lines, PAD+INNER_PAD, innerW, iy,
    ['라벨은 항상 표시','오류는 필드 바로 아래 구체적으로','입력 형식 예시를 placeholder로'],
    ['placeholder를 라벨처럼 사용','오류를 색상으로만 표시','성공 상태를 모든 필드에 남발'])
  y += inputCardH + 56

  // ── Badge & Tag
  y = sectionHead(lines, 'Badge & Tag', '배지는 상태·수치를 알리는 표식이고, 태그는 분류·필터에 쓰며 보통 제거(✕)할 수 있습니다.', y)
  const bdSz     = badge.sizes.md
  const bdH      = bdSz.paddingY*2+28
  const tagItemH = 34
  const btUsageH = 24 + 18 + 3*18 + 24
  const btCardH  = 32 + LBL_H+bdH + SEC_GAP + LBL_H+tagItemH + 24 + btUsageH
  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${btCardH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  let bty = y + 32

  lines.push(t('Badge · 상태 표시', PAD+INNER_PAD, bty+16, 13, 400, C_MUTED, FONT4)); bty += LBL_H
  let bdx = PAD+INNER_PAD
  ;(['filled','outline','soft'] as const).forEach((key) => {
    const b = (badge as any).primary[key]
    const blabel = key.charAt(0).toUpperCase()+key.slice(1)
    const hasBorder = b.border && b.border !== 'transparent'
    const bW = blabel.length*8 + bdSz.paddingX*2 + 4
    lines.push(`<rect x="${bdx}" y="${bty}" width="${bW}" height="${bdH}" rx="${bdH/2}" fill="${b.bg}" ${hasBorder?`stroke="${b.border}" stroke-width="1"`:''} />`)
    lines.push(tm(blabel, bdx+bW/2, bty+bdH/2+5, bdSz.fontSize, 500, b.text, bodyFont))
    bdx += bW + 16
  })
  bty += bdH
  lines.push(`<line x1="${PAD+1}" y1="${bty+SEC_GAP/2}" x2="${W-PAD-1}" y2="${bty+SEC_GAP/2}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`); bty += SEC_GAP

  lines.push(t('Tag · 분류 / 필터', PAD+INNER_PAD, bty+16, 13, 400, C_MUTED, FONT4)); bty += LBL_H
  const tagDefault = tag ? (tag.default as any) : { bg:'#fff', border:C_BORDER, text:C_MAIN }
  const tagColored = tag ? (tag.colored as any) : { bg:(badge as any).primary.soft.bg, border:(badge as any).primary.soft.bg, text:(badge as any).primary.soft.text }
  let tx2 = PAD+INNER_PAD
  ;(['디자인','브랜딩','마케팅','UI/UX']).forEach((lbl) => {
    const lW = lbl.split('').reduce((a,c)=>{const code=c.charCodeAt(0);return a+(code>=0xAC00&&code<=0xD7A3?13:7.8)},0)+28+20
    lines.push(`<rect x="${tx2}" y="${bty}" width="${lW}" height="${tagItemH}" rx="${tagItemH/2}" fill="${tagDefault.bg}" stroke="${tagDefault.border}" stroke-width="1"/>`)
    lines.push(t(lbl, tx2+14, bty+tagItemH/2+5, 13, 400, tagDefault.text, bodyFont))
    lines.push(t('✕', tx2+lW-18, bty+tagItemH/2+5, 11, 400, C_MUTED, bodyFont))
    tx2 += lW+8
  })
  const clbl = '컬러 태그'
  const clW  = clbl.split('').reduce((a,c)=>{const code=c.charCodeAt(0);return a+(code>=0xAC00&&code<=0xD7A3?13:7.8)},0)+28+20
  lines.push(`<rect x="${tx2}" y="${bty}" width="${clW}" height="${tagItemH}" rx="${tagItemH/2}" fill="${tagColored.bg}" stroke="${tagColored.border||tagColored.bg}" stroke-width="1"/>`)
  lines.push(t(clbl, tx2+14, bty+tagItemH/2+5, 13, 400, tagColored.text, bodyFont))
  lines.push(t('✕', tx2+clW-18, bty+tagItemH/2+5, 11, 400, tagColored.text, bodyFont))
  bty += tagItemH + 24
  doDont(lines, PAD+INNER_PAD, innerW, bty,
    ['배지는 상태·개수 표시에','태그는 제거 가능하게 ✕ 제공','의미가 명확한 짧은 단어'],
    ['배지를 클릭 버튼처럼 사용','태그를 과도하게 나열','배지·태그에 긴 문장'])
  y += btCardH + 56

  // ── Card
  y = sectionHead(lines, 'Card', '관련 정보를 한 덩어리로 묶는 컨테이너. 그림자·테두리 강도로 화면에서의 중요도를 조절합니다.', y)
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
    lines.push(`<rect x="${xPos}" y="${y}" width="${cW}" height="${cH}" rx="${c.borderRadius}" fill="#fff" ${hasBorder?`stroke="${c.border}" stroke-width="1"`:''} ${filterAttr}/>`)
    lines.push(t(variant, xPos+cardPad, y+cardPad+14, 13, 400, C_MUTED, FONT4))
    lines.push(`<rect x="${xPos+cardPad}" y="${y+cardPad+28}" width="${cW-cardPad*2}" height="72" rx="8" fill="${C_BG_MUTED}"/>`)
    lines.push(t('카드 타이틀', xPos+cardPad, y+cardPad+28+72+22, 16, 600, C_MAIN, FONT6))
    lines.push(t('카드 설명 텍스트입니다.', xPos+cardPad, y+cardPad+28+72+22+20, 13, 400, C_SUB, FONT4))
  })
  y += cH + 20
  // Card usage
  const cardUsage = [
    ['Default','배경과 자연스럽게 어울리는 기본 묶음'],
    ['Bordered','테두리로 영역을 또렷이 구분해야 할 때'],
    ['Elevated','그림자로 떠 보이게 — 강조·인터랙티브 카드'],
  ]
  const cuH = 24 + cardUsage.length*22 + 24
  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${cuH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  let cuy = y + 32
  cardUsage.forEach(([name, use]) => {
    lines.push(t(name, PAD+INNER_PAD, cuy, 13, 600, C_MAIN, FONT6))
    lines.push(t(use, PAD+INNER_PAD+100, cuy, 13, 400, C_SUB, FONT4))
    cuy += 22
  })
  y += cuH + 56

  // ── 나머지 컴포넌트 (한 줄 설명)
  const moreComponents: [string,string][] = [
    ['Checkbox & Radio','체크박스는 여러 개를 동시에, 라디오는 하나만 골라야 할 때.'],
    ['Accordion','공간을 아끼며 정보를 접고 펴는 요소. FAQ·보조 정보에 적합.'],
    ['Breadcrumb','현재 위치와 상위 경로를 보여 깊은 구조에서 길을 잃지 않게.'],
    ['Tabs','같은 맥락의 콘텐츠를 한 자리에서 전환. 3~5개로 제한.'],
    ['Dropdown','여러 액션·옵션을 숨겨 공간 절약. 핵심 기능은 밖에.'],
    ['Modal','흐름을 멈추고 집중시킬 때만. 확인·삭제 등 중요한 결정에.'],
    ['Empty State','데이터가 없을 때 다음 행동을 안내. 항상 액션 버튼과 함께.'],
  ]
  lines.push(`<text x="${PAD}" y="${y}" font-family="${FONT4}" font-size="13" font-weight="400" fill="${C_LABEL}" letter-spacing="1.2">MORE COMPONENTS</text>`)
  y += 28
  const moreRowH = 50
  const moreH = moreComponents.length*moreRowH + 16
  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${moreH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  let myy = y + 32
  moreComponents.forEach(([name, desc], i) => {
    if (i>0) lines.push(`<line x1="${PAD+INNER_PAD}" y1="${myy-moreRowH/2-2}" x2="${W-PAD-INNER_PAD}" y2="${myy-moreRowH/2-2}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
    lines.push(t(name, PAD+INNER_PAD, myy, 14, 600, C_MAIN, FONT6))
    lines.push(t(desc, PAD+INNER_PAD+180, myy, 13, 400, C_SUB, FONT4))
    myy += moreRowH
  })
  y += moreH + 48

  const fontStyle = buildFontStyle({ heading: foundation.typography.fonts.heading, body: 'SCDream4' })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${y}" viewBox="0 0 ${W} ${y}"><defs>${defsLines.join('')}</defs>${fontStyle}<rect width="${W}" height="${y}" fill="#fff"/>${lines.join('')}</svg>`
}