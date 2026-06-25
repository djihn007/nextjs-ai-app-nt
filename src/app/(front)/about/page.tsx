import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  RiComputerLine,
  RiTeamLine,
  RiLightbulbLine,
  RiAwardLine,
  RiUserStarLine,
  RiShieldCheckLine,
  RiArrowRightLine,
} from "@remixicon/react"

const stats = [
  { value: "500+", label: "หลักสูตรอบรม" },
  { value: "10,000+", label: "ผู้เรียน" },
  { value: "200+", label: "สินค้าไอที" },
  { value: "50+", label: "ผู้เชี่ยวชาญ" },
]

const values = [
  {
    icon: RiLightbulbLine,
    title: "นวัตกรรม",
    desc: "เราไม่หยุดพัฒนาเนื้อหาหลักสูตรและสินค้าให้ทันสมัย สอดคล้องกับเทรนด์เทคโนโลยีล่าสุด",
  },
  {
    icon: RiUserStarLine,
    title: "คุณภาพ",
    desc: "ทุกหลักสูตรผ่านการออกแบบโดยผู้เชี่ยวชาญ และสินค้าทุกชิ้นคัดสรรจากแบรนด์ชั้นนำ",
  },
  {
    icon: RiShieldCheckLine,
    title: "ความไว้วางใจ",
    desc: "ลูกค้ากว่า 10,000 รายไว้วางใจให้เราดูแลการพัฒนาทักษะด้านไอที",
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-[#E3E0DD] bg-[#F3F4F6] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.05em] text-[#423D38]">
            About Us
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-[-0.025em] text-[#423D38] sm:text-5xl">
            ยกระดับทักษะไอที
            <br />
            <span className="text-[#FE6E00]">เพื่ออนาคตของคุณ</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#797067] sm:text-lg">
            เราเป็นศูนย์รวมหลักสูตรอบรมและสินค้าไอทีครบวงจร
            มุ่งมั่นส่งมอบความรู้และเครื่องมือที่ดีที่สุด
            ให้คุณก้าวทันโลกเทคโนโลยีที่เปลี่ยนแปลงตลอดเวลา
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="border-t border-[#E3E0DD] py-16 sm:py-24">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold tracking-[-0.025em] text-[#423D38] sm:text-3xl">
              วิสัยทัศน์ของเรา
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#797067]">
              เรามุ่งมั่นเป็นแพลตฟอร์มอันดับหนึ่งด้านการเรียนรู้และจำหน่ายอุปกรณ์ไอทีในประเทศไทย
              สร้างบุคลากรคุณภาพสู่อุตสาหกรรมเทคโนโลยีผ่านหลักสูตรที่เข้มข้น
              และอุปกรณ์ที่ได้มาตรฐาน
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#797067]">
              เราเชื่อว่าทุกคนสามารถเข้าถึงความรู้ด้านไอทีได้
              ไม่ว่าจะเป็นผู้เริ่มต้นหรือมืออาชีพที่ต้องการอัปสกิล
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex flex-col items-center justify-center rounded-lg border border-[#E3E0DD] bg-white p-6 shadow-sm">
                <RiComputerLine className="h-8 w-8 text-[#FE6E00]" />
                <span className="mt-3 text-sm font-semibold text-[#423D38]">
                  หลักสูตรอบรม
                </span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border border-[#E3E0DD] bg-white p-6 shadow-sm">
                <RiAwardLine className="h-8 w-8 text-[#FE6E00]" />
                <span className="mt-3 text-sm font-semibold text-[#423D38]">
                  สินค้าไอที
                </span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border border-[#E3E0DD] bg-white p-6 shadow-sm">
                <RiTeamLine className="h-8 w-8 text-[#FE6E00]" />
                <span className="mt-3 text-sm font-semibold text-[#423D38]">
                  ที่ปรึกษา
                </span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border border-[#E3E0DD] bg-white p-6 shadow-sm">
                <RiShieldCheckLine className="h-8 w-8 text-[#FE6E00]" />
                <span className="mt-3 text-sm font-semibold text-[#423D38]">
                  รับประกัน
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-[#E3E0DD] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold tracking-[-0.025em] text-[#423D38] sm:text-3xl">
            ความสำเร็จของเรา
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-lg border border-[#E3E0DD] bg-white p-6 text-center shadow-sm"
              >
                <span className="text-2xl font-bold tracking-[-0.025em] text-[#FE6E00] sm:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-2 text-sm text-[#797067]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-[#E3E0DD] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold tracking-[-0.025em] text-[#423D38] sm:text-3xl">
            ทำไมต้องเลือกเรา
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[#797067]">
            เรายึดมั่นในคุณค่าที่ทำให้ลูกค้ามั่นใจในทุกการตัดสินใจ
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col items-center rounded-lg border border-[#E3E0DD] bg-white p-8 text-center shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF4EB]">
                  <Icon className="h-6 w-6 text-[#FE6E00]" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#423D38]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#797067]">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#E3E0DD] py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-[-0.025em] text-[#423D38] sm:text-3xl">
            พร้อมเริ่มต้นหรือยัง?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[#797067]">
            ค้นหาหลักสูตรที่ใช่หรือเลือกชมสินค้าไอทีคุณภาพดีได้แล้ววันนี้
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button
              className="h-10 rounded-md px-6 text-sm font-medium"
              style={{ backgroundColor: "#FE6E00" }}
              asChild
            >
              <Link href="/course">
                ดูหลักสูตรอบรม
                <RiArrowRightLine className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              className="h-10 rounded-md px-6 text-sm font-medium shadow-none"
              variant="outline"
              style={{ borderColor: "#D1D5DC", color: "#423D38" }}
              asChild
            >
              <Link href="/product">ชมสินค้า</Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator />
    </div>
  )
}
