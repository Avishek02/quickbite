// "use client";

// import CartButton from "@/components/CartButton";
// import React from "react";
// import { useLanguage } from "@/contexts/LanguageProvider";

// const FoodsModal = ({ food, quantity, onClose, addToCart }) => {
//   const { language } = useLanguage();
//   const price = food?.price || 0;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white w-full max-w-3xl rounded-lg overflow-hidden shadow-xl relative">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-red-600 cursor-pointer text-2xl font-bold z-20"
//         >
//           ✕
//         </button>

//         {/* Image */}
//         <div className="relative">
//           <img
//             src={
//               food?.foodImg ||
//               "https://images.unsplash.com/photo-1604908554165-2e0c15e36d1a"
//             }
//             alt={food?.title || "Food Item"}
//             className="object-cover rounded-t-lg w-full h-56"
//           />
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-4">
//           <h2 className="text-xl font-bold">{food?.title || "Food Item"}</h2>

//           <p className="text-lg font-bold">
//             {language === "bn" ? `৳ ${price}` : `Tk ${price}`}
//           </p>

//           <p className="text-gray-500 text-sm leading-relaxed">
//             {food?.description ||
//               (language === "bn"
//                 ? "তাজা উপকরণ দিয়ে তৈরি সুস্বাদু খাবার।"
//                 : "Delicious, freshly prepared food made with premium ingredients.")}
//           </p>

//           <hr />

//           {/* Special Instructions */}
//           <div>
//             <h3 className="font-semibold text-lg">
//               {language === "bn" ? "বিশেষ নির্দেশনা" : "Special instructions"}
//             </h3>

//             <p className="text-sm text-gray-500 mb-2">
//               {language === "bn"
//                 ? "বিশেষ অনুরোধ রেস্টুরেন্টের অনুমোদনের উপর নির্ভর করে।"
//                 : "Special requests are subject to the restaurant's approval."}
//             </p>

//             <textarea
//               placeholder={
//                 language === "bn" ? "যেমন: মেয়োনিজ নয়" : "e.g. No mayo"
//               }
//               className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-500"
//               rows={3}
//             ></textarea>
//           </div>
//         </div>

//         <div>
//           <CartButton
//             price={price}
//             food={food}
//             quantity={quantity}
//             addToCart={addToCart}
//           ></CartButton>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FoodsModal;
