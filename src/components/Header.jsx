"use client";

import { useSession, signOut } from "next-auth/react";
import React, { useState } from "react";
import {
  MapPin,
  ShoppingCart,
  Bike,
  Store,
  Menu,
  X,
  User,
  Package,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdOutlineDeliveryDining, MdOutlineShoppingBag } from "react-icons/md";
import Language from "./Language";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InputSearch from "./InputSearch";
import { useLanguage } from "@/contexts/LanguageProvider";

const Header = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const { language } = useLanguage(); // get current language

  // ✅ Helper to show text based on language
  const t = (enText, bnText) => (language === "bn" ? bnText : enText);

  return (
    <div className="w-full bg-white shadow-sm">
      {/* Top Navbar */}
      <div className="max-w-[1380px] mx-auto py-3 flex items-center justify-between px-4">
        {/* Left */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Hamburger Menu for Mobile */}
          <div className="lg:hidden">
            <Menu
              onClick={() => setOpen(true)}
              className="w-6 h-6 text-gray-700 cursor-pointer"
            />
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="text-orange-500 font-bold text-xl sm:text-2xl cursor-pointer"
          >
            {t("🍔QuickBite", "🍔কুইকবাইট")}
          </Link>
        </div>

        {/* Address Desktop */}
        <a
          href="https://www.google.com/maps/search/?api=1&query=New+Address+Road+71,+Dhaka,+Bangladesh"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-2 text-gray-900 text-sm hover:bg-gray-100 px-3 py-2 rounded-xl cursor-pointer max-w-[400px] truncate"
        >
          <MapPin className="w-4 h-4" />
          <span className="truncate">
            {t(
              "New Address Road 71, Dhaka, Bangladesh",
              "নিউ অ্যাড্রেস রোড ৭১, ঢাকা, বাংলাদেশ",
            )}
          </span>
        </a>

        {/* Right Section */}
        <div className="flex items-center gap-4 relative">
          {status === "authenticated" && session?.user ? (
            <div className="relative">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={session.user.image || "/default-avatar.png"}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full object-cover border"
                />
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border z-50">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <User className="w-4 h-4" /> {t("Profile", "প্রোফাইল")}
                  </Link>
                  <Link
                    href="/dashboard/admin"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <MdOutlineDashboardCustomize className="w-4 h-4" />{" "}
                    {t("Dashboard", "ড্যাশবোর্ড")}
                  </Link>
                  <Link
                    href="/orders"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <Package className="w-4 h-4" /> {t("Orders", "অর্ডারসমূহ")}
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> {t("Logout", "লগ আউট")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden md:block px-4 py-1.5 border rounded-lg text-sm hover:bg-gray-100 transition"
              >
                {t("Log in", "লগ ইন")}
              </Link>
              <Link
                href="/register"
                className="hidden md:block px-5 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition cursor-pointer"
              >
                {t("foods for delivery", "ফুডস ফর ডেলিভারি")}
              </Link>
            </>
          )}

          <Language />

          <button
            disabled
            className="bg-gray-100 p-2 sm:p-3 rounded-full cursor-not-allowed opacity-50"
          >
            <ShoppingCart className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="max-w-[1380px] mx-auto py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-4">
        <div className="hidden lg:flex items-center gap-8 text-gray-700 text-sm">
          <Link
            href="/"
            className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-xl transition"
          >
            <MdOutlineDeliveryDining className="w-5 h-5" />{" "}
            {t("Delivery", "ডেলিভারি")}
          </Link>
          <Link
            href="/pick-up"
            className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-xl transition"
          >
            <Bike className="w-5 h-5" /> {t("Pick-up", "পিক-আপ")}
          </Link>
          <Link
            href="/pandamart"
            className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-xl transition"
          >
            <MdOutlineShoppingBag className="w-5 h-5" />{" "}
            {t("Pandamart", "পান্ডামার্ট")}
          </Link>
          <Link
            href="/shops"
            className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-xl transition"
          >
            <Store className="w-5 h-5" /> {t("Shops", "শপস")}
          </Link>
        </div>

        <InputSearch />
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-72 h-full bg-white shadow-lg p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg">{t("Menu", "মেনু")}</h2>
              <X
                onClick={() => setOpen(false)}
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-orange-500"
              >
                {t("Home", "হোম")}
              </Link>
              <Link
                href="/pick-up"
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-orange-500"
              >
                {t("Pick-up", "পিক-আপ")}
              </Link>
              <Link
                href="/pandamart"
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-orange-500"
              >
                {t("Pandamart", "পান্ডামার্ট")}
              </Link>
              <Link
                href="/shops"
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-orange-500"
              >
                {t("Shops", "শপস")}
              </Link>

              {status === "authenticated" && session?.user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="text-gray-700 hover:text-orange-500"
                  >
                    {t("Profile", "প্রোফাইল")}
                  </Link>
                  <Link
                    href="/orders"
                    onClick={() => setOpen(false)}
                    className="text-gray-700 hover:text-orange-500"
                  >
                    {t("Orders", "অর্ডারসমূহ")}
                  </Link>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setOpen(false);
                    }}
                    className="text-red-500 hover:text-red-600 text-left"
                  >
                    {t("Logout", "লগ আউট")}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="text-gray-700 hover:text-orange-500"
                  >
                    {t("Log in", "লগ ইন")}
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="text-gray-700 hover:text-orange-500"
                  >
                    {t("Sign up", "সাইন আপ")}
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
