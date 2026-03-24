import React from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/images/logo.png" alt="ColdAir" />
        </div>
        <nav className={styles.nav}>
          <a href="#services">Послуги</a>
          <a href="#contact">Зв'язатися</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;