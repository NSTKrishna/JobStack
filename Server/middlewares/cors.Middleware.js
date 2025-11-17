const cors = require("cors");

const corsMiddleware = cors({
  origin: ["https://job-stack-teal.vercel.app", "http://localhost:5173"],
  credentials: true,
});

module.exports = {
  corsMiddleware,
};
