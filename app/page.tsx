import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Main from "../components/Main";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import RevealSection from "../components/RevealSection";

export default function Page() {
  return (
    <>
      <Head>
        <title>Cold Air — Кондиціювання</title>
        <meta name="description" content="Монтаж та обслуговування кондиціонерів" />
      </Head>
      <Header />
      <Hero />
      <Main />
      <RevealSection rootMargin="0px 0px -120px 0px" once={true}>
        <ContactForm />
      </RevealSection>
      <RevealSection rootMargin="0px 0px -80px 0px" once={true}>
        <Footer />
      </RevealSection>
    </>
  );
}