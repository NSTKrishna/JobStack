import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    User,
    Settings,
    LogOut,
    ChevronRight,
} from "lucide-react";
import logo from "../../../public/logo.png";
import { cn } from "../../lib/utils";
import { useAuthStore } from "../../Api/store";
import { authAPI } from "../../Api/api";

export function Sidebar({ role }) {
    const location = useLocation();
    const { logout } = useAuthStore();

    const handleLogout = async () => {
        try {
            await authAPI.logout();
            logout();
            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed:", error);
            logout();
            window.location.href = "/";
        }
    };

    const companyLinks = [
        { label: "Dashboard", href: "/CompanyDashboard", icon: <LayoutDashboard size={20} /> },
        { label: "Job Postings", href: "/CompanyDashboard/job-postings", icon: <Briefcase size={20} /> },
        { label: "Applications", href: "/CompanyDashboard/applications", icon: <FileText size={20} /> },
        { label: "Company Profile", href: "/CompanyDashboard/company-profile", icon: <Settings size={20} /> },
    ];

    const studentLinks = [
        { label: "Dashboard", href: "/StudentDashboard", icon: <LayoutDashboard size={20} /> },
        { label: "Find Jobs", href: "/Job_page", icon: <Briefcase size={20} /> },
        { label: "My Applications", href: "/StudentDashboard/applications", icon: <FileText size={20} /> },
        { label: "My CV", href: "/StudentDashboard/cv", icon: <FileText size={20} /> },
        { label: "Profile", href: "/StudentDashboard/profile", icon: <User size={20} /> },
    ];

    const links = role === "company" ? companyLinks : studentLinks;

    return (
        <div className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-100 h-screen sticky top-0 px-6 py-8">
            <div className="flex items-center gap-3 mb-12">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl text-white">
                    <img src={logo} alt="Logo" className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">JobStack</span>
            </div>

            <nav className="flex-1 space-y-2">
                {links.map((link) => {
                    const isActive = location.pathname === link.href || (link.href !== role === 'company' ? '/CompanyDashboard' : '/StudentDashboard' && location.pathname.startsWith(link.href + '/'));
                    const active = location.pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={cn(
                                "flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group font-medium",
                                active
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <span className={cn("transition-colors", active ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600")}>
                                    {link.icon}
                                </span>
                                {link.label}
                            </div>
                            {active && <ChevronRight size={16} className="text-blue-600" />}
                        </Link>
                    );
                })}
            </nav>

            {/* User Mini Profile / Logout */}
            <div className="pt-6 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
}
