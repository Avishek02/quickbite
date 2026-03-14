"use client";

import Translation from "@/components/Translation";
import { useCart } from "@/contexts/CartContext";
import React from "react";

const AddToCardModal = ({ food, quantity, setQuantity, onClose }) => {
  const price = food?.price || 0;
  const priceBn = food?.priceBn || 0;
  const { addToCart } = useCart();

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({
      cartItemId: Date.now(),
      itemId: food._id || food.id,
      title: food.title || food.foodName,
      titleBn: food.titleBn || food.foodNameBn,
      image: food.foodImg || food.image,
      price: food.price,
      quantity,
      totalPrice: food.price * quantity,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-800 bg-white/80 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-xl font-bold z-20 shadow-sm"
        >
          ✕
        </button>

        {/* IMAGE */}
        <div className="relative shrink-0">
          <img
            src={
              food?.foodImg ||
              food?.image ||
              "https://images.unsplash.com/photo-1604908554165-2e0c15e36d1a"
            }
            alt={food?.title || food?.foodName || "Food Item"}
            className="object-cover w-full h-48 md:h-64"
          />
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <h2 className="text-2xl font-extrabold text-gray-900">
            <Translation
              en={food?.title || food?.foodName || "Food Item"}
              bn={food?.titleBn || food?.foodNameBn || "খাবারের আইটেম"}
            />
          </h2>

          <p className="text-xl font-bold text-orange-500">
            <Translation en={`Tk ${price}`} bn={`${priceBn}`} />
          </p>

          <p className="text-gray-600 text-sm leading-relaxed">
            <Translation
              en={
                food?.description ||
                "Delicious, freshly prepared food made with premium ingredients."
              }
              bn={
                food?.descriptionBn ||
                "প্রিমিয়াম উপকরণ দিয়ে তৈরি সুস্বাদু ও তাজা খাবার।"
              }
            />
          </p>

          <hr className="border-gray-100 my-4" />

          {/* SPECIAL INSTRUCTIONS */}
          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              <Translation en="Special instructions" bn="বিশেষ নির্দেশনা" />
            </h3>

            <p className="text-xs text-gray-500 mb-3">
              <Translation
                en="Special requests are subject to the restaurant's approval."
                bn="বিশেষ অনুরোধ রেস্টুরেন্টের অনুমোদনের উপর নির্ভরশীল।"
              />
            </p>

            <textarea
              placeholder="e.g. No mayo, extra spicy..."
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-sm text-gray-800"
              rows={3}
            ></textarea>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-100 p-5 flex items-center gap-4 bg-gray-50 shrink-0">
          {/* QUANTITY */}
          <div className="flex items-center bg-white border border-gray-300 rounded-xl px-2 py-2 shadow-sm">
            <button
              onClick={decreaseQty}
              className="text-xl px-4 text-gray-600 hover:text-orange-500 cursor-pointer font-medium transition"
            >
              −
            </button>

            <span className="px-2 font-bold text-gray-900 w-6 text-center">
              {quantity}
            </span>

            <button
              onClick={increaseQty}
              className="text-xl px-4 text-gray-600 hover:text-orange-500 cursor-pointer font-medium transition"
            >
              +
            </button>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition cursor-pointer shadow-lg shadow-orange-200"
          >
            <Translation
              en={`Add to cart • Tk ${price * quantity}`}
              bn={`কার্টে যোগ করুন • ৳ ${price * quantity}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCardModal;
