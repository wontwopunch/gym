"use client";

import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function formatStat(n: number) {
  return n.toLocaleString("en-US");
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useInViewOnce(el: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [el]);
  return visible;
}

function useCountUp(
  target: number,
  active: boolean,
  durationMs: number,
  reducedMotion: boolean,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reducedMotion) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      setValue(Math.round(easeOutCubic(t) * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, durationMs, reducedMotion]);

  return value;
}

type StatItem = {
  nodeId: string;
  target: number;
  label: string;
  valueNodeId: string;
  labelNodeId: string;
};

function AnimatedStat({
  item,
  active,
  reducedMotion,
}: {
  item: StatItem;
  active: boolean;
  reducedMotion: boolean;
}) {
  const n = useCountUp(item.target, active, 1200, reducedMotion);
  return (
    <div
      className="flex min-w-0 flex-col items-center gap-1 md:max-w-[283px] md:flex-1 md:items-center"
      data-node-id={item.nodeId}
    >
      <p
        className="w-full font-bold tabular-nums text-[clamp(2.25rem,6vw,72px)] leading-[1.1] text-[#b7f3ff] max-[700px]:text-[clamp(1.85rem,5.5vw,56px)] lg:leading-[90px]"
        data-node-id={item.valueNodeId}
      >
        {formatStat(n)}
      </p>
      <p
        className="w-full text-[16px] font-normal leading-6 tracking-[-0.4px] text-[rgba(255,255,255,0.7)] [word-break:keep-all] max-[700px]:text-[14px] max-[700px]:leading-5"
        data-node-id={item.labelNodeId}
      >
        {item.label}
      </p>
    </div>
  );
}

const STATS: readonly StatItem[] = [
  {
    nodeId: "173:480",
    target: 218_540,
    label: "누적 방문 이용 기록",
    valueNodeId: "173:481",
    labelNodeId: "173:482",
  },
  {
    nodeId: "173:483",
    target: 42_372,
    label: "누적 PT 세션 진행",
    valueNodeId: "173:484",
    labelNodeId: "173:485",
  },
  {
    nodeId: "173:486",
    target: 112_380,
    label: "회원 재등록 기록",
    valueNodeId: "173:487",
    labelNodeId: "173:488",
  },
];

export function StanceRecordCounters() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const active = useInViewOnce(wrapRef);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      ref={wrapRef}
      className="flex w-full flex-col items-stretch gap-8 text-center max-[735px]:gap-10 md:flex-row md:flex-wrap md:justify-center md:gap-12 lg:gap-[160px]"
      data-node-id="173:479"
    >
      {STATS.map((item) => (
        <AnimatedStat
          key={item.nodeId}
          item={item}
          active={active}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}
