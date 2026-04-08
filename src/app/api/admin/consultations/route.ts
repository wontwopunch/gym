import { NextResponse } from "next/server";

import { readSessionFromCookies } from "@/lib/admin-session-server";
import {
  deleteConsultation,
  listConsultations,
} from "@/lib/consultations-store";

const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

function unauthorized() {
  return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
}

export async function GET(req: Request) {
  if (!(await readSessionFromCookies())) {
    return unauthorized();
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSizeRaw = Number(searchParams.get("pageSize")) || DEFAULT_PAGE_SIZE;
  const pageSize = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, Math.floor(pageSizeRaw)),
  );

  const { items, total } = await listConsultations(page, pageSize);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return NextResponse.json({
    items,
    page,
    pageSize,
    total,
    totalPages,
  });
}

export async function DELETE(req: Request) {
  if (!(await readSessionFromCookies())) {
    return unauthorized();
  }

  const id = new URL(req.url).searchParams.get("id");
  if (!id?.trim()) {
    return NextResponse.json({ error: "삭제할 항목이 없습니다." }, { status: 400 });
  }

  const ok = await deleteConsultation(id.trim());
  if (!ok) {
    return NextResponse.json({ error: "항목을 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
