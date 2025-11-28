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
    <div className="bg-white text-black min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 md:px-8 pt-4 mb-4">
        <h1 className="text-xl md:text-3xl font-bold">🛒 Giỏ hàng của bạn</h1>
        <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition">
          ← Quay về trang chủ
        </Link>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          {/* Danh sách sản phẩm */}
          <div className="flex-1 overflow-y-auto px-3 md:px-6 space-y-4 pb-28">
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
                  className="flex flex-col sm:flex-row gap-4 p-4 border rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="w-full sm:w-28 h-32 sm:h-28 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg border"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                        <h2 className="font-semibold text-gray-800">{item.name}</h2>
                        <div className="text-blue-600 font-semibold">
                          {currency.format(itemTotal)} VND
                        </div>
                      </div>

                      {hasDeal && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-red-500">🔥 Giảm {item.deal}%</span>
                          <span className="text-xs line-through text-gray-400">
                            {currency.format(quantity * originalPrice)} VND
                          </span>
                        </div>
                      )}

                      {visibleSpecs.length > 0 && (
                        <ul className="text-sm text-gray-600 list-disc pl-5 mt-2 space-y-1">
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

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.name, quantity - 1)}
                          className="w-8 h-8 border rounded-md hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="font-medium">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.name, quantity + 1)}
                          className="w-8 h-8 border rounded-md hover:bg-gray-100"
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

          {/* Thanh tổng tiền */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md px-4 py-4 z-40">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="text-lg md:text-xl font-bold">
                Tổng cộng:{" "}
                <span className="text-blue-600">{currency.format(totalPrice)} VND</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={handlePayment}
                  className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
                >
                  Thanh toán
                </button>
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 w-full sm:w-auto"
                >
                  Hủy giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal giữ nguyên - không thay logic */}
      <AnimatePresence>
        {showCheckoutModal && (
          <>
            <motion.div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <div className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full">
                <CheckoutForm totalPrice={totalPrice} cart={cart} onClose={() => setShowCheckoutModal(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCancelModal && (
          <>
            <motion.div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center">
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
