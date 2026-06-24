import { Suspense } from "react"
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { ShoppingBasket } from "lucide-react";
import CountCartItem from "@/app/(front)/components/CountCartItem";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LogoutButton from "./logout-button";

async function AuthSection() {
  let session = null;

  try {
    session = await auth.api.getSession({
      headers: await headers()
    });
  } catch {
    // auth not available (e.g. database not running) — render without session
  }

  return (
    <div className="flex items-center gap-3">
      {!session && (
        <>
          <Button asChild className="hidden sm:inline-flex" variant="ghost-shell">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="primary-warm">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </>
      )}

      {session && (
        <>
          <div className="mr-4 font-medium text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
            {session.user.name}
          </div>
          <div>
            <LogoutButton />
          </div>
        </>
      )}
    </div>
  );
}

const Navbar = () => {
  return (
    <nav
      className="sticky top-0 z-50 h-16 border-b shell-glass"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.70)',
        backdropFilter: 'blur(12px)',
        borderBottomColor: 'rgba(255, 255, 255, 0.10)',
      }}
    >
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 sm:px-8">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:flex" />

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Badge
              className="cursor-pointer px-3 py-1.5 text-xs font-semibold tracking-[0.05em]"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.10)',
                color: 'rgba(255, 255, 255, 0.85)',
                border: 'none',
              }}
            >
              <ShoppingBasket className="size-3.5" /> <CountCartItem /> items
            </Badge>
          </Link>

          <Suspense fallback={null}>
            <AuthSection />
          </Suspense>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
