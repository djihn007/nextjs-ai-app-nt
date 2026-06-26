import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6">
      <div className="relative z-10 max-w-3xl text-center">
        <Badge
          className="rounded-full border-[#E3E0DD] bg-[#F3F4F6] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.05em] text-[#423D38]"
          variant="outline"
        >
          System Operational v1.0.0
        </Badge>

        <h1 className="mx-auto mt-8 max-w-2xl text-[4.5rem] font-semibold leading-none tracking-[-0.025em] text-[#423D38] sm:text-[5rem] md:text-[6rem]">
          Welcome to DuiDui Center
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#797067] sm:text-xl">
          Threat intelligence, asset monitoring, and security operations — unified in a single command interface.
        </p>

        <div className="mt-10 flex items-center justify-center gap-3">
          <Button className="h-10 rounded-md px-6 text-sm font-medium" style={{ backgroundColor: '#FE6E00' }}>
            Launch Console
          </Button>
          <Button
            className="h-10 rounded-md px-6 text-sm font-medium shadow-none"
            variant="outline"
            style={{ borderColor: '#D1D5DC', color: '#423D38' }}
            asChild
          >
            <Link href="/about">System Overview</Link>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 border-t border-[#E3E0DD] pt-10">
          {[
            { value: "99.97%", label: "UPTIME" },
            { value: "2.4M", label: "EVENTS / DAY" },
            { value: "847", label: "ACTIVE AGENTS" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold tracking-[-0.025em] text-[#423D38]">
                {value}
              </div>
              <div className="mt-1 text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-[#797067]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
