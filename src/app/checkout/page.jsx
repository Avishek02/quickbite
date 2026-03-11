 "use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Map from "@/components/Map";
import Translation from "@/components/Translation";
import { useLanguage } from "@/contexts/LanguageProvider";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const { data: session } = useSession();
  const { lang } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [mapPosition, setMapPosition] = useState([23.8103, 90.4125]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    street: "",
    city: "",
    apartment: "",
    note: "",
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
  });

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        email: prev.email || session.user.email || "",
        firstName: prev.firstName || session.user.name?.split(" ")[0] || "",
        lastName:
          prev.lastName ||
          session.user.name?.split(" ").slice(1).join(" ") ||
          "",
      }));

      fetch(`/api/user/addresses?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.addresses.length > 0) {
            setSavedAddresses(data.addresses);
            setSelectedAddressId(data.addresses[0]._id);
            setFormData((prev) => ({
              ...prev,
              street: data.addresses[0].address,
              city: data.addresses[0].city || "",
            }));
          }
        })
        .catch((err) => console.error(err));
    }
  }, [session]);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = async (lat, lng) => {
    setMapPosition([lat, lng]);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      );
      const data = await res.json();
      if (data && data.address) {
        setFormData((prev) => ({
          ...prev,
          street:
            data.address.road ||
            data.address.suburb ||
            data.display_name.split(",")[0],
          city:
            data.address.city ||
            data.address.state ||
            data.address.county ||
            "",
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert(lang === "bn" ? "আপনার কার্ট খালি!" : "Your cart is empty!");
      return;
    }

    const finalEmail = session?.user?.email || formData.email;
    if (!finalEmail) {
      alert(
        lang === "bn"
          ? "অর্ডার করতে লগইন করুন বা ইমেইল দিন"
          : "Please login or provide an email to place an order.",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          totalAmount,
          customerInfo: formData,
          email: finalEmail,
        }),
      });

      const data = await response.json();

      if (data.success) {
        clearCart();
        alert(
          lang === "bn"
            ? `অর্ডার সফল! Order ID: ${data.order.orderId}`
            : `Order placed successfully! Order ID: ${data.order.orderId}`,
        );
        router.push("/orders");
      } else {
        alert(
          lang === "bn" ? "অর্ডার ব্যর্থ হয়েছে" : "Failed to place order.",
        );
      }
    } catch (error) {
      alert(lang === "bn" ? "একটি ত্রুটি ঘটেছে" : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex justify-center py-10 text-gray-800 px-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Delivery Address */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-extrabold mb-4 text-black">
            <Translation en="Delivery address" bn="ডেলিভারি ঠিকানা" />
          </h2>

          <div className="w-full h-48 rounded-xl overflow-hidden mb-2 border border-gray-300">
            <Map
              position={mapPosition}
              onLocationSelect={handleLocationSelect}
            />
          </div>

          <p className="text-xs text-gray-500 mb-4 text-right">
            <Translation
              en="Click the map to drop a pin and auto-fill your address"
              bn="মানচিত্রে ক্লিক করে পিন দিন এবং ঠিকানা স্বয়ংক্রিয়ভাবে পূরণ করুন"
            />
          </p>

          <hr className="mb-4 border-gray-300" />

          <p className="font-bold mb-4 text-black">
            <Translation en="Delivery Details" bn="ডেলিভারি বিবরণ" />
          </p>

          <div className="space-y-4">
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              placeholder={
                lang === "bn" ? "রাস্তা / বাড়ি নম্বর" : "Street / House Number"
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
            />

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder={lang === "bn" ? "শহর / এলাকা" : "City / Area"}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
            />

            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleInputChange}
              placeholder={lang === "bn" ? "অ্যাপার্টমেন্ট #" : "Apartment #"}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
            />

            <textarea
              rows="3"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              placeholder={
                lang === "bn"
                  ? "রাইডারের জন্য নোট (ল্যান্ডমার্ক ইত্যাদি)"
                  : "Note to rider - e.g. building, landmark"
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={lang === "bn" ? "ইমেইল" : "Email"}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
            />

            <div className="flex gap-3">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder={lang === "bn" ? "নামের প্রথম অংশ" : "First name"}
                className="w-1/2 border border-gray-300 rounded-xl px-4 py-3 text-sm"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder={lang === "bn" ? "নামের শেষ অংশ" : "Last name"}
                className="w-1/2 border border-gray-300 rounded-xl px-4 py-3 text-sm"
              />
            </div>

            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder={lang === "bn" ? "মোবাইল নম্বর" : "Mobile number"}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm"
            />
          </div>
        </div>

        {/* Your Order */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-black">
            <Translation en="Your Order" bn="আপনার অর্ডার" />
          </h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-sm">
              <Translation en="Your cart is empty." bn="আপনার কার্ট খালি।" />
            </p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex justify-between">
                  <h3 className="font-semibold">{item.title}</h3>
                  <div className="font-semibold">
                    {lang === "bn"
                      ? `৳ ${item.totalPrice}`
                      : `Tk ${item.totalPrice}`}
                  </div>
                </div>
              ))}

              <div className="pt-4 flex justify-between text-lg font-extrabold">
                <span>
                  <Translation en="Total" bn="মোট" />
                </span>
                <span className="text-orange-600">
                  {lang === "bn" ? `৳ ${totalAmount}` : `Tk ${totalAmount}`}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          disabled={loading || cartItems.length === 0}
          className="w-full bg-orange-600 text-white py-4 rounded-xl font-semibold"
        >
          {loading
            ? lang === "bn"
              ? "প্রক্রিয়াকরণ চলছে..."
              : "Processing..."
            : lang === "bn"
              ? `অর্ডার করুন (৳ ${totalAmount})`
              : `Place order (Tk ${totalAmount})`}
        </button>

        <p className="text-gray-600 text-sm">
          <Translation
            en="By making this purchase you agree to our terms and conditions."
            bn="এই ক্রয় করার মাধ্যমে আপনি আমাদের শর্তাবলীতে সম্মত হচ্ছেন।"
          />
        </p>
      </div>
    </div>
  );
}
