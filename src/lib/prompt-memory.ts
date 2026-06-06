import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const MEMORY_PATH = join(process.cwd(), 'src/lib/prompt-memory.json')

export interface PromptMemory {
  version: number
  totalGenerations: number
  averageScore: number
  feedbacks: {
    timestamp: string
    localScore: number
    aiScore: number
    combinedFeedback: string[]
  }[]
  improvedRules: string[]
}

// ─────────────────────────────────────────
// 메모리 읽기
// ─────────────────────────────────────────
export function readMemory(): PromptMemory {
  try {
    const raw = readFileSync(MEMORY_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return {
      version: 1,
      totalGenerations: 0,
      averageScore: 0,
      feedbacks: [],
      improvedRules: [],
    }
  }
}

// ─────────────────────────────────────────
// 메모리 저장
// ─────────────────────────────────────────
export function writeMemory(memory: PromptMemory): void {
  writeFileSync(MEMORY_PATH, JSON.stringify(memory, null, 2), 'utf-8')
}

// ─────────────────────────────────────────
// 평가 결과 저장 + 규칙 업데이트
// ─────────────────────────────────────────
export function updateMemory(
  localScore: number,
  aiScore: number,
  combinedFeedback: string[]
): void {
  const memory = readMemory()

  // 피드백 추가 (최근 10개만 유지)
  memory.feedbacks.push({
    timestamp: new Date().toISOString(),
    localScore,
    aiScore,
    combinedFeedback,
  })
  if (memory.feedbacks.length > 10) {
    memory.feedbacks = memory.feedbacks.slice(-10)
  }

  // 평균 점수 업데이트
  memory.totalGenerations++
  const avgLocal = memory.feedbacks.reduce((sum, f) => sum + f.localScore, 0) / memory.feedbacks.length
  memory.averageScore = Math.round(avgLocal)

  // 자주 나오는 피드백 → 개선 규칙으로 누적
  const allFeedbacks = memory.feedbacks.flatMap(f => f.combinedFeedback)
  const feedbackCounts: Record<string, number> = {}
  allFeedbacks.forEach(f => {
    feedbackCounts[f] = (feedbackCounts[f] || 0) + 1
  })

  // 2번 이상 나온 피드백 → 규칙으로 추가
  const newRules = Object.entries(feedbackCounts)
    .filter(([_, count]) => count >= 2)
    .map(([feedback]) => feedback)

  // 중복 없이 최대 5개 유지
  const allRules = [...new Set([...memory.improvedRules, ...newRules])]
  memory.improvedRules = allRules.slice(-5)

  writeMemory(memory)
}

// ─────────────────────────────────────────
// 개선 규칙 → 프롬프트 텍스트
// ─────────────────────────────────────────
export function getImprovedRulesPrompt(): string {
  const memory = readMemory()
  if (memory.improvedRules.length === 0) return ''

  return `\n=== 이전 생성 결과 기반 개선 규칙 (반드시 준수) ===\n${
    memory.improvedRules.map((rule, i) => `${i + 1}. ${rule}`).join('\n')
  }\n`
}