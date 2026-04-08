import { NextResponse } from "next/server";

import { getConsultLabel } from "@/lib/consult-labels";
import { addConsultation } from "@/lib/consultations-store";

function buildMessageBody(
  name: string,
  phone: string,
  consultLabel: string,
): string {
  return [
    "[스탠스짐 상담 문의]",
    "",
    `성함: ${name}`,
    `연락처: ${phone}`,
    `상담내용: ${consultLabel}`,
  ].join("\n");
}

/**
 * 환경 변수 (서버):
 * - RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_TO_EMAIL → 실제 메일 발송 + 저장
 * - 개발 전용: NODE_ENV=development 이고 CONTACT_DEV_SAVE_WITHOUT_EMAIL=1 이면
 *   메일 없이 data/consultations.json 에만 저장 (로컬 테스트용)
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const consultType =
    typeof body.consultType === "string" ? body.consultType.trim() : "";
  const privacy = body.privacy === true || body.privacy === "on";

  if (!name) {
    return NextResponse.json({ error: "성함을 입력해 주세요." }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json(
      { error: "연락처를 입력해 주세요." },
      { status: 400 },
    );
  }
  const consultLabel = getConsultLabel(consultType);
  if (!consultLabel) {
    return NextResponse.json(
      { error: "상담내용을 선택해 주세요." },
      { status: 400 },
    );
  }
  if (!privacy) {
    return NextResponse.json(
      { error: "개인정보 수집에 동의해 주세요." },
      { status: 400 },
    );
  }

  const textBody = buildMessageBody(name, phone, consultLabel);

  const devSaveWithoutEmail =
    process.env.NODE_ENV === "development" &&
    process.env.CONTACT_DEV_SAVE_WITHOUT_EMAIL === "1";

  if (devSaveWithoutEmail) {
    try {
      await addConsultation({
        name,
        phone,
        consultType,
        consultLabel,
      });
      return NextResponse.json({ ok: true as const, localOnly: true });
    } catch (e) {
      console.error("[contact] dev save failed:", e);
      return NextResponse.json(
        { error: "저장에 실패했습니다. 잠시 후 다시 시도해 주세요." },
        { status: 500 },
      );
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!resendKey || !from || !to) {
    return NextResponse.json(
      {
        error:
          "문의 수신(이메일)이 설정되지 않았습니다. 관리자에게 문의하세요.",
      },
      { status: 503 },
    );
  }

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `[스탠스짐 상담] ${name} · ${consultLabel}`,
      text: textBody,
    }),
  });
  if (!r.ok) {
    const errText = await r.text();
    console.error("[contact] Resend error:", r.status, errText);
    return NextResponse.json(
      { error: "메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 502 },
    );
  }

  try {
    await addConsultation({
      name,
      phone,
      consultType,
      consultLabel,
    });
  } catch (e) {
    console.error("[contact] save record failed:", e);
    /* 메일은 성공했으나 저장 실패 — 클라이언트는 성공 처리 */
  }

  return NextResponse.json({ ok: true as const });
}
