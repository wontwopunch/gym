import Link from "next/link";

/**
 * 푸터 — Info | Address | Contact · STANCEGYM 워터마크 배경
 * (Figma 173:503·504·507·514 구조, 시안 이미지 정렬)
 */
export function SiteFooter() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#0a0a0a] py-12 max-[400px]:py-10 lg:py-20">
      <div
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
        aria-hidden
        data-node-id="173:503"
      >
        <p
          className="select-none whitespace-nowrap text-[clamp(3.5rem,14vw,11rem)] font-black uppercase leading-none tracking-[-0.02em] text-[#141414]"
          style={{ fontStretch: "condensed" }}
        >
          STANCEGYM
        </p>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 max-[400px]:px-3 sm:px-5 lg:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10 lg:gap-16">
          <div className="flex flex-col gap-3" data-node-id="173:514">
            <p
              className="text-[16px] font-normal leading-6 tracking-[-0.4px] text-[#888888] max-[700px]:text-[14px] max-[700px]:leading-5"
              data-node-id="173:515"
            >
              Info
            </p>
            <div className="flex flex-col gap-2" data-node-id="173:516">
              <div
                className="flex max-w-[280px] flex-col gap-1 text-[16px] leading-6 tracking-[-0.4px] text-white max-[700px]:text-[14px] max-[700px]:leading-5"
                data-node-id="173:517"
              >
                <p data-node-id="173:518">스탠스짐 대표자 손문수 외 1명</p>
                <p data-node-id="173:519">사업자등록번호 788-31-01438</p>
              </div>
              <p
                className="mt-2 w-full text-[12px] leading-5 tracking-[-0.2px] text-[#666666] max-[700px]:text-[11px] min-[701px]:sm:text-[13px] min-[701px]:sm:tracking-[-0.35px]"
                data-node-id="173:520"
              >
                COPYRIGHT © SIGNALDECODE. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>

          <div
            className="flex flex-col gap-2 text-[16px] leading-6 tracking-[-0.4px] max-[700px]:text-[14px] max-[700px]:leading-5"
            data-node-id="173:504"
          >
            <p className="w-full text-[#888888]" data-node-id="173:505">
              Address
            </p>
            <p className="w-full text-white" data-node-id="173:506">
              울산 남구 신정로78번길 49 2층 스탠스짐
            </p>
          </div>

          <div className="flex flex-col gap-3" data-node-id="173:507">
            <div className="flex flex-col gap-2" data-node-id="173:508">
              <p
                className="w-full text-[16px] leading-6 tracking-[-0.4px] text-[#888888] max-[700px]:text-[14px] max-[700px]:leading-5"
                data-node-id="173:509"
              >
                Contact
              </p>
              <a
                href="tel:052-267-3830"
                className="w-full text-[20px] font-bold leading-[30px] tracking-[-0.5px] text-white max-[700px]:text-[17px] max-[700px]:leading-[26px]"
                data-node-id="173:510"
              >
                052-267-3830
              </a>
            </div>
            <div
              className="mt-1 flex flex-col gap-1 text-[14px] leading-5 tracking-[-0.35px] text-white max-[700px]:text-[13px] max-[700px]:leading-[18px]"
              data-node-id="173:511"
            >
              <p data-node-id="173:512">운영시간 : 24시간 운영</p>
              <p data-node-id="173:513">상담시간 : 평일/주말 09:00–18:00</p>
            </div>
            <Link
              href="/admin"
              className="mt-4 inline-flex text-[13px] text-[#666666] underline-offset-2 hover:text-white/80 hover:underline max-[700px]:text-[12px]"
            >
              관리자
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
