import { create } from 'zustand'
import { BrandIdentity, FormValues, GenerateStatus, PartialBrandIdentity } from '@/lib/types'
import { StreamParser } from '@/lib/stream-parser'

interface BrandStore {
  formValues: FormValues
  setFormValues: (values: Partial<FormValues>) => void
  status: GenerateStatus
  setStatus: (status: GenerateStatus) => void
  partialData: PartialBrandIdentity
  setPartialData: (data: PartialBrandIdentity) => void
  brandData: BrandIdentity | null
  setBrandData: (data: BrandIdentity) => void
  error: string | null
  setError: (error: string | null) => void
  parser: StreamParser
  generate: () => Promise<void>
  reset: () => void
}

const initialFormValues: FormValues = {
  brandName: '',
  keywords: [],
  industry: '',
  targetAudience: '',
  tone: '',
}

const DUMMY_DATA: BrandIdentity = {
  brand: {
    name: 'Verdant',
    nameCandidates: ['Verdant', 'Bloomify', 'Nativa'],
    nameReason: '자연과 성장을 의미하는 라틴어에서 유래했습니다. 친환경 브랜드의 정체성을 직관적으로 전달합니다.',
    slogan: { ko: '자연이 답이다', en: 'Nature Knows Best' },
    personality: ['친환경', '신뢰감', '따뜻한'],
    tone: '자연에서 영감을 받은 따뜻하고 신뢰감 있는 브랜드입니다. 지속가능한 가치를 추구하며 고객과 진정성 있는 관계를 형성합니다.',
  },
  logo: {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80">
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#2D6A4F"/>
          <stop offset="100%" style="stop-color:#52B788"/>
        </linearGradient>
      </defs>
      <circle cx="36" cy="40" r="22" fill="url(#g1)"/>
      <path d="M36 28 Q44 36 36 44 Q28 36 36 28Z" fill="white" opacity="0.9"/>
      <text x="68" y="46" font-family="Georgia, serif" font-size="28" font-weight="700" fill="#1B4332">Verdant</text>
    </svg>`,
    style: 'symbol+wordmark',
    concept: '잎사귀 심볼과 세리프 워드마크의 조합으로 자연적이고 고급스러운 이미지를 전달합니다.',
  },
  colors: {
    primary: { hex: '#2D6A4F', rgb: '45, 106, 79', name: 'Forest Green', usage: 'CTA 버튼, 주요 강조 요소' },
    secondary: { hex: '#52B788', rgb: '82, 183, 136', name: 'Sage Green', usage: '서브 섹션, 보조 UI 요소' },
    accent: { hex: '#D8F3DC', rgb: '216, 243, 220', name: 'Mint Cream', usage: '배경, 하이라이트 요소' },
    neutral: { '50': '#F8FAF9', '100': '#EEF3F0', '200': '#D4E6DC', '500': '#7A9E8E', '900': '#1B2E25' },
    semantic: { success: '#40916C', error: '#E63946', warning: '#F4A261', info: '#457B9D' },
  },
  typography: {
    fonts: { heading: 'Playfair Display', body: 'Inter', mono: 'JetBrains Mono' },
    scale: {
      display: { size: 56, weight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' },
      h1: { size: 40, weight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' },
      h2: { size: 32, weight: 600, lineHeight: 1.25, letterSpacing: '-0.01em' },
      h3: { size: 24, weight: 600, lineHeight: 1.3 },
      h4: { size: 20, weight: 500, lineHeight: 1.4 },
      bodyL: { size: 18, weight: 400, lineHeight: 1.7 },
      bodyM: { size: 16, weight: 400, lineHeight: 1.6 },
      bodyS: { size: 14, weight: 400, lineHeight: 1.5 },
      caption: { size: 12, weight: 400, lineHeight: 1.4 },
      label: { size: 12, weight: 500, lineHeight: 1.4, letterSpacing: '0.08em' },
    },
  },
  spacing: {
    base: 4,
    scale: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48, '3xl': 64 },
    borderRadius: { sm: 4, md: 8, lg: 12, xl: 16, full: 9999 },
  },
  components: {
    button: {
      variants: ['primary', 'secondary', 'ghost', 'danger'],
      sizes: {
        sm: { height: 32, paddingX: 12, fontSize: 13 },
        md: { height: 40, paddingX: 16, fontSize: 14 },
        lg: { height: 48, paddingX: 20, fontSize: 16 },
      },
      states: ['default', 'hover', 'active', 'disabled', 'loading'],
    },
    input: { variants: ['text', 'password', 'search', 'textarea'], states: ['default', 'focus', 'error', 'success', 'disabled'] },
    checkbox: { states: ['unchecked', 'checked', 'indeterminate', 'disabled'] },
    radio: { states: ['unselected', 'selected', 'disabled'] },
    badge: { variants: ['filled', 'outline', 'soft'], sizes: ['sm', 'md'] },
    tag: { dismissible: true, variants: ['default', 'colored'] },
    accordion: { variants: ['default', 'bordered'], multiple: true },
    breadcrumb: { separator: '/', maxVisible: 4 },
    card: { variants: ['default', 'bordered', 'elevated'], padding: 'md' },
  },
}

export const useBrandStore = create<BrandStore>((set, get) => ({
  formValues: initialFormValues,
  setFormValues: (values) =>
    set((state) => ({
      formValues: { ...state.formValues, ...values },
    })),

  status: 'idle',
  setStatus: (status) => set({ status }),

  partialData: {},
  setPartialData: (data) => set({ partialData: data }),

  brandData: null,
  setBrandData: (data) => set({ brandData: data }),

  error: null,
  setError: (error) => set({ error }),

  parser: new StreamParser(),

  // ========================================
  // 더미 데이터 모드 (API 키 없을 때 테스트용)
  // ========================================
  generate: async () => {
    set({ status: 'loading', error: null, partialData: {}, brandData: null })

    // 로딩 시뮬레이션
    await new Promise((res) => setTimeout(res, 1200))

    // summary 상태 — 요약 카드 4개 먼저 표시
    set({ status: 'summary', partialData: DUMMY_DATA })

    await new Promise((res) => setTimeout(res, 1500))

    // complete 상태 — 전체 가이드북 활성화
    set({ status: 'complete', brandData: DUMMY_DATA, partialData: DUMMY_DATA })
  },

  // ========================================
  // 실제 API 모드 (API 키 있을 때)
  // ========================================
  // generate: async () => {
  //   const { formValues, parser } = get()
  //   parser.reset()
  //   set({ status: 'loading', error: null, partialData: {}, brandData: null })
  //   try {
  //     const response = await fetch('/api/generate', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formValues),
  //     })
  //     if (!response.ok) {
  //       const err = await response.json()
  //       throw new Error(err.error || '생성 실패')
  //     }
  //     const reader = response.body?.getReader()
  //     if (!reader) throw new Error('스트림을 읽을 수 없습니다.')
  //     const decoder = new TextDecoder()
  //     while (true) {
  //       const { done, value } = await reader.read()
  //       if (done) break
  //       const chunk = decoder.decode(value, { stream: true })
  //       parser.append(chunk)
  //       if (parser.isSummaryReady() && get().status === 'loading') {
  //         set({ status: 'summary', partialData: parser.getResult() })
  //       }
  //       if (get().status === 'summary') {
  //         set({ partialData: parser.getResult() })
  //       }
  //     }
  //     if (parser.isComplete()) {
  //       set({ status: 'complete', brandData: parser.getResult() as BrandIdentity, partialData: parser.getResult() })
  //     } else {
  //       try {
  //         const fullData = JSON.parse(parser.getBuffer()) as BrandIdentity
  //         set({ status: 'complete', brandData: fullData, partialData: fullData })
  //       } catch {
  //         throw new Error('데이터 파싱에 실패했습니다. 다시 시도해주세요.')
  //       }
  //     }
  //   } catch (err) {
  //     const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
  //     set({ status: 'error', error: message })
  //   }
  // },

  reset: () => {
    get().parser.reset()
    set({
      formValues: initialFormValues,
      status: 'idle',
      partialData: {},
      brandData: null,
      error: null,
    })
  },
}))