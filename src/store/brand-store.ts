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
      if (parser.isComplete()) {
        const result = parser.getResult() as BrandIdentity
        set({ status: 'complete', brandData: result, partialData: result })

        // 백그라운드에서 로고 생성
        const logoResponse = await fetch('/api/generate-logo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            brand: result.brand,
            colors: result.colors,
            industry: formValues.industry,
          }),
        })
        if (logoResponse.ok) {
  const { url, concept, style } = await logoResponse.json()
  const updatedData = {
    ...result,
    logo: { url, concept: concept || '', style: style || 'symbol' },
  }
  set({ brandData: updatedData, partialData: updatedData })
}
      } else {
        try {
          const fullData = JSON.parse(parser.getBuffer()) as BrandIdentity
          set({ status: 'complete', brandData: fullData, partialData: fullData })

          // 백그라운드에서 로고 생성
          const logoResponse = await fetch('/api/generate-logo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              brand: fullData.brand,
              colors: fullData.colors,
              industry: formValues.industry,
            }),
          })
          if (logoResponse.ok) {
  const { url, concept, style } = await logoResponse.json()
  const updatedData = {
    ...fullData,
    logo: { url, concept: concept || '', style: style || 'symbol' },
  }
  set({ brandData: updatedData, partialData: updatedData })
}
        } catch {
          throw new Error('데이터 파싱에 실패했습니다. 다시 시도해주세요.')
        }
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
      partialData: {},
      brandData: null,
      error: null,
    })
  },
}))