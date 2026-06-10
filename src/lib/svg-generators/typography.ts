import { Typography, Colors } from '@/lib/types'
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

const t = (s:string,x:number,y:number,sz:number,w:number,fill:string,fam=FONT4) =>
  `<text x="${x}" y="${y}" font-family="${xe(fam)}" font-size="${sz}" font-weight="${w}" fill="${fill}">${xe(s)}</text>`
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

export function generateTypographySVG(typography: Typography, colors: Colors): string {
  const { fonts, scale } = typography
  const lines: string[] = []
  let y = 0

  // ── 헤더
  y = 48
  lines.push(t('TYPOGRAPHY', PAD, y, 13, 400, C_LABEL, FONT4))
  y += 36
  lines.push(t('타이포그래피', PAD, y, 32, 700, C_MAIN, FONT7))
  y += 52

  // ── Font Family
  lines.push(sLbl('Font Family', y))
  y += 28

  const fcArr = [
    { role:'Heading', font: fonts.heading },
    { role:'Body',    font: fonts.body },
    { role:'Mono',    font: fonts.mono },
  ]
  const fcGap = 20
  const fcW   = Math.floor((W-PAD*2-fcGap*2)/3)
  const fcH   = 172

  fcArr.forEach(({ role, font }, i) => {
    if (!font) return
    const xPos = PAD+i*(fcW+fcGap)
    lines.push(`<rect x="${xPos}" y="${y}" width="${fcW}" height="${fcH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
    lines.push(t(role, xPos+24, y+36, 13, 400, C_MUTED, FONT4))
    lines.push(t('Aa Bb Cc', xPos+24, y+86, 36, 700, colors.primary.hex, font+',sans-serif'))
    lines.push(t(font, xPos+24, y+114, 14, 500, C_MAIN, FONT5))
    lines.push(t('ABCDEFGHIJKLMNOPQRSTUVWXYZ', xPos+24, y+136, 11, 400, C_MUTED, font+',sans-serif'))
    lines.push(t('abcdefghijklmnopqrstuvwxyz  0123456789', xPos+24, y+152, 11, 400, C_MUTED, font+',sans-serif'))
  })
  y += fcH + 56

  // ── Type Scale
  lines.push(sLbl('Type Scale', y))
  y += 28

  const headingFont = fonts.heading || 'SCDream6'
  const bodyFont    = fonts.body    || 'SCDream4'

  const scaleEntries = [
    { label:'Display', data:scale.display, sample:'Brand Identity',                    isH:true  },
    { label:'H1',      data:scale.h1,      sample:'Heading One',                       isH:true  },
    { label:'H2',      data:scale.h2,      sample:'Heading Two',                       isH:true  },
    { label:'H3',      data:scale.h3,      sample:'Heading Three',                     isH:true  },
    { label:'H4',      data:scale.h4,      sample:'Heading Four',                      isH:true  },
    { label:'Body L',  data:scale.bodyL,   sample:'브랜드의 이야기를 담은 본문 텍스트', isH:false },
    { label:'Body M',  data:scale.bodyM,   sample:'브랜드의 이야기를 담은 본문 텍스트', isH:false },
    { label:'Body S',  data:scale.bodyS,   sample:'브랜드의 이야기를 담은 본문 텍스트', isH:false },
    { label:'Caption', data:scale.caption, sample:'캡션 텍스트 / 보조 설명',           isH:false },
    { label:'Label',   data:scale.label,   sample:'LABEL TEXT',                        isH:false },
  ].filter(e => e.data)

  const ROW_H  = 72
  const tableH = ROW_H * scaleEntries.length
  // 오른쪽 메타 텍스트 x 위치 — 카드 오른쪽 끝에서 충분히 안쪽으로
  const META_X = W - PAD - 180

  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${tableH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)

  scaleEntries.forEach(({ label, data, sample, isH }, idx) => {
    const ry     = y + idx * ROW_H
    const fam    = (isH ? headingFont : bodyFont) + ',sans-serif'
    const dispSz = Math.min(data!.size, 32)
    const midY   = ry + ROW_H / 2

    if (idx < scaleEntries.length - 1) {
      lines.push(`<line x1="${PAD+1}" y1="${ry+ROW_H}" x2="${W-PAD-1}" y2="${ry+ROW_H}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
    }

    // 좌측 라벨
    lines.push(t(label, PAD+32, midY+5, 13, 500, C_MAIN, FONT5))

    // 샘플 텍스트 — META_X 전까지만 표시되도록 클립 영역 고려
    lines.push(t(sample, PAD+148, midY+dispSz*0.38, dispSz, data!.weight||400, C_MAIN, fam))

    // 우측 메타 — 카드 오른쪽 안쪽에 붙게
    lines.push(t(`${data!.size}px / ${data!.weight}`, META_X, midY+5,  13, 500, C_MAIN,  FONT5))
    lines.push(t(`${data!.lineHeight} leading`,        META_X, midY+20, 11, 400, C_MUTED, FONT4))
  })

  y += tableH + 56

  // ── Preview
  lines.push(sLbl('Preview', y))
  y += 28

  const PREVIEW_PAD = 40
  const INNER_W     = W - PAD*2 - PREVIEW_PAD*2
  const LINE_H      = 24

  const bodyWrapped1 = wrapWords(
  '브랜드의 가치와 철학을 타이포그래피로 표현합니다. 일관된 폰트 사용으로 브랜드의 개성을 강화하고 독자에게 명확한',
  INNER_W
)
const bodyWrapped2 = wrapWords(
  '메시지를 전달할 수 있어요.',
  INNER_W
)
const bodyWrapped = [...bodyWrapped1, ...bodyWrapped2]

  const previewH = PREVIEW_PAD
    + scale.h2.size + 16
    + scale.h4.size + 16
    + bodyWrapped.length * LINE_H
    + PREVIEW_PAD

  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${previewH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)

  let py = y + PREVIEW_PAD + scale.h2.size
  lines.push(t('브랜드의 이야기', PAD+PREVIEW_PAD, py, scale.h2.size, scale.h2.weight, colors.primary.hex, headingFont+',sans-serif'))
  py += scale.h2.size + 16
  lines.push(t('타이포그래피로 전달하는 브랜드 아이덴티티', PAD+PREVIEW_PAD, py, scale.h4.size, scale.h4.weight, C_MAIN, headingFont+',sans-serif'))
  py += scale.h4.size + 16
  bodyWrapped.forEach((line, i) => {
    lines.push(t(line, PAD+PREVIEW_PAD, py + i*LINE_H, scale.bodyM.size, scale.bodyM.weight, C_SUB, bodyFont+',sans-serif'))
  })

  y += previewH + 48

  const fontStyle = buildFontStyle({ heading: fonts.heading, body: fonts.body, mono: fonts.mono })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${y}" viewBox="0 0 ${W} ${y}">${fontStyle}<rect width="${W}" height="${y}" fill="#fff"/>${lines.join('')}</svg>`
}