"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import type { ConsultationRecord } from "@/lib/consultations-store";

const PAGE_SIZE = 10;

/** 페이지 번호 버튼이 많을 때 현재 주변만 표시 */
function getVisiblePageNumbers(
  current: number,
  total: number,
  maxButtons = 7,
): number[] {
  if (total <= maxButtons) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const half = Math.floor(maxButtons / 2);
  let start = current - half;
  let end = current + half - (maxButtons % 2 === 0 ? 1 : 0);
  if (start < 1) {
    start = 1;
    end = maxButtons;
  }
  if (end > total) {
    end = total;
    start = total - maxButtons + 1;
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

type ListResponse = {
  items: ConsultationRecord[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export default function AdminConsultationsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async (p: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/consultations?page=${p}&pageSize=${PAGE_SIZE}`,
        { credentials: "include" },
      );
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) {
        const j = (await res.json()) as { error?: string };
        setError(j.error ?? "목록을 불러오지 못했습니다.");
        setData(null);
        return;
      }
      setData((await res.json()) as ListResponse);
    } catch {
      setError("네트워크 오류가 발생했습니다.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void load(page);
  }, [load, page]);

  async function onLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/admin/login");
    router.refresh();
  }

  async function onDelete(id: string) {
    if (!window.confirm("이 상담 신청 내역을 삭제할까요?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/consultations?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) {
        const j = (await res.json()) as { error?: string };
        alert(j.error ?? "삭제에 실패했습니다.");
        return;
      }
      await load(page);
    } finally {
      setDeletingId(null);
    }
  }

  const totalPages = data?.totalPages ?? 1;
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-10 text-white lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              상담 신청 내역
            </h1>
            <p className="mt-1 text-sm text-white/60">
              메일 발송이 완료된 접수만 저장됩니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/5"
            >
              사이트 홈
            </Link>
            <button
              type="button"
              onClick={() => void onLogout()}
              className="rounded border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/5"
            >
              로그아웃
            </button>
          </div>
        </div>

        {error ? (
          <p className="mb-4 text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <div className="overflow-x-auto rounded-lg border border-white/10 bg-[#111]">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/60">
                <th className="px-4 py-3 font-medium">성함</th>
                <th className="px-4 py-3 font-medium">연락처</th>
                <th className="px-4 py-3 font-medium">상담내용</th>
                <th className="px-4 py-3 font-medium">접수일시</th>
                <th className="w-[100px] px-4 py-3 font-medium text-right">
                  관리
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-white/50"
                  >
                    불러오는 중…
                  </td>
                </tr>
              ) : !data?.items.length ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-white/50"
                  >
                    저장된 상담 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                data.items.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="px-4 py-3 align-top text-white">{row.name}</td>
                    <td className="px-4 py-3 align-top text-white/90">
                      {row.phone}
                    </td>
                    <td className="px-4 py-3 align-top text-white/90">
                      {row.consultLabel}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 align-top text-white/70">
                      {new Date(row.createdAt).toLocaleString("ko-KR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-4 py-3 text-right align-top">
                      <button
                        type="button"
                        disabled={deletingId === row.id}
                        onClick={() => void onDelete(row.id)}
                        className="rounded bg-red-600/90 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 disabled:opacity-50"
                      >
                        {deletingId === row.id ? "삭제 중…" : "삭제"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {data && data.total > 0 ? (
          <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/55">
              총 {data.total}건 · {data.page} / {data.totalPages} 페이지
            </p>
            <nav
              className="flex flex-wrap items-center justify-center gap-2"
              aria-label="페이지"
            >
              <button
                type="button"
                disabled={!canPrev || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded border border-white/20 px-3 py-1.5 text-sm disabled:opacity-40"
              >
                이전
              </button>
              {getVisiblePageNumbers(page, data.totalPages).map((n) => (
                <button
                  key={n}
                  type="button"
                  disabled={loading}
                  onClick={() => setPage(n)}
                  className={
                    n === page
                      ? "min-w-[2.25rem] rounded bg-[#00d5ff] px-2 py-1.5 text-sm font-medium text-[#0a0a0a]"
                      : "min-w-[2.25rem] rounded border border-white/15 px-2 py-1.5 text-sm text-white/85 hover:bg-white/5"
                  }
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                disabled={!canNext || loading}
                onClick={() =>
                  setPage((p) => Math.min(data.totalPages, p + 1))
                }
                className="rounded border border-white/20 px-3 py-1.5 text-sm disabled:opacity-40"
              >
                다음
              </button>
            </nav>
          </div>
        ) : null}
      </div>
    </div>
  );
}
