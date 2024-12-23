"use client";

import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Book,
  HelpCircle,
  BarChart2,
  Settings,
} from "lucide-react";
import Header from "@/components/Header";
import Image from "next/image";

interface LayoutProps {
  children: ReactNode;
}

// Define menu items with Lucide icons
const menuItems = [
  { id: 1, name: "Dashboard", href: "/dashboard", icon: Home },
  { id: 2, name: "Student", href: "/dashboard/students", icon: Users },
  { id: 3, name: "Chapter", href: "/dashboard/chapters", icon: Book },
  { id: 4, name: "Help", href: "/dashboard/help", icon: HelpCircle },
  { id: 5, name: "Reports", href: "/dashboard/reports", icon: BarChart2 },
  { id: 6, name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const Layout: FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  return (
    <div className="flex h-screen w-screen bg-[#F6F8FA] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 hidden bg-white border-r border-gray-200 lg:flex flex-col h-full gap-8">
        {/* Logo */}
        <div className="p-7">
          <Image
            src="/Vector.svg"
            alt="Brand Logo"
            width={150}
            height={150}
            className=""
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`flex items-center px-4 py-3 gap-3 font-bold rounded-lg ${
                    pathname === item.href
                      ? "bg-gray-100 text-black"
                      : "text-gray-500 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  <item.icon
                    size={25}
                    className={`${
                      pathname === item.href
                        ? "text-black font-bold"
                        : "text-gray-500"
                    }`}
                  />
                  <p className="text-lg">{item.name}</p>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex flex-col p-6 overflow-y-auto gap-4 w-full">
        <div className="flex overflow-y-auto">
          <Header />
        </div>
        <main className="w-full">{children}</main>
      </main>
    </div>
  );
};

export default Layout;
