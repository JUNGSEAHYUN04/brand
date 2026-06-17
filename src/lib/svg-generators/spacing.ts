import { Spacing as SpacingType } from '@/lib/types'
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
const C_RED          = 'rgba(220,38,38,0.06)'
const C_RED_TEXT     = 'rgba(185,28,28,0.7)'
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

const SCALE_USAGE: Record<string, string> = {
  xs: '아이콘과 텍스트 사이, 태그 안쪽 여백',
  sm: '연관된 요소 사이 (라벨–입력칸)',
  md: '카드 안쪽 기본 여백, 버튼 패딩',
  lg: '카드와 카드 사이, 그룹 간격',
  xl: '섹션과 섹션 사이',
  '2xl': '큰 블록 구분, 페이지 상하 여백',
  '3xl': '히어로·랜딩 등 넓은 호흡이 필요한 곳',
}

const RADIUS_USAGE: Record<string, string> = {
  sm: '태그, 배지, 작은 칩',
  md: '버튼, 입력칸',
  lg: '카드, 모달',
  xl: '큰 카드, 이미지 컨테이너',
  full: '아바타, 원형 버튼, 토글',
}

function charPx(ch: string): number {
  const code = ch.charCodeAt(0)
  if (code >= 0xAC00 && code <= 0xD7A3) return 13
  return 7.0
}
function wrapWords(text: string, maxW: number): string[] {
  const words = text.split(' ')
  const out: string[] = []
  let current = ''
  let currentW = 0
  const strPx = (s: string) => s.split('').reduce((a, c) => a + charPx(c), 0)
  for (const word of words) {
    const wordW = strPx(word)
    const spaceW = current ? 7.0 : 0
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

export function generateSpacingSVG(spacing: SpacingType): string {
  const lines: string[] = []
  let y = 0

  // ── 헤더
  y = 48
  lines.push(t('SPACING', PAD, y, 13, 400, C_LABEL, FONT4))
  y += 36
  lines.push(t('여백 & 그리드', PAD, y, 32, 700, C_MAIN, FONT7))
  y += 52

  const scaleEntries = Object.entries(spacing.scale || {}) as [string, number][]

  // ── Spacing Scale (+ 용도)
  lines.push(sLbl('Spacing Scale', y))
  y += 28
  const ROW_H = 54
  const tableH = ROW_H * scaleEntries.length
  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${tableH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  scaleEntries.forEach(([key, value], idx) => {
    const ry  = y + idx * ROW_H
    const midY = ry + ROW_H / 2
    if (idx < scaleEntries.length - 1) {
      lines.push(`<line x1="${PAD+1}" y1="${ry+ROW_H}" x2="${W-PAD-1}" y2="${ry+ROW_H}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
    }
    lines.push(t(key, PAD+32, midY-1, 13, 500, C_MAIN, FONT5))
    lines.push(t(`${value}px`, PAD+32, midY+15, 11, 400, C_MUTED, FONT4))
    const barW = Math.min(value * 2.5, 120)
    lines.push(`<rect x="${PAD+96}" y="${midY-9}" width="${barW}" height="18" rx="4" fill="${C_BORDER}"/>`)
    lines.push(t(SCALE_USAGE[key] || '', PAD+240, midY+5, 13, 400, C_SUB, FONT4))
    lines.push(t(`${(value/(spacing.base||4)).toFixed(0)}x`, W-PAD-50, midY+5, 11, 400, C_MUTED, FONT4))
  })
  y += tableH + 56

  // ── Spacing Principles (Do / Don't)
  lines.push(sLbl('Spacing Principles', y))
  y += 28
  const dos = [
    '같은 base의 배수만 사용해 리듬을 유지',
    '연관된 요소는 좁게, 무관한 요소는 넓게 (근접성)',
    '제목과 본문 사이는 본문 줄 간격보다 넓게',
  ]
  const donts = [
    '13px·19px 같은 스케일 밖 임의 값 사용',
    '모든 간격을 똑같이 줘서 위계를 없애기',
    '관련 없는 요소를 너무 붙여 그룹처럼 보이게',
  ]
  const prinGap   = 20
  const prinW     = Math.floor((W-PAD*2-prinGap)/2)
  const prinInner = prinW - 56
  const dosWrapped   = dos.map(d => wrapWords(d, prinInner))
  const dontsWrapped = donts.map(d => wrapWords(d, prinInner))
  const ITEM_LH = 20, ITEM_GAP = 8
  const dosLineCount   = dosWrapped.reduce((a, l) => a + l.length, 0)
  const dontsLineCount = dontsWrapped.reduce((a, l) => a + l.length, 0)
  const maxItems = Math.max(dos.length, donts.length)
  const contentLines = Math.max(dosLineCount, dontsLineCount)
  const prinH = 30 + 24 + contentLines*ITEM_LH + (maxItems-1)*ITEM_GAP + 24
  const drawPrincipleCard = (xPos: number, head: string, headColor: string, mark: string, wrapped: string[][]) => {
    lines.push(`<rect x="${xPos}" y="${y}" width="${prinW}" height="${prinH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
    lines.push(t(head, xPos+28, y+30, 11, 500, headColor, FONT5))
    let iy = y + 30 + 24
    wrapped.forEach((wlines) => {
      lines.push(t(mark, xPos+28, iy, 12, 400, headColor, FONT4))
      wlines.forEach((wl, li) => {
        lines.push(t(wl, xPos+28+18, iy + li*ITEM_LH, 13, 400, C_SUB, FONT4))
      })
      iy += wlines.length*ITEM_LH + ITEM_GAP
    })
  }
  drawPrincipleCard(PAD, 'DO', C_OK, '✓', dosWrapped)
  drawPrincipleCard(PAD+prinW+prinGap, "DON'T", C_NO, '✕', dontsWrapped)
  y += prinH + 56

  // ── Visual Guide
  lines.push(sLbl('Visual Guide', y))
  y += 28
  const MAX_SQ = 110, COL_W = 108
  const chartPadT = 60, chartPadB = 36
  const chartH = MAX_SQ + chartPadT + chartPadB + 24
  const maxVal = Math.max(...scaleEntries.map(([,v]) => v))
  const totalColW = scaleEntries.length * COL_W
  const chartStartX = PAD + Math.floor(((W - PAD*2) - totalColW) / 2)
  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${chartH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  const chartBaseY = y + chartPadT + MAX_SQ + 20
  scaleEntries.forEach(([key, value], i) => {
    const s    = Math.max(Math.round((value / maxVal) * MAX_SQ), 4)
    const xPos = chartStartX + i * COL_W
    lines.push(`<rect x="${xPos}" y="${chartBaseY-s}" width="${s}" height="${s}" rx="4" fill="${C_BORDER}"/>`)
    lines.push(tm(String(value), xPos+s/2, chartBaseY-s-8, 11, 400, C_MUTED, FONT4))
    lines.push(tm(key, xPos+s/2, chartBaseY+20, 12, 500, C_MAIN, FONT5))
  })
  y += chartH + 56

  // ── Border Radius (+ 용도)
  lines.push(sLbl('Border Radius', y))
  y += 28
  const radiusEntries = Object.entries(spacing.borderRadius || {}) as [string, number][]
  const rItemW = 150, rGap = 20
  const totalRW = radiusEntries.length * rItemW + (radiusEntries.length-1) * rGap
  const rStartX = PAD + Math.floor(((W-PAD*2) - totalRW) / 2)
  const rCardH = 40 + 80 + 22 + 18 + 30
  lines.push(`<rect x="${PAD}" y="${y}" width="${W-PAD*2}" height="${rCardH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  radiusEntries.forEach(([key, value], i) => {
    const xPos = rStartX + i * (rItemW + rGap)
    const cx   = xPos + rItemW/2
    const r    = key === 'full' ? 40 : Math.min(value, 40)
    lines.push(`<rect x="${cx-40}" y="${y+40}" width="80" height="80" rx="${r}" fill="${C_BG_MUTED}" stroke="${C_BORDER}" stroke-width="1"/>`)
    lines.push(tm(`${key} · ${key==='full'?'9999px':`${value}px`}`, cx, y+40+80+22, 13, 500, C_MAIN, FONT5))
    lines.push(tm(RADIUS_USAGE[key] || '', cx, y+40+80+40, 11, 400, C_SUB, FONT4))
  })
  y += rCardH + 56

  // ── Usage Example (Card Padding / Section Gap / List Gap / Form Field)
  lines.push(sLbl('Usage Example', y))
  y += 28
  const scale_xs = (spacing.scale as any)['xs'] ?? 8
  const scale_sm = (spacing.scale as any)['sm'] ?? 8
  const scale_md = (spacing.scale as any)['md'] ?? 16
  const scale_xl = (spacing.scale as any)['xl'] ?? 32
  const uGap   = 20
  const usageW = Math.floor((W-PAD*2-uGap) / 2)
  const usageH = 180
  const HEAD_H = 44

  // Row 1
  let uy = y
  // Card Padding
  let ux = PAD
  lines.push(`<rect x="${ux}" y="${uy}" width="${usageW}" height="${usageH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  lines.push(`<line x1="${ux}" y1="${uy+HEAD_H}" x2="${ux+usageW}" y2="${uy+HEAD_H}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
  lines.push(t(`Card Padding — md (${scale_md}px)`, ux+16, uy+27, 13, 400, C_MUTED, FONT4))
  lines.push(`<rect x="${ux}" y="${uy+HEAD_H}" width="${usageW}" height="${usageH-HEAD_H}" fill="${C_RED}"/>`)
  lines.push(`<rect x="${ux+scale_md}" y="${uy+HEAD_H+scale_md}" width="${usageW-scale_md*2}" height="${usageH-HEAD_H-scale_md*2}" rx="8" fill="#fff" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
  lines.push(tm('Content', ux+usageW/2, uy+HEAD_H+scale_md+(usageH-HEAD_H-scale_md*2)/2+6, 13, 400, C_MUTED, FONT4))
  // Section Gap
  ux = PAD+usageW+uGap
  lines.push(`<rect x="${ux}" y="${uy}" width="${usageW}" height="${usageH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  lines.push(`<line x1="${ux}" y1="${uy+HEAD_H}" x2="${ux+usageW}" y2="${uy+HEAD_H}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
  lines.push(t(`Section Gap — xl (${scale_xl}px)`, ux+16, uy+27, 13, 400, C_MUTED, FONT4))
  const secH = Math.floor((usageH-HEAD_H-scale_xl-16*2) / 2)
  lines.push(`<rect x="${ux+16}" y="${uy+HEAD_H+16}" width="${usageW-32}" height="${secH}" fill="${C_BG_MUTED}"/>`)
  lines.push(tm('Section A', ux+usageW/2, uy+HEAD_H+16+secH/2+6, 13, 400, C_MUTED, FONT4))
  lines.push(`<rect x="${ux+16}" y="${uy+HEAD_H+16+secH}" width="${usageW-32}" height="${scale_xl}" fill="${C_RED}"/>`)
  lines.push(tm(`${scale_xl}px`, ux+usageW/2, uy+HEAD_H+16+secH+scale_xl/2+5, 11, 500, C_RED_TEXT, FONT5))
  lines.push(`<rect x="${ux+16}" y="${uy+HEAD_H+16+secH+scale_xl}" width="${usageW-32}" height="${secH}" fill="${C_BG_MUTED}"/>`)
  lines.push(tm('Section B', ux+usageW/2, uy+HEAD_H+16+secH+scale_xl+secH/2+6, 13, 400, C_MUTED, FONT4))
  y += usageH + uGap

  // Row 2
  uy = y
  // List Gap
  ux = PAD
  lines.push(`<rect x="${ux}" y="${uy}" width="${usageW}" height="${usageH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  lines.push(`<line x1="${ux}" y1="${uy+HEAD_H}" x2="${ux+usageW}" y2="${uy+HEAD_H}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
  lines.push(t(`List Gap — sm (${scale_sm}px)`, ux+16, uy+27, 13, 400, C_MUTED, FONT4))
  {
    const itemH = 36
    let ly = uy + HEAD_H + 16
    ;['항목 하나','항목 둘','항목 셋'].forEach((label, i, arr) => {
      lines.push(`<rect x="${ux+16}" y="${ly}" width="${usageW-32}" height="${itemH}" rx="8" fill="${C_BG_MUTED}"/>`)
      lines.push(`<rect x="${ux+30}" y="${ly+itemH/2-7}" width="14" height="14" rx="4" fill="${C_BORDER}"/>`)
      lines.push(t(label, ux+54, ly+itemH/2+5, 13, 400, C_MUTED, FONT4))
      ly += itemH
      if (i < arr.length-1) {
        lines.push(`<rect x="${ux+16}" y="${ly}" width="${usageW-32}" height="${scale_sm}" fill="${C_RED}"/>`)
        ly += scale_sm
      }
    })
  }
  // Form Field
  ux = PAD+usageW+uGap
  lines.push(`<rect x="${ux}" y="${uy}" width="${usageW}" height="${usageH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  lines.push(`<line x1="${ux}" y1="${uy+HEAD_H}" x2="${ux+usageW}" y2="${uy+HEAD_H}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
  lines.push(t(`Form Field — sm (${scale_sm}px)`, ux+16, uy+27, 13, 400, C_MUTED, FONT4))
  {
    let fy = uy + HEAD_H + 20
    const labelH = 32
    lines.push(`<rect x="${ux+16}" y="${fy}" width="${usageW-32}" height="${labelH}" rx="6" fill="${C_BG_MUTED}"/>`)
    lines.push(t('이메일', ux+30, fy+labelH/2+5, 12, 500, C_MUTED, FONT5))
    fy += labelH
    lines.push(`<rect x="${ux+16}" y="${fy}" width="${usageW-32}" height="${scale_sm}" fill="${C_RED}"/>`)
    fy += scale_sm
    lines.push(`<rect x="${ux+16}" y="${fy}" width="${usageW-32}" height="40" rx="8" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
    lines.push(t('name@example.com', ux+30, fy+25, 13, 400, C_MUTED, FONT4))
  }
  y += usageH + 56

  // ── Layout Example
  lines.push(sLbl('Layout Example', y))
  y += 28
  const layGap = 20
  const layW   = Math.floor((W-PAD*2-layGap) / 2)
  const layH   = 230

  // 프로필 카드
  let lx = PAD
  lines.push(`<rect x="${lx}" y="${y}" width="${layW}" height="${layH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  lines.push(`<circle cx="${lx+scale_md+24}" cy="${y+scale_md+24}" r="24" fill="rgba(40,43,50,0.08)"/>`)
  lines.push(t('프로필 카드', lx+scale_md+24+24+scale_sm, y+scale_md+20, 15, 600, C_MAIN, FONT6))
  lines.push(t('md 패딩 · sm 간격 · xs 라벨', lx+scale_md+24+24+scale_sm, y+scale_md+38, 12, 400, C_MUTED, FONT4))
  let lyy = y+scale_md+24+24+scale_md
  lines.push(`<line x1="${lx+scale_md}" y1="${lyy}" x2="${lx+layW-scale_md}" y2="${lyy}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
  lyy += scale_md + 4
  const profWrap = wrapWords('아바타·이름·설명은 가깝게 묶고, 구분선과 본문 사이는 한 단계 넓혀 그룹을 나눕니다.', layW-scale_md*2)
  profWrap.forEach((wl, i) => lines.push(t(wl, lx+scale_md, lyy+i*20, 13, 400, C_SUB, FONT4)))
  lyy += profWrap.length*20 + scale_md
  const btnW = Math.floor((layW-scale_md*2-scale_sm)/2)
  lines.push(`<rect x="${lx+scale_md}" y="${lyy}" width="${btnW}" height="38" rx="8" fill="${C_MAIN}"/>`)
  lines.push(tm('기본', lx+scale_md+btnW/2, lyy+24, 13, 500, '#fff', FONT5))
  lines.push(`<rect x="${lx+scale_md+btnW+scale_sm}" y="${lyy}" width="${btnW}" height="38" rx="8" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  lines.push(tm('보조', lx+scale_md+btnW+scale_sm+btnW/2, lyy+24, 13, 500, C_SUB, FONT5))

  // 본문 글
  lx = PAD+layW+layGap
  lines.push(`<rect x="${lx}" y="${y}" width="${layW}" height="${layH}" rx="12" fill="#fff" stroke="${C_BORDER}" stroke-width="1"/>`)
  let ay = y+scale_md+14
  lines.push(t('ARTICLE', lx+scale_md, ay, 11, 400, C_LABEL, FONT4))
  ay += scale_xs + 18
  lines.push(t('제목과 본문의 간격', lx+scale_md, ay, 18, 600, C_MAIN, FONT6))
  ay += scale_sm + 14
  const artWrap = wrapWords('제목 아래 본문은 sm으로 붙이고, 문단과 다음 블록 사이는 lg로 넓혀 호흡을 줍니다. 같은 글 안에서도 간격의 위계가 읽기 흐름을 만듭니다.', layW-scale_md*2)
  artWrap.forEach((wl, i) => lines.push(t(wl, lx+scale_md, ay+i*20, 13, 400, C_SUB, FONT4)))
  ay += artWrap.length*20 + scale_md
  lines.push(`<line x1="${lx+scale_md}" y1="${ay}" x2="${lx+layW-scale_md}" y2="${ay}" stroke="${C_BORDER_LIGHT}" stroke-width="1"/>`)
  ay += scale_md + 4
  lines.push(`<circle cx="${lx+scale_md+14}" cy="${ay}" r="14" fill="rgba(40,43,50,0.08)"/>`)
  lines.push(t('작성자 · 5분 읽기', lx+scale_md+14+14+scale_xs, ay+4, 12, 400, C_MUTED, FONT4))
  y += layH + 48

  const fontStyle = buildFontStyle({ body: 'SCDream4' })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${y}" viewBox="0 0 ${W} ${y}">${fontStyle}<rect width="${W}" height="${y}" fill="#fff"/>${lines.join('')}</svg>`
}