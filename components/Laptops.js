import Search from "@/components/Middle/Search/Search";
import Header1 from "@/components/Header/Header-1/header";
import Footer from "@/components/Footer/Footer-2/Footer";
import "swiper/css";

export default function Laptops() {

	return (
		<>
		 {/* Header */}
		 <Header1 />
	
		  {/* Body */}
		  <Search />
	
		  {/* Footer */}
		  <Footer />
		</>
	  );
}