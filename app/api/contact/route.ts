import { NextResponse } from "next/server";

type Body = {
  name?: string;
  phone?: string;
  message?: string;
};

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env vars");
    return NextResponse.json({ ok: false, message: "Telegram not configured" }, { status: 500 });
  }

  let body: Body;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  const message = (body.message || "").trim();

  if (!name || !phone) {
    return NextResponse.json({ ok: false, message: "Name and phone are required" }, { status: 400 });
  }

  const referer = request.headers.get("referer") || "";
  const userAgent = request.headers.get("user-agent") || "";

  const text = [
    "<b>🆕 Нова заявка з сайту</b>",
    `<b>Ім'я:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    message ? `<b>Повідомлення:</b> ${escapeHtml(message)}` : "",
    referer ? `<b>Сторінка:</b> ${escapeHtml(referer)}` : "",
    userAgent ? `<b>UA:</b> ${escapeHtml(shorten(userAgent, 200))}` : "",
    `<b>Час:</b> ${new Date().toLocaleString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      console.error("Telegram API error:", data);
      return NextResponse.json({ ok: false, message: "Failed to send to Telegram" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Send to Telegram failed:", err);
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 });
  }
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function shorten(s: string, n = 120) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}