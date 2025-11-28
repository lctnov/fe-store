import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { Trash2 } from "lucide-react";

export default function CartIcon() {
  const { cart, totalItems, cartAnimation, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + parseInt(item.price?.replace(/,/g, ""), 10) * item.quantity,
    0
  );

  // Đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Tự đóng khi resize nhỏ hơn md
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="relative group"
      onMouseEnter={() => window.innerWidth >= 768 && setOpen(true)}
      onMouseLeave={() => window.innerWidth >= 768 && setOpen(false)}
      ref={dropdownRef}
    >
      {/* Icon giỏ hàng */}
      <button
        onClick={() => window.innerWidth < 768 && setOpen(!open)}
        className={`relative transition-transform duration-300 
          ${cartAnimation ? "animate-wiggle" : ""} 
          group-hover:animate-bounce`}
        aria-label="Giỏ hàng"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-500 hover:text-blue-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-1 5h12l-1-5M9 21h6"
          />
        </svg>

        {totalItems > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
            {totalItems}
          </span>
        )}
      </button>

      {/* Mini Cart */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="p-4 max-h-72 overflow-y-auto space-y-3">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center text-sm">
                Giỏ hàng đang trống 🛒
              </p>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-50 transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg border"
                  />

                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      SL: {item.quantity}
                    </div>
                  </div>

                  <div className="text-sm font-bold text-blue-600">
                    {(parseInt(item.price.replace(/,/g, "")) * item.quantity).toLocaleString("vi-VN")}₫
                  </div>

                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <>
              <div className="border-t px-4 py-3 flex justify-between font-semibold">
                <span>Tổng:</span>
                <span className="text-blue-600">
                  {totalPrice.toLocaleString("vi-VN")}₫
                </span>
              </div>

              <div className="px-4 pb-4">
                <Link
                  href="/cart"
                  className="block text-center bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"
                >
                  Xem giỏ hàng →
                </Link>
              </div>
            </>
          )}
        </div>
      )}

      {/* Animation */}
      <style jsx>{`
        .animate-wiggle {
          animation: wiggle 0.4s;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          50% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
      `}</style>
    </div>
  );
}
