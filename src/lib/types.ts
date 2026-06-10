// 브랜드 기초
export interface Brand {
  // 기본 정보
  name: string                          // 브랜드명
  nameCandidates?: string[]             // AI 추천 브랜드명 후보
  nameReason?: string                   // 브랜드명 선택 이유
  slogan: {
    ko: string                          // 한글 슬로건
    en: string                          // 영문 슬로건
  }
  personality: string[]                 // 브랜드 키워드

  // 브랜드 전략
  coreValues?: {                        // 핵심 가치 3개
    title: string                       // 핵심 가치명
    description: string                 // 핵심 가치 설명
  }[]
  brandEssence?: string                 // 브랜드의 문장 (브랜드 존재이유 + 지향하는 미래)

  // 톤앤매너
  tone: string                          // 톤앤매너 한 줄 요약
  coreTone?: string[]                   // 브랜드 핵심 톤 키워드 3~5개

  // 비주얼 디렉션
  designPrinciples?: string[]           // 디자인 원칙 3개
  designDirection?: string              // 전체 디자인 방향성 한 줄 요약
}

// 로고
export interface Logo {
  url: string        // 이미지 URL
  concept: string    // 로고 컨셉 설명
  style: string      // 로고 스타일
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
  '300': string  // 추가
  '400': string  // 추가
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





// 전체 브랜드 아이덴티티
export interface BrandIdentity {
  brand: Brand
  logo?: Logo        // optional로 변경
  colors: Colors
  typography: Typography
  spacing?: Spacing
}

export interface PartialBrandIdentity {
  brand?: Brand
  logo?: Logo
  colors?: Colors
  typography?: Typography
  spacing?: Spacing
}

// 폼 입력값
export interface FormValues {
  brandName?: string
  keywords: string[]
  industry?: string
}

// 생성 상태
export type GenerateStatus = 'idle' | 'loading' | 'summary' | 'complete' | 'error'
