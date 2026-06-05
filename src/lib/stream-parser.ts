import { PartialBrandIdentity } from './types'

export class StreamParser {
  private buffer: string = ''
  private parsed: PartialBrandIdentity = {}
  private completedKeys: Set<string> = new Set()

  append(chunk: string) {
    this.buffer += chunk
    this.tryParse()
  }

  private tryParse() {
    const keys = ['brand', 'colors', 'typography'] as const

    for (const key of keys) {
      if (this.completedKeys.has(key)) continue

      const value = this.extractKey(this.buffer, key)
      if (value !== null) {
        try {
          (this.parsed as any)[key] = JSON.parse(value)
          this.completedKeys.add(key)
        } catch {
          // 아직 완성 안 된 JSON
        }
      }
    }
  }

  private extractKey(buffer: string, key: string): string | null {
    const keyPattern = `"${key}"`
    const keyIndex = buffer.indexOf(keyPattern)
    if (keyIndex === -1) return null

    const colonIndex = buffer.indexOf(':', keyIndex + keyPattern.length)
    if (colonIndex === -1) return null

    const valueStart = buffer.indexOf('{', colonIndex)
    if (valueStart === -1) return null

    let depth = 0
    let inString = false
    let escape = false

    for (let i = valueStart; i < buffer.length; i++) {
      const char = buffer[i]

      if (escape) { escape = false; continue }
      if (char === '\\' && inString) { escape = true; continue }
      if (char === '"') { inString = !inString; continue }
      if (inString) continue
      if (char === '{') depth++
      if (char === '}') {
        depth--
        if (depth === 0) return buffer.slice(valueStart, i + 1)
      }
    }

    return null
  }

  // brand + colors 완성되면 summary ready
  isSummaryReady(): boolean {
    return (
      this.completedKeys.has('brand') &&
      this.completedKeys.has('colors')
    )
  }

  // brand + colors + typography 전부 완성
  isComplete(): boolean {
    return (
      this.completedKeys.has('brand') &&
      this.completedKeys.has('colors') &&
      this.completedKeys.has('typography')
    )
  }

  getResult(): PartialBrandIdentity {
    return this.parsed
  }

  getBuffer(): string {
    return this.buffer
  }

  reset() {
    this.buffer = ''
    this.parsed = {}
    this.completedKeys = new Set()
  }
}