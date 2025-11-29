import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/router";
import { useState } from "react";
import CheckoutForm from "@/components/Middle/Form/CheckoutForm";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const router = useRouter();
  const currency = new Intl.NumberFormat("vi-VN");

  const handlePayment = () => {
    if (cart.length === 0) {
      toast("🛒 Giỏ hàng trống! Vui lòng thêm sản phẩm.", {
        icon: "⚠️",
        style: { border: "1px solid #f87171", backgroundColor: "#fee2e2", color: "#7f1d1d", padding: "12px 16px" },
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
      style: { border: "1px solid #fcd34d", backgroundColor: "#fef9c3", color: "#78350f", padding: "12px 16px" },
    });
  };

  const totalPrice = cart.reduce((sum, item) => {
    const quantity = Number(item.quantity) || 0;
    let price = parseInt((item.price || "0").replace(/,/g, ""));
    if (item.deal && item.deal > 0) price = Math.round(price * (1 - item.deal / 100));
    return sum + quantity * price;
  }, 0);

  const toggleExpand = (key) => {
    setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-gray-50 text-black min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 md:px-8 pt-6 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight truncate max-w-full">🛒 Giỏ hàng của bạn</h1>
        <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
          ← Quay về trang chủ
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-4">Giỏ hàng của bạn đang trống.</p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700 transition"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Danh sách sản phẩm */}
          <div className="flex-1 overflow-y-auto px-3 md:px-6 space-y-5 pb-36">
            {cart.map((item, idx) => {
              const quantity = Number(item.quantity) || 0;
              const originalPrice = parseInt((item.price || "0").replace(/,/g, ""));
              const hasDeal = item.deal && item.deal > 0;
              const discountedPrice = hasDeal ? Math.round(originalPrice * (1 - item.deal / 100)) : originalPrice;
              const itemTotal = quantity * discountedPrice;
              const isExpanded = expandedItems[item.name] === true;
              const visibleSpecs = item.specs?.slice(0, isExpanded ? item.specs.length : 2) || [];

              return (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row gap-4 p-4 border rounded-2xl shadow-sm hover:shadow-lg transition bg-white"
                >
                  {/* Hình ảnh */}
                  <div className="w-full sm:w-36 h-36 sm:h-28 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden border">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>

                  {/* Thông tin */}
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 items-start min-w-0">
                        <div className="flex-1 min-w-0">
                          <h2 className="font-semibold text-gray-900 text-base sm:text-lg truncate" title={item.name}>
                            {item.name}
                          </h2>
                          <div className="mt-1 text-xs sm:text-sm text-gray-500 truncate" title={item.sku || "-"}>
                            Mã: <span className="text-gray-700">{item.sku || "-"}</span>
                          </div>
                        </div>

                        <div className="ml-0 sm:ml-4 text-right flex-shrink-0">
                          <div className="text-blue-600 font-bold text-base sm:text-lg truncate">{currency.format(itemTotal)} VND</div>
                          {hasDeal && (
                            <div className="text-xs text-gray-400 line-through mt-1 truncate">
                              {currency.format(quantity * originalPrice)} VND
                            </div>
                          )}
                        </div>
                      </div>

                      {hasDeal && (
                        <div className="inline-block mt-2 bg-red-50 text-red-600 text-xs px-2 py-1 rounded-full font-semibold">
                          🔥 Giảm {item.deal}%
                        </div>
                      )}

                      {visibleSpecs.length > 0 && (
                        <ul className="text-xs sm:text-sm text-gray-600 list-disc pl-5 mt-2 space-y-1 max-h-24 overflow-hidden">
                          {visibleSpecs.map((spec, i) => (
                            <li key={i} className="truncate" title={spec}>{spec}</li>
                          ))}
                        </ul>
                      )}

                      {item.specs?.length > 2 && (
                        <button
                          onClick={() => toggleExpand(item.name)}
                          className="text-xs sm:text-sm text-blue-500 hover:underline mt-1"
                        >
                          {isExpanded ? "Thu gọn" : "Xem thêm..."}
                        </button>
                      )}
                    </div>

                    {/* Số lượng & Xoá */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.name, Math.max(0, quantity - 1))}
                            className="w-9 h-9 flex items-center justify-center text-lg hover:bg-gray-100 transition"
                          >
                            −
                          </button>
                          <div className="w-12 text-center font-medium">{quantity}</div>
                          <button
                            onClick={() => updateQuantity(item.name, quantity + 1)}
                            className="w-9 h-9 flex items-center justify-center text-lg hover:bg-gray-100 transition"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-xs sm:text-sm text-gray-600 truncate max-w-xs">
                          Đơn giá: <span className="text-gray-800 font-medium">{currency.format(discountedPrice)} VND</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemove(item.name)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-600 font-semibold text-xs sm:text-sm"
                      >
                        <Trash2 className="h-5 w-5" />
                        <span className="hidden sm:inline">Xoá</span>
                      </button>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Thanh tổng tiền */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-xl px-4 py-4 z-40">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="text-xs sm:text-sm text-gray-500">Tổng thanh toán</div>
                <div className="text-lg sm:text-2xl font-extrabold text-blue-600 truncate">{currency.format(totalPrice)} VND</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={handlePayment}
                  className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-600 shadow-md w-full sm:w-auto transition"
                >
                  Thanh toán
                </button>
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 shadow-sm w-full sm:w-auto transition"
                >
                  Hủy giỏ hàng
                </button>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-3 text-xs text-gray-500">
              Miễn phí giao hàng cho đơn hàng trên 3,000,000 VND
            </div>
          </div>
        </>
      )}

      {/* Modal Checkout */}
      <AnimatePresence>
        {showCheckoutModal && (
          <>
            <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full"
              >
                <CheckoutForm totalPrice={totalPrice} cart={cart} onClose={() => setShowCheckoutModal(false)} />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal Cancel */}
      <AnimatePresence>
        {showCancelModal && (
          <>
            <motion.div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.12 }}
                className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center"
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
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
