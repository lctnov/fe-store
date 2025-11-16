import Link from "next/link";
import menuItems from "@/data/menuItems";

export default function MainMenu() {
  return (
	<div className="bg-gray-800 text-white border-t-2 w-full px-4 flex justify-between items-center py-0">
		<div className="w-full px-4 flex justify-between items-center py-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className="flex items-center space-x-2 hover:text-red-500 transition"
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
