import Image from "next/image";

import { IMG_WHY_STANCE } from "./assets";

/**
 * Figma: Frame 1707484739 (173:368) — 이미지 708×380 + WHY STANCE 카피
 */
export function WhyStanceSection() {
  return (
    <section
      id="why-stance"
      className="stance-why-hover-scope scroll-mt-header w-full bg-[#09080e] py-12 max-[735px]:py-16 lg:py-28"
      aria-labelledby="why-stance-heading"
      data-node-id="173:368"
    >
      {/* max-w·px는 기구 섹션과 동일 → 첫 카드 왼쪽과 이미지 왼쪽 정렬 일치 */}
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-stretch gap-6 px-4 max-[400px]:px-3 sm:px-5 lg:grid-cols-[600px_minmax(0,1fr)] lg:items-center lg:gap-8 lg:px-6">
        <div
          className="stance-why-img-outer relative order-2 h-[min(348px,70vw)] w-full min-w-0 overflow-hidden rounded-lg lg:order-1 lg:h-[348px] lg:w-[600px]"
          data-node-id="173:369"
        >
          <Image
            src={IMG_WHY_STANCE}
            alt="스탠스짐 공간"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 600px"
          />
        </div>

        <div
          className="order-1 flex min-w-0 flex-col items-start gap-4 text-left lg:order-2 lg:min-h-[348px] lg:justify-center"
          data-node-id="173:370"
        >
          <div
            className="flex w-full flex-col items-start gap-2"
            data-node-id="173:371"
          >
            <p className="w-full text-[16px] font-medium leading-6 tracking-[-0.4px] text-[#00d5ff] max-[700px]:text-[14px] max-[700px]:leading-5">
              WHY STANCE
            </p>
            <h2
              id="why-stance-heading"
              className="stance-scribble-title text-[clamp(1.75rem,3vw,40px)] font-bold leading-[1.3] tracking-[-1px] text-white max-[700px]:text-[clamp(1.3rem,3.5vw,1.85rem)] lg:leading-[52px]"
            >
              <span className="relative z-[1]">
                운동에만 집중할 수 있는 환경
              </span>
            </h2>
          </div>
          <p className="text-[18px] font-normal leading-[26px] tracking-[-0.45px] text-[rgba(255,255,255,0.7)] [word-break:keep-all] max-[700px]:text-[15px] max-[700px]:leading-[22px]">
            1일 2회 자유로운 입장이 가능해 시간에 구애받지 않고 운동할 수 있습니다.
            <br />
            회원복과 수건을 무료로 제공해 언제든 가볍게 방문하여 운동에 집중할 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
