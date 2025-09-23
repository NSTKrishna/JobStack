const express = require('express');
const cors = require('cors');
require('dotenv').config();

//              
const authRoutes = require('./routes/authRoutes');

const app = express();
// middleware to handle cors 

app.use(cors({
    origin: `http://localhost:${process.env.PORT}`, // allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed methods
    credentials: true // allow cookies to be sent   
}))

// middleware to parse JSON bodies
app.use(express.json());

// Routes
// app.use('/api/auth', authRoutes);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})