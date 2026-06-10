import { NextRequest, NextResponse } from 'next/server'
import JSZip from 'jszip'
import { generateColorSVG } from '@/lib/svg-generators/color'
import { generateTypographySVG } from '@/lib/svg-generators/typography'
import { generateSpacingSVG } from '@/lib/svg-generators/spacing'
import { generateBrandSVG } from '@/lib/svg-generators/brand'
import { generateComponentSVG } from '@/lib/svg-generators/component'

export async function POST(req: NextRequest) {
  try {
    const { guidebook } = await req.json()

    if (!guidebook) {
      return NextResponse.json({ error: '가이드북 데이터가 없습니다.' }, { status: 400 })
    }

    const { brand, colors, typography, spacing, logo } = guidebook

    const sections = [
      { name: '01_color-system',   svg: generateColorSVG(colors) },
      { name: '02_typography',     svg: generateTypographySVG(typography, colors) },
      { name: '03_spacing',        svg: generateSpacingSVG(spacing) },
      { name: '04_brand-strategy', svg: generateBrandSVG(brand, colors) },
      { name: '05_ui-components',  svg: generateComponentSVG(colors, typography) },
    ]

    const zip = new JSZip()
    const folder = zip.folder(`${brand?.name || 'guidebook'}-figma-assets`)!
    const encoder = new TextEncoder()

    sections.forEach(({ name, svg }) => {
      folder.file(`${name}.svg`, encoder.encode(svg))
    })

    // 로고 포함
    if (logo?.url) {
      try {
        const base64Data = logo.url.split(',')[1]
        if (base64Data) {
          const ext = logo.url.startsWith('data:image/png') ? 'png'
            : logo.url.startsWith('data:image/svg') ? 'svg' : 'png'
          const binaryStr = atob(base64Data)
          const bytes = new Uint8Array(binaryStr.length)
          for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i)
          folder.file(`00_logo.${ext}`, bytes)
        }
      } catch (e) {
        console.warn('로고 추가 실패:', e)
      }
    }

    const zipUint8 = await zip.generateAsync({ type: 'arraybuffer' })
    const zipBuffer = new Blob([zipUint8 as ArrayBuffer], { type: 'application/zip' })

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(brand?.name || 'guidebook')}-figma.zip"`,
      },
    })
  } catch (err: any) {
    console.error('[export-figma-svg] error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}