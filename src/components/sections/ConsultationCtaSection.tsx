import Image from "next/image";

import { IMG_CONSULTATION_CTA_BG } from "./assets";

/**
 * Figma (173:470) — 배경 + 딤 + 블러 · always training STANCE · 상담문의 버튼
 */
export function ConsultationCtaSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-labelledby="consultation-cta-heading"
      data-node-id="173:470"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={IMG_CONSULTATION_CTA_BG}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[rgba(34,34,34,0.4)]" />
      </div>

      <div
        className="relative z-10 flex w-full flex-col items-center backdrop-blur-[3px] bg-[rgba(34,34,34,0.4)] px-4 py-14 max-[400px]:px-3 max-[400px]:py-12 sm:px-5 sm:py-16 lg:py-20"
        data-node-id="173:471"
      >
        <div
          className="flex w-full max-w-[751px] flex-col items-center gap-6 text-center"
          data-node-id="173:472"
        >
          <div
            className="flex w-full flex-col items-center gap-4"
            data-node-id="173:473"
          >
            <div className="flex w-full flex-col items-center gap-2">
              <p className="w-full text-[16px] font-medium leading-6 tracking-[-0.4px] text-[rgba(255,255,255,0.7)] max-[700px]:text-[14px] max-[700px]:leading-5">
                always training STANCE
              </p>
              <h2
                id="consultation-cta-heading"
                className="max-w-full text-[clamp(1.25rem,4vw,32px)] font-bold leading-[1.375] tracking-[-0.8px] text-white [word-break:keep-all] max-[700px]:text-[clamp(1.1rem,3.8vw,1.5rem)]"
              >
                전문 트레이너와 함께하는 1:1 맞춤 상담, 지금 바로 시작하세요!
              </h2>
            </div>
          </div>

          <a
            href="#training-contact"
            className="inline-flex w-full max-w-[180px] items-center justify-center rounded bg-white px-4 py-4 text-[16px] font-medium leading-6 tracking-[-0.4px] text-[#222] transition-opacity hover:opacity-90 max-[700px]:text-[15px] max-[700px]:leading-[22px]"
            data-node-id="173:474"
          >
            상담문의
          </a>
        </div>
      </div>
    </section>
  );
}
