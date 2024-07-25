
const {courseModel} = require('../models/course.model.js');

// JSend
const {SUCCESS , FAIL , ERROR} = require('../utility/httpStatusText.js')

const {body , validationResult} = require ("express-validator");

// import asyncWrapper
const asyncWraper = require('../middleware/asyncWrapper.js')

const getAllCourses = async(req,res) => {
    // let query = req.query;
    
    // let page = query.page;
    // let limit = query.limit;
    // let skip = (page - 1) * limit;
    let courses = await courseModel.find();

    res.json({Status:SUCCESS , data: {courses}})
}

const getCourse = asyncWraper(async(req,res,next) => {

    let course = await courseModel.findById(req.params.courseID);
    
        if (!course){
            const error = new Error();
            error.message = 'Course not found';
            return next(error)
            // return res.status(404).json({Status:FAIL , data: {course:"Course not found"}});
        }
        return res.json({Status:SUCCESS , data:{course}});
    
    // try {
        
    // } catch (error) {
    //     res.status(400).json({Status: ERROR , message: error.message , data: null , code:400});
    // }
}
)
const addCourse = async(req,res) => {

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        
        return res.status(400).json({Status: FAIL , data:errors.array()})
    }

    // let newCourse = req.body
    // await courseModel.insertMany(newCourse);
    // or
    const newCourse = new courseModel(req.body);
    await newCourse.save();//save in database
    res.status(201).json({Status: SUCCESS , data:{newCourse}})
}

const updateCourse = async(req,res) => {
    let courseID = req.params.courseID;

    try {
        let course = await courseModel.findByIdAndUpdate(courseID,{$set:{ ...req.body }},{new:true});

        res.status(200).json({Status:SUCCESS , data: {course}});
    } catch (error) {
        res.status(400).json({Status:ERROR , message: error.message });
    }
    
}

const deleteCourse = async(req,res) => {
    await courseModel.deleteOne({_id:req.params.courseID});
    
    res.status(200).json({status:SUCCESS ,data : null});
}


module.exports = {
    getAllCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
}