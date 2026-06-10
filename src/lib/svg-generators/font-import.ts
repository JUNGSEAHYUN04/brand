// SVG에 Google Fonts import 스타일 태그 생성
export function buildFontStyle(fonts: { heading?: string; body?: string; mono?: string }): string {
  const families = [...new Set([fonts.heading, fonts.body, fonts.mono].filter(Boolean))] as string[]
  const query = families.map(f => `family=${encodeURIComponent(f)}:wght@400;500;600;700`).join('&amp;')
  return `<style>@import url('https://fonts.googleapis.com/css2?${query}&amp;display=swap');</style>`
}