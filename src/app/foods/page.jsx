// "use client";
// import React, { useEffect, useState } from "react";
// import CategoriesFoods from "@/components/CategoriesFoods";
// import FoodCards from "@/components/FoodCards";
// import { useSearchParams } from "next/navigation";
// import Translation from "@/components/Translation";
// import FoodCardsSkeleton from "@/components/FoodCardsSkeleton";
// import HeroSection from "@/components/HeroSection";
// import { useLanguage } from "@/contexts/LanguageProvider";

// const FoodsPageContent = () => {
//   const { language } = useLanguage(); // <-- get current language
//   const searchParams = useSearchParams();
//   const searchQuery = searchParams.get("search") || "";

//   const [foods, setFoods] = useState([]);
//   const [selectedSort, setSelectedSort] = useState("");
//   const [selectedOffer, setSelectedOffer] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [headerHeight, setHeaderHeight] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // Header Height
//   useEffect(() => {
//     const calculateHeaderHeight = () => {
//       const headerElement = document.getElementById("main-header");
//       if (headerElement) {
//         setHeaderHeight(headerElement.offsetHeight);
//       }
//     };
//     calculateHeaderHeight();
//     window.addEventListener("resize", calculateHeaderHeight);
//     return () => window.removeEventListener("resize", calculateHeaderHeight);
//   }, []);

//   //Reset page on filter/search change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [selectedSort, selectedOffer, selectedCategory, searchQuery]);

//   // Fetch Foods
//   useEffect(() => {
//     const loadFoods = async () => {
//       setLoading(true);
//       try {
//         const params = new URLSearchParams({
//           page: currentPage,
//           limit: 9,
//         });
//         if (selectedSort) params.append("sort", selectedSort);
//         if (selectedOffer) params.append("offer", selectedOffer);
//         if (selectedCategory) params.append("category", selectedCategory);
//         if (searchQuery) params.append("search", searchQuery);

//         const res = await fetch(`/api/foods?${params.toString()}`);
//         const data = await res.json();

//         setFoods(data.foods || []);
//         setTotalPages(data.totalPages || 1);
//       } catch (error) {
//         console.error("Error fetching foods:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadFoods();
//   }, [currentPage, selectedSort, selectedOffer, selectedCategory, searchQuery]);

//   //  Options
//   const sortOptions = [
//     { value: "relevance", en: "Relevance", bn: "প্রাসঙ্গিকতা" },
//     { value: "delivery-time", en: "Delivery Time", bn: "ডেলিভারি সময়" },
//     { value: "rating", en: "Rating", bn: "রেটিং" },
//     { value: "price-asc", en: "Price: Low to High", bn: "মূল্য: কম থেকে বেশি" },
//     {
//       value: "price-desc",
//       en: "Price: High to Low",
//       bn: "মূল্য: বেশি থেকে কম",
//     },
//   ];

//   const offerOptions = [
//     { value: "discount", en: "Discount", bn: "ছাড়" },
//     { value: "free-delivery", en: "Free Delivery", bn: "ফ্রি ডেলিভারি" },
//     { value: "b1g1", en: "Buy 1 Get 1", bn: "এক কিনলে এক ফ্রি" },
//     { value: "cashback", en: "Cashback", bn: "ক্যাশব্যাক" },
//   ];

//   // Loading Skeleton
//   if (loading) {
//     return (
//       <div className="mt-10">
//         <FoodCardsSkeleton type="grid" count={9} />
//       </div>
//     );
//   }

//   // Main JSX
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5 mb-20 items-start">
//       <div
//         className="hidden lg:block lg:col-span-3 bg-white shadow-lg rounded-2xl p-6 sticky self-start overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
//         style={{
//           top: `${headerHeight + 20}px`,
//           maxHeight: `calc(100vh - ${headerHeight + 40}px)`,
//         }}
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="font-bold text-2xl">
//             <Translation en="Filters" bn="ফিল্টার" />
//           </h2>

//           <button
//             onClick={() => {
//               setSelectedSort("");
//               setSelectedOffer("");
//               setSelectedCategory("");
//             }}
//             className="text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-xl cursor-pointer"
//           >
//             <Translation en="Clear All" bn="সব ক্লিয়ার করুন" />
//           </button>
//         </div>

//         {/* Sort */}
//         <div className="mb-6">
//           <h4 className="font-semibold mb-3 text-gray-700">
//             <Translation en="Sort By" bn="সর্ট করুন" />
//           </h4>
//           <div className="space-y-3">
//             {sortOptions.map((option) => (
//               <div
//                 key={option.en}
//                 onClick={() =>
//                   setSelectedSort(option.en === selectedSort ? "" : option.en)
//                 }
//                 className="flex items-center gap-3 cursor-pointer group hover:bg-gray-100 p-1 rounded-xl"
//               >
//                 <div
//                   className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${
//                     selectedSort === option.en
//                       ? "bg-black border-black"
//                       : "border-gray-400"
//                   }`}
//                 >
//                   {selectedSort === option.en && (
//                     <div className="w-2 h-2 bg-white rounded-sm"></div>
//                   )}
//                 </div>
//                 <span>
//                   <Translation en={option.en} bn={option.bn} />
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Offers */}
//         <div>
//           <h4 className="font-semibold mb-3 text-gray-700">
//             <Translation en="Offers" bn="অফার" />
//           </h4>
//           <div className="space-y-3">
//             {offerOptions.map((option) => (
//               <div
//                 key={option.en}
//                 onClick={() =>
//                   setSelectedOffer(option.en === selectedOffer ? "" : option.en)
//                 }
//                 className="flex items-center gap-3 cursor-pointer group hover:bg-gray-100 p-1 rounded-xl"
//               >
//                 <div
//                   className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${
//                     selectedOffer === option.en
//                       ? "bg-black border-black"
//                       : "border-gray-400"
//                   }`}
//                 >
//                   {selectedOffer === option.en && (
//                     <div className="w-2 h-2 bg-white rounded-sm"></div>
//                   )}
//                 </div>
//                 <span>
//                   <Translation en={option.en} bn={option.bn} />
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="col-span-1 lg:col-span-9 px-4 lg:px-6">
//         <HeroSection></HeroSection>
//         <CategoriesFoods
//           onCategorySelect={setSelectedCategory}
//           hideFoods={true}
//         />

