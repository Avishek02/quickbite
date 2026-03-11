"use client";

import { handleCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageProvider";

const CartButton = ({ food }) => {
  const { language } = useLanguage();
  const session = useSession();
  const path = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isLogin = session?.status == "authenticated";

  const handleAdd2Card = async () => {
    setIsLoading(true);
    if (isLogin) {
      const result = await handleCart({ food, inc: true });
      if (result.success) {
        Swal.fire(
          language === "bn" ? "কার্টে যোগ করা হয়েছে" : "Added to cart",
          food?.title,
          language === "bn" ? "সফল" : "Success"
        );
      } else {
        Swal.fire(
          language === "bn" ? "ওহ!" : "Opps",
          language === "bn"
            ? "কিছু একটা সমস্যা হয়েছে"
            : "Something went wrong",
          language === "bn" ? "ত্রুটি" : "Error"
        );
      }
      setIsLoading(false);
    } else {
      router.push(`/login?callbackUrl=${path}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 flex items-center gap-4 w-full">
      <Link
        href="/cart"
        disabled={session.status == "loading" || isLoading}
        onClick={handleAdd2Card}
        className="flex-1 bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition cursor-pointer"
      >
        {language === "bn" ? "কার্টে যোগ করুন" : "Add to cart"}
      </Link>
    </div>
  );
};

export default CartButton;