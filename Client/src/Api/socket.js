import { io } from "socket.io-client";
import { useAuthStore } from "./store";

let socket = null;

export const initializeSocket = () => {
  const token = useAuthStore.getState().token;

  if (!token) {
    console.warn("No token available for socket connection");
    return null;
  }

  if (socket?.connected) {
    return socket;
  }

  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

  socket = io(SOCKET_URL, {
    auth: {
      token: token,
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("❌ Socket disconnected:", reason);
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error.message);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("Socket disconnected manually");
  }
};

export const getSocket = () => socket;

export const subscribeToNotifications = (callback) => {
  if (!socket) {
    console.warn("Socket not initialized");
    return;
  }

  socket.on("notification", (payload) => {
    console.log("📬 New notification:", payload);
    callback(payload);
  });
};

export const unsubscribeFromNotifications = () => {
  if (socket) {
    socket.off("notification");
  }
};