//         <h2 className="font-bold text-2xl mt-10 mb-5">
//           {foods.length}{" "}
//           <Translation en="Restaurants Found" bn="রেস্তোরাঁ পাওয়া গেছে" />
//           {selectedCategory && ` for "${selectedCategory}"`}{" "}
//           {searchQuery && ` matching "${searchQuery}"`}
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {foods.map((food) => (
//             <FoodCards key={food.id || food._id} food={food} />
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center items-center gap-4 mt-10 pb-20">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-40 hover:bg-gray-300 font-semibold transition cursor-pointer disabled:cursor-not-allowed"
//           >
//             Previous
//           </button>

//           <span className="font-bold text-gray-900 bg-orange-100 px-4 py-2 rounded-lg">
//             Page {currentPage} of {totalPages}
//           </span>

//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//             className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-40 hover:bg-gray-300 font-semibold transition cursor-pointer disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FoodsPageContent;

"use client";

import React, { useEffect, useState } from "react";
import CategoriesFoods from "@/components/CategoriesFoods";
import FoodCards from "@/components/FoodCards";
import { useSearchParams } from "next/navigation";
import Translation from "@/components/Translation";
import FoodCardsSkeleton from "@/components/FoodCardsSkeleton";
import HeroSection from "@/components/HeroSection";

const FoodsPageContent = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [foods, setFoods] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedOffer, setSelectedOffer] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [loading, setLoading] = useState(false);

  // header height
  useEffect(() => {
    const calculateHeaderHeight = () => {
      const header = document.getElementById("main-header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    calculateHeaderHeight();
    window.addEventListener("resize", calculateHeaderHeight);

    return () => window.removeEventListener("resize", calculateHeaderHeight);
  }, []);

  // reset page
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSort, selectedOffer, selectedCategory, searchQuery]);

  // fetch foods
  useEffect(() => {
    const loadFoods = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          page: currentPage,
          limit: 9,
        });

        if (selectedSort) params.append("sort", selectedSort);
        if (selectedOffer) params.append("offer", selectedOffer);
        if (selectedCategory) params.append("category", selectedCategory);
        if (searchQuery) params.append("search", searchQuery);

        const res = await fetch(`/api/foods?${params.toString()}`);
        console.log("get the data", res);

        const data = await res.json();

        console.log("foods api response:", data);

        const foodsData = data.foods || data.data || [];

        setFoods(foodsData);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Food fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFoods();
  }, [currentPage, selectedSort, selectedOffer, selectedCategory, searchQuery]);

  // loading
  if (loading) {
    return (
      <div className="mt-10">
        <FoodCardsSkeleton type="grid" count={9} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5 mb-20 items-start">
      {/* FILTER SIDEBAR */}
      <div
        className="hidden lg:block lg:col-span-3 bg-white shadow-lg rounded-2xl p-6 sticky"
        style={{
          top: `${headerHeight + 20}px`,
        }}
      >
        <h2 className="font-bold text-2xl mb-6">
          <Translation en="Filters" bn="ফিল্টার" />
        </h2>

        <button
          onClick={() => {
            setSelectedSort("");
            setSelectedOffer("");
            setSelectedCategory("");
          }}
          className="text-sm mb-6 hover:bg-gray-100 p-2 rounded-xl"
        >
          <Translation en="Clear All" bn="সব ক্লিয়ার করুন" />
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="col-span-1 lg:col-span-9 px-4 lg:px-6">
        <HeroSection />

        <CategoriesFoods
          onCategorySelect={setSelectedCategory}
          hideFoods={true}
        />

        <h2 className="font-bold text-2xl mt-10 mb-5">
          {foods.length}{" "}
          <Translation en="Restaurants Found" bn="রেস্তোরাঁ পাওয়া গেছে" />
        </h2>

        {foods.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <Translation en="No foods found" bn="কোন খাবার পাওয়া যায়নি" />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {foods.map((food, index) => (
            <FoodCards key={food._id || food.id || index} food={food} />
          ))}
        </div>

        {/* PAGINATION */}
        {foods.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-10 pb-20">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              <Translation en="Previous" bn="আগের" />
            </button>

            <span className="font-bold bg-orange-100 px-4 py-2 rounded-lg">
              <Translation en="Page" bn="পৃষ্ঠা" /> {currentPage}{" "}
              <Translation en="of" bn="মোট" /> {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              <Translation en="Next" bn="পরবর্তী" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodsPageContent;
