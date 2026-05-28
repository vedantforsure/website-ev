"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Calligraph } from "calligraph";
import { playPinOpen, playPinClose } from "./sounds";

const CARD_WIDTH = 431;
const CARD_HEIGHT = 540;
const PIN_SIZE = 40;

const EVPinGroupContext = createContext<{
  openId: string | null;
  setOpenId: (id: string | null) => void;
} | null>(null);

export function EVPinGroup({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <EVPinGroupContext.Provider value={{ openId, setOpenId }}>
      {children}
    </EVPinGroupContext.Provider>
  );
}

function Lightning({ size = 28, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M17.5 2L15.7857 10.5714L22.6429 13.1429L10.6429 26L12.3571 17.4286L5.5 14.8571L17.5 2Z"
        fill={color}
      />
    </svg>
  );
}

type Level = "low" | "med" | "high";
type Variant = "default" | "alert";

const palette = {
  default: {
    text: "text-white",
    subText: "text-[#bbb]",
    badgeText: "text-white",
    barFilled: "#ffffff",
    barMid: "rgba(0,0,0,0.25)",
    barDim: "rgba(0,0,0,0.16)",
    lowActive: "#c1c1c1",
    utilFill: "bg-white",
    chipBg: "bg-white",
    chipText: "text-black",
    cardBg: "bg-black/45",
  },
  alert: {
    text: "text-[#FF4E4E]",
    subText: "text-[#C99090]",
    badgeText: "text-[#FF4E4E]",
    barFilled: "#FF4E4E",
    barMid: "rgba(0,0,0,0.25)",
    barDim: "rgba(0,0,0,0.16)",
    lowActive: "#FFA7A7",
    utilFill: "bg-[#FF4E4E]",
    chipBg: "bg-[#3D1F1F]",
    chipText: "text-[#FF4E4E]",
    cardBg: "bg-[#290000]/75",
  },
} as const;

function SignalBars({ level, variant }: { level: Level; variant: Variant }) {
  const p = palette[variant];
  const colors: Record<Level, [string, string, string]> = {
    high: [p.barFilled, p.barFilled, p.barFilled],
    med: [p.barDim, p.barMid, p.barFilled],
    low: [p.barDim, p.barDim, p.lowActive],
  };
  return (
    <div className="flex items-center gap-1">
      {colors[level].map((c, i) => (
        <div
          key={i}
          className="ev-pin-signal-bar h-3 w-[14px]"
          style={{ backgroundColor: c, animationDelay: `${120 + i * 60}ms` }}
        />
      ))}
    </div>
  );
}

function MetricRow({
  label,
  sub,
  level,
  badge,
  variant,
}: {
  label: string;
  sub: string;
  level: Level;
  badge: string;
  variant: Variant;
}) {
  const p = palette[variant];
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col gap-1">
        <p className={`font-medium text-[16px] ${p.text}`}>{label}</p>
        <p className={`font-medium text-[16px] ${p.subText}`}>{sub}</p>
      </div>
      <div className="flex items-end justify-center gap-2">
        <SignalBars level={level} variant={variant} />
        <p className={`font-semibold text-[16px] leading-[16px] tracking-[0.4px] whitespace-nowrap ${p.badgeText}`}>
          {badge}
        </p>
      </div>
    </div>
  );
}

function UtilizationBar({
  fillHeight,
  date,
  variant,
}: {
  fillHeight: number;
  date: string;
  variant: Variant;
}) {
  const p = palette[variant];
  return (
    <div className="flex flex-col gap-2.5 items-start w-[88.75px]">
      <div className="relative h-[45px] w-full overflow-clip rounded-[4px] backdrop-blur-[10px] bg-black/[0.16]">
        <div
          className={`ev-pin-util-fill absolute bottom-0 left-0 right-0 origin-bottom ${p.utilFill}`}
          style={{ height: `${fillHeight}px` }}
        />
      </div>
      <p className={`font-medium text-[16px] text-center w-full ${p.subText}`}>
        {date}
      </p>
    </div>
  );
}

export type EVPinData = {
  rating: string;
  name: string;
  address: string;
  evAdoption: { percentage: string; level: Level; badge: string };
  nearbyStations: { value: string; level: Level; badge: string };
  avgTraffic: { sub: string; level: Level; badge: string };
  utilization: { fillHeight: number; date: string }[];
  regional: { sub: string; level: Level; badge: string };
};

const defaultData: EVPinData = {
  rating: "4.4/5",
  name: "Anza Vista Charging Station",
  address: "San francisco, CA 94115",
  evAdoption: { percentage: "25% penetration", level: "high", badge: "HIGH" },
  nearbyStations: {
    value: "245 dcfc ports within 5mi",
    level: "med",
    badge: "Med",
  },
  avgTraffic: { sub: "San francisco, CA 94115", level: "low", badge: "Low" },
  utilization: [
    { fillHeight: 29, date: "8 Apr" },
    { fillHeight: 36, date: "8 Apr" },
    { fillHeight: 22, date: "8 Apr" },
    { fillHeight: 29, date: "8 Apr" },
  ],
  regional: { sub: "Anza Vista district avg", level: "med", badge: "MED" },
};

