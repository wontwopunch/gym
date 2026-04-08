import Image from "next/image";
import { Montserrat } from "next/font/google";

import { IMG_TAPE_BANNER_DOT } from "./assets";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

const PHRASE = "always training STANCE";
/** 한 반복 트랙이 넓은 화면에서도 이어지도록 충분히 반복 */
const SEGMENT_COUNT = 12;

/**
 * Figma (173:496) — 풀폭 띠배너 · 무한 가로 흐름 (마키)
 */
export function TapeBannerSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#003875] py-0"
      aria-label="always training STANCE"
      data-node-id="173:496"
    >
      <div className="flex h-10 items-center max-[400px]:h-9 sm:h-11 lg:h-12">
        <div
          className={`flex w-max animate-stance-tape-marquee ${montserrat.className}`}
          aria-hidden
        >
          <TapeBannerTrack id="a" />
          <TapeBannerTrack id="b" />
        </div>
      </div>
    </section>
  );
}

function TapeBannerTrack({ id }: { id: string }) {
  return (
    <div className="flex shrink-0 items-center gap-4 pr-4 max-[400px]:gap-3 max-[400px]:pr-3 sm:gap-6 sm:pr-6 lg:gap-8 lg:pr-8">
      {Array.from({ length: SEGMENT_COUNT }, (_, i) => (
        <span
          key={`${id}-${i}`}
          className="inline-flex shrink-0 items-center gap-1.5 max-[400px]:gap-1 sm:gap-2.5"
        >
          <span className="whitespace-nowrap text-[clamp(0.75rem,3.2vw,18px)] font-medium leading-tight tracking-[0.2px] text-white uppercase max-[700px]:text-[clamp(0.65rem,2.8vw,15px)] max-[400px]:tracking-[0.12px] sm:leading-7 sm:tracking-[0.27px]">
            {PHRASE}
          </span>
          <Image
            src={IMG_TAPE_BANNER_DOT}
            alt=""
            width={12}
            height={12}
            className="size-2.5 shrink-0 max-[400px]:size-2 sm:size-3"
          />
        </span>
      ))}
    </div>
  );
}
