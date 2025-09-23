const express = require('express');
require('dotenv').config();

const app = express();

const { jsonMiddleware } = require('./middlewares/jsonMiddleware.js');
app.use(jsonMiddleware);

const { corsMiddleware } = require('./middlewares/corsMiddleware.js');
app.use(corsMiddleware);
            
const userAuth = require('./routes/userAuthRoute.js');
const companyAuth = require('./routes/companyAuthRoute.js');


app.use('/api/auth', userAuth);
app.use('/api/auth', companyAuth);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})