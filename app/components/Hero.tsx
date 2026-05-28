import CheckCircle from "./CheckCircle";
import CyclingWord from "./CyclingWord";
import EVPin, { EVPinGroup, type EVPinData } from "./EVPin";
import HeroMap from "./HeroMap";
import ModeToggle from "./ModeToggle";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const pins: {
  top: string;
  right: string;
  data: EVPinData;
  variant?: "default" | "alert";
}[] = [
  {
    top: "340px",
    right: "380px",
    data: {
      rating: "4.6/5",
      name: "Presidio Heights Supercharger",
      address: "San Francisco, CA 94115",
      evAdoption: { percentage: "31% penetration", level: "high", badge: "HIGH" },
      nearbyStations: {
        value: "318 dcfc ports within 5mi",
        level: "high",
        badge: "HIGH",
      },
      avgTraffic: { sub: "12,400 vehicles/day", level: "med", badge: "MED" },
      utilization: [
        { fillHeight: 32, date: "1 Apr" },
        { fillHeight: 40, date: "8 Apr" },
        { fillHeight: 28, date: "15 Apr" },
        { fillHeight: 38, date: "22 Apr" },
      ],
      regional: { sub: "Pacific Heights district avg", level: "high", badge: "HIGH" },
    },
  },
  {
    top: "460px",
    right: "230px",
    data: {
      rating: "4.2/5",
      name: "Inner Richmond DC Fast Charger",
      address: "San Francisco, CA 94118",
      evAdoption: { percentage: "22% penetration", level: "med", badge: "MED" },
      nearbyStations: {
        value: "164 dcfc ports within 5mi",
        level: "med",
        badge: "MED",
      },
      avgTraffic: { sub: "8,700 vehicles/day", level: "low", badge: "LOW" },
      utilization: [
        { fillHeight: 18, date: "1 Apr" },
        { fillHeight: 24, date: "8 Apr" },
        { fillHeight: 30, date: "15 Apr" },
        { fillHeight: 22, date: "22 Apr" },
      ],
      regional: { sub: "Inner Richmond district avg", level: "med", badge: "MED" },
    },
  },
  {
    top: "630px",
    right: "410px",
    data: {
      rating: "4.8/5",
      name: "Anza Vista Charging Station",
      address: "San Francisco, CA 94115",
      evAdoption: { percentage: "25% penetration", level: "high", badge: "HIGH" },
      nearbyStations: {
        value: "245 dcfc ports within 5mi",
        level: "med",
        badge: "MED",
      },
      avgTraffic: { sub: "10,200 vehicles/day", level: "low", badge: "LOW" },
      utilization: [
        { fillHeight: 29, date: "1 Apr" },
        { fillHeight: 36, date: "8 Apr" },
        { fillHeight: 22, date: "15 Apr" },
        { fillHeight: 29, date: "22 Apr" },
      ],
      regional: { sub: "Anza Vista district avg", level: "med", badge: "MED" },
    },
  },
  {
    top: "770px",
    right: "290px",
    data: {
      rating: "3.9/5",
      name: "Outer Sunset EVgo Hub",
      address: "San Francisco, CA 94122",
      evAdoption: { percentage: "17% penetration", level: "low", badge: "LOW" },
      nearbyStations: {
        value: "92 dcfc ports within 5mi",
        level: "low",
        badge: "LOW",
      },
      avgTraffic: { sub: "6,300 vehicles/day", level: "low", badge: "LOW" },
      utilization: [
        { fillHeight: 14, date: "1 Apr" },
        { fillHeight: 18, date: "8 Apr" },
        { fillHeight: 12, date: "15 Apr" },
        { fillHeight: 20, date: "22 Apr" },
      ],
      regional: { sub: "Outer Sunset district avg", level: "low", badge: "LOW" },
    },
  },
  {
    top: "400px",
    right: "150px",
    data: {
      rating: "4.4/5",
      name: "Mission Bay Tesla Hub",
      address: "San Francisco, CA 94158",
      evAdoption: { percentage: "38% penetration", level: "high", badge: "HIGH" },
      nearbyStations: {
        value: "412 dcfc ports within 5mi",
        level: "high",
        badge: "HIGH",
      },
      avgTraffic: { sub: "18,900 vehicles/day", level: "high", badge: "HIGH" },
      utilization: [
        { fillHeight: 38, date: "1 Apr" },
        { fillHeight: 42, date: "8 Apr" },
        { fillHeight: 35, date: "15 Apr" },
        { fillHeight: 41, date: "22 Apr" },
      ],
      regional: { sub: "Mission Bay district avg", level: "high", badge: "HIGH" },
    },
  },
  {
    top: "560px",
    right: "180px",
    variant: "alert",
    data: {
      rating: "2.3/5",
      name: "Hayes Valley Curbside Charger",
      address: "San Francisco, CA 94102",
      evAdoption: { percentage: "9% penetration", level: "low", badge: "LOW" },
      nearbyStations: {
        value: "41 dcfc ports within 5mi",
        level: "low",
        badge: "LOW",
      },
      avgTraffic: { sub: "3,100 vehicles/day", level: "low", badge: "LOW" },
      utilization: [
        { fillHeight: 6, date: "1 Apr" },
        { fillHeight: 9, date: "8 Apr" },
        { fillHeight: 5, date: "15 Apr" },
        { fillHeight: 8, date: "22 Apr" },
      ],
      regional: { sub: "Hayes Valley district avg", level: "low", badge: "LOW" },
    },
  },
  {
    top: "700px",
    right: "120px",
    variant: "alert",
    data: {
      rating: "2.8/5",
      name: "Twin Peaks Lookout Station",
      address: "San Francisco, CA 94114",
      evAdoption: { percentage: "12% penetration", level: "low", badge: "LOW" },
      nearbyStations: {
        value: "58 dcfc ports within 5mi",
        level: "low",
        badge: "LOW",
      },
      avgTraffic: { sub: "4,400 vehicles/day", level: "low", badge: "LOW" },
      utilization: [
        { fillHeight: 10, date: "1 Apr" },
        { fillHeight: 7, date: "8 Apr" },
        { fillHeight: 11, date: "15 Apr" },
        { fillHeight: 9, date: "22 Apr" },
      ],
      regional: { sub: "Twin Peaks district avg", level: "low", badge: "LOW" },
    },
  },
];

