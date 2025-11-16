const cors = require("cors");

const corsMiddleware = cors({
  origin: `https://job-stack-teal.vercel.app`,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

module.exports = {
  corsMiddleware,
};
