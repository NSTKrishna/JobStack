import { Bell, Search, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

export function Topbar({ onMenuClick }) {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-20 px-6 py-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto w-full">

                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-lg"
                    >
                        <Menu size={20} />
                    </button>
                    <div className="hidden md:flex items-center text-sm text-gray-500">
                        <span className="hover:text-gray-900 cursor-pointer">Dashboard</span>
                        {pathnames.map((name, index) => {
                            const isLast = index === pathnames.length - 1;
                            return (
                                <div key={name} className="flex items-center">
                                    <span className="mx-2">/</span>
                                    <span
                                        className={`capitalize ${isLast ? "font-semibold text-gray-900" : "hover:text-gray-900 cursor-pointer"
                                            }`}
                                    >
                                        {name.replace(/-/g, " ")}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                </div>
            </div>
        </header>
    );
}
