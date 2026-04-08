import Image from "next/image";

import { IMG_EQUIP_BACK, IMG_EQUIP_CHEST, IMG_EQUIP_LOWER } from "./assets";

const CARDS = [
  {
    frameId: "173:528",
    label: "BACK TRAINING",
    title: (
      <>
        등 운동에 특화된
        <br />
        프리미엄 머신 라인업
      </>
    ),
    image: IMG_EQUIP_BACK,
    imageNodeId: "173:531",
  },
  {
    frameId: "173:524",
    label: "CHEST TRAINING",
    title: (
      <>
        다양한 각도로 자극하는
        <br />
        정밀한 가슴 운동 머신
      </>
    ),
    image: IMG_EQUIP_CHEST,
    imageNodeId: "173:527",
  },
  {
    frameId: "173:532",
    label: "LOWER BODY TRAINING",
    title: (
      <>
        <span className="whitespace-nowrap">균형 잡힌 하체 발달을 위한</span>
        <br />
        전문 트레이닝 머신
      </>
    ),
    image: IMG_EQUIP_LOWER,
    imageNodeId: "173:535",
  },
] as const;

export function EquipmentLineupSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#09080e] py-12 max-[735px]:py-14 lg:min-h-[870px] lg:py-[120px]"
      aria-label="스탠스짐 기구 라인업"
      data-node-id="173:521"
    >
      {/* 우측 글로우 — public/images/sec3-right-glow.png */}
      <div
        className="pointer-events-none absolute right-0 top-[42%] z-0 hidden h-[min(1040px,100vh)] w-[min(600px,54vw)] max-w-[58%] -translate-y-1/2 sm:block max-[735px]:max-w-[48%] lg:max-w-[58%]"
        aria-hidden
        data-node-id="173:522"
      >
        <div className="relative h-full w-full">
          <Image
            src="/images/sec3-right-glow.png"
            alt=""
            fill
            className="object-contain object-right opacity-95"
            sizes="(max-width: 768px) 54vw, 600px"
          />
        </div>
      </div>

      {/*
        lg에서 카드 3개가 한 행을 가득 채워 세 번째 카드 오른쪽 = 콘텐츠 오른쪽.
        아래 WHY STANCE(우측 이미지) 열 끝과 같은 선에 맞춤.
      */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 max-[400px]:px-3 sm:px-5 lg:flex-row lg:w-full lg:gap-6 lg:px-6">
        {CARDS.map((card) => (
          <article
            key={card.frameId}
            data-node-id={card.frameId}
            className="mx-auto flex min-h-[460px] w-full max-w-[464px] shrink-0 flex-col rounded-lg border-2 border-[#00d5ff] bg-gradient-to-b from-[#09080e] to-[#00d5ff] px-5 pb-0.5 pt-12 max-[400px]:min-h-[420px] max-[400px]:px-4 max-[400px]:pt-10 sm:min-h-[520px] sm:px-7 sm:pt-16 md:min-h-[580px] lg:mx-0 lg:min-h-[630px] lg:min-w-0 lg:max-w-none lg:flex-1 lg:basis-0 lg:px-8 lg:pt-[74px]"
          >
            <div className="flex min-h-0 w-full max-w-[400px] flex-1 flex-col self-center">
              <div className="flex w-full max-w-[400px] shrink-0 flex-col items-center gap-4 text-center">
                <p className="whitespace-nowrap text-[14px] font-medium leading-[22px] tracking-[-0.35px] text-[rgba(255,255,255,0.7)] max-[700px]:text-[12px] max-[700px]:leading-5">
                  {card.label}
                </p>
                <p className="w-full min-w-0 text-[20px] font-medium leading-[30px] tracking-[-0.5px] text-white [word-break:keep-all] max-[700px]:text-[17px] max-[700px]:leading-7">
                  {card.title}
                </p>
              </div>
              <div
                className="relative mt-auto aspect-[400/386] w-full shrink-0 overflow-hidden rounded-t-[10px] max-[700px]:mt-6 min-[701px]:mt-auto"
                data-node-id={card.imageNodeId}
              >
                <Image
                  src={card.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