export default function EVPin({
  data = defaultData,
  defaultOpen = false,
  variant = "default",
}: {
  data?: EVPinData;
  defaultOpen?: boolean;
  variant?: "default" | "alert";
}) {
  const group = useContext(EVPinGroupContext);
  const id = useId();
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const open = group ? group.openId === id : localOpen;
  const setOpen = (next: boolean | ((v: boolean) => boolean)) => {
    if (group) {
      const value = typeof next === "function" ? next(open) : next;
      group.setOpenId(value ? id : null);
    } else {
      setLocalOpen(next);
    }
  };
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardStyle, setCardStyle] = useState<React.CSSProperties>({
    visibility: "hidden",
  });
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    const t = window.setTimeout(() => setMounted(false), 160);
    return () => window.clearTimeout(t);
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    function compute() {
      const pin = wrapperRef.current;
      if (!pin) return;
      const r = pin.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const margin = 12;
      const cardH = cardRef.current?.offsetHeight ?? CARD_HEIGHT;
      const cardW = cardRef.current?.offsetWidth ?? CARD_WIDTH;

      const gap = 16;
      const spaceRight = vw - r.right - margin - gap;
      const spaceLeft = r.left - margin - gap;
      const openRight = spaceRight >= cardW || spaceRight >= spaceLeft;

      let left = openRight ? r.right + gap : r.left - cardW - gap;
      left = Math.max(margin, Math.min(left, vw - cardW - margin));

      let top = r.top;
      let openBelow = true;
      if (top + cardH + margin > vh) {
        top = vh - cardH - margin;
        openBelow = false;
      }
      top = Math.max(margin, top);

      const originX = openRight ? "left" : "right";
      const originY = openBelow ? "top" : "bottom";

      setCardStyle({
        position: "fixed",
        left: `${left}px`,
        top: `${top}px`,
        transformOrigin: `${originX} ${originY}`,
      });
    }
    compute();
    requestAnimationFrame(compute);
    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute, true);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("scroll", compute, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      const t = e.target as Node | null;
      if (!t) return;
      if (wrapperRef.current?.contains(t)) return;
      if (cardRef.current?.contains(t)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => {
          if (open) playPinClose();
          else playPinOpen();
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-label={open ? "Close station details" : "Open station details"}
        className={`relative z-10 flex flex-col items-center justify-center size-10 rounded-full border-[1.5px] backdrop-blur-[10px] overflow-clip shadow-[0px_8px_12px_0px_rgba(0,0,0,0.4)] cursor-pointer transition-[transform,border-color,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 motion-reduce:transition-none motion-reduce:active:scale-100 ${
          variant === "alert"
            ? open
              ? "bg-[#6E0000]/80 border-[#FF4E4E]"
              : "bg-[#6E0000]/65 hover:bg-[#6E0000]/80 border-transparent"
            : open
            ? "bg-black/60 border-white"
            : "bg-black/45 hover:bg-black/60 border-transparent"
        }`}
      >
        <span className="block translate-x-[0.5px] translate-y-[-0.5px]">
          <Lightning color={variant === "alert" ? "#FF4E4E" : "white"} />
        </span>
      </button>

      {mounted && typeof document !== "undefined" && createPortal(
        <div
          ref={cardRef}
          style={cardStyle}
          data-state={open ? "open" : "closed"}
          className={`ev-pin-card z-[100] flex flex-col gap-5 items-start w-[431px] p-4 rounded-[20px] backdrop-blur-[10px] overflow-clip shadow-[0px_8px_20px_0px_rgba(0,0,0,0.4)] ${palette[variant].cardBg}`}
        >
          <div className={`inline-flex items-start px-3 py-1 rounded-[41px] ${palette[variant].chipBg}`}>
            <span className={`font-semibold text-[16px] whitespace-nowrap tabular-nums ${palette[variant].chipText}`}>
              <Calligraph variant="number" initial>{data.rating}</Calligraph>
            </span>
          </div>

          <div className="flex flex-col gap-1 items-start">
            <p className={`font-medium text-[16px] ${palette[variant].text}`}>
              {data.name}
            </p>
            <p className={`font-medium text-[16px] ${palette[variant].subText}`}>
              {data.address}
            </p>
          </div>

          <MetricRow
            label="EV adoption"
            sub={data.evAdoption.percentage}
            level={data.evAdoption.level}
            badge={data.evAdoption.badge}
            variant={variant}
          />

          <MetricRow
            label="Nearby stations"
            sub={data.nearbyStations.value}
            level={data.nearbyStations.level}
            badge={data.nearbyStations.badge}
            variant={variant}
          />

          <MetricRow
            label="Avg daily traffic"
            sub={data.avgTraffic.sub}
            level={data.avgTraffic.level}
            badge={data.avgTraffic.badge}
            variant={variant}
          />

          <div className="flex flex-col gap-2 items-start w-full">
            <p className={`font-medium text-[16px] ${palette[variant].text}`}>
              Utilization (last 30 days)
            </p>
            <div className="flex items-start gap-2 w-full">
              {data.utilization.map((u, i) => (
                <UtilizationBar key={i} fillHeight={u.fillHeight} date={u.date} variant={variant} />
              ))}
            </div>
          </div>

          <MetricRow
            label="Regional Utilization"
            sub={data.regional.sub}
            level={data.regional.level}
            badge={data.regional.badge}
            variant={variant}
          />
        </div>,
        document.body
      )}
    </div>
  );
}
