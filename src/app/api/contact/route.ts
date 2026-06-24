import { NextResponse } from "next/server"
import { contactSchema } from "@/lib/validations/contact"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "ข้อมูลไม่ถูกต้อง" },
        { status: 400 }
      )
    }

    const { name, email, message } = result.data

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `ข้อความติดต่อจาก ${name}`,
      html: `
        <h2>ข้อความติดต่อจากเว็บไซต์</h2>
        <p><strong>ชื่อ:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>ข้อความ:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    return NextResponse.json({ success: true, data: null })
  } catch {
    return NextResponse.json(
      { success: false, error: "เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง" },
      { status: 500 }
    )
  }
}
