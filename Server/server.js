const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mainRoute = require("./routes/mainRoute");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    /.*vercel\.app$/
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", mainRoute);

app.get("/", (req, res) => {
  res.json({ message: "JobStack API is running" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
});

app.get("/health",(req,res)=>{
  res.status(200).send("OK");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
