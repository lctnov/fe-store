import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/router";
import { useState } from "react";
import CheckoutForm from "@/components/Middle/Form/CheckoutForm";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const router = useRouter();
  const currency = new Intl.NumberFormat("vi-VN");
  const [expandedItems, setExpandedItems] = useState({});

  const handlePayment = () => {
    if (cart.length === 0) {
      toast("🛒 Giỏ hàng trống! Vui lòng thêm sản phẩm.", {
        icon: "⚠️",
        style: {
          border: "1px solid #f87171",
          backgroundColor: "#fee2e2",
          color: "#7f1d1d",
          padding: "12px 16px",
        },
      });
      return;
    }
    setShowCheckoutModal(true);
  };

  const confirmCancelCart = () => {
    setShowCancelModal(false);
    clearCart();
    router.push("/");
  };

  const handleRemove = (name) => {
    removeFromCart(name);
    toast("Đã xoá sản phẩm khỏi giỏ.", {
      icon: "🗑️",
      style: {
        border: "1px solid #fcd34d",
        backgroundColor: "#fef9c3",
        color: "#78350f",
        padding: "12px 16px",
      },
    });
  };

  const totalPrice = cart.reduce((sum, item) => {
    const quantity = Number(item.quantity) || 0;
    let price = parseInt((item.price || "0").replace(/,/g, ""));
    if (item.deal && item.deal > 0) {
      price = Math.round(price * (1 - item.deal / 100));
    }
    return sum + quantity * price;
  }, 0);

  const toggleExpand = (key) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col relative">
      {/* Header */}
      <div className="relative flex items-center justify-between mb-6 px-6 pt-3">
        <h1 className="text-3xl font-bold">🛒 Giỏ hàng của bạn</h1>
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          <span className="inline-flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Quay về trang chủ
          </span>
        </Link>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto max-h-[60vh] px-4 space-y-4">
            {cart.map((item, idx) => {
              const quantity = Number(item.quantity) || 0;
              const originalPrice = parseInt((item.price || "0").replace(/,/g, ""));
              const hasDeal = item.deal && item.deal > 0;
              const discountedPrice = hasDeal
                ? Math.round(originalPrice * (1 - item.deal / 100))
                : originalPrice;
              const itemTotal = quantity * discountedPrice;
              const isExpanded = expandedItems[item.name] === true;
              const visibleSpecs = item.specs?.slice(0, isExpanded ? item.specs.length : 2) || [];

              return (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition"
                >
                  <div className="w-full md:w-28 h-28 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg border"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="text-base font-semibold text-gray-800">{item.name}</h2>
                        <div className="text-blue-600 font-semibold text-sm whitespace-nowrap">
                          {currency.format(itemTotal)} VND
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        {hasDeal ? (
                          <>
                            <p className="text-sm text-red-500 mt-1">🔥 Giảm {item.deal}%</p>
                            <span className="text-xs text-gray-400 line-through">
                              {currency.format(quantity * originalPrice)} VND
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      {visibleSpecs.length > 0 && (
                        <ul className="text-sm text-gray-600 list-disc pl-5 mt-1 space-y-1">
                          {visibleSpecs.map((spec, i) => (
                            <li key={i}>{spec}</li>
                          ))}
                        </ul>
                      )}
                      {item.specs?.length > 2 && (
                        <button
                          onClick={() => toggleExpand(item.name)}
                          className="text-sm text-blue-500 hover:underline mt-1"
                        >
                          {isExpanded ? "Thu gọn" : "Xem thêm..."}
                        </button>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.name, quantity - 1)}
                          className="w-7 h-7 border rounded-md text-gray-600 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="text-sm font-medium">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.name, quantity + 1)}
                          className="w-7 h-7 border rounded-md text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item.name)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Xoá
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Thanh tổng cộng */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md px-4 py-4 z-40">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <div className="text-xl font-bold">
                Tổng cộng: <span className="text-blue-600">{currency.format(totalPrice)} VND</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handlePayment}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Thanh toán
                </button>
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Hủy giỏ hàng
                </button>
              </div>
            </div>
          </div>
          <div className="h-[100px]" />
        </>
      )}

      {/* Popup thanh toán */}
      <AnimatePresence>
        {showCheckoutModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setShowCheckoutModal(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                <CheckoutForm totalPrice={totalPrice} cart={cart} onClose={() => setShowCheckoutModal(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal hủy giỏ hàng */}
      <AnimatePresence>
        {showCancelModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setShowCancelModal(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setShowCancelModal(false)}
            >
              <div
                className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-yellow-500 text-4xl mb-3">⚠️</div>
                <h2 className="text-xl font-bold mb-2">Xác nhận huỷ giỏ hàng</h2>
                <p className="text-gray-600 mb-6">
                  Bạn chắc chắn muốn huỷ toàn bộ giỏ hàng? Không thể hoàn tác.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Đóng
                  </button>
                  <button
                    onClick={confirmCancelCart}
                    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}