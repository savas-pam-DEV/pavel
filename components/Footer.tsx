import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <small>Номер телефону: +380995390595</small>
          <br />
          <small>Telegram / Viber: @ColdAirOd</small>
        </div>
        <div className={styles.center}>
          <small>Telegram: @coldair • Email: coldairod@gmail.com</small>
        </div>
        <div className={styles.right}>
          <small>by ColdAir</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;