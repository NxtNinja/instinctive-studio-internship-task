import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BarChart2,
  Book,
  HelpCircle,
  Home,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";

const menuItems = [
  { id: 1, name: "Dashboard", href: "/dashboard", icon: Home },
  { id: 2, name: "Student", href: "/dashboard/students", icon: Users },
  { id: 3, name: "Chapter", href: "/dashboard/chapters", icon: Book },
  { id: 4, name: "Help", href: "/dashboard/help", icon: HelpCircle },
  { id: 5, name: "Reports", href: "/dashboard/reports", icon: BarChart2 },
  { id: 6, name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const MobileSidebar = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-none hover:bg-none">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <SheetHeader className="p-4">
          <SheetTitle>
            <div className="p-7">
              <img
                src="/Vector.svg"
                alt="Brand Logo"
                width={150}
                height={150}
                className=""
              />
            </div>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col px-4 py-6">
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
                      pathname === item.href ? "text-black" : "text-gray-500"
                    }`}
                  />
                  <p className="text-base">{item.name}</p>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
