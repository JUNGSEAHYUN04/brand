import { create } from 'zustand'
import { BrandIdentity, BrandIdentitySimple, FormValues, GenerateStatus, PartialBrandIdentity } from '@/lib/types'
import { StreamParser } from '@/lib/stream-parser'

interface Selection {
  brandNameIndex: number
  sloganIndex: number
  personalityIndex: number
  toneIndex: number
  headingFontIndex: number
  bodyFontIndex: number
  monoFontIndex: number
  primaryColorIndex: number
  secondaryColorIndex: number
  accentColorIndex: number
}

interface BrandStore {
  formValues: FormValues
  setFormValues: (values: Partial<FormValues>) => void
  status: GenerateStatus
  setStatus: (status: GenerateStatus) => void
  partialData: PartialBrandIdentity
  setPartialData: (data: PartialBrandIdentity) => void
  brandData: BrandIdentity | null
  setBrandData: (data: BrandIdentity) => void
  candidates: BrandIdentitySimple[]
  setCandidates: (data: BrandIdentitySimple[]) => void
  selected: Selection
  setSelected: (selected: Selection) => void
  isMixed: boolean
  setIsMixed: (value: boolean) => void
  getMixedBrand: () => BrandIdentitySimple | null
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

  candidates: [],
  setCandidates: (data) => set({ candidates: data }),

  selected: {
    brandNameIndex: 0,
    sloganIndex: 0,
    personalityIndex: 0,
    toneIndex: 0,
    headingFontIndex: 0,
    bodyFontIndex: 0,
    monoFontIndex: 0,
    primaryColorIndex: 0,
    secondaryColorIndex: 0,
    accentColorIndex: 0,
  },
  setSelected: (selected) => set({ selected }),

  isMixed: false,
  setIsMixed: (value) => set({ isMixed: value }),

  getMixedBrand: (): BrandIdentitySimple | null => {
    const { candidates, selected } = get()
    if (candidates.length === 0) return null

    const baseBrandCandidate = candidates[selected.brandNameIndex] || candidates[0]
    const sloganCandidate = candidates[selected.sloganIndex] || candidates[0]
    const personalityCandidate = candidates[selected.personalityIndex] || candidates[0]
    const toneCandidate = candidates[selected.toneIndex] || candidates[0]
    const headingCandidate = candidates[selected.headingFontIndex] || candidates[0]
    const bodyCandidate = candidates[selected.bodyFontIndex] || candidates[0]
    const monoCandidate = candidates[selected.monoFontIndex] || candidates[0]
    const primaryCandidate = candidates[selected.primaryColorIndex] || candidates[0]
    const secondaryCandidate = candidates[selected.secondaryColorIndex] || candidates[0]
    const accentCandidate = candidates[selected.accentColorIndex] || candidates[0]

    return {
      brand: {
        ...baseBrandCandidate.brand,
        name: baseBrandCandidate.brand.name,
        slogan: sloganCandidate.brand.slogan,
        personality: personalityCandidate.brand.personality,
        tone: toneCandidate.brand.tone,
      },
      logo: baseBrandCandidate.logo,
      colors: {
        primary: primaryCandidate.colors.primary,
        secondary: secondaryCandidate.colors.secondary,
        accent: accentCandidate.colors.accent,
      },
      typography: {
        heading: headingCandidate.typography.heading,
        body: bodyCandidate.typography.body,
        mono: monoCandidate.typography.mono,
      },
    }
  },

  error: null,
  setError: (error) => set({ error }),

  parser: new StreamParser(),

  generate: async () => {
    const { formValues, parser } = get()
    parser.reset()
    set({ status: 'loading', error: null, partialData: {}, brandData: null })

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      })
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || '생성 실패')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('스트림을 읽을 수 없습니다.')

      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        parser.append(chunk)
        if (parser.isSummaryReady() && get().status === 'loading') {
          set({ status: 'summary', partialData: parser.getResult() })
        }
        if (get().status === 'summary') {
          set({ partialData: parser.getResult() })
        }
      }

      const buffer = parser.getBuffer().trim()
      const extractJson = (raw: string): string | null => {
        const start = raw.indexOf('{')
        const end = raw.lastIndexOf('}')
        if (start === -1 || end === -1 || end <= start) return null

        const candidate = raw.slice(start, end + 1).trim()
        try {
          JSON.parse(candidate)
          return candidate
        } catch {
          return null
        }
      }

      let result: BrandIdentitySimple | BrandIdentitySimple[]

      if (buffer.startsWith('[')) {
        try {
          result = JSON.parse(buffer) as BrandIdentitySimple[]
        } catch {
          const jsonStrings = buffer.slice(1, -1).split(',')
          const parsed: BrandIdentitySimple[] = []
          for (const str of jsonStrings) {
            const cleanJson = extractJson(str)
            if (cleanJson) {
              try {
                parsed.push(JSON.parse(cleanJson) as BrandIdentitySimple)
              } catch {
                // 이 객체는 건너뛰기
              }
            }
          }
          if (parsed.length === 0) {
            throw new Error('데이터 파싱에 실패했습니다. 다시 시도해주세요.')
          }
          result = parsed
        }
      } else if (parser.isComplete()) {
        result = parser.getResult() as BrandIdentitySimple
      } else {
        try {
          result = JSON.parse(buffer) as BrandIdentitySimple
        } catch {
          const cleanJson = extractJson(buffer)
          if (!cleanJson) {
            throw new Error('데이터 파싱에 실패했습니다. 다시 시도해주세요.')
          }
          result = JSON.parse(cleanJson) as BrandIdentitySimple
        }
      }

      if (Array.isArray(result)) {
        const candidates = result as BrandIdentitySimple[]
        set({ status: 'complete', brandData: candidates[0] as any, partialData: candidates[0], candidates })
      } else {
        const single = result as BrandIdentitySimple
        set({ status: 'complete', brandData: single as any, partialData: single })
      }

    } catch (err) {
      const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
      set({ status: 'error', error: message })
    }
  },

  reset: () => {
    get().parser.reset()
    set({
      formValues: initialFormValues,
      status: 'idle',
      isMixed: false,
      partialData: {},
      brandData: null,
      error: null,
    })
  },
}))