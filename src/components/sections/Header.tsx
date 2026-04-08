"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { IMG_LOGO } from "./assets";

const NAV = [
  { href: "/", label: "HOME" },
  { href: "/#why-stance", label: "시설 안내" },
  { href: "/#trainers", label: "강사소개" },
  { href: "/#member-transformation", label: "고객 리뷰" },
] as const;

const SCROLL_THRESHOLD = 32;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const scrollToPageTop = useCallback(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  }, []);

  const onNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href === "/") {
        if (pathname === "/") {
          e.preventDefault();
          scrollToPageTop();
        }
        return;
      }
      if (href.startsWith("/#")) {
        const id = href.slice(2);
        if (pathname === "/" && id) {
          e.preventDefault();
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [pathname, scrollToPageTop],
  );

  const onLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === "/") {
        e.preventDefault();
        scrollToPageTop();
      }
    },
    [pathname, scrollToPageTop],
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "pointer-events-none fixed inset-x-0 top-0 z-50 flex h-[var(--header-h)] items-center justify-between px-4 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 ease-out max-[400px]:px-3 sm:px-8 lg:px-16 xl:px-24 2xl:px-[240px]",
        scrolled
          ? "border-b border-white/[0.08] bg-[#09080e]/75 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:bg-[#09080e]/65"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
      data-name="header"
      data-node-id="173:353"
    >
      <div className="pointer-events-auto relative z-10 flex w-full items-center justify-between">
        <Link
          href="/"
          onClick={onLogoClick}
          className="relative block h-[44px] w-[92px] shrink-0 transition-opacity hover:opacity-90 max-[400px]:h-[40px] max-[400px]:w-[84px] sm:h-[52px] sm:w-[108px] lg:h-[87px] lg:w-[160px]"
          data-name="logo"
          data-node-id="173:354"
        >
          <Image
            src={IMG_LOGO}
            alt="STANCE GYM"
            fill
            className="object-contain object-left drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
            sizes="(max-width: 400px) 84px, (max-width: 1024px) 108px, 160px"
            priority
          />
        </Link>
        <nav
          className="min-w-0 max-w-[calc(100%-96px)] sm:max-w-[calc(100%-120px)] lg:max-w-none"
          aria-label="메인 메뉴"
          data-name="main_menu"
          data-node-id="173:355"
        >
          <ul
            className="flex items-center justify-end gap-3 overflow-x-auto pb-1 text-[13px] font-normal leading-5 tracking-[-0.35px] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-[400px]:gap-2 max-[400px]:text-[12px] max-[735px]:gap-4 sm:text-[14px] sm:leading-5 lg:gap-8 lg:text-[16px] lg:leading-6 lg:tracking-[-0.4px] xl:gap-[60px]"
            data-name="menu"
            data-node-id="173:356"
          >
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={(e) => onNavClick(e, item.href)}
                  className="whitespace-nowrap transition-opacity hover:opacity-80"
                  data-node-id={
                    item.label === "HOME"
                      ? "173:357"
                      : item.label === "강사소개"
                        ? "173:358"
                        : item.label === "시설 안내"
                          ? "173:359"
                          : "173:360"
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
