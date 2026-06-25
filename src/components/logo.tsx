import Link from "next/link";

export const Logo = () => (
  <Link href="/" className="flex items-center gap-2">
    <span className="text-lg font-bold tracking-[-0.025em]" style={{ color: "#FE6E00" }}>
      DuiDui Center
    </span>
    <span className="hidden text-sm font-medium sm:inline" style={{ color: "rgba(255,255,255,0.60)" }}>
      Command Center
    </span>
  </Link>
);
