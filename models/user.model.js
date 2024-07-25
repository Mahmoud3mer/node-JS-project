const { request } = require('express');
const mongoose = require('mongoose');

// vvalidator
const validator = require('validator');
const userRoles = require('../utility/userRoles.js');

const userSchema = new mongoose.Schema({
    firsName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail ,'Field must be a valid email']
    },
    password:{
        type: String,
        required:true
    },
    token:{
        type:String
    },
    role:{
        type: String,
        enum:[userRoles.USER ,userRoles.ADMIN ,userRoles.MANAGER],
        default: userRoles.USER
    },
    avatar:{
        type: String,
        default: 'uploades/images.jpeg'

    }
})

const userModel = mongoose.model('User' , userSchema);

module.exports = {
    userModel
}