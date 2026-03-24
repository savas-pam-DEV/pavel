"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ContactModal.module.css";
import Footer from "./Footer";

const CONTACTS = [
  { id: "phone", label: "Номер телефону", value: "+380995390595" },
  { id: "viber", label: "Viber / Telegram", value: "@ColdAirOd" },
  { id: "email", label: "Email", value: "coldairod@gmail.com" },
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
          <p className={styles.lead}>Тут ви можете швидко скопіювати контактні дані компанії.</p>

          <ul className={styles.list}>
            {CONTACTS.map((c) => (
              <li key={c.id} className={styles.item}>
                <div className={styles.info}>
                  <div className={styles.label}>{c.label}</div>
                  <div className={styles.value}>{c.value}</div>
                </div>
                <div className={styles.actions}>
                  <button
                    onClick={() => handleCopy(c.value, c.id)}
                    className={styles.copyBtn}
                    aria-label={`Скопіювати ${c.label}`}
                  >
                    Копіювати
                  </button>
                  {copied === c.id && <span className={styles.copied}>Скопійовано!</span>}
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.hr} />

          <div className={styles.footerPreview}>
            <h3>Міні-футер</h3>
            <p className={styles.footerText}>
              Номер телефону: {CONTACTS[0].value} • Telegram / Viber: {CONTACTS[1].value} • Email:{" "}
              {CONTACTS[2].value}
            </p>
            {}
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