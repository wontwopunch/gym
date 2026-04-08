import Image from "next/image";

import { IMG_WHY_SHOWER } from "./assets";

/**
 * Figma: Frame 1707484662 (173:376) — 이미지 좌 708×380 / 텍스트 우, gap 24px
 * 트레이너 블록 다음 교차: 첫 WHY STANCE(173:368)와 동일 방향
 */
export function WhyStanceShowerSection() {
  return (
    <section
      className="stance-why-hover-scope w-full bg-[#09080e] py-12 max-[735px]:py-16 lg:py-28"
      aria-labelledby="why-stance-shower-heading"
      data-node-id="173:376"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-stretch gap-6 px-4 max-[400px]:px-3 sm:px-5 lg:grid-cols-[600px_minmax(0,1fr)] lg:items-center lg:gap-8 lg:px-6">
        <div
          className="stance-why-img-outer relative order-2 h-[min(348px,70vw)] w-full min-w-0 overflow-hidden rounded-lg lg:order-1 lg:h-[348px] lg:w-[600px]"
          data-node-id="173:377"
        >
          <Image
            src={IMG_WHY_SHOWER}
            alt="스탠스짐 샤워 · 탈의 공간"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 600px"
          />
        </div>

        <div
          className="order-1 flex min-w-0 flex-col items-start gap-4 text-left lg:order-2 lg:min-h-[348px] lg:justify-center"
          data-node-id="173:378"
        >
          <div
            className="flex w-full max-w-[474px] flex-col items-start gap-2"
            data-node-id="173:379"
          >
            <p className="w-full text-[16px] font-medium leading-6 tracking-[-0.4px] text-[#00d5ff] max-[700px]:text-[14px] max-[700px]:leading-5">
              WHY STANCE
            </p>
            <h2
              id="why-stance-shower-heading"
              className="stance-scribble-title text-[clamp(1.75rem,3vw,40px)] font-bold leading-[1.3] tracking-[-1px] text-white max-[700px]:text-[clamp(1.3rem,3.5vw,1.85rem)] lg:leading-[52px]"
            >
              <span className="relative z-[1]">프라이빗한 샤워 공간</span>
            </h2>
          </div>
          <p className="max-w-[474px] text-[18px] font-normal leading-[26px] tracking-[-0.45px] text-[rgba(255,255,255,0.7)] [word-break:keep-all] max-[700px]:text-[15px] max-[700px]:leading-[22px]">
            24시간 운영되는 샤워 및 탈의 공간으로 언제든 편안하게 운동할 수
            있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
