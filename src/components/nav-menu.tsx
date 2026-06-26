"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const links = [
  { href: "/", label: "หน้าแรก" },
  { href: "/course", label: "คอสเรียt" },
  { href: "/about", label: "เกี่ยวกับเtรา" },
  { href: "/product", label: "สินค้าt" },
  { href: "/contact", label: "ติดต่อเราt" },
];

export const NavMenu = ({ className, ...props }: ComponentProps<"nav">) => {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const isAdmin = session?.user?.role === "admin";

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
      {isAdmin && (
        <Link
          href="/dashboard"
          className={cn(
            "inline-flex items-center rounded-md px-3 py-1.5 text-[0.8125rem] font-bold leading-4 transition-all",
            pathname === "/dashboard"
              ? "bg-[#FE6E00] text-white"
              : "text-[rgba(255,255,255,0.70)] hover:bg-[rgba(255,255,255,0.10)] hover:text-white"
          )}
        >
          Dashboard
        </Link>
      )}
      {isAdmin && (
        <Link
          href="/dashboard/products"
          className={cn(
            "inline-flex items-center rounded-md px-3 py-1.5 text-[0.8125rem] font-bold leading-4 transition-all",
            pathname === "/dashboard/products"
              ? "bg-[#FE6E00] text-white"
              : "text-[rgba(255,255,255,0.70)] hover:bg-[rgba(255,255,255,0.10)] hover:text-white"
          )}
        >
          จัดการสินค้า
        </Link>
      )}
    </nav>
  );
};
