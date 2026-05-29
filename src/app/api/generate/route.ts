import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getSystemPrompt, getUserPrompt } from '@/lib/prompts'
import { FormValues } from '@/lib/types'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const body: FormValues = await req.json()

    if (!body.keywords?.length || !body.industry || !body.targetAudience || !body.tone) {
      return new Response(JSON.stringify({ error: '필수 입력값이 누락되었습니다.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8096,
      system: getSystemPrompt(),
      messages: [
        {
          role: 'user',
          content: getUserPrompt(body),
        },
      ],
    })

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              // UTF-8로 직접 인코딩
              const bytes = new TextEncoder().encode(chunk.delta.text)
              controller.enqueue(bytes)
            }
          }
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(readable, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (err) {
    console.error('Generate API error:', err)
    return new Response(JSON.stringify({ error: '생성 중 오류가 발생했습니다.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}