"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  IMG_TRANSFORMATION_1,
  IMG_TRANSFORMATION_2,
  IMG_TRANSFORMATION_3,
  IMG_TRANSFORMATION_4,
} from "./assets";

const SLIDES = [
  { nodeId: "173:401", src: IMG_TRANSFORMATION_1 },
  { nodeId: "173:402", src: IMG_TRANSFORMATION_2 },
  { nodeId: "173:403", src: IMG_TRANSFORMATION_3 },
  { nodeId: "173:404", src: IMG_TRANSFORMATION_4 },
] as const;

const AUTO_MS = 3800;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * ≤700px — 카드 1장 · 자동 무한 (마지막에 첫 장 복제 후 transition 없이 0으로 스냅)
 */
export function TransformationMobileCarousel() {
  const reduced = usePrefersReducedMotion();
  const track = [...SLIDES, SLIDES[0]];
  const n = track.length;
  const [index, setIndex] = useState(0);
  const [transitionOn, setTransitionOn] = useState(true);

  useEffect(() => {
    if (reduced || n <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => {
        if (i < SLIDES.length) {
          return i + 1;
        }
        setTransitionOn(false);
        queueMicrotask(() => {
          setIndex(0);
          queueMicrotask(() => setTransitionOn(true));
        });
        return i;
      });
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [reduced, n]);

  const pct = -(index / n) * 100;

  return (
    <div
      className="mx-auto mt-10 w-full max-w-[min(342px,calc(100vw-2rem))] overflow-hidden px-4"
      data-node-id="173:399-mobile"
      role="region"
      aria-roledescription="carousel"
      aria-label="회원 변화 갤러리"
    >
      <div className="relative w-full overflow-hidden rounded-lg">
        <div
          className={`flex ${transitionOn ? "transition-transform duration-500 ease-out motion-reduce:transition-none" : ""}`}
          style={{
            width: `${n * 100}%`,
            transform: `translate3d(${pct}%,0,0)`,
          }}
        >
          {track.map((slot, i) => (
            <div
              key={`${slot.nodeId}-${i}`}
              className="flex shrink-0 justify-center"
              style={{ width: `${100 / n}%` }}
              data-node-id={slot.nodeId}
              aria-hidden={i === n - 1 ? true : undefined}
            >
              <div className="relative aspect-square w-full max-w-[342px] overflow-hidden rounded-lg bg-[#d3d3d3]">
                <Image
                  src={slot.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 700px) min(342px, 100vw), 342px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
