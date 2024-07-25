const mongoose = require('mongoose');

// create schema
const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    }
})

// create model
const courseModel = mongoose.model("Course" , courseSchema);

module.exports = {
    courseModel
}