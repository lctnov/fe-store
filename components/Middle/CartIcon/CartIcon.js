import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { iconLucide } from "lucide-react";

export default function CartIcon() {
  const { cart, totalItems, cartAnimation, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);

  // Tổng giá tiền
  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + (parseInt(item.price?.replace(/,/g, ""), 10) * item.quantity),
    0
  );

  // Tự đóng dropdown khi resize nhỏ hơn md
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
    >
      {/* Icon giỏ hàng */}
      <button
        onClick={() => window.innerWidth < 768 && setOpen(!open)}
        className={`block transition-transform duration-300 
          ${cartAnimation ? "animate-wiggle" : ""} 
          group-hover:animate-bounce`}
        aria-label="Giỏ hàng"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-500 hover:text-blue-700 transition-colors duration-200"
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
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] transition-all duration-300">
            {totalItems}
          </span>
        )}
      </button>

      {/* MiniCart */}
      {cart.length > 0 && open && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl z-20 transition-all duration-300">
          <div className="p-4 flex flex-col gap-2 max-h-72 overflow-y-auto">
            {cart.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center relative group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="text-black text-sm font-semibold">{item.name}</div>
                  <div className="text-black text-xs text-gray-500">SL: {item.quantity}</div>
                </div>
                <div className="text-sm font-bold text-blue-600">
                  {(parseInt(item.price?.replace(/,/g, ""), 10) * item.quantity).toLocaleString("vi-VN")} VND
                </div>
                <button
                  onClick={() => removeFromCart(item.name)}
                  className="absolute top-0 right-0 text-gray-400 hover:text-red-500"
                >
                  <iconLucide className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t px-4 py-2 flex justify-between items-center">
            <span className="text-black text-sm font-semibold">Tổng:</span>
            <span className="text-sm font-bold text-blue-600">
              {totalPrice.toLocaleString("vi-VN")} VND
            </span>
          </div>

          <div className="px-4 pb-4">
            <Link href="/cart" className="block w-full text-center bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition-colors">
              Xem giỏ hàng →
            </Link>
          </div>
        </div>
      )}

      {/* CSS shake */}
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
