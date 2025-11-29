import LaptopCard from "@/components/Middle/LaptopCard/LaptopCard";
import laptops from "@/data/laptops";
import brands from "@/data/brands";
import otherLaptops from "@/data/otherLaptops";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Footer from "@/components/Footer/Footer-2/Footer";
import Headers from "@/components/Header/Header-1/header";
import "swiper/css";
import ChatbotWidget from "@/components/Chatbot/ChatbotWidget";
export default function Home() {
  return (
    <>
      {/* Header */}
      <Headers />

      {/* Banner */}
      <div className="bg-white py-2 px-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[200px] sm:min-h-[260px] lg:min-h-[320px]">
          <div className="lg:col-span-2 relative h-full rounded-lg overflow-hidden shadow">
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

          <div className="flex flex-row lg:flex-col gap-4 h-full">
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
      <div className="bg-white py-4 px-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 1, 2].map((img, i) => (
            <div key={i} className="rounded-lg overflow-hidden shadow hover:scale-105 transition-transform">
              <img src={`/categories/category-${img}.jpg`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="bg-white py-3 px-4">
        <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="border rounded-full px-4 py-2 bg-white shadow-sm hover:shadow-md transition-transform hover:scale-105"
            >
              <img src={brand.src} alt={brand.alt} className="h-5 sm:h-6 object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Sản phẩm nổi bật */}
      <div className="bg-white py-6 px-3">
		  <h2 className="text-xl sm:text-2xl font-bold tracking-wide relative inline-block">

			{/* Text gradient xanh giống nút */}
			<span
				className="
				bg-gradient-to-r 
				from-[#1d4ed8]
				via-[#3b82f6]
				to-[#60a5fa]
				text-transparent bg-clip-text
				drop-shadow-[0_0_6px_rgba(59,130,246,0.45)]
				"
			>
				🔥 Sản phẩm nổi bật
			</span>

			</h2>
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

		{/* Text Other Products */}
        <div className="flex justify-between items-center mb-6 pt-10">
			<h2 className="text-xl sm:text-2xl font-bold tracking-wide relative inline-block">

			{/* Text gradient xanh giống nút */}
			<span
				className="
				bg-gradient-to-r 
				from-[#1d4ed8]    /* Xanh đậm */
				via-[#3b82f6]    /* Xanh trung */
				to-[#60a5fa]     /* Xanh nhạt */
				text-transparent bg-clip-text
				drop-shadow-[0_0_6px_rgba(59,130,246,0.45)]
				"
			>
				🔥 Sản phẩm khác
			</span>

			{/* Gạch chân glow xanh kiểu nút */}
			<span
				className="
				absolute left-0 -bottom-0.5 w-full h-0.5 
				bg-gradient-to-r 
				from-[#1d4ed8]
				via-[#3b82f6]
				to-[#60a5fa]
				rounded-full animate-pulse
				shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]
				"
			></span>

			</h2>
		</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {otherLaptops.map((laptop, idx) => (
            <LaptopCard key={idx} laptop={laptop} />
          ))}
        </div>
      </div>

		<ChatbotWidget />
      <Footer />

    </>
  );
}
