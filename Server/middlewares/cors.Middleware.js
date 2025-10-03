const cors = require("cors");

const corsMiddleware = cors({
  origin: `http://localhost:${process.env.PORT}`,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

module.exports = {
  corsMiddleware,
};
