import { NextRequest } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { BrandIdentity } from '@/lib/types'

const imageAI = new GoogleGenAI({ apiKey: process.env.GEMINI_IMAGE_API_KEY! })
const textAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const body: {
      brand: BrandIdentity['brand']
      colors: BrandIdentity['colors']
      industry?: string
    } = await req.json()

    const { brand, colors, industry } = body

    const prompt = `"${brand.name}" 브랜드의 미니멀한 로고 아이콘 디자인.
업종: ${industry || '미지정'}
브랜드 성격: ${brand.personality.join(', ')}
브랜드 에센스: ${brand.brandEssence || brand.tone}
톤앤매너: ${brand.tone}
주요 색상: ${colors.primary.hex} (${colors.primary.name}), ${colors.secondary.hex} (${colors.secondary.name})
디자인 요구사항:
* 단순하고 기억하기 쉬운 심볼 중심
* 텍스트, 슬로건, 이니셜 제외
* 플랫 디자인
* 그라디언트, 그림자, 3D 효과 제외
* 작은 크기에서도 식별 가능
* 벡터 로고 스타일
* 균형 잡힌 기하학적 형태
* 전문적이고 현대적인 브랜드 아이덴티티 표현
* 배경이 어두울때 심볼색은 흰색에 가까운 밝은 톤으로, 배경이 밝을때 심볼색은 검정에 가까운 어두운 톤으로
배경: 투명 배경 또는 브랜드 톤앤매너에 어울리는 단색 배경
출력: 중앙 정렬, 고해상도, 심볼만 표시`

    const [result, conceptResult] = await Promise.all([
      imageAI.models.generateContent({
        model: 'gemini-3.1-flash-image',
        contents: prompt,
      }),
      textAI.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: `"${brand.name}" 브랜드 로고 심볼의 디자인 의미와 컨셉을 1~2문장, 50자 이내로 설명해주세요.
브랜드 성격: ${brand.personality.join(', ')}
톤앤매너: ${brand.tone}
설명만 출력하세요.`,
        config: { thinkingConfig: { thinkingBudget: 0 } },
      }),
    ])

    const parts = result.candidates?.[0]?.content?.parts
    const imagePart = parts?.find((p: any) => p.inlineData)

    if (!imagePart?.inlineData) {
      throw new Error('이미지를 생성할 수 없습니다.')
    }

    const imageUrl = `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`
    const concept = (conceptResult.text ?? '').trim()

    return new Response(JSON.stringify({ url: imageUrl, concept, style: 'symbol' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Logo generation error:', err)
    return new Response(JSON.stringify({ error: '로고 생성에 실패했습니다.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}