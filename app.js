const express = require('express')

const cors = require('cors')

// dotenv
require('dotenv').config()

const {ERROR} = require('./utility/httpStatusText.js');

const path = require('path');
const app = express()

// file uploades
app.use('/uploades' ,express.static(path.join(__dirname, 'uploades')))

app.use(cors())



const mongoose = require('mongoose');

const {courseRoutes} = require('./routes/courses.routes.js');
const { userRoutes } = require('./routes/users.routes.js');


// Connect database
// const url = process.env.MONGO_URL;
const url = 'mongodb+srv://mamer0440:buvk7z8LP4p2KvUY@learn-mongodb.gnmwipj.mongodb.net/codeZone?retryWrites=true&w=majority&appName=Learn-mongodb';

mongoose.connect(url).then(() => {console.log("Connected with mongodb server")})
.catch((err) => {console.log("Error: " ,err)});

// middleware
app.use(express.json())


app.use('/api/courses',courseRoutes)
app.use('/api/users',userRoutes)

// Global middleware handler
app.all('*',(req,res,next) => {
    res.json({Status:ERROR , message: 'This resourse not found.'});
    next()
})

// Global middleware Error handler
app.use((error,req,res,next) => {
    res.status(500).json({Status:ERROR , message: error.message});
    next()
}) 


app.listen( 4000, () => {
    console.log("listining on port: 4000.");
});

