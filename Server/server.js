const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser'); // later


const app = express();

app.use(cookieParser()); // later

const { jsonMiddleware } = require('./middlewares/json.Middleware.js');
app.use(jsonMiddleware);

const { corsMiddleware } = require('./middlewares/cors.Middleware.js');
app.use(corsMiddleware);
            
const userAuth = require('./routes/userAuth.Route.js');
const companyAuth = require('./routes/companyAuth.Route.js');
const UserLogin = require('./routes/login.Route.js')


app.use('/api/auth', userAuth);
app.use('/api/auth', companyAuth);
app.use('/api/auth', UserLogin);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
