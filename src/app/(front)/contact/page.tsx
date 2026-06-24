import type { Metadata } from "next"
import { Mail, Phone, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import ContactForm from "./contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with our team",
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-(--breakpoint-2xl) px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-2xl font-bold tracking-[-0.025em] text-[#423D38]">
          Contact
        </h1>
        <p className="mt-3 text-[#797067]">
          Have a question? Send us a message.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 md:gap-12">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-[#797067] shrink-0" />
            <span className="text-[#797067] text-sm">
              contact@example.com
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-[#797067] shrink-0" />
            <span className="text-[#797067] text-sm">02-123-4567</span>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-[#797067] shrink-0" />
            <span className="text-[#797067] text-sm">
              Mon - Fri 9:00 - 18:00
            </span>
          </div>

          <Separator />

          <p className="text-[#797067] leading-relaxed text-sm">
            Our team is ready to assist you. Whether you have questions about
            products, courses, or need technical support, fill out the form and
            we&apos;ll get back to you promptly.
          </p>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </main>
  )
}
