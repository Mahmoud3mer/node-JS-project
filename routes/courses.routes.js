const express = require('express')

const {getAllCourses,getCourse,addCourse,updateCourse,deleteCourse} = require('../controller/courses.controller.js');

// express-validator package
const {validationSchema} = require('../middleware/validationSchema.js');
const { verifyToken } = require('../middleware/verifyToken.js');
const userRoles = require('../utility/userRoles.js');
const allowTo = require('../middleware/allowTo.js');

const courseRoutes = express.Router();
// get all courses
courseRoutes.get('/',getAllCourses)

// get single course
courseRoutes.get('/:courseID',getCourse)

// add course and validation
courseRoutes.post('/' , verifyToken ,allowTo(userRoles.MANAGER), validationSchema ,addCourse)

// update course
courseRoutes.patch('/:courseID' , updateCourse)


// delete course
courseRoutes.delete('/:courseID' ,verifyToken, allowTo(userRoles.ADMIN,userRoles.MANAGER) , deleteCourse)

module.exports = {
    courseRoutes
}