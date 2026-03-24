"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./RevealSection.module.css";

type Props = {
  children: React.ReactNode;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
  className?: string;
};

const RevealSection: React.FC<Props> = ({
  children,
  rootMargin = "0px 0px -120px 0px",
  threshold = 0.12,
  once = true,
  className,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (visible && once) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once && el) obs.unobserve(el);
          } else {
            if (!once) setVisible(false);
          }
        });
      },
      { root: null, rootMargin, threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, threshold, once, visible]);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.visible : ""} ${className ?? ""}`}
    >
      {children}
    </div>
  );
};

export default RevealSection;