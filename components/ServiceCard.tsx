import React from "react";
import styles from "./ServiceCard.module.css";

type Props = {
  title: string;
  description: string;
  price?: string;
  imgSrc?: string;
  imgAlt?: string;
  reverse?: boolean;
};

const ServiceCard: React.FC<Props> = ({ title, description, price, imgSrc, imgAlt, reverse }) => {
  return (
    <article className={`${styles.card} ${reverse ? styles.reverse : ""}`}>
      {imgSrc && (
        <div className={styles.imageWrap}>
          <img src={imgSrc} alt={imgAlt ?? title} className={styles.image} />
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>
        <div className={styles.footer}>
          {price && <span className={styles.price}>Від {price}</span>}
          <a className={styles.cta} href="#contact">Замовити консультацію</a>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;