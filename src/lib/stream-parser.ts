import { PartialBrandIdentity } from './types'

// 스트리밍으로 들어오는 JSON 텍스트를 누적하면서
// brand, logo, colors, typography 4개가 완성되는 순간 감지
export class StreamParser {
  private buffer: string = ''
  private parsed: PartialBrandIdentity = {}
  private completedKeys: Set<string> = new Set()

  // 청크 추가할 때마다 호출
  append(chunk: string) {
    this.buffer += chunk
    this.tryParse()
  }

  // 완성된 키 파싱 시도
  private tryParse() {
    const keys = ['brand', 'logo', 'colors', 'typography', 'spacing', 'components'] as const

    for (const key of keys) {
      if (this.completedKeys.has(key)) continue

      const value = this.extractKey(this.buffer, key)
      if (value !== null) {
        try {
          (this.parsed as any)[key] = JSON.parse(value)
          this.completedKeys.add(key)
        } catch {
          // 아직 완성 안 된 JSON — 무시하고 계속 누적
        }
      }
    }
  }

  // 특정 키의 값을 버퍼에서 추출
  private extractKey(buffer: string, key: string): string | null {
    const keyPattern = `"${key}"`
    const keyIndex = buffer.indexOf(keyPattern)
    if (keyIndex === -1) return null

    // 키 다음 콜론 찾기
    const colonIndex = buffer.indexOf(':', keyIndex + keyPattern.length)
    if (colonIndex === -1) return null

    const valueStart = buffer.indexOf('{', colonIndex)
    if (valueStart === -1) return null

    // 중괄호 깊이 추적해서 완성된 객체 찾기
    let depth = 0
    let inString = false
    let escape = false

    for (let i = valueStart; i < buffer.length; i++) {
      const char = buffer[i]

      if (escape) {
        escape = false
        continue
      }

      if (char === '\\' && inString) {
        escape = true
        continue
      }

      if (char === '"') {
        inString = !inString
        continue
      }

      if (inString) continue

      if (char === '{') depth++
      if (char === '}') {
        depth--
        if (depth === 0) {
          return buffer.slice(valueStart, i + 1)
        }
      }
    }

    return null // 아직 완성 안 됨
  }

  // 요약 카드용 4개가 다 완성됐는지
  isSummaryReady(): boolean {
    return (
      this.completedKeys.has('brand') &&
      this.completedKeys.has('logo') &&
      this.completedKeys.has('colors') &&
      this.completedKeys.has('typography')
    )
  }

  // 전체 완성됐는지
  isComplete(): boolean {
    return (
      this.completedKeys.has('brand') &&
      this.completedKeys.has('logo') &&
      this.completedKeys.has('colors') &&
      this.completedKeys.has('typography') &&
      this.completedKeys.has('spacing') &&
      this.completedKeys.has('components')
    )
  }

  // 현재까지 파싱된 데이터 반환
  getResult(): PartialBrandIdentity {
    return this.parsed
  }

  // 전체 버퍼 반환 (디버깅용)
  getBuffer(): string {
    return this.buffer
  }

  // 초기화
  reset() {
    this.buffer = ''
    this.parsed = {}
    this.completedKeys = new Set()
  }
}