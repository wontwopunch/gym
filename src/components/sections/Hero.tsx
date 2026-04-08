import Image from "next/image";

import { IMG_HERO, IMG_HERO_MOBILE } from "./assets";

export function Hero() {
  return (
    <section
      className="relative min-h-[min(100dvh,880px)] w-full overflow-hidden bg-[#09080e] max-[735px]:min-h-[min(100dvh,640px)] max-[400px]:flex max-[400px]:min-h-[100svh] max-[400px]:flex-col"
      data-name="hero"
      data-node-id="173:352"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[#09080e]" />
        {/* ≥401px — 기존 히어로 + 브리드 */}
        <div className="absolute inset-0 origin-center animate-stance-hero-breathe max-[400px]:hidden">
          <Image
            src={IMG_HERO}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        {/* ≤400px — Figma 173:551 (세로 배경, 브리드 없음) */}
        <div
          className="absolute inset-0 hidden max-[400px]:block"
          data-node-id="173:551"
        >
          <Image
            src={IMG_HERO_MOBILE}
            alt=""
            fill
            className="object-cover object-[52%_center]"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(9,8,14,0)] to-[#09080e]" />
      </div>

      {/*
        피그마: 좌우 342px 마진 + 1236px 콘텐츠 → `mx-auto max-w-[1236px]`만 쓰면 됨.
        여기에 `px-[342px]`를 또 주면 안쪽 폭이 ~552px로 줄어 한 줄/가로스크롤 문제가 난다.
      */}
      <div
        className="relative z-20 mx-auto flex w-full max-w-[1236px] flex-col items-center gap-4 px-4 pb-16 pt-[calc(var(--header-h)+1.25rem)] text-center max-[400px]:min-h-0 max-[400px]:flex-1 max-[400px]:justify-center max-[400px]:gap-3 max-[400px]:px-3 max-[400px]:pb-8 max-[400px]:pt-[var(--header-h)] max-[735px]:gap-4 min-[401px]:max-[735px]:pb-20 sm:px-6 md:px-0 md:pb-28 md:pt-[min(28vh,200px)] lg:gap-5 lg:pb-32 lg:pt-[346px]"
        data-node-id="173:361"
      >
        <div
          className="flex w-full flex-col gap-2 text-white"
          data-node-id="173:362"
        >
          <p
            className="w-full text-center text-[clamp(0.875rem,2.8vw,20px)] font-medium leading-snug tracking-[-0.5px] max-[400px]:tracking-[-0.35px] max-[400px]:[text-shadow:0_2px_14px_rgba(0,0,0,0.65)] md:leading-[30px]"
            data-node-id="173:363"
          >
            FIND YOUR STANCE
          </p>
          <div
            className="flex w-full justify-center"
            data-node-id="173:364-wrap"
          >
            <h1
              className="w-full min-w-0 text-center text-[clamp(1.5rem,6.5vw,84px)] font-bold leading-[1.08] tracking-[-0.06em] text-white max-[400px]:[word-break:keep-all] max-[400px]:[text-shadow:0_2px_18px_rgba(0,0,0,0.7)] md:leading-[1.05] lg:tracking-[-2.1px] xl:whitespace-nowrap"
              data-node-id="173:364"
            >
              한계를 넘는 순간, 진짜 변화가 시작된다
            </h1>
          </div>
        </div>
        <div
          className="w-full max-w-[1236px] text-center text-[clamp(0.9375rem,2.6vw,18px)] font-normal leading-relaxed tracking-[-0.45px] text-[rgba(255,255,255,0.7)] max-[400px]:px-0.5 max-[400px]:[text-shadow:0_1px_12px_rgba(0,0,0,0.65)] max-[735px]:max-w-[32rem]"
          data-node-id="173:365"
        >
          <p className="mb-0 md:leading-[26px]">울산 중심에 위치한 24시간 프리미엄 트레이닝 공간</p>
          <p className="md:leading-[26px]">전문 트레이너와 함께 당신만의 운동 루틴을 완성하세요.</p>
        </div>
      </div>
    </section>
  );
}
