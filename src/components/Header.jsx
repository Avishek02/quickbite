"use client";

import { useSession, signOut } from "next-auth/react";
import React, { useState, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";

import {
  MapPin,
  ShoppingCart,
  Bike,
  Store,
  Menu,
  User,
  Package,
  LogOut,
  ChevronDown,
  Ticket,
} from "lucide-react";

import {
  MdOutlineDashboardCustomize,
  MdOutlineDeliveryDining,
  MdOutlineShoppingBag,
} from "react-icons/md";

import Language from "./Language";
import Translation from "./Translation";
import Link from "next/link";
import NavLink from "./NavLink";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "./CartDrawer";
import InputSearch from "./InputSearch";

const Header = () => {
  const { cartCount } = useCart();
  const pathname = usePathname();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: session, status } = useSession();

  const [deliveryAddress, setDeliveryAddress] = useState(
    "Add Delivery Address",
  );

  useEffect(() => {
    const fetchDefaultAddress = () => {
      if (session?.user?.email) {
        fetch(`/api/users/addresses?email=${session.user.email}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.addresses.length > 0) {
              setDeliveryAddress(
                `${data.addresses[0].address}, ${data.addresses[0].city}`,
              );
            } else {
              setDeliveryAddress("Add Delivery Address");
            }
          })
          .catch((err) => console.error(err));
      }
    };

    fetchDefaultAddress();

    window.addEventListener("addressUpdated", fetchDefaultAddress);

    return () =>
      window.removeEventListener("addressUpdated", fetchDefaultAddress);
  }, [session]);

  const userRole = session?.user?.role || "user";
  const hasDashboard = ["admin", "restaurant", "rider"].includes(userRole);

  return (
    <>
      <div className="w-full bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-[1380px] mx-auto py-3 flex items-center justify-between px-4 xl:px-0">
          {/* LEFT */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="lg:hidden">
              <Menu
                onClick={() => setOpen(true)}
                className="w-6 h-6 text-gray-700 cursor-pointer"
              />
            </div>

            <Link
              href="/"
              className="text-orange-500 font-bold text-xl sm:text-2xl"
            >
              <Translation en="🍔QuickBite" bn="🍔কুইকবাইট" />
            </Link>
          </div>

          {/* ADDRESS */}
          <Link
            href="/profile/addresses"
            className="hidden lg:flex items-center gap-2 text-gray-900 text-sm hover:bg-gray-100 px-3 py-2 rounded-xl max-w-[400px]"
          >
            <MapPin className="w-4 h-4 shrink-0" />

            <span className="truncate">
              {status === "authenticated" ? (
                deliveryAddress
              ) : (
                <Translation
                  en="Add Delivery Address"
                  bn="ডেলিভারি ঠিকানা যোগ করুন"
                />
              )}
            </span>
          </Link>

          {/* RIGHT */}
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
                    className="w-10 h-10 rounded-full object-cover border"
                  />

                  <ChevronDown
                    className={`w-4 h-4 transition ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border z-50 py-1">
                    <NavLink
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm"
                    >
                      <User className="w-4 h-4" />
                      <Translation en="Profile" bn="প্রোফাইল" />
                    </NavLink>

                    {hasDashboard && (
                      <NavLink
                        href={`/dashboard/${userRole}`}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm"
                      >
                        <MdOutlineDashboardCustomize className="w-4 h-4" />
                        <Translation en="Dashboard" bn="ড্যাশবোর্ড" />
                      </NavLink>
                    )}

                    <NavLink
                      href="/orders"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm"
                    >
                      <Package className="w-4 h-4" />
                      <Translation en="Orders" bn="অর্ডারসমূহ" />
                    </NavLink>

                    <NavLink
                      href="/vouchers"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm"
                    >
                      <Ticket className="w-4 h-4" />
                      <Translation en="Vouchers" bn="ভাউচার" />
                    </NavLink>

                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <Translation en="Logout" bn="লগ আউট" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden md:block px-4 py-1.5 border rounded-lg text-sm hover:bg-gray-100"
                >
                  <Translation en="Log in" bn="লগ ইন" />
                </Link>

                <Link
                  href="/register"
                  className="hidden md:block px-5 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600"
                >
                  <Translation
                    en="Sign up for free delivery"
                    bn="ফ্রি ডেলিভারির জন্য সাইন আপ করুন"
                  />
                </Link>
              </>
            )}

            <Language />

            {/* CART */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-gray-100 p-3 rounded-full hover:bg-gray-200"
            >
              <ShoppingCart className="w-5 h-5 text-gray-800" />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <div className="max-w-[1380px] mx-auto py-1 flex items-center justify-between px-4 xl:px-0 border-t hidden md:flex">
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <NavLink href="/" className="flex items-center gap-2 p-2">
              <MdOutlineDeliveryDining className="w-5 h-5" />
              <Translation en="Delivery" bn="ডেলিভারি" />
            </NavLink>

            <Link href="/pick-up" className="flex items-center gap-2 p-2">
              <Bike className="w-5 h-5" />
              <Translation en="Pick-up" bn="পিকআপ" />
            </Link>

            <Link
              href="/vouchers"
              className={`flex items-center gap-2 p-2 ${
                pathname === "/vouchers" ? "text-orange-500" : ""
              }`}
            >
              <Ticket className="w-5 h-5" />
              <Translation en="Vouchers" bn="ভাউচার" />
            </Link>

            <Link
              href="/pandamart"
              className={`flex items-center gap-2 p-2 ${
                pathname === "/pandamart" ? "text-orange-500" : ""
              }`}
            >
              <MdOutlineShoppingBag className="w-5 h-5" />
              <Translation en="Pandamart" bn="পান্ডামার্ট" />
            </Link>

            <Link href="/shops" className="flex items-center gap-2 p-2">
              <Store className="w-5 h-5" />
              <Translation en="Shops" bn="দোকান" />
            </Link>
          </div>

          <div className="relative w-full lg:w-[400px]">
            <Suspense
              fallback={<div className="h-10 bg-gray-100 rounded-full"></div>}
            >
              <InputSearch />
            </Suspense>
          </div>
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
