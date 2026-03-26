"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ContactModal.module.css";
import Footer from "./Footer";

/**
 * Вставьте сюда реальные данные:
 * TELEGRAM: без @ (например coldair)
 * PHONE: в формате +380XXXXXXXXX
 * EMAIL: адрес почты
 */
const TELEGRAM_USERNAME = "ColdAirOd"; // <- замените на ваш username без @
const PHONE_NUMBER = "+380995390595"; // <- замените на реальный номер с +380...
const EMAIL_ADDRESS = "coldairod@gmail.com"; // <- замените на реальный email

const CONTACTS = [
  { id: "phone", label: "Номер телефону", value: PHONE_NUMBER, type: "phone" },
  { id: "viber", label: "Viber / Telegram", value: TELEGRAM_USERNAME, type: "telegram" },
  { id: "email", label: "Email", value: EMAIL_ADDRESS, type: "email" },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

const ContactModal: React.FC<Props> = ({ open, onClose }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        const focusable = dialogRef.current?.querySelector<HTMLElement>(
          'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      }, 0);
    } else {
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusables = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied((cur) => (cur === id ? null : cur)), 1800);
    } catch {
      setCopied(id);
      setTimeout(() => setCopied((cur) => (cur === id ? null : cur)), 1800);
    }
  };

  const openTelegram = (username: string) => {
    // Попробуем открыть tg protocol, иначе откроем web t.me
    const tgLink = `tg://resolve?domain=${username}`;
    const webLink = `https://t.me/${username}`;
    // Попробуем открыть протокол — если не сработает, откроем web fallback
    try {
      window.location.href = tgLink;
      // иногда протокол может не сработать — в таком случае можно fallback
      setTimeout(() => window.open(webLink, "_blank", "noopener,noreferrer"), 700);
    } catch {
      window.open(webLink, "_blank", "noopener,noreferrer");
    }
  };

  const callPhone = (phone: string) => {
    // Используем tel: ссылку — откроется на мобильных устройствах
    window.location.href = `tel:${phone}`;
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onMouseDown={handleOverlayClick}
      aria-hidden={!open}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Контакти ColdAir"
        ref={dialogRef}
      >
        <header className={styles.header}>
          <h2>Зв'яжіться з нами</h2>
          <button className={styles.close} onClick={onClose} aria-label="Закрити модальне вікно">
            ×
          </button>
        </header>

        <div className={styles.body}>
          <p className={styles.lead}>Тут ви можете швидко зателефонувати або перейти в Telegram до нас.</p>

          <ul className={styles.list}>
            {CONTACTS.map((c) => (
              <li key={c.id} className={styles.item}>
                <div className={styles.info}>
                  <div className={styles.label}>{c.label}</div>
                  <div className={styles.value}>
                    {c.type === "telegram" ? `@${c.value}` : c.value}
                  </div>
                </div>

                <div className={styles.actions}>
                  {c.type === "telegram" && (
                    <button
                      onClick={() => openTelegram(c.value)}
                      className={`${styles.actionBtn} ${styles.tgBtn}`}
                      aria-label={`Перейти в Telegram ${c.value}`}
                    >
                      Перейти
                    </button>
                  )}

                  {c.type === "phone" && (
                    <button
                      onClick={() => callPhone(c.value)}
                      className={`${styles.actionBtn} ${styles.callBtn}`}
                      aria-label={`Позвонити ${c.value}`}
                    >
                      Позвонити
                    </button>
                  )}

                  {c.type === "email" && (
                    <>
                      <button
                        onClick={() => handleCopy(c.value, c.id)}
                        className={`${styles.actionBtn} ${styles.copyBtn}`}
                        aria-label={`Скопіювати ${c.label}`}
                      >
                        Копіювати
                      </button>
                      {copied === c.id && <span className={styles.copied}>Скопійовано!</span>}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.hr} />

          <div className={styles.footerPreview}>
            <h3>Міні-футер</h3>
            <p className={styles.footerText}>
              Номер телефону: {PHONE_NUMBER} • Telegram: @{TELEGRAM_USERNAME} • Email: {EMAIL_ADDRESS}
            </p>

            <div className={styles.fullFooter}>
              <Footer />
            </div>
          </div>
        </div>

        <footer className={styles.actionsRow}>
          <button className={styles.btnPrimary} onClick={onClose}>
            Закрити
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ContactModal;