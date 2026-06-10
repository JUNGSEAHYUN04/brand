import { Typography, Colors } from '@/lib/types'
import { buildFontStyle } from '@/lib/svg-generators/font-import'

function xe(s: string): string {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')
}
const G950='#030712',G900='#111827',G700='#374151',G600='#4b5563',G500='#6b7280',G400='#9ca3af',G200='#e5e7eb',G100='#f3f4f6',G50='#f9fafb'
const PAD=40, W=960

const t = (s:string,x:number,y:number,sz:number,w:number,fill:string,fam='Inter') =>
  `<text x="${x}" y="${y}" font-family="${xe(fam)},sans-serif" font-size="${sz}" font-weight="${w}" fill="${fill}">${xe(s)}</text>`
const sLbl = (s:string,y:number) => t(s.toUpperCase(),PAD,y,11,500,G600)

export function generateTypographySVG(typography: Typography, colors: Colors): string {
  const { fonts, scale } = typography
  const lines: string[] = []
  let y = 0

  // ── 헤더
  y = 48
  lines.push(t('Typography', PAD, y, 11, 400, G500))
  y += 28
  lines.push(t('타이포그래피', PAD, y, 30, 700, G950))
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
  const fcW = Math.floor((W-PAD*2-fcGap*2)/3)
  const fcH = 172

  fcArr.forEach(({ role, font }, i) => {
    if (!font) return
    const xPos = PAD+i*(fcW+fcGap)
    lines.push(`<rect x="${xPos}" y="${y}" width="${fcW}" height="${fcH}" rx="12" fill="#fff" stroke="${G200}" stroke-width="1"/>`)
    lines.push(t(role, xPos+24, y+36, 14, 400, G600))
    lines.push(t('Aa Bb Cc', xPos+24, y+86, 36, 700, colors.primary.hex, font))
    lines.push(t(font, xPos+24, y+114, 15, 500, G900))
    lines.push(t('ABCDEFGHIJKLMNOPQRSTUVWXYZ', xPos+24, y+136, 11, 400, G600, font))
    lines.push(t('abcdefghijklmnopqrstuvwxyz  0123456789', xPos+24, y+152, 11, 400, G400, font))
  })
  y += fcH + 56

  // ── Type Scale
  lines.push(sLbl('Type Scale', y))
  y += 28

  const headingFont = fonts.heading || 'Inter'
  const bodyFont = fonts.body || 'Inter'

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

  // 높이 선계산
  const ROW_H = 72 // 모든 row 동일 높이로 중앙정렬
  const tableH = ROW_H * scaleEntries.length
  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${tableH}" rx="12" fill="#fff" stroke="${G200}" stroke-width="1"/>`)

  scaleEntries.forEach(({ label, data, sample, isH }, idx) => {
    const ry = y + idx * ROW_H
    const fam = isH ? headingFont : bodyFont
    const dispSz = Math.min(data!.size, 32)

    if (idx % 2 !== 0) {
      lines.push(`<rect x="${PAD+1}" y="${ry}" width="${W-PAD*2-2}" height="${ROW_H}" fill="${G50}"/>`)
    }
    if (idx < scaleEntries.length-1) {
      lines.push(`<line x1="${PAD+1}" y1="${ry+ROW_H}" x2="${W-PAD-1}" y2="${ry+ROW_H}" stroke="${G100}" stroke-width="1"/>`)
    }

    // 세로 중앙 = ry + ROW_H/2
    const midY = ry + ROW_H/2

    // label (좌측 w-24)
    lines.push(t(label, PAD+32, midY+5, 14, 500, G700))
    lines.push(t(`${data!.size}px`, PAD+32, midY+20, 12, 400, G500))

    // sample — baseline을 중앙에 맞춤: midY + dispSz*0.35 (cap-height 보정)
    lines.push(t(sample, PAD+148, midY+dispSz*0.38, dispSz, data!.weight||400, G900, fam))

    // meta (우측)
    lines.push(t(`${data!.size}px / ${data!.weight}`, W-PAD-32-160, midY+5, 12, 400, G600))
    lines.push(t(`${data!.lineHeight} leading`, W-PAD-32-160, midY+20, 12, 400, G500))
  })

  y += tableH + 48

  const fontStyle = buildFontStyle({ heading: fonts.heading, body: fonts.body, mono: fonts.mono })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${y}" viewBox="0 0 ${W} ${y}">${fontStyle}<rect width="${W}" height="${y}" fill="#fff"/>${lines.join('')}</svg>`
}