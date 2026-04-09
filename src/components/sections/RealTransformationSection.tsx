import Image from "next/image";

import { TransformationMobileCarousel } from "./TransformationMobileCarousel";
import {
  IMG_TRANSFORMATION_1,
  IMG_TRANSFORMATION_2,
  IMG_TRANSFORMATION_3,
  IMG_TRANSFORMATION_4,
} from "./assets";

/**
 * Figma Frame 173:399 — 6카드 가로 · gap 24 · 342×342 · radius 8
 * 어두운 처리는 카드 opacity가 아니라 뷰포트 좌·우 고정 그라데이션만 사용 (마키 스크롤 시 가운데가 어두워지는 현상 방지)
 * @see https://www.figma.com/design/WvCf0rASVretwdBUXrPUNk/…?node-id=173-399
 */
const CARD_SLOTS = [
  { nodeId: "173:400", src: IMG_TRANSFORMATION_1 },
  { nodeId: "173:401", src: IMG_TRANSFORMATION_1 },
  { nodeId: "173:402", src: IMG_TRANSFORMATION_2 },
  { nodeId: "173:403", src: IMG_TRANSFORMATION_3 },
  { nodeId: "173:404", src: IMG_TRANSFORMATION_4 },
  { nodeId: "173:405", src: IMG_TRANSFORMATION_4 },
] as const;

/** 뷰포트에 6장+간격 맞추되 카드 한 변 최대 342px (Figma) — 양끝 딤 레이어 너비와 동일 */
const CARD_FRAME_CLASS =
  "w-[min(342px,calc((100vw-7.5rem)/6))] min-w-[72px] max-w-[342px] shrink-0 max-[400px]:min-w-[64px]";

const EDGE_VIGNETTE_CLASS = `${CARD_FRAME_CLASS} pointer-events-none absolute inset-y-0 z-[2]`;

export function RealTransformationSection() {
  return (
    <section
      id="member-transformation"
      className="relative scroll-mt-header w-full overflow-x-clip bg-[#09080e] py-12 max-[735px]:py-14 lg:py-[140px]"
      aria-label="REAL TRANSFORMATION 회원 변화 갤러리"
      data-node-id="173:395"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 px-4 max-[400px]:px-3 sm:px-5 lg:gap-10 lg:px-6">
        <div
          className="flex w-full max-w-[474px] flex-col items-center gap-4 text-center"
          data-node-id="173:398"
        >
          <div className="flex w-full flex-col items-center gap-2">
            <p className="w-full text-[16px] font-medium leading-6 tracking-[-0.4px] text-[#00d5ff] max-[700px]:text-[14px] max-[700px]:leading-5">
              REAL TRANSFORMATION
            </p>
            <h2
              id="real-transformation-heading"
              className="text-center text-[clamp(1.5rem,3vw,40px)] font-bold leading-[1.3] tracking-[-1px] text-white max-[700px]:text-[clamp(1.25rem,3.5vw,1.75rem)] lg:leading-[52px]"
            >
              직접 확인하는 회원님들의 변화
            </h2>
          </div>
          <p className="w-full text-[18px] font-normal leading-[26px] tracking-[-0.45px] text-[rgba(255,255,255,0.7)] [word-break:keep-all] max-[700px]:text-[15px] max-[700px]:leading-[22px]">
            회원님들의 실제 Before & After 사진으로 운동 효과를 확인해보세요.
          </p>
        </div>
      </div>

      {/* ≤700px — 1장 슬라이드 자동 무한 / ≥701px — 기존 무한 마키 + 양끝 비네트 */}
      <div className="hidden max-[700px]:block">
        <TransformationMobileCarousel />
      </div>
      <div
        className="relative mt-10 hidden min-[701px]:block w-[100vw] max-w-[100vw] -translate-x-1/2 left-1/2 overflow-hidden"
        data-node-id="173:399"
      >
        <div className="flex w-max animate-stance-transformation-marquee items-center">
          <TransformationMarqueeTrack slots={CARD_SLOTS} suffix="a" />
          <TransformationMarqueeTrack slots={CARD_SLOTS} suffix="b" ariaHidden />
        </div>
        <div
          className={`${EDGE_VIGNETTE_CLASS} left-0 bg-gradient-to-r from-[#09080e] via-[#09080e]/90 to-transparent`}
          aria-hidden
        />
        <div
          className={`${EDGE_VIGNETTE_CLASS} right-0 bg-gradient-to-l from-[#09080e] via-[#09080e]/90 to-transparent`}
          aria-hidden
        />
      </div>
    </section>
  );
}

function TransformationMarqueeTrack({
  slots,
  suffix,
  ariaHidden,
}: {
  slots: typeof CARD_SLOTS;
  suffix: string;
  ariaHidden?: boolean;
}) {
  return (
    <div
      className="flex shrink-0 items-center gap-6 pr-6"
      aria-hidden={ariaHidden}
    >
      {slots.map((slot, i) => (
        <div
          key={`${suffix}-${slot.nodeId}-${i}`}
          className={`relative ${CARD_FRAME_CLASS}`}
          data-node-id={slot.nodeId}
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#d3d3d3]">
            <Image
              src={slot.src}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 30vw, 342px"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
