// 포지셔닝 ✨ 새로 추가

export interface Positioning {

category: string          // 속하는 카테고리/시장

competitors: string       // 경쟁 상대 또는 경쟁 구도

differentiation: string   // 경쟁 대비 차별점

statement: string         // 한 문장 포지셔닝 선언

}
// 타겟 고객 프로필 ✨ 새로 추가

export interface TargetProfile {

demographics: string      // 인구통계 (연령대, 성별, 지역 등)

occupation: string        // 직업 또는 처한 상황

needs: string             // 핵심 니즈

painPoints: string        // 겪고 있는 문제/불편

goals: string             // 달성하려는 목표

}
// 브랜드 기초

export interface Brand {

// 기본 정보

name: string                          // 브랜드명

nameReason?: string                   // 브랜드명 선택/생성 이유 (Simple 후보 선택용)

slogan: {

ko: string                          // 한글 슬로건

en: string                          // 영문 슬로건

}

sloganReason?: string                 // 슬로건 생성 이유 (Simple 후보 선택용) ✨

personality: string[]                 // 브랜드 키워드
// 브랜드 전략

coreValues?: {                        // 핵심 가치 3개

title: string                       // 핵심 가치명

description: string                 // 핵심 가치 설명

}[]

brandEssence?: string                 // 브랜드의 문장 (브랜드 존재이유 + 지향하는 미래)

positioning?: Positioning             // 브랜드 포지셔닝 ✨ 새로 추가

targetProfile?: TargetProfile         // 타겟 고객 프로필 ✨ 새로 추가

mission?: string                      // 미션 — 지금 우리가 왜 존재하는가 ✨ 새로 추가

vision?: string                       // 비전 — 지향하는 미래 ✨ 새로 추가
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

reason?: string     // 이 색을 생성/선택한 이유 (Simple 후보 선택용) ✨

meaning?: string    // 이 색이 전달하는 느낌·심리 (가이드북용) ✨

dos?: string[]      // 권장 사용처 ✨

donts?: string[]    // 피해야 할 사용 ✨

}
// 컬러 페어링 가이드 ✨ 새로 추가

export interface ColorPairing {

label: string       // 조합 이름 (예: "Primary 배경 + 흰 텍스트")

bg: string          // 배경 HEX 또는 토큰 키

fg: string          // 전경(텍스트) HEX

recommended: boolean // 권장 여부

note: string        // 사용 맥락/근거

}
// 컬러 사용 비율 ✨ 새로 추가

export interface ColorUsageRatio {

primary: number     // %

secondary: number   // %

accent: number      // %

neutral: number     // %

}
// 접근성 설명 ✨ 새로 추가

export interface ColorAccessibility {

summary: string     // 컬러 대비/가독성 전반 설명

notes: string[]     // 구체적 권고사항

}
// 간단한 컬러 시스템 (3개만) ✨ 새로 추가

export interface SimpleColors {

primary: ColorToken

secondary: ColorToken

accent: ColorToken

}
// 전체 컬러 시스템 (기존)

export interface Colors {

primary: ColorToken

secondary: ColorToken

accent: ColorToken

neutral: {

'50': string

'100': string

'200': string

'300': string

'400': string

'500': string

'900': string

}

semantic: {

success: string

error: string

warning: string

info: string

}

usageRatio?: ColorUsageRatio          // 컬러 사용 비율 ✨ 새로 추가

accessibility?: ColorAccessibility    // 접근성 설명 ✨ 새로 추가

pairings?: ColorPairing[]             // 컬러 페어링 가이드 ✨ 새로 추가

}
// 타이포그래피 스케일 단위

export interface TypeScale {

size: number

weight: number

lineHeight: number

letterSpacing?: string

}
// 폰트 + 생성 이유 ✨ 새로 추가 (Simple 후보용)

export interface SimpleFont {

name: string        // Google Fonts 폰트명

reason?: string     // 이 폰트를 생성/선택한 이유 (Simple 후보 선택용)

}
// 간단한 타이포그래피 ✨ 구조 변경: 문자열 → 객체

export interface SimpleTypography {

heading: SimpleFont

body: SimpleFont

mono: SimpleFont

}
// 전체 타이포그래피 (기존)

export interface Typography {

fonts: {

heading: string

body: string

mono: string

}
 fontReasons?: { heading: string; body: string; mono: string }
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
// 간단한 브랜드 아이덴티티 ✨ 새로 추가

export interface BrandIdentitySimple {

brand: Brand

logo?: Logo

colors: SimpleColors

typography: SimpleTypography

}
// 전체 브랜드 아이덴티티 (기존)

export interface BrandIdentity {

brand: Brand

logo?: Logo

colors: Colors

typography: Typography

spacing?: Spacing

}
export interface PartialBrandIdentity {

brand?: Brand

logo?: Logo

colors?: SimpleColors | Colors

typography?: SimpleTypography | Typography

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