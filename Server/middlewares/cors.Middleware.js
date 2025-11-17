const cors = require("cors");

const corsMiddleware = cors({
  origin: "https://job-stack-teal.vercel.app",
  credentials: true,
});

module.exports = {
  corsMiddleware,
};
