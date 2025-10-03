const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser"); // later

const app = express();

app.use(cookieParser()); // later

const { jsonMiddleware } = require("./middlewares/json.Middleware.js");
app.use(jsonMiddleware);

const { corsMiddleware } = require("./middlewares/cors.Middleware.js");
app.use(corsMiddleware);

const routes = require("./routes/index.js");
app.use('/api', routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
