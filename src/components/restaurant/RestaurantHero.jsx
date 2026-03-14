"use client";

import React from "react";
import { Star, Info, Bike, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Translation from "@/components/Translation";

const RestaurantHero = ({ foodImg, titleBn, title, id }) => {
  return (
    <div className="max-w-[1380px] mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 py-4 flex items-center gap-2 pb-4">
        <span className="text-secondary font-medium hover:text-primary cursor-pointer underline underline-offset-4">
          <Translation en="Dhaka" bn="ঢাকা" />
        </span>

        <span>&gt;</span>

        <span className="text-secondary font-medium hover:text-primary cursor-pointer underline underline-offset-4">
          <Translation en="Restaurant List" bn="রেস্টুরেন্ট তালিকা" />
        </span>

        <span>&gt;</span>
        <span className="text-secondary font-medium">
          <Translation en={title} bn={titleBn} />
        </span>
      </nav>

      <div className="flex flex-col md:flex-row gap-6 items-start pb-7 mt-2 border-gray-100 pb-4 max-w-[1380px] mx-auto">
        {/* Image */}
        <div className="w-full md:w-40 h-40 rounded-2xl overflow-hidden border border-gray-100 shrink-0">
          <img
            src={foodImg || "https://via.placeholder.com/160"}
            alt={titleBn || title || "Restaurant Logo"}
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 w-full">
          <p className="text-xs text-gray-500 mb-1">
            <Translation
              en="Asian • Indian • Rice Dishes • Biryani"
              bn="এশিয়ান • ইন্ডিয়ান • ভাতের পদ • বিরিয়ানি"
            />
          </p>

          <div className="flex justify-between items-start gap-4 mt-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-secondary">
              <Translation en={title} bn={titleBn} />
            </h1>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <Link
              href="/delivery"
              className="flex items-center gap-1 bg-red-50 text-error px-2 py-1 rounded-md text-sm font-bold"
            >
              <ShoppingBag size={14} />
              <Translation en="Super Restaurant" bn="সুপার রেস্টুরেন্ট" />
            </Link>

            <div className="flex items-center gap-1 text-sm font-medium">
              <Bike size={18} className="text-primary" />

              <span className="text-primary">
                <Translation
                  en="Free delivery for first order"
                  bn="প্রথম অর্ডারে ফ্রি ডেলিভারি"
                />
              </span>

              <span className="text-gray-400 line-through ml-1">
                <Translation en="Tk 40" bn="৳৪০" />
              </span>
            </div>

            <div className="text-sm text-secondary font-medium">
              • <Translation en="Min. order Tk 50" bn="সর্বনিম্ন অর্ডার ৳৫০" />
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between gap-6 mt-4 pt-4 w-full">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
                <Star size={18} className="text-primary fill-primary" />
                <span className="font-bold text-secondary">4.1/5</span>

                <span className="text-gray-400 text-sm">
                  <Translation
                    en="(1000+) See reviews"
                    bn="(১০০০+) রিভিউ দেখুন"
                  />
                </span>
              </div>

              {id ? (
                <Link
                  href={`/items/${id}`}
                  className="flex items-center gap-2 cursor-pointer hover:opacity-80 text-secondary font-bold hover:text-orange-500 transition-colors"
                >
                  <Info size={18} className="text-primary" />

                  <span>
                    <Translation
                      en="More info (Customize)"
                      bn="আরও তথ্য (কাস্টমাইজ)"
                    />
                  </span>
                </Link>
              ) : (
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 text-secondary font-bold">
                  <Info size={18} className="text-primary" />

                  <span>
                    <Translation en="More info" bn="আরও তথ্য" />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      {/* Deals */}
      <h2 className="font-bold text-2xl">
        <Translation en="Available deals" bn="উপলব্ধ অফার" />
      </h2>

      <div className="flex flex-col md:flex-row gap-4 md:w-[700px] mt-5 mb-10">
        {/* Card 1 */}
        <div className="flex-1 bg-gray-800 text-white rounded-xl p-6 flex items-center gap-4 shadow-md hover:shadow-xl transition">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">
              <Translation en="App-only deals" bn="শুধু অ্যাপ অফার" />
            </h3>

            <p className="text-gray-300 text-sm">
              <Translation
                en="Download the app to unlock more discounts"
                bn="আরও ডিসকাউন্ট পেতে অ্যাপ ডাউনলোড করুন"
              />
            </p>
          </div>

          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center opacity-40">
            +
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex-1 bg-pink-100 text-pink-700 rounded-xl p-6 flex items-center gap-4 shadow-md hover:shadow-xl transition">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">
              <Translation en="15% off" bn="১৫% ছাড়" />
            </h3>

            <p className="text-pink-600 text-sm">
              <Translation
                en="Min. order Tk 50. Valid for all items. Auto applied."
                bn="সর্বনিম্ন অর্ডার ৳৫০। সব আইটেমে প্রযোজ্য। স্বয়ংক্রিয়ভাবে প্রয়োগ হবে।"
              />
            </p>
          </div>

          <div className="h-10 bg-pink-200 rounded-full flex items-center justify-center opacity-40">
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHero;
