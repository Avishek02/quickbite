"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import fdpImg from "../../public/fdp.jpg";
import { useLanguage } from "@/contexts/LanguageProvider";

const HeroSection = () => {
  const { language } = useLanguage();

  const texts = {
    en: {
      heading: "Free delivery on your first order",
      description:
        "Fast, reliable, and smart food delivery platform connecting you with your favorite local restaurants.",
      button: "Explore Delivery",
    },
    bn: {
      heading: "আপনার প্রথম অর্ডারে ফ্রি ডেলিভারি",
      description:
        "দ্রুত, নির্ভরযোগ্য এবং স্মার্ট ফুড ডেলিভারি প্ল্যাটফর্ম যা আপনাকে আপনার প্রিয় লোকাল রেস্টুরেন্টের সাথে সংযুক্ত করে।",
      button: "ডেলিভারি দেখুন",
    },
  };

  return (
    <section className="bg-orange-100 py-5 px-6 rounded-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-3xl font-bold mb-6 text-gray-900">
            {texts[language].heading}
          </h1>

          <p className="text-gray-700 mb-8 text-lg">
            {texts[language].description}
          </p>

          <Link
            href="/"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition cursor-pointer"
          >
            {texts[language].button}
          </Link>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src={fdpImg}
            alt="Delicious Food"
            className="rounded-xl shadow-lg"
            width={500}
            height={500}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
