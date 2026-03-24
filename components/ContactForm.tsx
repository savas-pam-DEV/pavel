"use client";
import React, { useState } from "react";
import styles from "./ContactForm.module.css";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<null | "idle" | "loading" | "ok" | "err">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("ok");
        setName("");
        setPhone("");
        setMessage("");
      } else {
        console.error("Server error:", data);
        setStatus("err");
      }
    } catch (err) {
      console.error("Network error:", err);
      setStatus("err");
    }
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.title}>Зв'яжіться з нами</h2>
        <p className={styles.subtitle}>Viber, Telegram, або телефон</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.input} placeholder="Ім'я" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className={styles.input} placeholder="+380XXXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <textarea className={styles.input} placeholder="Повідомлення (опціонально)" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} />
          <button className={styles.submit} type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Відправка..." : "Надіслати"}
          </button>

          {status === "ok" && <p className={styles.sent}>Дякуємо! Ми вже отримали заявку.</p>}
          {status === "err" && <p className={styles.sent} style={{ color: "crimson" }}>Помилка при відправці. Спробуйте пізніше.</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;