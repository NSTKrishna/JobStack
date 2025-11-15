const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();


require("dotenv").config();
app.use(cookieParser());

const { jsonMiddleware } = require("./middlewares/json.Middleware.js");
app.use(jsonMiddleware);

const { corsMiddleware } = require("./middlewares/cors.Middleware.js");
app.use(corsMiddleware);

const routes = require("./routes/mainRoute.js");
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
