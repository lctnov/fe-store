import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart, Trash2 } from "lucide-react";

export default function CartIcon() {
  const { cart, totalItems, cartAnimation, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // TIMER đóng sau 5 giây khi rê chuột ra
  const closeTimer = useRef(null);

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + parseInt(item.price?.replace(/,/g, ""), 10) * item.quantity,
    0
  );

  // CLICK OUTSIDE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // TỰ ĐÓNG SAU 5 GIÂY KHI RÊ RA NGOÀI
  const startCloseTimer = () => {
    if (window.innerWidth < 768) return; // không áp dụng mobile
    closeTimer.current = setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const cancelCloseTimer = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  // Hủy timer khi mở lại
  useEffect(() => {
    if (open) cancelCloseTimer();
  }, [open]);

  // TỰ ĐÓNG KHI THU NHỎ MÀN HÌNH
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={() => {
        if (window.innerWidth >= 768) {
          cancelCloseTimer();
          setOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= 768) {
          startCloseTimer();
        }
      }}
    >
      {/* ICON GIỎ HÀNG */}
      <button
        onClick={() => window.innerWidth < 768 && setOpen(!open)}
        className={`relative transition-transform duration-300 ${
          cartAnimation ? "animate-wiggle" : ""
        } hover:scale-110`}
        aria-label="Giỏ hàng"
      >
         <div className="relative">
        <ShoppingCart
          className="h-9 w-9 text-blue-600 hover:text-blue-800 transition-colors"
        />

        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-md">
            {totalItems}
          </span>
        )}
      </div>
      </button>

      {/* MINI CART */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100">
          <div className="p-4 max-h-72 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center text-sm">
                Giỏ hàng đang trống 🛒
              </p>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 items-center p-3 rounded-lg hover:bg-gray-50 transition shadow-sm"
                  onMouseEnter={cancelCloseTimer}
                  onMouseLeave={startCloseTimer}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  />

                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <div className="text-sm font-semibold text-gray-800 truncate">
                      {item.name}
                    </div>

                    <div className="text-xs text-gray-500 mt-0.5 flex justify-between">
                      <span>SL: {item.quantity}</span>
                      <span className="font-bold text-blue-600">
                        {(
                          parseInt(item.price.replace(/,/g, "")) *
                          item.quantity
                        ).toLocaleString("vi-VN")}
                        ₫
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="text-gray-400 hover:text-red-500 transition p-1"
                    aria-label={`Xóa ${item.name} khỏi giỏ`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <>
              <div className="border-t px-4 py-3 flex justify-between font-semibold text-gray-700">
                <span>Tổng cộng:</span>
                <span className="text-blue-600 font-bold">
                  {totalPrice.toLocaleString("vi-VN")}₫
                </span>
              </div>

              <div className="px-4 pb-4 pt-2">
                <Link
                  href="/cart"
                  className="block text-center bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition shadow-md"
                >
                  Xem giỏ hàng →
                </Link>
              </div>
            </>
          )}
        </div>
      )}

      {/* ANIMATION CSS */}
      <style jsx>{`
        .animate-wiggle {
          animation: wiggle 0.4s;
        }
        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(5deg);
          }
          50% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
}
