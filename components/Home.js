import Link from "next/link";
import LaptopCard from "@/components/Middle/LaptopCard/LaptopCard";
import CartIcon from "@/components/Middle/CartIcon/CartIcon";
import laptops from "@/data/laptops";
import brands from "@/data/brands";
import otherLaptops from "@/data/otherLaptops";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Footer from "@/components/Footer/Footer-2/Footer";
import Menus from "@/components/Header/Menu/menu";
import "swiper/css";

export default function Home() {
  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow">
        <div className="flex flex-wrap items-center justify-between w-full px-2 py-2 gap-2">
          <Link href="/" className="flex items-center space-x-2 font-bold text-red-600 text-base sm:text-lg">
            <img src="/logo/logo-1/lg-icon.png" alt="LCT24H LAPTOP" className="h-8 w-auto" />
            <span className="hidden sm:block">LCT24H LAPTOP</span>
          </Link>

          <div className="flex-1 max-w-xs sm:max-w-md mx-auto w-full">
            <input
              type="text"
              placeholder="Gõ tên hoặc model máy để tìm!"
              className="text-black w-full px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="text-right hidden sm:block">
              <div className="text-red-600 font-bold text-sm">0949 033 868</div>
              <div className="text-xs text-gray-500">Trần Não, P.An Khánh, Q2, HCM</div>
            </div>
            <Link href="/cart" className="relative group">
              <CartIcon />
            </Link>
          </div>
        </div>
        <Menus />
      </div>

      {/* Banner responsive */}
      <div className="bg-white py-2">
        <div className="w-full px-2 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[200px] sm:min-h-[260px] lg:min-h-[320px]">

          <div className="lg:col-span-2 relative h-full min-h-[200px] sm:min-h-[260px] lg:min-h-[320px]">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              className="h-full rounded-lg overflow-hidden"
            >
              <SwiperSlide>
                <img src="/banners/banner-3.png" alt="ASUS Zenbook AI" className="w-full h-full object-cover" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/banners/banner-3.png" alt="ASUS khác" className="w-full h-full object-cover" />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="flex flex-row lg:flex-col gap-4 h-full min-h-[200px] sm:min-h-[260px] lg:min-h-[320px]">
            <div className="flex-1 rounded-lg overflow-hidden shadow">
              <img src="/banners/banner-3.png" alt="HP Ultra Flip" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 rounded-lg overflow-hidden shadow">
              <img src="/banners/banner-3.png" alt="Dell G15 Gaming" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Danh mục Gaming nổi bật */}
      <div className="bg-white py-2">
        <div className="w-full px-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 1, 3].map((img, i) => (
            <div key={i} className="rounded-lg overflow-hidden shadow h-28 sm:h-36 lg:h-48">
              <img src={`/categories/category-${img}.jpg`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Brands responsive */}
      <div className="bg-white py-3">
        <div className="w-full px-4 flex flex-wrap justify-center sm:justify-between items-center gap-4">
          {brands.map((brand, idx) => (
            <div key={idx} className="border rounded-full px-4 py-2 bg-white shadow-sm">
              <img src={brand.src} alt={brand.alt} className="h-5 sm:h-6 object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Sản phẩm nổi bật */}
      <div className="bg-white">
        <div className="w-full pt-6 px-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">🔥 Sản phẩm nổi bật</h2>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {laptops.map((laptop, idx) => (
              <SwiperSlide key={idx}>
                <LaptopCard laptop={laptop} />
              </SwiperSlide>
            ))}
          </Swiper>

          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-10 mb-4">🔥 Sản phẩm khác</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otherLaptops.map((laptop, idx) => (
              <LaptopCard key={idx} laptop={laptop} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}