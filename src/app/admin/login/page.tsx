"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  type FormEvent,
  Suspense,
  useState,
} from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const username = String(fd.get("username") ?? "");
    const password = String(fd.get("password") ?? "");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "로그인에 실패했습니다.");
        return;
      }
      const from = searchParams.get("from");
      const target =
        from && from.startsWith("/admin") && from !== "/admin/login"
          ? from
          : "/admin";
      router.push(target);
      router.refresh();
    } catch {
      setError("오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#0a0a0a] px-4 py-16 text-white">
      <div className="w-full max-w-[400px] rounded-lg border border-white/10 bg-[#111] p-8 shadow-xl">
        <h1 className="mb-6 text-center text-xl font-semibold tracking-tight">
          관리자 로그인
        </h1>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-sm text-white/70">
              아이디
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="rounded border border-white/15 bg-[#0a0a0a] px-3 py-2.5 text-[15px] outline-none ring-[#00d5ff] focus:ring-2"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm text-white/70">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="rounded border border-white/15 bg-[#0a0a0a] px-3 py-2.5 text-[15px] outline-none ring-[#00d5ff] focus:ring-2"
            />
          </div>
          {error ? (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 rounded bg-[#00d5ff] py-3 text-[15px] font-medium text-[#0a0a0a] transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "확인 중…" : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center bg-[#0a0a0a] text-white/70">
          로딩 중…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
