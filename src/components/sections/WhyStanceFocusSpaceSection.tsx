import Image from "next/image";

import { IMG_WHY_FOCUS_A, IMG_WHY_FOCUS_B } from "./assets";

/**
 * Figma (173:384) — 이미지 좌(342×380×2, gap 24px) / 텍스트 우
 * 24시간 블록(텍스트 좌) 다음 교차: 첫 WHY STANCE(173:368) 방향과 동일
 */
export function WhyStanceFocusSpaceSection() {
  return (
    <section
      className="stance-why-hover-scope w-full bg-[#09080e] py-12 max-[735px]:py-16 lg:py-28"
      aria-labelledby="why-stance-focus-space-heading"
      data-node-id="173:384"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-stretch gap-6 px-4 max-[400px]:px-3 sm:px-5 lg:grid-cols-[600px_minmax(0,1fr)] lg:items-center lg:gap-8 lg:px-6">
        <div className="order-2 flex w-full min-w-0 shrink-0 gap-4 sm:gap-6 lg:order-1 lg:w-[600px] lg:max-w-[600px]">
          <div
            className="stance-why-img-outer relative h-[min(240px,42vw)] min-w-0 flex-1 overflow-hidden rounded-lg lg:h-[348px] lg:w-[288px] lg:flex-none"
            data-node-id="173:385"
          >
            <Image
              src={IMG_WHY_FOCUS_A}
              alt="스탠스짐 머신 존"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 45vw, 288px"
            />
          </div>
          <div
            className="stance-why-img-outer relative h-[min(240px,42vw)] min-w-0 flex-1 overflow-hidden rounded-lg lg:h-[348px] lg:w-[288px] lg:flex-none"
            data-node-id="173:386"
          >
            <Image
              src={IMG_WHY_FOCUS_B}
              alt="스탠스짐 프리웨이트 존"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 45vw, 288px"
            />
          </div>
        </div>

        <div
          className="order-1 flex min-w-0 flex-col items-start gap-4 text-left lg:order-2 lg:min-h-[348px] lg:justify-center"
          data-node-id="173:387"
        >
          <div
            className="flex w-full max-w-[563px] flex-col items-start gap-2"
            data-node-id="173:388"
          >
            <p className="w-full text-[16px] font-medium leading-6 tracking-[-0.4px] text-[#00d5ff] max-[700px]:text-[14px] max-[700px]:leading-5">
              WHY STANCE
            </p>
            <h2
              id="why-stance-focus-space-heading"
              className="stance-scribble-title text-[clamp(1.75rem,3vw,40px)] font-bold leading-[1.3] tracking-[-1px] text-white lg:leading-[52px]"
            >
              <span className="relative z-[1]">운동에 집중하는 공간</span>
            </h2>
          </div>
          <p className="max-w-[563px] text-[18px] font-normal leading-[26px] tracking-[-0.45px] text-[rgba(255,255,255,0.7)] [word-break:keep-all] max-[700px]:text-[15px] max-[700px]:leading-[22px]">
            밝고 깔끔한 분위기와 체계적인 장비 배치로 운동에 완전히 몰입할 수
            있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
