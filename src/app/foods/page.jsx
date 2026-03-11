"use client";

import CategoriesFoods from "@/components/CategoriesFoods";
import FoodCards from "@/components/FoodCards";
import HeroSection from "@/components/HeroSection";
import Translation from "@/components/Translation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const getFoods = async (search = "") => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/feedback?search=${search}`,
  );
  const data = await res.json();
  return data || [];
};

const FoodsPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const [foods, setFoods] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedOffer, setSelectedOffer] = useState("");

  useEffect(() => {
    const loadFoods = async () => {
      const data = await getFoods(search || "");
      setFoods(data);
    };
    loadFoods();
  }, [search]);

  const sortOptions = [
    { en: "Relevance", bn: "প্রাসঙ্গিকতা" },
    { en: "Delivery Time", bn: "ডেলিভারি সময়" },
    { en: "Rating", bn: "রেটিং" },
    { en: "Price: Low to High", bn: "মূল্য: কম থেকে বেশি" },
    { en: "Price: High to Low", bn: "মূল্য: বেশি থেকে কম" },
  ];

  const offerOptions = [
    { en: "Discount", bn: "ছাড়" },
    { en: "Free Delivery", bn: "ফ্রি ডেলিভারি" },
    { en: "Buy 1 Get 1", bn: "এক কিনলে এক ফ্রি" },
    { en: "Cashback", bn: "ক্যাশব্যাক" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5 h-screen">
      {/* Sidebar */}
      <div className="col-span-8 md:col-span-3 bg-white shadow-lg rounded-2xl p-6 overflow-y-auto md:ml-0 ml-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-2xl">
            <Translation en="Filters" bn="ফিল্টার" />
          </h2>
          <button
            onClick={() => {
              setSelectedSort("");
              setSelectedOffer("");
            }}
            className="text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-xl cursor-pointer"
          >
            <Translation en="Clear All" bn="সব ক্লিয়ার করুন" />
          </button>
        </div>

        {/* Sort By */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-gray-700">
            <Translation en="Sort By" bn="সর্ট করুন" />
          </h4>
          <div className="space-y-3">
            {sortOptions.map((option) => (
              <div
                key={option.en}
                onClick={() => setSelectedSort(option.en)}
                className="flex items-center gap-3 cursor-pointer group hover:bg-gray-100 p-1 rounded-xl"
              >
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${
                    selectedSort === option.en
                      ? "bg-black border-black"
                      : "border-gray-400"
                  }`}
                >
                  {selectedSort === option.en && (
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  )}
                </div>
                <span>
                  <Translation en={option.en} bn={option.bn} />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Offers */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-700">
            <Translation en="Offers" bn="অফার" />
          </h4>
          <div className="space-y-3">
            {offerOptions.map((option) => (
              <div
                key={option.en}
                onClick={() => setSelectedOffer(option.en)}
                className="flex items-center gap-3 cursor-pointer group hover:bg-gray-100 p-1 rounded-xl"
              >
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${
                    selectedOffer === option.en
                      ? "bg-black border-black"
                      : "border-gray-400"
                  }`}
                >
                  {selectedOffer === option.en && (
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  )}
                </div>
                <span>
                  <Translation en={option.en} bn={option.bn} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product section */}
      <div className="col-span-9 overflow-y-auto px-6">
        <HeroSection />
        <CategoriesFoods />

        <h2 className="font-bold text-2xl mt-10 mb-5">
          <Translation
            en={`${foods.length} Restaurants Found`}
            bn={`${foods.length} রেস্টুরেন্ট পাওয়া গেছে`}
          />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-20">
          {foods.map((food) => (
            <FoodCards key={food._id} food={food} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodsPage;
