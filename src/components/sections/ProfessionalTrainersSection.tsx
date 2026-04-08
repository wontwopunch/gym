/** public/trainers/trainer-{1..4}.png — 대표 → 실장 → 트레이너(배) → 트레이너(정) 순 */
const TRAINER_IMAGES = [
  "/trainers/trainer-1.png",
  "/trainers/trainer-2.png",
  "/trainers/trainer-3.png",
  "/trainers/trainer-4.png",
] as const;

const TRAINERS = [
  { nodeId: "173:446", ariaLabel: "대표 손문수 — 스탠스짐 트레이너" },
  { nodeId: "173:452", ariaLabel: "실장 고주현 — 스탠스짐 트레이너" },
  { nodeId: "173:458", ariaLabel: "트레이너 배기종 — 스탠스짐 트레이너" },
  { nodeId: "173:464", ariaLabel: "트레이너 정원조 — 스탠스짐 트레이너" },
] as const;

/**
 * 342×460 카드 · 이미지 내 텍스트 사용(하단 오버레이 없음)
 */
export function ProfessionalTrainersSection() {
  return (
    <section
      id="trainers"
      className="scroll-mt-header w-full bg-white py-12 max-[735px]:py-14 lg:py-[140px]"
      aria-labelledby="professional-trainers-heading"
      data-node-id="173:443"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 px-4 max-[400px]:px-3 sm:px-5 lg:gap-10 lg:px-6">
        <div
          className="flex w-full flex-col items-center gap-4 text-center"
          data-node-id="173:444"
        >
          <div className="flex w-full flex-col items-center gap-2">
            <p className="w-full min-w-0 text-[16px] font-medium leading-6 tracking-[-0.4px] text-[#00d5ff] max-[700px]:text-[14px] max-[700px]:leading-5">
              PROFESSIONAL TRAINERS
            </p>
            <h2
              id="professional-trainers-heading"
              className="text-[clamp(1.75rem,3vw,40px)] font-bold leading-[1.3] tracking-[-1px] text-[#222] max-[700px]:text-[clamp(1.3rem,3.5vw,1.85rem)] lg:leading-[52px]"
            >
              스탠스짐 트레이너진
            </h2>
          </div>
          <div className="max-w-[640px] text-[18px] font-normal leading-[26px] tracking-[-0.45px] text-[#767676] [word-break:keep-all] max-[700px]:text-[15px] max-[700px]:leading-[22px]">
            <p className="mb-0">
              체형과 목표에 맞춘 맞춤형 트레이닝으로 안전하고 효율적인 운동 지도를
              제공합니다.
            </p>
            <p className="mb-0">세심한 케어로 회원님의 변화를 함께합니다.</p>
          </div>
        </div>

        <div className="w-full" data-node-id="173:445">
          <div className="grid w-full grid-cols-1 justify-items-center gap-4 max-[400px]:gap-3 sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-4 lg:gap-8">
            {TRAINERS.map((t, i) => (
              <article
                key={t.nodeId}
                className="group relative aspect-[342/460] w-full max-w-[342px] overflow-hidden rounded-[8px] bg-[#001a33] sm:max-w-none"
                data-node-id={t.nodeId}
                aria-label={t.ariaLabel}
              >
                <div
                  className="absolute inset-0 origin-center bg-[#001a33] bg-cover bg-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:scale-[1.07] motion-reduce:group-hover:scale-100"
                  style={{
                    backgroundImage: `url(${TRAINER_IMAGES[i]})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
