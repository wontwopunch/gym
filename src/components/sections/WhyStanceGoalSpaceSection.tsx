import Image from "next/image";

import { IMG_WHY_GOAL_A, IMG_WHY_GOAL_B } from "./assets";

/**
 * Figma (173:389) — 텍스트 좌(최대 525px) / 이미지 우(342×380×2, gap 24px)
 * 포커스 공간 블록(173:384, 이미지 좌) 다음 교차
 */
export function WhyStanceGoalSpaceSection() {
  return (
    <section
      className="stance-why-hover-scope w-full bg-[#09080e] py-12 max-[735px]:py-16 lg:py-28"
      aria-labelledby="why-stance-goal-space-heading"
      data-node-id="173:389"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-stretch gap-6 px-4 max-[400px]:px-3 sm:px-5 lg:grid-cols-[minmax(0,1fr)_600px] lg:items-center lg:gap-8 lg:px-6">
        <div
          className="flex min-w-0 flex-col items-start gap-4 text-left lg:min-h-[348px] lg:justify-center"
          data-node-id="173:390"
        >
          <div
            className="flex w-full max-w-[525px] flex-col items-start gap-2"
            data-node-id="173:391"
          >
            <p className="w-full text-[16px] font-medium leading-6 tracking-[-0.4px] text-[#00d5ff] max-[700px]:text-[14px] max-[700px]:leading-5">
              WHY STANCE
            </p>
            <h2
              id="why-stance-goal-space-heading"
              className="stance-scribble-title text-[clamp(1.75rem,3vw,40px)] font-bold leading-[1.3] tracking-[-1px] text-white max-[700px]:text-[clamp(1.3rem,3.5vw,1.85rem)] lg:leading-[52px]"
            >
              <span className="relative z-[1]">목표 중심 공간 설계</span>
            </h2>
          </div>
          <p className="max-w-[525px] text-[18px] font-normal leading-[26px] tracking-[-0.45px] text-[rgba(255,255,255,0.7)] [word-break:keep-all] max-[700px]:text-[15px] max-[700px]:leading-[22px]">
            다양한 운동 목적에 맞춘 구역별 트레이닝 공간으로 회원의 루틴을
            완성합니다.
          </p>
        </div>

        <div
          className="flex w-full min-w-0 shrink-0 gap-4 sm:gap-6 lg:w-[600px] lg:max-w-[600px] lg:justify-self-end"
          data-node-id="173:392"
        >
          <div
            className="stance-why-img-outer relative h-[min(240px,42vw)] min-w-0 flex-1 overflow-hidden rounded-lg lg:h-[348px] lg:w-[288px] lg:flex-none"
            data-node-id="173:393"
          >
            <Image
              src={IMG_WHY_GOAL_A}
              alt="스탠스짐 유산소 · 런닝 존"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 45vw, 288px"
            />
          </div>
          <div
            className="stance-why-img-outer relative h-[min(240px,42vw)] min-w-0 flex-1 overflow-hidden rounded-lg lg:h-[348px] lg:w-[288px] lg:flex-none"
            data-node-id="173:394"
          >
            <Image
              src={IMG_WHY_GOAL_B}
              alt="스탠스짐 케이블 · 머신 존"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 45vw, 288px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