const PIN_SIZE = 40;
const pinTops = pins.map((p) => parseFloat(p.top));
const pinClusterTop = Math.min(...pinTops);
const pinClusterHeight = Math.max(...pinTops) - pinClusterTop + PIN_SIZE;

const bullets = [
  "Access to 20,000+ EV station worldwide",
  "Up-to-date date on EV usage and adoption across the world",
  "Recommened by members of Porsche, Tesla & more",
];

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#4BA6C6]">
      <HeroMap />
      <EVPinGroup>
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
          style={{ height: pinClusterHeight }}
        >
          {pins.map((p, i) => (
            <div
              key={i}
              className="absolute"
              style={{ top: parseFloat(p.top) - pinClusterTop, right: p.right }}
            >
              <EVPin data={p.data} variant={p.variant} />
            </div>
          ))}
        </div>
      </EVPinGroup>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <ModeToggle />
      </div>
      <div className="relative z-10 h-screen flex items-center px-6 md:px-12 lg:px-[120px] py-16 pointer-events-none">
        <div className="flex flex-col gap-10 items-start max-w-[700px] pointer-events-auto">
          <div className="flex flex-col gap-5 items-start">
            <div className="backdrop-blur-[10px] bg-black/25 rounded-[88px] px-4 py-2">
              <span className="font-normal text-[20px] leading-[28px] tracking-[0.3px] text-white whitespace-nowrap">
                Used by 1200+ businesses worldwide
              </span>
            </div>
            <h1 className="font-semibold text-[60px] leading-[68px] tracking-[-0.6px] text-white">
              The industry standard for <CyclingWord />
              <br />
              prime EV charging sites
            </h1>
            <p className="font-medium text-[20px] leading-[28px] tracking-[0.3px] text-white">
              Find and deploy sites with confidence. Station utilization data,
              to-scale layouts and cost estimates, packaged into a shareable
              report in minutes.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <PrimaryButton>Start for Free</PrimaryButton>
            <SecondaryButton>View Pricing</SecondaryButton>
          </div>
          <ul className="flex flex-col gap-3 w-full">
            {bullets.map((text) => (
              <li key={text} className="flex items-center gap-2.5">
                <CheckCircle className="shrink-0" />
                <span className="font-medium text-[20px] leading-[28px] tracking-[0.3px] text-white whitespace-nowrap">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
