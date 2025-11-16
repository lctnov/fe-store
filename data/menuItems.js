import {
	HouseIcon,
	LaptopIcon,
	ServerIcon,
	MonitorIcon,
	HeadphonesIcon,
	RefreshCcwIcon,
	BriefcaseIcon,
  } from "lucide-react";
  
  const menuItems = [
	{ label: "Trang chủ", href: "/", icon: HouseIcon },
	{ label: "Laptop", href: "/laptops", icon: LaptopIcon },
	{ label: "Server", href: "/servers", icon: ServerIcon },
	{ label: "Desktop", href: "/desktops", icon: MonitorIcon },
	{ label: "Phụ kiện", href: "/accessories", icon: HeadphonesIcon },
	{ label: "Linh kiện", href: "/parts", icon: RefreshCcwIcon },
	{ label: "Dịch vụ", href: "/services", icon: BriefcaseIcon },
  ];
  
  export default menuItems;
  