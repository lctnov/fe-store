import { useRouter } from "next/router";
import { useState } from "react";
import laptops from "@/data/laptops";
import otherLaptops from "@/data/otherLaptops";
import { useCart } from "@/hooks/useCart";
import ProductImages from "@/components/Middle/LaptopDetail/ProductImages";
import { toast } from "react-hot-toast";
import LaptopCard from "@/components/Middle/LaptopCard/LaptopCard";

// Hàm format tiền tệ
const formatPrice = (price) => {
  if (!price) return "0₫";
  return Number(price).toLocaleString("vi-VN") + "₫";
};

export default function LaptopDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const { addToCart } = useCart();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  if (!router.isReady) return null;

  const allLaptops = [...laptops, ...otherLaptops];
  const uniqueLaptops = Array.from(
    new Map(allLaptops.map((item) => [item.slug, item])).values()
  );

  const laptop = uniqueLaptops.find((item) => item.slug === slug);
  const selectedVariant = laptop?.variants?.[selectedVariantIndex];

  const handleInstallment = () => {
    toast(
      "❗Chức năng trả góp chưa có phương thức online. Vui lòng tới cửa hàng gần nhất để đăng ký mua sắm.",
      {
        icon: "🛍️",
        style: {
          border: "1px solid #facc15",
          padding: "12px 16px",
          color: "#92400e",
          backgroundColor: "#fef3c7",
        },
      }
    );
  };

  const handleBuyNow = () => {
    if (laptop) {
      addToCart({ ...laptop, quantity: 1 });
      router.push("/cart");
    }
  };

  const handleBuy = () => {
    if (laptop) {
      addToCart({ ...laptop, quantity: 1 });
    }
  };

  if (!laptop) {
    return (
      <div className="text-center py-20 text-xl text-gray-500">
        Không tìm thấy sản phẩm.
      </div>
    );
  }

  return (
    <div className="bg-white max-w-12xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-900">
        {laptop.name}
      </h1>
  
      <div className="grid md:grid-cols-[800px_1fr] gap-6">
        {/* Bên trái: Hình ảnh */}
        <ProductImages images={laptop.images || [laptop.image]} />
  
        {/* Bên phải: Thông tin */}
        <div className="flex flex-col gap-4">
          {/* Giá và giảm giá */}
          {selectedVariant && (
            <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg shadow mb-4">
              <p className="text-red-600 font-bold text-lg">🔥 {selectedVariant.discountText}</p>
              <p className="text-2xl font-bold text-red-700">
                {formatPrice(selectedVariant.price)}
              </p>
              <p className="line-through text-gray-500 text-sm">
                {formatPrice(selectedVariant.originalPrice)}
              </p>
            </div>
          )}
  
          {/* Cấu hình khác */}
          {laptop.variants?.length > 0 && (
            <div className="bg-blue-50 border border-blue-300 p-4 rounded mb-6">
              <p className="font-semibold text-blue-700 mb-2">
                💡 Những cấu hình cùng mẫu
              </p>
              <div className="flex flex-wrap gap-2">
                {laptop.variants.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`px-4 py-2 rounded-full text-sm border ${
                      selectedVariantIndex === idx
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-100'
                    } transition`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}
  
          {/* Ưu đãi đặc quyền */}
          {laptop.privileges?.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-300 p-4 rounded">
              <p className="font-semibold text-yellow-700 mb-2">🎯 Ưu đãi đặc quyền</p>
              <ul className="text-sm list-disc list-inside space-y-1 text-yellow-800">
                {laptop.privileges.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
  
          {/* Quà tặng thêm */}
          {laptop.gifts?.length > 0 && (
            <div className="bg-gray-50 border border-gray-300 p-4 rounded">
              <p className="font-semibold text-gray-800 mb-2">🎁 Quà tặng thêm</p>
              <ul className="text-sm list-disc list-inside text-gray-700 space-y-1">
                {laptop.gifts.map((gift, idx) => (
                  <li key={idx}>{gift}</li>
                ))}
              </ul>
            </div>
          )}
  
          {/* Bảo hành */}
          <div className="bg-green-100 text-green-800 p-3 rounded shadow text-sm">
            🛡️ <strong>Bảo hành:</strong>{" "}
            {laptop.specsFull?.["Bảo hành"] || "12 tháng"} tại cửa hàng và trung tâm chính hãng
          </div>
  
          {/* ✅ Nút hành động - đặt trong cột phải */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full mt-4">
            <button 
              onClick={handleBuyNow}
              className="bg-red-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-red-700 transition">
              ĐẶT MUA NGAY
              <p className="text-sm font-normal">Nhanh chóng, thuận tiện</p>
            </button>
            <button 
              onClick={handleInstallment}
              className="bg-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition">
              MUA TRẢ GÓP
              <p className="text-sm font-normal">Thẻ tín dụng, Visa, Master</p>
            </button>
            <button
              onClick={handleBuy}
              className="bg-white text-indigo-700 border border-indigo-300 py-3 rounded-xl text-lg font-semibold hover:bg-indigo-50 transition"
            >
              CHO VÀO GIỎ
              <p className="text-sm font-normal">Mua tiếp sản phẩm khác</p>
            </button>
          </div>
        </div>
      </div>
  
      {/* Thông số kỹ thuật */}
      {laptop.specsFull && (
        <div className="mt-10 border p-6 rounded bg-blue-50 shadow">
          <h2 className="text-lg font-bold mb-4 text-blue-800 border-l-4 pl-3 border-blue-600">
            📋 THÔNG SỐ KỸ THUẬT
          </h2>
          <ul className="text-black text-sm grid sm:grid-cols-2 gap-4">
            {Object.entries(laptop.specsFull).map(([key, value], idx) => (
              <li key={idx}>
                <span className="font-semibold">{key}:</span> {value}
              </li>
            ))}
          </ul>
        </div>
      )}

           
      {/* Sản phẩm khác - show 4 sản phẩm */}
        <div className="flex justify-between items-center mb-6 pt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide relative inline-block">
            <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-pink-500 text-transparent bg-clip-text">
            🔥 Sản phẩm khác
            </span>
            <span className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-gradient-to-r from-red-500 to-yellow-400 rounded-full animate-pulse"></span>
          </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
             {otherLaptops.slice(0, 4).map((laptop, idx) => (
                <div key={idx}>
                  <LaptopCard laptop={laptop} />
                </div>
              ))}
          </div>
              
    </div>
  );
}