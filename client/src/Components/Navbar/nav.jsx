import { Link } from "react-router-dom";
import { Briefcase, Search, Building2, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-blue-600 to-gray-600 p-2 rounded-xl group-hover:shadow-lg transition-shadow">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-gray-700 bg-clip-text text-transparent">
              JobStack
            </span>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
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
          </div>

          {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
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
              <Link
                className="block text-center text-gray-700 hover:text-blue-600 px-4 py-2.5 font-medium border border-gray-200 rounded-lg transition-colors"
                to="/SignUp"
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
