import Link from "next/link";
import CartIcon from "@/components/Middle/CartIcon/CartIcon";
import Menus from "@/components/Header/Menu/menu";

export default function Header() {
  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b">
        {/* Header top */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-red-600 text-base sm:text-lg hover:opacity-90 transition-opacity"
          >
            <img
              src="/logo/logo-1/lg-icon.png"
              alt="LCT24H LAPTOP"
              className="h-8 sm:h-10 w-auto drop-shadow-sm"
            />
            <span className="hidden sm:inline tracking-wide">LCT24H LAPTOP</span>
          </Link>

          {/* Hotline + Giỏ hàng */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="text-right hidden md:block">
              <div className="text-red-600 font-bold text-sm sm:text-base leading-tight">
                0949 033 868
              </div>
              <div className="text-xs text-gray-500 sm:text-sm">
                Trần Não, P.An Khánh, Q2, HCM
              </div>
            </div>

            <Link
              href="/cart"
              className="relative hover:opacity-80 transition"
            >
              <CartIcon />
            </Link>
          </div>
        </div>

        {/* Menu */}
        <Menus />
      </div>
    </>
  );
}