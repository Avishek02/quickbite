"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageProvider"; // ✅ Language context

// Category Card
const CategoryCard = ({ img, name, nameBn, onClick, active, lang }) => {
  return (
    <div
      onClick={onClick}
      className={`flex-shrink-0 w-40 flex flex-col items-center bg-white shadow-md rounded-lg p-4 cursor-pointer transition hover:shadow-xl ${
        active ? "border-2 border-orange-500" : ""
      }`}
    >
      <img
        src={img}
        alt={name}
        width={80}
        height={80}
        className="w-20 h-20 object-cover rounded-full mb-2"
      />
      <span className="text-sm font-medium text-gray-800 text-center">
        {lang === "bn" ? nameBn || name : name}
      </span>
    </div>
  );
};

// Food Card
const FoodCard = ({ food, lang }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/foods/${food.id}`)}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 p-3 cursor-pointer"
    >
      {/* Image */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={food.foodImg}
          alt={food.title || food.foodName}
          width={400}
          height={160}
          className="h-[160px] w-full object-cover hover:scale-110 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-gray-800 text-lg">
          {lang === "bn" ? food.titleBn : food.title}
        </h3>
        <p className="text-sm text-gray-600">
          {lang === "bn" ? food.categoryBn : food.category}
        </p>
        <p className="text-orange-500 font-bold text-lg mt-2">
          {lang === "bn" ? `৳ ${food.priceBn}` : `Tk ${food.price}`}
        </p>
        <p className="text-gray-500 text-sm line-clamp-2">
          {lang === "bn" ? food.descriptionBn : food.description}
        </p>
      </div>
    </div>
  );
};

// Main Component
const CategoriesFoods = () => {
  const { language } = useLanguage(); // ✅ get current language
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const scrollRef = useRef(null);

  // Load Categories
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data || []))
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  // Load Foods
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/feedback`)
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error("Failed to load foods:", err));
  }, []);

  const filteredFoods = selectedCategory
    ? foods.filter(
        (food) =>
          food.category === selectedCategory ||
          food.categoryName === selectedCategory,
      )
    : foods;

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 900,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -900,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-10 relative">
      {/* Categories Section */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {language === "bn"
          ? `${categories.length} টি খাবারের বিভাগ`
          : `${categories.length} Food Categories`}
      </h2>

      <button
        onClick={scrollLeft}
        className="absolute left-0 top-20 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            img={cat.categoryImg}
            name={cat.categoryName}
            nameBn={cat.categoryBn}
            active={selectedCategory === cat.categoryName}
            onClick={() => setSelectedCategory(cat.categoryName)}
            lang={language}
          />
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-20 bg-white shadow-md p-2 rounded-full z-10 hover:bg-gray-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Foods Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">
          {selectedCategory
            ? language === "bn"
              ? `${selectedCategory} এর খাবার`
              : `${selectedCategory} Foods`
            : language === "bn"
              ? "সকল খাবার"
              : "All Foods"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} lang={language} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesFoods;
