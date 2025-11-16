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
			{/* Header content */}
			<div className="flex items-center justify-between w-full px-2 py-2">
				<div className="flex items-center justify-between w-full px-2 py-2">
						{/* Logo bên trái */}
						<Link href="/" className="flex items-center space-x-2 font-bold text-red-600 text-lg">
						<img src="/logo/logo-1/lg-icon.png" alt="LCT24H LAPTOP" className="h-8 w-auto" />
						<span>LCT24H LAPTOP</span>
						</Link>

						{/* Ô tìm kiếm */}
						<div className="mx-auto">
							<input
								type="text"
								placeholder="Gõ tên hoặc model máy để tìm!"
								className="text-black w-96 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						{/* Hotline + Giỏ hàng */}
						<div className="flex items-center space-x-4">
						<div className="text-right">
							<div className="text-red-600 font-bold text-sm">0949 033 868</div>
							<div className="text-xs text-gray-500">Trần Não, P.An Khánh, Q2, HCM</div>
						</div>
						<Link href="/cart" className="relative group">
							<CartIcon />
						</Link>
						</div>
				</div>
			</div>

			{/* Menu */}
			<Menus />
		</div>

		{/* Banner chính + 2 ảnh nhỏ bên phải */}
		<div className="bg-white py-2">
			<div className="w-full px-2 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[260px] lg:min-h-[320px]">
				
				{/* Slider lớn bên trái */}
				<div className="lg:col-span-2 relative h-full">
				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					navigation
					pagination={{ clickable: true }}
					autoplay={{ delay: 3000, disableOnInteraction: false }}
					loop
					className="h-full rounded-lg overflow-hidden"
				>
					<SwiperSlide>
					<img
						src="/banners/banner-3.png"
						alt="ASUS Zenbook AI"
						className="w-full h-full object-cover"
					/>
					</SwiperSlide>
					<SwiperSlide>
					<img
						src="/banners/banner-3.png"
						alt="ASUS khác"
						className="w-full h-full object-cover"
					/>
					</SwiperSlide>
				</Swiper>
				</div>

				{/* Hai ảnh nhỏ bên phải */}
				<div className="flex flex-col gap-4 h-full">
				<div className="flex-1 min-h-0 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
					<img
					src="/banners/banner-3.png"
					alt="HP Ultra Flip"
					className="w-full h-full object-cover"
					/>
				</div>
				<div className="flex-1 min-h-0 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
					<img
					src="/banners/banner-3.png"
					alt="Dell G15 Gaming"
					className="w-full h-full object-cover"
					/>
				</div>
				</div>

			</div>
		</div>



		{/* Danh mục Gaming nổi bật (4 ô) */}
		<div className="bg-white py-2">
			<div className="w-full px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				
				<div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition h-32 sm:h-40 lg:h-48 xl:h-56">
				<img src="/categories/category-1.jpg" alt="ASUS TUF Gaming" className="w-full h-full object-cover" />
				</div>

				<div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition h-32 sm:h-40 lg:h-48 xl:h-56">
				<img src="/categories/category-2.jpg" alt="Lenovo Gaming" className="w-full h-full object-cover" />
				</div>

				<div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition h-32 sm:h-40 lg:h-48 xl:h-56">
				<img src="/categories/category-1.jpg" alt="Dell Gaming" className="w-full h-full object-cover" />
				</div>

				<div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition h-32 sm:h-40 lg:h-48 xl:h-56">
				<img src="/categories/category-3.png" alt="Acer Nitro 5" className="w-full h-full object-cover" />
				</div>

			</div>
		</div>

		<div className="bg-white py-3">
			<div className="w-full px-4">
				<div className="flex flex-wrap justify-between items-center gap-y-4">
				{brands.map((brand, idx) => (
					<div
					key={idx}
					className="border rounded-full px-6 py-2 bg-white shadow-sm hover:shadow-md transition"
					>
					<img
						src={brand.src}
						alt={brand.alt}
						className="h-6 object-contain"
					/>
					</div>
				))}
				</div>
			</div>
		</div>



		{/* Content - Sản phẩm nổi bật */}
		<div className="bg-white min-h-screen bg-cover bg-center bg-fixed relative">
			<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>

			<div className="relative z-10 backdrop-blur-md bg-black/40 min-h-screen w-full pt-8 px-4 pb-4">
				
				{/* Tiêu đề */}
				<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide relative inline-block">
					<span className="bg-gradient-to-r from-red-500 via-yellow-400 to-pink-500 text-transparent bg-clip-text">
					🔥 Sản phẩm nổi bật
					</span>
					<span className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-gradient-to-r from-red-500 to-yellow-400 rounded-full animate-pulse"></span>
				</h2>
				</div>

				{/* Swiper danh sách sản phẩm */}
				<Swiper
				modules={[Navigation, Pagination]}
				spaceBetween={16}
				navigation
				pagination={{ clickable: true }}
				breakpoints={{
					640: { slidesPerView: 1 },
					768: { slidesPerView: 2 },
					1024: { slidesPerView: 3 },
				}}
				className="pb-10"
				>
				{laptops.map((laptop, idx) => (
					<SwiperSlide key={idx}>
					<div className="hover:scale-[1.03] transition-transform duration-300">
						<LaptopCard laptop={laptop} />
					</div>
					</SwiperSlide>
				))}
				</Swiper>


				{/* Các sản phẩm khác */}

				<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide relative inline-block">
					<span className="bg-gradient-to-r from-red-500 via-yellow-400 to-pink-500 text-transparent bg-clip-text">
					🔥 Sản phẩm khác
					</span>
					<span className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-gradient-to-r from-red-500 to-yellow-400 rounded-full animate-pulse"></span>
				</h2>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{otherLaptops.map((laptop, idx) => (
					<div key={idx}>
						<LaptopCard laptop={laptop} />
					</div>
					))}
				</div>


			</div>

		
		</div>

		
		{/* Footer nền trắng rõ ràng */}
  		<Footer />

    </>
  );
}
