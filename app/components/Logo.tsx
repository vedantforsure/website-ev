type LogoProps = {
  className?: string;
  size?: number;
};

export default function Logo({ className = "", size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Logo"
    >
      <path
        d="M14 21L16 16H12L14 11M7 27V7C7 6.46957 7.21071 5.96086 7.58579 5.58579C7.96086 5.21071 8.46957 5 9 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V27M4 27H24M21 14H24C24.5304 14 25.0391 14.2107 25.4142 14.5858C25.7893 14.9609 26 15.4696 26 16V21C26 21.5304 26.2107 22.0391 26.5858 22.4142C26.9609 22.7893 27.4696 23 28 23C28.5304 23 29.0391 22.7893 29.4142 22.4142C29.7893 22.0391 30 21.5304 30 21V10.8287C30 10.5659 29.9483 10.3057 29.8477 10.0629C29.7471 9.82011 29.5996 9.59952 29.4137 9.41375L27 7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
