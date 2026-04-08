import Image from "next/image";

import { IMG_STANCE_RECORD_BG } from "./assets";
import { StanceRecordCounters } from "./StanceRecordCounters";

/**
 * Figma (173:475) — STANCE RECORD · 배경 이미지 + 중앙 타이틀 + 통계 3열 (gap 160px)
 */
export function StanceRecordSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#09080e]"
      aria-labelledby="stance-record-heading"
      data-node-id="173:475"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        data-node-id="173:476"
      >
        <Image
          src={IMG_STANCE_RECORD_BG}
          alt=""
          fill
          className="object-cover object-left"
          sizes="100vw"
        />
      </div>

      <div
        className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-4 py-12 max-[400px]:gap-8 max-[400px]:px-3 max-[400px]:py-10 max-[735px]:gap-12 sm:px-5 lg:gap-[60px] lg:px-6 lg:py-[140px]"
        data-node-id="173:477"
      >
        <div
          className="flex w-full max-w-[387px] flex-col items-center gap-4 text-center"
          data-node-id="173:478"
        >
          <div className="flex w-full flex-col items-center gap-2">
            <p
              className="text-[16px] font-medium leading-6 tracking-[-0.4px] text-[#00d5ff] max-[700px]:text-[14px] max-[700px]:leading-5"
              data-node-id="I173:478;78:488"
            >
              STANCE RECORD
            </p>
            <h2
              id="stance-record-heading"
              className="text-[clamp(1.75rem,3vw,40px)] font-bold leading-[1.3] tracking-[-1px] text-white max-[700px]:text-[clamp(1.3rem,3.5vw,1.85rem)] lg:leading-[52px]"
              data-node-id="I173:478;66:439"
            >
              숫자로 증명되는 스탠스짐
            </h2>
          </div>
        </div>

        <StanceRecordCounters />
      </div>
    </section>
  );
}
