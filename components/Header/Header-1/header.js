import Link from "next/link";
import CartIcon from "@/components/Middle/CartIcon/CartIcon";
import Menus from "@/components/Header/Menu/menu";
export default function Header() {
  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow">
        {/* Header top */}
        <div className="flex items-center justify-between w-full px-2 py-2">
          {/* Logo bên trái */}
          <Link href="/" className="flex items-center space-x-2 font-bold text-red-600 text-lg">
            <img src="/logo/logo-1/lg-icon.png" alt="LCT24H LAPTOP" className="h-8 w-auto" />
            <span>LCT24H LAPTOP</span>
          </Link>

          {/* Ô tìm kiếm */}
          {/* <div className="mx-auto">
            <input
              type="text"
              placeholder=""
              readOnly
              className="w-96 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

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

        {/* Menu */}
        <Menus />
      </div>
    </>
  );
}
