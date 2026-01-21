const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        /.*vercel\.app$/,
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(new Error("Unauthorized"));
        socket.user = user;
        next();
      });
    } else {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Join user to their personal room
    if (socket.user?.id) {
      socket.join(socket.user.id.toString());
      console.log(`User ${socket.user.id} joined their room`);
    }

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

const notifyUser = (userId, payload) => {
  if (!io) {
    console.warn("Socket.IO not initialized");
    return;
  }
  console.log(`Sending notification to user ${userId}:`, payload);
  io.to(userId.toString()).emit("notification", payload);
};

module.exports = { initSocket, notifyUser };
