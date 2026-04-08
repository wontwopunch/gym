/**
 * Figma: Rectangle 103 (173:490) + 섹션 타이틀 (173:495)
 */
export function SpaceTrainingSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#09080e] py-10 max-[400px]:py-8 max-[735px]:py-12 lg:min-h-[492px] lg:py-0"
      aria-labelledby="space-training-heading"
      data-node-id="173:490"
    >
      <div
        className="relative z-10 mx-auto w-full max-w-[795px] px-4 text-center max-[400px]:px-3 sm:px-5 lg:px-8 lg:pt-[140px] lg:pb-24"
        data-node-id="173:495"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex w-full flex-col items-center gap-2">
            <p className="w-full text-[16px] font-medium leading-6 tracking-[-0.4px] text-[#00d5ff] max-[700px]:text-[14px] max-[700px]:leading-5">
              THE SPACE FOR TRAINING
            </p>
            <h2
              id="space-training-heading"
              className="w-full text-[clamp(1.75rem,4vw,46px)] font-bold leading-[1.2] tracking-[-1px] text-white max-[700px]:text-[clamp(1.35rem,4vw,2rem)] md:leading-[56px]"
            >
              <p className="mb-0">
                공간이 만드는 운동 루틴,
              </p>
              <p>디테일이 만드는 만족감</p>
            </h2>
          </div>
          <div className="max-w-full text-[18px] font-normal leading-[26px] tracking-[-0.45px] text-[rgba(255,255,255,0.7)] max-[700px]:text-[15px] max-[700px]:leading-[22px]">
            <p className="mb-0">
              수많은 피드백을 반영해 설계된 스탠스짐은 단순한 헬스장이 아닌 운동에
              최적화된 공간입니다.
            </p>
            <p>
              세심하게 배치된 장비와 동선이 당신의 운동 루틴을 완벽하게
              서포트합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
