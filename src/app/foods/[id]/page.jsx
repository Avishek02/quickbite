"use client";

import React, { useEffect, useState, useRef } from "react";
import RestaurantHero from "@/components/restaurant/RestaurantHero";
import { useParams } from "next/navigation";
import FoodsModal from "@/models/FoodsModal";
import CartSideBar from "@/components/CartSideBar";
import Translation from "@/components/Translation"; // Translation added

const getFoods = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/feedback`);
  const data = await res.json();
  return data || [];
};

const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
  const data = await res.json();
  return data || [];
};

// Category Card Component
const CategoryCard = ({ name, count, onClick, active }) => (
  <div
    onClick={onClick}
    className={`flex-shrink-0 w-36 sm:w-40 h-20 flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 cursor-pointer transition hover:shadow-xl ${
      active ? "border-2 border-orange-500" : ""
    }`}
  >
    <span className="text-sm font-medium text-gray-800 text-center truncate">
      <Translation en={`${name} (${count})`} bn={`${name} (${count})`} />
    </span>
  </div>
);

// Food Card Component
const FoodCard = ({ food, onClick }) => (
  <div
    className="flex bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden border border-gray-100 cursor-pointer transition duration-300 flex-col md:flex-row-reverse"
    onClick={onClick}
  >
    <div className="w-32 h-32 md:w-36 md:h-36 flex-shrink-0 overflow-hidden rounded-r-lg">
      <img
        src={food.foodImg}
        alt={food.title || food.foodName || "Food Item"}
        width={150}
        height={150}
        className="w-full h-full object-cover hover:scale-110 transition duration-500"
      />
    </div>
    <div className="flex-1 p-4 flex flex-col justify-between">
      <div>
        <p className="text-gray-600 text-sm font-bold line-clamp-2">
          <Translation en={food.title} bn={food.titleBn || food.title} />
        </p>
        <p className="mt-2 text-orange-500 font-bold text-lg">
          <Translation en={`Tk ${food.price}`} bn={`৳ ${food.priceBn}`} />
        </p>
        <p className="text-gray-600 text-sm line-clamp-2">
          <Translation
            en={
              food.description ||
              "Delicious, freshly prepared food made with premium ingredients."
            }
            bn={
              food.descriptionBn ||
              "সুস্বাদু, সতেজভাবে তৈরি খাবার, প্রিমিয়াম উপকরণ দিয়ে।"
            }
          />
        </p>
      </div>
    </div>
  </div>
);

const ProductPage = () => {
  const params = useParams();
  const { id } = params || {};

  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [mainFood, setMainFood] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fds = await getFoods();
        setFoods(fds);

        if (fds.length > 0) {
          const currentItem = fds.find((f) => f.id.toString() === id);
          setMainFood(currentItem || fds[0]);
        }

        const cats = await getCategories();
        setCategories(cats);
      } catch (err) {
        console.error("Failed to fetch page data", err);
      }
    };
    fetchData();
  }, [id]);

  const filteredFoods = selectedCategory
    ? foods.filter(
        (f) =>
          f.category === selectedCategory ||
          f.categoryName === selectedCategory,
      )
    : foods;

  const categoryCounts = categories.reduce((acc, cat) => {
    const name = cat.categoryName || cat.name;
    acc[name] = foods.filter(
      (f) => f.category === name || f.categoryName === name,
    ).length;
    return acc;
  }, {});

  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 900, behavior: "smooth" });
  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -900, behavior: "smooth" });

  return (
    <div className="pb-20 px-2 sm:px-4">
      <div className="bg-[#FCFCFC] pt-4">
        {mainFood && (
          <RestaurantHero
            foodImg={mainFood.foodImg}
            title={
              <Translation
                en={mainFood.title}
                bn={mainFood.titleBn || mainFood.title}
              />
            }
          />
        )}
      </div>

      <div className="py-5 relative max-w-[1380px] mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          <Translation
            en={`${categories.length} Food Categories Found`}
            bn={`${categories.length} খাবারের বিভাগ পাওয়া গেছে`}
          />
        </h2>

        <button
          onClick={scrollLeft}
          className="absolute left-0 top-20 bg-white shadow-md p-2 rounded-full z-10 hidden sm:flex"
        >
          {"<"}
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth scrollbar-hide mb-10"
        >
          {categories.map((cat, index) => {
            const name = cat.categoryName || cat.name;
            return (
              <CategoryCard
                key={cat.id || index}
                name={name}
                count={categoryCounts[name] || 0}
                active={selectedCategory === name}
                onClick={() => setSelectedCategory(name)}
              />
            );
          })}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-20 bg-white shadow-md p-2 rounded-full z-10 hidden sm:flex"
        >
          {">"}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredFoods.map((food) => (
                <FoodCard
                  key={food.id || food._id}
                  food={food}
                  onClick={() => {
                    setSelectedFood(food);
                    setQuantity(1);
                  }}
                />
              ))}
            </div>
          </div>
          <div className="md:col-span-3">
            <CartSideBar />
          </div>
        </div>
      </div>

      {selectedFood && (
        <FoodsModal
          food={selectedFood}
          quantity={quantity}
          setQuantity={setQuantity}
          onClose={() => setSelectedFood(null)}
        />
      )}
    </div>
  );
};

export default ProductPage;
