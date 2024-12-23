import {
  Bell,
  HelpCircle,
  MessageSquareMore,
  Radio,
  Search,
} from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { MobileSidebar } from "./MobileSidebar";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-4 w-full py-3 overflow-hidden">
      {/* Search Input */}
      <div className="w-full lg:w-1/2 relative order-2 lg:order-1">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search your course"
          className="pl-12 py-3 lg:py-4 w-full rounded-xl focus:outline-none focus:ring-0 text-sm lg:text-base"
        />
      </div>

      {/* Icons and Avatar */}
      <div className="flex items-center gap-4 lg:gap-10 justify-between w-full lg:w-auto order-1 lg:order-2">
        {/* Icons */}
        <div className="block lg:hidden">
          <MobileSidebar />
        </div>
        <div className="flex justify-end items-center gap-3">
          <div className="flex items-center gap-4 lg:gap-8 relative">
            <HelpCircle className="text-gray-500 w-5 h-5 lg:w-6 lg:h-6" />

            {/* Message Icon with Red Dot */}
            <div className="relative">
              <MessageSquareMore className="text-gray-500 w-5 h-5 lg:w-6 lg:h-6" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
            </div>

            {/* Radio Icon */}
            <Radio className="text-gray-500 w-5 h-5 lg:w-6 lg:h-6" />

            {/* Bell Icon with Red Dot */}
            <div className="relative">
              <Bell className="text-gray-500 w-5 h-5 lg:w-6 lg:h-6" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
            </div>
          </div>

          {/* Avatar and User Name */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                width={200}
                height={200}
                src={"/Avatar.svg"}
                alt="Avatar"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg"
              />
            </div>
            <p className="hidden lg:block text-sm lg:text-lg">
              Adeline H. Dancy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
