const express = require('express')

const {getAllUsers ,register ,login} = require('../controller/users.controller.js');
const { verifyToken } = require('../middleware/verifyToken.js');


const userRoutes = express.Router();

// file uploade
const multer  = require('multer')

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
        cb(null, 'uploades')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const uniqueFileName = `user-${Date.now()}.${ext}`
        cb(null , uniqueFileName)
    },
    
});

function myFileFilter (req, file, cb) {
    const imageType = file.mimetype.split('/')[0];
    if (imageType === 'image') {
        return cb(null , true)
    }else{
        return cb(new Error('the type must be image'),false);
    }

}

const upload = multer({ storage: diskStorage , fileFilter: myFileFilter});

// get all users
userRoutes.get('/' ,verifyToken, getAllUsers)
// register
userRoutes.post('/register' , upload.single('avatar'), register)
// login
userRoutes.post('/login' , login)


module.exports = {
    userRoutes
}