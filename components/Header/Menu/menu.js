import Link from "next/link";
import menuItems from "@/data/menuItems";

export default function MainMenu() {
  return (
    <div className="bg-gray-800 text-white border-t-2 border-red-600 w-full px-2 sm:px-4 shadow-sm">
      <div
        className="w-full flex justify-between items-center py-2 sm:py-3 overflow-x-auto scrollbar-hide gap-2 sm:gap-4"
      >
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className="flex flex-col sm:flex-row items-center sm:space-x-2 text-xs sm:text-sm hover:text-red-400 transition px-2 sm:px-0 min-w-[64px] sm:min-w-fit font-medium tracking-wide whitespace-nowrap"
            >
              <Icon className="w-5 h-5 mb-1 sm:mb-0 opacity-90" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}