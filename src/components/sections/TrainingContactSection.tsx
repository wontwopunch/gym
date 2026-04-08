"use client";

import Image from "next/image";
import { useCallback, useState, type FormEvent } from "react";

import { IMG_CONTACT_MAP_ULSAN } from "./assets";

const CONSULT_OPTIONS = [
  { id: "health", label: "헬스 회원권 상담" },
  { id: "pt", label: "PT(personal training) 상담" },
  { id: "day", label: "헬스 일일권" },
] as const;

/**
 * Figma (173:406) — START YOUR TRAINING · 지도 708×460 + 상담 폼
 */
export function TrainingContactSection() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);
    setStatus("loading");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const consultType = String(fd.get("consultType") ?? "").trim();
    const privacy = fd.get("privacy") === "on";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          consultType,
          privacy,
        }),
      });
      const data = (await res.json()) as {
        error?: string;
        ok?: boolean;
        localOnly?: boolean;
      };

      if (!res.ok) {
        setStatus("error");
        setFeedback(data.error ?? "전송에 실패했습니다.");
        return;
      }

      setStatus("success");
      setFeedback(
        data.localOnly
          ? "로컬 테스트: 메일은 보내지 않고 저장되었습니다. 관리자 페이지에서 확인할 수 있어요."
          : "접수되었습니다. 빠른 시일 내에 연락드리겠습니다.",
      );
      form.reset();
    } catch {
      setStatus("error");
      setFeedback("네트워크 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  }, []);

  return (
    <section
      id="training-contact"
      className="w-full scroll-mt-header bg-white py-12 max-[735px]:py-14 lg:py-[140px]"
      aria-labelledby="training-contact-heading"
      data-node-id="173:406"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 px-4 max-[400px]:px-3 sm:px-5 lg:gap-10 lg:px-6">
        <div
          className="flex flex-col items-center gap-4 text-center"
          data-node-id="173:407"
        >
          <div className="flex w-full flex-col items-center gap-2">
            <p className="w-full text-[16px] font-medium leading-6 tracking-[-0.4px] text-[#00d5ff] max-[700px]:text-[14px] max-[700px]:leading-5">
              START YOUR TRAINING
            </p>
            <h2
              id="training-contact-heading"
              className="text-[clamp(1.5rem,3vw,40px)] font-bold leading-[1.3] tracking-[-1px] text-[#222] max-[700px]:text-[clamp(1.25rem,3.5vw,1.75rem)] lg:leading-[52px]"
            >
              전문 트레이너와 함께 변화를 시작하세요
            </h2>
          </div>
          <div className="text-[18px] font-normal leading-[26px] tracking-[-0.45px] text-[#767676] max-[700px]:text-[15px] max-[700px]:leading-[22px]">
            <p className="mb-0">
              체형과 목표에 맞춘 1:1 맞춤 트레이닝 상담을 제공합니다.
            </p>
            <p className="mb-0">
              지금 상담을 통해 당신에게 맞는 운동을 시작해보세요.
            </p>
          </div>
        </div>

        <div
          className="flex w-full flex-col items-stretch gap-6 lg:flex-row lg:items-end"
          data-node-id="173:408"
        >
          <div
            className="relative h-[min(460px,70vw)] w-full min-w-0 shrink-0 overflow-hidden rounded-lg lg:h-[460px] lg:w-[708px] lg:max-w-[708px]"
            data-node-id="173:409"
          >
            <Image
              src={IMG_CONTACT_MAP_ULSAN}
              alt="스탠스짐 위치 · 울산 지도"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 708px"
            />
          </div>

          <form
            className="flex w-full min-w-0 flex-col gap-10 lg:w-[708px] lg:max-w-[708px]"
            data-node-id="173:410"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col gap-8" data-node-id="173:411">
              <div className="flex flex-col gap-0.5" data-node-id="173:412">
                <div className="flex items-start gap-0.5">
                  <label
                    htmlFor="contact-name"
                    className="text-[18px] font-medium leading-[26px] tracking-[-0.45px] text-[#222] max-[700px]:text-[15px] max-[700px]:leading-[22px]"
                    data-node-id="173:414"
                  >
                    성함
                  </label>
                  <span className="text-[14px] font-medium leading-[14px] text-[#00d5ff]">
                    *
                  </span>
                </div>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="성함을 입력해주세요."
                  className="w-full border-b border-[#e5e5ec] bg-transparent px-1 py-[14px] text-[16px] leading-6 tracking-[-0.4px] text-[#222] outline-none placeholder:text-[#767676] max-[700px]:text-[15px] max-[700px]:leading-[22px]"
                  data-node-id="173:416"
                  autoComplete="name"
                />
              </div>

              <div className="flex flex-col gap-0.5" data-node-id="173:418">
                <div className="flex items-start gap-0.5">
                  <label
                    htmlFor="contact-phone"
                    className="text-[18px] font-medium leading-[26px] tracking-[-0.45px] text-[#222] max-[700px]:text-[15px] max-[700px]:leading-[22px]"
                    data-node-id="173:420"
                  >
                    연락처
                  </label>
                  <span className="text-[14px] font-medium leading-[14px] text-[#00d5ff]">
                    *
                  </span>
                </div>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  placeholder="휴대폰번호를 입력해주세요."
                  className="w-full border-b border-[#e5e5ec] bg-transparent px-1 py-[14px] text-[16px] leading-6 tracking-[-0.4px] text-[#222] outline-none placeholder:text-[#767676] max-[700px]:text-[15px] max-[700px]:leading-[22px]"
                  data-node-id="173:422"
                  autoComplete="tel"
                />
              </div>

              <div className="flex flex-col gap-0.5" data-node-id="173:424">
                <div className="flex items-start gap-0.5">
                  <span className="text-[18px] font-medium leading-[26px] tracking-[-0.45px] text-[#222] max-[700px]:text-[15px] max-[700px]:leading-[22px]">
                    상담내용
                  </span>
                  <span className="text-[14px] font-medium leading-[14px] text-[#00d5ff]">
                    *
                  </span>
                </div>
                <div
                  className="flex flex-wrap gap-x-5 gap-y-3 pl-1 pt-2"
                  role="group"
                  aria-labelledby="consult-label"
                  data-node-id="173:430"
                >
                  <span id="consult-label" className="sr-only">
                    상담내용 선택
                  </span>
                  {CONSULT_OPTIONS.map((opt, i) => (
                    <label
                      key={opt.id}
                      className="flex cursor-pointer items-center gap-2"
                      data-node-id={
                        i === 0 ? "173:431" : i === 1 ? "173:434" : "173:437"
                      }
                    >
                      <input
                        type="radio"
                        name="consultType"
                        value={opt.id}
                        required
                        className="size-[22px] shrink-0 cursor-pointer rounded border border-[#e5e5ec] bg-white accent-[#09080e]"
                      />
                      <span className="text-[16px] leading-6 tracking-[-0.4px] text-[#767676] max-[700px]:text-[14px] max-[700px]:leading-5">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-9" data-node-id="173:440">
              <label
                className="flex cursor-pointer items-center gap-2 px-1"
                data-node-id="173:441"
              >
                <input
                  type="checkbox"
                  name="privacy"
                  required
                  className="size-[22px] shrink-0 cursor-pointer rounded border border-[#e5e5ec] accent-[#09080e]"
                />
                <span className="text-[16px] leading-6 tracking-[-0.4px] text-[#767676] max-[700px]:text-[14px] max-[700px]:leading-5">
                  개인이용정보 및 수집에 동의합니다.{" "}
                  <span className="text-[#222]">(필수)</span>
                </span>
              </label>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full max-w-[180px] rounded bg-[#09080e] px-4 py-4 text-[16px] font-medium leading-6 tracking-[-0.4px] text-white disabled:opacity-60 max-[700px]:text-[15px] max-[700px]:leading-[22px]"
                data-node-id="173:442"
              >
                {status === "loading" ? "전송 중…" : "제출하기"}
              </button>

              {feedback ? (
                <p
                  role="status"
                  className={
                    status === "success"
                      ? "text-[15px] leading-6 text-[#222] max-[700px]:text-[14px] max-[700px]:leading-5"
                      : "text-[15px] leading-6 text-red-600 max-[700px]:text-[14px] max-[700px]:leading-5"
                  }
                >
                  {feedback}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
