import { Bell, Search, Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useNotificationStore } from "../../Api/store";
import { useState } from "react";

export function Topbar({ onMenuClick }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotificationStore();

  const handleNotificationClick = (notificationId) => {
    markAsRead(notificationId);
  };

  const formatTime = (date) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diffMs = now - notifDate;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

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
            <span className="hover:text-gray-900 cursor-pointer">
              Dashboard
            </span>
            {pathnames.map((name, index) => {
              const isLast = index === pathnames.length - 1;
              return (
                <div key={name} className="flex items-center">
                  <span className="mx-2">/</span>
                  <span
                    className={`capitalize ${
                      isLast
                        ? "font-semibold text-gray-900"
                        : "hover:text-gray-900 cursor-pointer"
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
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[500px] overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button
                        onClick={() => {
                          useNotificationStore.getState().clearAll();
                          setShowNotifications(false);
                        }}
                        className="text-xs text-red-600 hover:text-red-700 font-medium"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>{" "}
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-12 text-center text-gray-500">
                      <Bell size={40} className="mx-auto mb-3 text-gray-300" />
                      <p>No notifications yet</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification.id)}
                        className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm mb-1">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatTime(notification.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay to close dropdown */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        ></div>
      )}
    </header>
  );
}
