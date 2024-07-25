// // express to create server
// import express from 'express';
// // mongoose to create db
// import mongoose from "mongoose";

// import { dbConnection } from './database/dbConnection.js';
// import userModel from './database/model/user.model.js';
// import userRoutes from './src/modules/users/user.routes.js';
// import noteRoutes from './src/modules/notes/note.routes.js';
// // DB
// // coneect db
// dbConnection;
// // create schema
// // create model


// // Server
// const app = express();
// // middleWare
// app.use(express.json());

// // user routes
// app.use(userRoutes)
// // note routes
// app.use(noteRoutes)


// // add port
// app.listen(2000);



//! demo
// import fs from 'node:fs';
// const read = fs.createReadStream('test.txt','utf8');
// read.on('data' ,(data) => {
//     console.log("========== chunck ======\n" ,data)
// })
// console.log("Hello world")
// console.log(process.argv[2])
// console.log(process.argv[3])


// #4 http & express

// const express = require("express")
// const app = express();
// // middleware
// const logger = (req,res,next) => {
//     console.log("Request: " , req.method ,"URL: " , req.url);
//     next();
// }
// app.use(logger);
// app.get('/' , (req,res) => {
//     res.send('<h1>hello world</h1>');
// })


// app.listen(3001);


// #6 

// 1- Mongodb npm
// const { MongoClient } = require('mongodb');
// const url = "mongodb+srv://mamer0440:buvk7z8LP4p2KvUY@learn-mongodb.gnmwipj.mongodb.net/?appName=Learn-mongodb";
// const client = new MongoClient(url);

// const dbName = 'codeZone';

// async function main() {
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     const collection = db.collection('courses');

//     // await collection.insertMany([{title:"JavaScript",price:1500},{title:"React",price:1300}]);

//     const data = await collection.find({price:{$gt:1300}}).toArray();
//     console.log(data)
//     return 'done.';
// }

// main()


// 2- mongoose

// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://mamer0440:buvk7z8LP4p2KvUY@learn-mongodb.gnmwipj.mongodb.net/codeZone?appName=Learn-mongodb');

// const courseSchema = new mongoose.Schema({
//     title:{
//         require:true,
//         type:String
//     },
//     price:{
//         require:true,
//         type:Number
//     }
// })

// const courseModel = mongoose.model('Course',courseSchema);

// const data = async() => {
//     return await courseModel.find(); 
// }
// console.log(data())