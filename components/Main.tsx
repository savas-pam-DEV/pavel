import React from "react";
import styles from "./Main.module.css";
import ServiceCard from "./ServiceCard";
import RevealSection from "./RevealSection";

type Service = {
  title: string;
  description: string;
  price: string;
  imgSrc: string;
  imgAlt?: string;
};

const services: Service[] = [
  {
    title: "Монтаж кондиціонерів",
    description: "Підбір і установка кондиціонера будь-якого типу для дому та бізнесу, в Одесі.",
    price: "3200 грн",
    imgSrc: "/images/Montage.png",
    imgAlt: "Монтаж кондиціонера",
  },
  {
    title: "Предмонтаж / Прокладка фреонової магістралі",
    description: "Підготовка та прокладка трас для швидкого і якісного монтажу кондиціонерів, в Одесі.",
    price: "3000 грн",
    imgSrc: "/images/Premontage.png",
    imgAlt: "Фреонова магістраль",
  },
  {
    title: "Чистка / обслуговування кондиціонерів",
    description: "Обслуговування кондиціонерів для чистого повітря і тривалої роботи обладнання, в Одесі.",
    price: "1200 грн",
    imgSrc: "/images/Chistka.png",
    imgAlt: "Чистка кондиціонера",
  },
  {
    title: "Монтаж приточно-витяжних систем",
    description: "Надійна вентиляція для будь-якого приміщення, в Одесі.",
    price: "",
    imgSrc: "/images/Sistem.png",
    imgAlt: "Вентиляційні труби",
  },
];

const Main: React.FC = () => {
  return (
    <main id="services" className={styles.main}>
      <div className={styles.container}>
        {services.map((s, i) => (
          <RevealSection key={s.title} rootMargin="0px 0px -200px 0px" once={true}>
            <ServiceCard
              title={s.title}
              description={s.description}
              price={s.price}
              imgSrc={s.imgSrc}
              imgAlt={s.imgAlt}
              reverse={i % 2 === 1}
            />
          </RevealSection>
        ))}
      </div>
    </main>
  );
};

export default Main;