import Link from "next/link";
import CartIcon from "@/components/Middle/CartIcon/CartIcon";
import Menus from "@/components/Header/Menu/menu";

export default function Header() {
  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b">
        {/* Header top */}
        <div className="sticky top-0 z-50 bg-white shadow">
          <div className="flex flex-wrap items-center justify-between w-full px-3 py-2 gap-2">
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
      </div>
    </>
  );
}