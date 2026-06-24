"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/course", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/product", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export const NavMenu = ({ className, ...props }: ComponentProps<"nav">) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {links.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "inline-flex items-center rounded-md px-3 py-1.5 text-[0.8125rem] font-bold leading-4 transition-all",
              isActive
                ? "bg-[#FE6E00] text-white"
                : "text-[rgba(255,255,255,0.70)] hover:bg-[rgba(255,255,255,0.10)] hover:text-white"
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};
