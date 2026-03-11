"use client";

import React from "react";
import { Star, Info, Bike, ShoppingBag } from "lucide-react";
import Link from "next/link";
<<<<<<< HEAD
import { useLanguage } from "@/contexts/LanguageProvider";
// import Image from "next/image";

const RestaurantHero = ({ foodImg, title }) => {
  const { language } = useLanguage();

=======

const RestaurantHero = ({ foodImg, title, id }) => {
>>>>>>> origin/feature/team-integration
  return (
    <div className="max-w-[1380px] mx-auto">
      <nav className="text-sm text-gray-500 py-4 flex items-center gap-2 pb-4 ">
        <span className="text-secondary font-medium hover:text-primary cursor-pointer underline underline-offset-4">
          {language === "bn" ? "ঢাকা" : "Dhaka"}
        </span>
        <span>&gt;</span>
        <span className="text-secondary font-medium hover:text-primary cursor-pointer underline underline-offset-4">
          {language === "bn" ? "রেস্টুরেন্ট তালিকা" : "Restaurant List"}
        </span>
        <span>&gt;</span>
        <span className="text-secondary font-medium">{title}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-6 items-start pb-7 mt-2  border-gray-100 pb-4 max-w-[1380px] mx-auto">
        <div className="w-full md:w-40 h-40 rounded-2xl overflow-hidden border border-gray-100 shrink-0">
          <img
            src={foodImg || "https://via.placeholder.com/160"}
            alt={title || "Restaurant Logo"}
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 w-full">
          <p className="text-xs text-gray-500 mb-1">
            {language === "bn"
              ? "এশিয়ান • ইন্ডিয়ান • ভাতের পদ • বিরিয়ানি"
              : "Asian • Indian • Rice Dishes • Biryani"}
          </p>

          <div className="flex justify-between items-start gap-4 mt-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-secondary">
              {title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-3">
            <Link
              href="/delivery"
              className="flex items-center gap-1 bg-red-50 text-error px-2 py-1 rounded-md text-sm font-bold"
            >
              <ShoppingBag size={14} />
              {language === "bn" ? "সুপার রেস্টুরেন্ট" : "Super Restaurant"}
            </Link>

            <div className="flex items-center gap-1 text-sm font-medium">
              <Bike size={18} className="text-primary" />
              <span className="text-primary">
                {language === "bn"
                  ? "প্রথম অর্ডারে ফ্রি ডেলিভারি"
                  : "Free delivery for first order"}
              </span>
              <span className="text-gray-400 line-through ml-1">
                {language === "bn" ? "৳৪০" : "Tk 40"}
              </span>
            </div>

            <div className="text-sm text-secondary font-medium">
              •{" "}
              {language === "bn" ? "সর্বনিম্ন অর্ডার ৳৫০" : "Min. order Tk 50"}
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 mt-4 pt-4 w-full">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
                <Star size={18} className="text-primary fill-primary" />
                <span className="font-bold text-secondary">4.1/5</span>
                <span className="text-gray-400 text-sm">
                  {language === "bn"
                    ? "(১০০০+) রিভিউ দেখুন"
                    : "(1000+) See reviews"}
                </span>
              </div>

<<<<<<< HEAD
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 text-secondary font-bold">
                <Info size={18} className="text-primary" />
                <span>{language === "bn" ? "আরও তথ্য" : "More info"}</span>
              </div>
=======
              {id ? (
                <Link href={`/items/${id}`} className="flex items-center gap-2 cursor-pointer hover:opacity-80 text-secondary font-bold hover:text-orange-500 transition-colors">
                  <Info size={18} className="text-primary" />
                  <span>More info (Customize)</span>
                </Link>
              ) : (
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 text-secondary font-bold">
                  <Info size={18} className="text-primary" />
                  <span>More info</span>
                </div>
              )}
>>>>>>> origin/feature/team-integration
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 my-4 "></div>

<<<<<<< HEAD
      <h2 className="font-bold text-2xl">
        {language === "bn" ? "উপলব্ধ অফার" : "Available deals"}
      </h2>

=======
      <h2 className="font-bold text-2xl">Available deals</h2>
>>>>>>> origin/feature/team-integration
      <div className="flex flex-col md:flex-row gap-4 md:w-[700px] mt-5 mb-10">
        {/* Card 1 */}
        <div className="flex-1 bg-gray-800 text-white rounded-xl p-6 flex items-center gap-4 shadow-md hover:shadow-xl transition">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">
              {language === "bn" ? "শুধু অ্যাপ অফার" : "App-only deals"}
            </h3>
            <p className="text-gray-300 text-sm">
              {language === "bn"
                ? "আরও ডিসকাউন্ট পেতে অ্যাপ ডাউনলোড করুন"
                : "Download the app to unlock more discounts"}
            </p>
          </div>
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center opacity-40">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m4-4H8" />
            </svg>
          </div>
        </div>

<<<<<<< HEAD
        {/* Card 2 */}
=======
>>>>>>> origin/feature/team-integration
        <div className="flex-1 bg-pink-100 text-pink-700 rounded-xl p-6 flex items-center gap-4 shadow-md hover:shadow-xl transition">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">
              {language === "bn" ? "১৫% ছাড়" : "15% off"}
            </h3>
            <p className="text-pink-600 text-sm">
              {language === "bn"
                ? "সর্বনিম্ন অর্ডার ৳৫০। সব আইটেমে প্রযোজ্য। স্বয়ংক্রিয়ভাবে প্রয়োগ হবে।"
                : "Min. order Tk 50. Valid for all items. Auto applied."}
            </p>
          </div>
          <div className=" h-10 bg-pink-200 rounded-full flex items-center justify-center opacity-40">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m4-4H8" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHero;