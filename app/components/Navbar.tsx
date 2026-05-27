import Logo from "./Logo";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Tracker", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Spexbook", href: "#" },
  { label: "Changelog", href: "#" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-6 md:px-12 lg:px-[120px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <a href="#" aria-label="Home" className="shrink-0">
            <Logo />
          </a>
          <ul className="hidden md:flex items-center gap-6 font-medium text-[16px] leading-[22px] tracking-[0.24px] text-white">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="relative py-1 inline-block rounded-sm active:opacity-80 transition-opacity duration-100 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60 after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1.5px] after:bg-white after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease motion-reduce:after:transition-none hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <SecondaryButton size="sm">Log In</SecondaryButton>
          <PrimaryButton size="sm">Create Account</PrimaryButton>
        </div>
      </div>
    </nav>
  );
}
