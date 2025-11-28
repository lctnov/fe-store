import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-sm text-gray-700 border-t">
      {/* Thanh tư vấn mua hàng & hỗ trợ kỹ thuật */}
      <div className="py-6 text-gray-900 bg-gradient-to-r from-blue-50 to-white border-b">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
          {/* Cột 1 */}
          <div className="w-full lg:w-1/3 font-semibold text-blue-900 text-base uppercase tracking-wide">
            TƯ VẤN - MUA HÀNG
          </div>

          {/* Cột 2 - Số điện thoại mua hàng */}
          <div className="w-full lg:w-1/3 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="tel:0949033868"
              className="w-full sm:w-auto text-center font-semibold bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
            >
              📞 0949 033 868
            </a>
            <a
              href="tel:0344307123"
              className="w-full sm:w-auto text-center font-semibold bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
            >
              📞 0344 307 123
            </a>
          </div>

          {/* Cột 3 - Hỗ trợ kỹ thuật */}
          <div className="w-full lg:w-1/3 flex flex-col sm:flex-row justify-center lg:justify-end items-center gap-4">
            <span className="font-semibold text-blue-900 text-base uppercase">
              HỖ TRỢ KỸ THUẬT
            </span>
            <a
              href="tel:0949033868"
              className="w-full sm:w-auto text-center font-semibold bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
            >
              📞 0949 033 868
            </a>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Cột 1 - Thông tin cửa hàng */}
        <div>
          <h3 className="font-semibold text-base mb-4 text-blue-900 uppercase border-l-4 border-blue-600 pl-3">
            Cửa hàng lct24h laptop
          </h3>
          <p className="mb-4 leading-relaxed">
            <strong>SHOWROOM BÁN HÀNG</strong><br />
            617 Đường 3 tháng 2, Phường 8, Quận 10, TP. HCM<br />
            Hotline:{" "}
            <Link href="tel:0903344188" className="text-blue-600 font-semibold">
              0949 033 868
            </Link>
          </p>
          <p className="leading-relaxed">
            <strong>TRUNG TÂM BẢO HÀNH & KỸ THUẬT</strong><br />
            530 Đường 3 tháng 2, Phường 14, Quận 10, TP. HCM<br />
            Hotline kỹ thuật:{" "}
            <Link href="tel:0909054758" className="text-blue-600 font-semibold">
              0949 033 868
            </Link>
          </p>
        </div>

        {/* Cột 2 - Thông tin */}
        <div>
          <h3 className="font-semibold text-base mb-4 text-blue-900 uppercase border-l-4 border-blue-600 pl-3">
            Thông tin
          </h3>
          <ul className="space-y-2 leading-relaxed text-gray-700">
            <li className="hover:text-blue-600 transition">» Dịch vụ sửa chữa</li>
            <li className="hover:text-blue-600 transition">» Nâng cấp Laptop</li>
            <li className="hover:text-blue-600 transition">» Bảo dưỡng – chăm sóc máy tính</li>
            <li className="hover:text-blue-600 transition">» Hướng dẫn mua trả góp</li>
            <li className="hover:text-blue-600 transition">» Hướng dẫn mua hàng từ xa</li>
            <li className="hover:text-blue-600 transition">» Hỗ trợ driver – Ứng dụng</li>
          </ul>
        </div>

        {/* Cột 3 - Về chúng tôi */}
        <div>
          <h3 className="font-semibold text-base mb-4 text-blue-900 uppercase border-l-4 border-blue-600 pl-3">
            Về chúng tôi
          </h3>
          <ul className="space-y-2 leading-relaxed text-gray-700">
            <li className="hover:text-blue-600 transition">» Lịch sử</li>
            <li className="hover:text-blue-600 transition">» Tính bền vững tại lct24h laptop</li>
            <li className="hover:text-blue-600 transition">» Những câu hỏi thường gặp</li>
            <li className="hover:text-blue-600 transition">» Liên hệ chúng tôi</li>
            <li className="hover:text-blue-600 transition">» Đạo đức và chính trực</li>
            <li className="hover:text-blue-600 transition">» Chính sách bảo hành</li>
          </ul>
        </div>

        {/* Cột 4 - Dịch vụ giao hàng */}
        <div>
          <h3 className="font-semibold text-base mb-4 text-blue-900 uppercase border-l-4 border-blue-600 pl-3">
            Dịch vụ giao hàng
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-center">
            <Image
              src="/shipping/shipping-icon.png"
              alt="GHN"
              width={320}
              height={160}
              className="w-full h-auto object-contain drop-shadow-sm"
            />
          </div>

          <div className="mt-6">
            <p className="leading-relaxed">
              <strong>THỜI GIAN LÀM VIỆC</strong><br />
              Showroom: Thứ 2 – Chủ Nhật (8:00 – 21:00)<br />
              TT Bảo hành: Thứ 2 – Thứ 7 (8:00 – 17:00)
            </p>
          </div>
        </div>
      </div>

      {/* Thanh cuối */}
      <div className="text-center py-4 bg-gray-100 text-gray-600 text-xs border-t">
        Copyright © {new Date().getFullYear()} lct24h laptop
      </div>
    </footer>
  );
}