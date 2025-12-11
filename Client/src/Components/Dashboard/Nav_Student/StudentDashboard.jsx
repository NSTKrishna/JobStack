import { Link, useLocation } from "react-router-dom";
import { SquareUserRound } from "lucide-react";
import { LogOut } from "lucide-react";
import { useLogout } from "../../../Api/hooks";
import { useAuthStore } from "../../../Api/store";

function StudentDashboardHeader() {
  const { handleLogout } = useLogout();
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  const navItems = [
    { name: "Overview", path: "/StudentDashboard" },
    { name: "Applications", path: "/StudentDashboard/applications" },
    { name: "CV", path: "/StudentDashboard/cv" },
    { name: "Company Profile", path: "/StudentDashboard/profile" },
  ];

  const isActive = (path) => {
    if (path === "/StudentDashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
              <SquareUserRound className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Student Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                {user?.name || user?.email || "Student"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`pb-4 px-2 font-medium transition-colors border-b-2 ${
                isActive(item.path)
                  ? "text-gray-900 border-gray-900"
                  : "text-gray-500 hover:text-gray-700 border-transparent"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardHeader;
