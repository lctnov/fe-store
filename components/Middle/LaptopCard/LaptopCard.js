import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useCart } from "@/hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptop,
  faMicrochip,
  faMemory,
  faHardDrive,
  faPalette,
  faWeightHanging,
  faShieldAlt
} from "@fortawesome/free-solid-svg-icons";
import StarRating from "@/components/Middle/StarRating/StarRating";
import Link from "next/link";

export default function LaptopCard({ laptop }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);

  const hasDeal = laptop.deal > 1;

  useEffect(() => {
    const savedRating = localStorage.getItem(`rating-${laptop.name}`);
    if (savedRating) setRating(parseInt(savedRating, 10));
  }, [laptop.name]);

  const handleRatingClick = (star) => {
    if (rating === star) {
      setRating(0);
      localStorage.removeItem(`rating-${laptop.name}`);
    } else {
      setRating(star);
      localStorage.setItem(`rating-${laptop.name}`, star);
    }
  };

  const handleBuy = () => {
    if (quantity < 1) {
      toast.error("Số lượng phải lớn hơn 0!");
      return;
    }
    addToCart({ ...laptop, quantity });
    toast.success(`Đã thêm ${laptop.name} vào giỏ!`);
  };

  const formattedPrice = parseInt(laptop.price?.replace(/,/g, ""), 10) || 0;
  const discountedPrice = hasDeal
    ? Math.round(formattedPrice * (1 - laptop.deal / 100))
    : formattedPrice;

  const getIconForSpec = (spec) => {
    if (/core|microchip/i.test(spec)) return faMicrochip;
    if (/ddr4|memory/i.test(spec)) return faMemory;
    if (/ssd|hard-drive/i.test(spec)) return faHardDrive;
    if (/gpu|graphic/i.test(spec)) return faPalette;
    if (/kg|scale-balanced/i.test(spec)) return faWeightHanging;
    if (/tháng|shield-alt/i.test(spec)) return faShieldAlt;
    return faLaptop;
  };

  // Tính số sao dựa vào số máy bán ra: 2000/10000 => 20% => 1 sao mỗi 20%
  const soldRatio = Number(laptop.sold ?? 0) / Number(laptop.stock ?? 0);
  const autoRating = Math.min(5, Math.max(1, Math.round(soldRatio * 5)));
  const numberStock = Number(laptop.stock - laptop.sold) ?? 0;
  return (
    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col gap-3 text-sm">
      {hasDeal && (
        <div className="absolute top-3 left-2 bg-gradient-to-r from-red-500 to-yellow-400 text-white px-3 py-0.5 rounded-full shadow animate-pulse text-xs font-semibold z-10">
          🔥 -{laptop.deal}%
        </div>
      )}

      {(laptop.isHot || laptop.isNew) && (
        <div className="absolute top-3 right-2 bg-red-600 text-white px-2 py-0.5 text-xs rounded-full shadow z-10">
          {laptop.isHot ? "HOT" : laptop.isNew ? "Mới" : ""}
        </div>
      )}

      <img
        src={laptop.image}
        alt={laptop.name}
        className="w-full h-64 object-contain p-2 bg-white rounded-lg"
      />

      <h2 className="text-base font-semibold text-gray-800 line-clamp-2 min-h-[3rem]">
        {laptop.name}
      </h2>

      <ul className="text-gray-600 space-y-1">
        {(laptop.specs || []).map((spec, idx) => (
          <li key={idx} className="flex items-center gap-2 text-xs">
            <FontAwesomeIcon icon={getIconForSpec(spec)} className="text-blue-500 w-3.5 h-3.5" />
            {spec}
          </li>
        ))}
      </ul>

      <StarRating value={autoRating} readOnly />

      <div className="flex justify-between items-center mt-1">
        <div className="text-blue-600 font-bold text-sm">
          {discountedPrice.toLocaleString("vi-VN")}₫
        </div>
        {hasDeal && (
          <span className="text-xs text-gray-400 line-through">
            {formattedPrice.toLocaleString("vi-VN")}₫
          </span>
        )}
      </div>

      <div className="flex justify-between items-center mt-3 text-sm font-medium">
        {/* Đã bán */}
        <div className="flex items-center gap-1 text-orange-600 bg-orange-100 px-2 py-1 rounded-full text-xs">
          🔥 Đã bán: <span className="font-semibold">{laptop.sold} máy</span>
        </div>

        {/* Còn lại */}
        <div className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs">
          📦 Còn lại: <span className="font-semibold">{numberStock} máy</span>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <button
          onClick={handleBuy}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm py-2 rounded-md font-semibold hover:scale-105 transition-transform"
        >
          Mua ngay
        </button>
        <Link
          href={`/product/${laptop.slug}`}
          className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-sm py-2 rounded-md font-semibold text-gray-700 hover:scale-105 transition-transform"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}
