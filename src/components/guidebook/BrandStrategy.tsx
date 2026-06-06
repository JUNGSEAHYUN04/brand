'use client'

import { Brand, Colors } from '@/lib/types'

interface Props {
  brand: Brand
  colors: Colors
}

export default function BrandStrategy({ brand, colors }: Props) {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Brand Strategy</p>
        <h2 className="text-3xl font-bold text-gray-950">브랜드 전략</h2>
      </div>

      {/* 브랜드 기본 */}
      <section className="mb-14">
        <div className="p-8 rounded-2xl border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-950 mb-3">{brand.name}</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {brand.personality.map((keyword) => (
              <span
                key={keyword}
                className="text-sm px-4 py-1.5 rounded-full font-medium bg-gray-100 text-gray-700"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* 슬로건 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-gray-200">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">한국어 슬로건</p>
              <p className="text-lg font-bold text-gray-950">{brand.slogan.ko}</p>
            </div>
            <div className="p-5 rounded-xl border border-gray-200">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">English Slogan</p>
              <p className="text-lg font-bold text-gray-950">{brand.slogan.en}</p>
            </div>
          </div>

          {/* Brand Essence */}
          {brand.brandEssence && (
            <div className="pt-6 mt-6 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Brand Essence</p>
              <p className="text-base text-gray-800 leading-relaxed">{brand.brandEssence}</p>
            </div>
          )}
        </div>
      </section>

      {/* Core Values */}
      {brand.coreValues && brand.coreValues.length > 0 && (
        <section className="mb-14">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Core Values</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {brand.coreValues.map((value, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-xl">
                <p className="text-sm text-gray-400 mb-3">0{index + 1}</p>
                <p className="text-base font-bold text-gray-950 mb-2">{value.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tone & Manner */}
      <section className="mb-14">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Tone & Manner</p>
        <div className="p-8 border border-gray-200 rounded-xl">
          <p className="text-base text-gray-800 leading-relaxed mb-6">{brand.tone}</p>

          {brand.coreTone && brand.coreTone.length > 0 && (
            <div className="pt-6 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Core Tone</p>
              <div className="flex flex-wrap gap-3">
                {brand.coreTone.map((tone) => (
                  <span
                    key={tone}
                    className="text-sm px-4 py-2 rounded-full border border-gray-200 text-gray-700 font-medium"
                  >
                    {tone}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Visual Direction */}
      {(brand.designDirection || brand.designPrinciples) && (
        <section className="mb-14">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Visual Direction</p>
          <div className="p-8 border border-gray-200 rounded-xl">
            {brand.designDirection && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Design Direction</p>
                <p className="text-base text-gray-800 leading-relaxed">{brand.designDirection}</p>
              </div>
            )}

            {brand.designPrinciples && brand.designPrinciples.length > 0 && (
              <div className="pt-6 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Design Principles</p>
                <div className="space-y-4">
                  {brand.designPrinciples.map((principle, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <span className="text-sm font-mono text-gray-400 shrink-0 mt-1">
                        0{index + 1}
                      </span>
                      <p className="text-base text-gray-700 leading-relaxed">{principle}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Brand Name 후보 */}
      {brand.nameCandidates && brand.nameCandidates.length > 0 && (
        <section>
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-5">Brand Name Candidates</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {brand.nameCandidates.map((name, index) => (
              <div
                key={name}
                className={`p-5 rounded-xl border ${
                  name === brand.name
                    ? 'border-gray-300 bg-gray-50'
                    : 'border-gray-200'
                }`}
              >
                <p className="text-xs mb-2 uppercase tracking-wider text-gray-500">
                  {name === brand.name ? '✓ 선택됨' : `후보 ${index + 1}`}
                </p>
                <p className="text-xl font-bold text-gray-950">{name}</p>
              </div>
            ))}
          </div>
          {brand.nameReason && (
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              <span className="font-medium text-gray-800">선택 이유: </span>
              {brand.nameReason}
            </p>
          )}
        </section>
      )}
    </div>
  )
}