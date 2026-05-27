import { heroMapConfig, type HeroMapConfig } from "./hero-map-config";

function buildMaskDataUrl(cfg: HeroMapConfig) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 1920 1050'><defs><linearGradient id='g' gradientUnits='userSpaceOnUse' x1='1920' y1='525' x2='${
    1920 - 1920 * Math.cos(((cfg.gradientAngle - 180) * Math.PI) / 180)
  }' y2='${
    525 - 525 * Math.sin(((cfg.gradientAngle - 180) * Math.PI) / 180)
  }'><stop offset='${cfg.gradientStop1}' stop-color='white'/><stop offset='${cfg.gradientStop2}' stop-color='white' stop-opacity='0'/></linearGradient></defs><rect width='1920' height='1050' fill='url(%23g)'/></svg>`;
  return `url("data:image/svg+xml;utf8,${svg.replace(/#/g, "%23").replace(/"/g, "'")}")`;
}

export default function HeroMap({
  config = heroMapConfig,
}: {
  config?: HeroMapConfig;
}) {
  const mask = buildMaskDataUrl(config);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute bottom-0 right-0 aspect-[1260/1050] bg-no-repeat bg-cover bg-bottom"
        style={{
          width: `${config.mapWidthPct}%`,
          maxWidth: "1260px",
          transform: `translate(${config.mapOffsetX}px, ${config.mapOffsetY}px)`,
          backgroundImage: "url('/hero-map.png')",
          WebkitMaskImage: mask,
          maskImage: mask,
          WebkitMaskSize: `${config.maskSizePct}% 100%`,
          maskSize: `${config.maskSizePct}% 100%`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: `${config.maskOffsetXPct}% center`,
          maskPosition: `${config.maskOffsetXPct}% center`,
        }}
      />
    </div>
  );
}
