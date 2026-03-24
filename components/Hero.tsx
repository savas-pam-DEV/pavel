"use client";
import React, { useState } from "react";
import styles from "./Hero.module.css";
import ContactModal from "./ContactModal";

const Hero: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.inner}>
          <h1 className={styles.title}>
            Cold Air <span className={styles.icon}>❄️</span>
          </h1>
          <p className={styles.subtitle}>Кондиціювання та вентиляція під ключ</p>
          <div className={styles.actions}>
            <button className={styles.btnPrimary} onClick={() => setOpen(true)}>
              Зв'язатися
            </button>
            <a className={styles.btnSecondary} href="#services">
              Консультація
            </a>
          </div>
        </div>
      </section>

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Hero;