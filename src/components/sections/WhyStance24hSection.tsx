import Image from "next/image";

import { IMG_WHY_24H } from "./assets";

/**
 * Figma: Frame 1707484736 (173:380) — 텍스트 좌 / 이미지 우 (gap 피그마 258px → 유연 1fr + 708px)
 */
export function WhyStance24hSection() {
  return (
    <section
      className="stance-why-hover-scope w-full bg-[#09080e] py-12 max-[735px]:py-16 lg:py-28"
      aria-labelledby="why-stance-24h-heading"
      data-node-id="173:380"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-stretch gap-6 px-4 max-[400px]:px-3 sm:px-5 lg:grid-cols-[minmax(0,1fr)_600px] lg:items-center lg:gap-8 lg:px-6">
        <div
          className="flex min-w-0 flex-col items-start gap-4 text-left lg:min-h-[348px] lg:justify-center"
          data-node-id="173:381"
        >
          <div
            className="flex w-full max-w-[563px] flex-col items-start gap-2"
            data-node-id="173:382"
          >
            <p className="w-full text-[16px] font-medium leading-6 tracking-[-0.4px] text-[#00d5ff] max-[700px]:text-[14px] max-[700px]:leading-5">
              WHY STANCE
            </p>
            <h2
              id="why-stance-24h-heading"
              className="stance-scribble-title text-[clamp(1.75rem,3vw,40px)] font-bold leading-[1.3] tracking-[-1px] text-white max-[700px]:text-[clamp(1.3rem,3.5vw,1.85rem)] lg:leading-[52px]"
            >
              <span className="relative z-[1]">24시간 이용 가능</span>
            </h2>
          </div>
          <p className="max-w-[563px] text-[18px] font-normal leading-[26px] tracking-[-0.45px] text-[rgba(255,255,255,0.7)] [word-break:keep-all] max-[700px]:text-[15px] max-[700px]:leading-[22px]">
            운동 효율을 고려해 설계된 공간과 고급 머신 배치로 쾌적한 운동 환경을
            제공합니다.
          </p>
        </div>

        <div
          className="stance-why-img-outer relative h-[min(348px,70vw)] w-full min-w-0 overflow-hidden rounded-lg lg:h-[348px] lg:w-[600px] lg:max-w-[600px] lg:justify-self-end"
          data-node-id="173:383"
        >
          <Image
            src={IMG_WHY_24H}
            alt="스탠스짐 운동 공간"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 600px"
          />
        </div>
      </div>
    </section>
  );
}
