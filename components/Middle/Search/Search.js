import { useState, useMemo } from "react";
import LaptopCard from "@/components/Middle/LaptopCard/LaptopCard";
import laptops from "@/data/otherLaptops";
import brands from "@/data/brands";
import usageOptions from "@/data/usageInfo";
import priceOptions from "@/data/priceInfo";
import "swiper/css";

export default function Search() {
	const [selectedBrands, setSelectedBrands] = useState([]);
	const [selectedUsage, setSelectedUsage] = useState([]);
	const [selectedPrice, setSelectedPrice] = useState(null);

	const handleBrandChange = (brand) => {
		setSelectedBrands((prev) =>
		prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
		);
	};

	const handleUsageChange = (usage) => {
		setSelectedUsage((prev) =>
		prev.includes(usage) ? prev.filter((u) => u !== usage) : [...prev, usage]
		);
	};

	const handlePriceChange = (range) => {
		setSelectedPrice(range === selectedPrice ? null : range);
	};

	const filteredLaptops = useMemo(() => {
		return laptops.filter((laptop) => {
		const matchBrand =
			selectedBrands.length === 0 || selectedBrands.includes(laptop.brand);
		const matchUsage =
			selectedUsage.length === 0 || selectedUsage.includes(laptop.usage);
		const matchPrice =
			!selectedPrice ||
			(laptop.price >= selectedPrice.min &&
			laptop.price <= selectedPrice.max);
		return matchBrand && matchUsage && matchPrice;
		});
	}, [laptops, selectedBrands, selectedUsage, selectedPrice]);

	return (
		<div className="bg-gray-50 py-6 px-4 min-h-screen">
			<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
			  {/* Bộ lọc */}
			<div className="md:col-span-1 bg-white p-4 rounded shadow space-y-6">
			<div>
				<h3 className="font-semibold mb-2 text-red-600 text-lg">Thương hiệu</h3>
				<div className="text-black font-semibold">
					{brands.map((brandObj) => (
					<label
						key={brandObj.alt}
						className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
					>
						<input
						type="checkbox"
						checked={selectedBrands.includes(brandObj.alt)}
						onChange={() => handleBrandChange(brandObj.alt)}
						className="accent-red-600 w-4 h-4"
						/>
						{/* <img src={brandObj.src} alt={brandObj.alt} className="w-5 h-5" /> */}
						<span className="text-sm">{brandObj.alt}</span>
					</label>
					))}
				</div>
			</div>

			<div>
				<h3 className="font-semibold mb-2 text-red-600 text-lg">Nhu cầu</h3>
				<div className="text-black font-semibold">
					{usageOptions.map((u) => (
					<label
						key={u}
						className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
					>
						<input
						type="checkbox"
						checked={selectedUsage.includes(u)}
						onChange={() => handleUsageChange(u)}
						className="accent-red-600 w-4 h-4"
						/>
						<span className="text-sm">{u}</span>
					</label>
					))}
				</div>
			</div>

			<div>
				<h3 className="font-semibold mb-2 text-red-600 text-lg">Khoảng giá</h3>
				<div className="text-black font-semibold">
					{priceOptions.map((range) => (
					<label
						key={range.label}
						className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
					>
						<input
						type="radio"
						name="price"
						checked={selectedPrice === range}
						onChange={() => handlePriceChange(range)}
						className="accent-red-600 w-4 h-4"
						/>
						<span className="text-sm">{range.label}</span>
					</label>
					))}
				</div>
			</div>
			</div>

	
			  {/* Danh sách sản phẩm */}
			  <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{filteredLaptops?.map((laptop, idx) => (
				  <LaptopCard key={idx} laptop={laptop} />
				))}
				{filteredLaptops.length === 0 && (
				  <div className="col-span-full text-center text-gray-500 italic">
					Không tìm thấy sản phẩm phù hợp.
				  </div>
				)}
			  </div>
			</div>
		  </div>
	);
};