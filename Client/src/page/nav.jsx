import { Link } from "react-router-dom";
import {
  Briefcase,
  Search,
  Building2,
  Menu,
  X,
  UserCircle,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import logo from "../../public/logo.png";
import { useAuthStore } from "../Api/store";
import { authAPI } from "../Api/api";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
   try {
      await authAPI .logout();
      logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      logout();
      window.location.href = "/";
    }
  };

  const dashboardLink =
    user?.role === "company" ? "/CompanyDashboard" : "/StudentDashboard";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-blue-600 to-gray-600 p-2 rounded-xl group-hover:shadow-lg transition-shadow">
              <img
                src={logo}
                alt="JobStack Logo"
                className="h-8 w-8 object-contain"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-gray-700 bg-clip-text text-transparent">
              JobStack
            </span>
          </Link>

          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <Link
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors group"
                to="/Job_page"
              >
                <Search className="h-4 w-4 group-hover:scale-110 transition-transform" />
                Find Jobs
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors group"
                to="/Company_page"
              >
                <Building2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                Companies
              </Link>
            </li>
          </ul>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors px-4 py-2"
                  to={dashboardLink}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center gap-2">
                    <UserCircle className="h-8 w-8 text-gray-400" />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-700">
                        {user?.name}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        {user?.role?.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 font-medium transition-colors"
                  to="/login"
                >
                  Sign In
                </Link>
                <Link
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                  to="/SignUp"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <ul className="space-y-2">
              <li>
                <Link
                  className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors"
                  to="/Job_page"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Search className="h-4 w-4" />
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors"
                  to="/Company_page"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Building2 className="h-4 w-4" />
                  Companies
                </Link>
              </li>
            </ul>
            <div className="mt-4 space-y-2 px-4">
              {isAuthenticated ? (
                <>
                  <Link
                    className="flex items-center justify-center gap-2 w-full text-gray-700 hover:text-blue-600 px-4 py-2.5 font-medium border border-gray-200 rounded-lg transition-colors"
                    to={dashboardLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center justify-center gap-2 w-full bg-red-50 text-red-600 px-6 py-2.5 rounded-lg font-semibold shadow-sm"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="block text-center text-gray-700 hover:text-blue-600 px-4 py-2.5 font-medium border border-gray-200 rounded-lg transition-colors"
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    className="block text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md"
                    to="/SignUp"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
