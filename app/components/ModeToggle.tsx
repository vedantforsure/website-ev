"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Logo from "./Logo";

type Mode = "explore" | "design";

function CircleDashed({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9.79483 3.28711C11.241 2.9043 12.759 2.9043 14.2052 3.28711M3.5 9.59224C3.89818 8.1242 4.65718 6.78404 5.70517 5.69861M5.70517 18.3023C4.65691 17.2164 3.89789 15.8755 3.5 14.4068M14.2052 20.7129C12.759 21.0957 11.241 21.0957 9.79483 20.7129M20.5 14.4078C20.1018 15.8758 19.3428 17.216 18.2948 18.3014M18.2948 5.69768C19.3431 6.78363 20.1021 8.12446 20.5 9.59318"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ModePill({
  active,
  icon,
  label,
  shortcut,
  onClick,
  pillRef,
}: {
  active: boolean;
  icon: ReactNode;
  label: string;
  shortcut: string;
  onClick: () => void;
  pillRef: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <button
      ref={pillRef}
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="relative z-10 flex items-center justify-center gap-2 px-4 py-2.5 rounded-[88px] cursor-pointer select-none transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 motion-reduce:transition-none motion-reduce:active:scale-100"
    >
      {icon}
      <span className="font-normal text-[20px] leading-[28px] tracking-[0.3px] text-white whitespace-nowrap">
        {label}
      </span>
      <span
        className={`inline-flex items-center justify-center px-1.5 py-1 rounded-[4px] font-normal text-[18px] leading-none tracking-[0.27px] text-white transition-colors duration-200 ease-out ${
          active ? "bg-black/25" : "bg-black/[0.16]"
        }`}
      >
        {shortcut}
      </span>
    </button>
  );
}

export default function ModeToggle({
  defaultMode = "explore",
  onChange,
}: {
  defaultMode?: Mode;
  onChange?: (mode: Mode) => void;
}) {
  const [mode, setMode] = useState<Mode>(defaultMode);
  const containerRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLButtonElement>(null);
  const designRef = useRef<HTMLButtonElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  function setAndNotify(next: Mode) {
    setMode(next);
    onChange?.(next);
  }

  useLayoutEffect(() => {
    const container = containerRef.current;
    const target = mode === "explore" ? exploreRef.current : designRef.current;
    if (!container || !target) return;

    function measure() {
      if (!container || !target) return;
      const cBox = container.getBoundingClientRect();
      const tBox = target.getBoundingClientRect();
      setIndicator({
        left: tBox.left - cBox.left,
        width: tBox.width,
        ready: true,
      });
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    ro.observe(target);
    return () => ro.disconnect();
  }, [mode]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.toLowerCase() === "e") setAndNotify("explore");
      else if (e.key.toLowerCase() === "d") setAndNotify("design");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center justify-center gap-2 p-2 rounded-[88px] backdrop-blur-[10px] bg-black/[0.16]"
    >
      <span
        aria-hidden
        className="absolute top-2 bottom-2 left-0 rounded-[88px] bg-black/25 transition-[transform,width] duration-[220ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
        style={{
          width: `${indicator.width}px`,
          transform: `translateX(${indicator.left}px)`,
          opacity: indicator.ready ? 1 : 0,
        }}
      />
      <ModePill
        pillRef={exploreRef}
        active={mode === "explore"}
        icon={<Logo size={24} />}
        label="Explore"
        shortcut="E"
        onClick={() => setAndNotify("explore")}
      />
      <ModePill
        pillRef={designRef}
        active={mode === "design"}
        icon={<CircleDashed size={24} />}
        label="Design"
        shortcut="D"
        onClick={() => setAndNotify("design")}
      />
    </div>
  );
}
