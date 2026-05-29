// 브랜드 기초
export interface Brand {
  name: string
  nameCandidates?: string[]
  nameReason?: string
  slogan: {
    ko: string
    en: string
  }
  personality: string[]
  tone: string
}

// 로고
export interface Logo {
  svg: string
  style: 'wordmark' | 'lettermark' | 'symbol+wordmark'
  concept: string
}

// 단일 컬러
export interface ColorToken {
  hex: string
  rgb: string
  name: string
  usage: string
}

// 컬러 시스템
export interface Colors {
  primary: ColorToken
  secondary: ColorToken
  accent: ColorToken
  neutral: {
    '50': string
    '100': string
    '200': string
    '500': string
    '900': string
  }
  semantic: {
    success: string
    error: string
    warning: string
    info: string
  }
}

// 타이포그래피 스케일 단위
export interface TypeScale {
  size: number
  weight: number
  lineHeight: number
  letterSpacing?: string
}

// 타이포그래피
export interface Typography {
  fonts: {
    heading: string
    body: string
    mono: string
  }
  scale: {
    display: TypeScale
    h1: TypeScale
    h2: TypeScale
    h3: TypeScale
    h4: TypeScale
    bodyL: TypeScale
    bodyM: TypeScale
    bodyS: TypeScale
    caption: TypeScale
    label: TypeScale & { uppercase?: boolean }
  }
}

// 여백
export interface Spacing {
  base: number
  scale: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
    '2xl': number
    '3xl': number
  }
  borderRadius: {
    sm: number
    md: number
    lg: number
    xl: number
    full: number
  }
}

// 버튼 사이즈
export interface ButtonSize {
  height: number
  paddingX: number
  fontSize: number
}

// 컴포넌트
export interface Components {
  button: {
    variants: string[]
    sizes: {
      sm: ButtonSize
      md: ButtonSize
      lg: ButtonSize
    }
    states: string[]
  }
  input: {
    variants: string[]
    states: string[]
  }
  checkbox: { states: string[] }
  radio: { states: string[] }
  badge: { variants: string[]; sizes: string[] }
  tag: { dismissible: boolean; variants: string[] }
  accordion: { variants: string[]; multiple: boolean }
  breadcrumb: { separator: string; maxVisible: number }
  card: { variants: string[]; padding: string }
}

// 전체 브랜드 아이덴티티
export interface BrandIdentity {
  brand: Brand
  logo: Logo
  colors: Colors
  typography: Typography
  spacing: Spacing
  components: Components
}

// 스트리밍 파싱 상태 (부분적으로 완성된 상태)
export interface PartialBrandIdentity {
  brand?: Brand
  logo?: Logo
  colors?: Colors
  typography?: Typography
  spacing?: Spacing
  components?: Components
}

// 폼 입력값
export interface FormValues {
  brandName?: string
  keywords: string[]
  industry: string
  targetAudience: string
  tone: string
}

// 생성 상태
export type GenerateStatus = 'idle' | 'loading' | 'summary' | 'complete' | 'error'