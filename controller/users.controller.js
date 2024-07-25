
const { userModel } = require('../models/user.model.js');
const { ERROR , FAIL , SUCCESS } = require('../utility/httpStatusText.js');
const asyncWraper = require('../middleware/asyncWrapper.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const getAllUsers = asyncWraper(async(req,res,next) => {
    let users = await userModel.find({},{'__v': false,'password': false});

    // const {authorization} = req.headers;
    // console.log(authorization);

    res.json({Status:SUCCESS , data: {users}})
}
)

const register = asyncWraper(async(req,res) => {
    const addUser = req.body;
    const founedUser = await userModel.findOne({email:addUser.email});
    if (founedUser) {
        return res.status(400).json({Status:ERROR , message: 'You alredy registered'});
    }

    const hashPassword = bcrypt.hashSync(addUser.password, 8);
    addUser.password = hashPassword;

    // generate token
    const token = await jwt.sign({id: addUser._id ,email: addUser.email, role:addUser.role},'36e6c0de43f9fdbd98c113f91782d74aa8e0aeb254dee6f01dc473e07d68f4e5',{expiresIn:'1h'})
    console.log(token)
    addUser.token = token;

    // upload file
    addUser.avatar = req.file.filename;

    await userModel.insertMany(addUser)
    res.status(201).json({Status:SUCCESS , data: {addUser}})
})

const login = asyncWraper(async(req,res) => {
    const user = req.body;
    const founedUser = await userModel.findOne({email:user.email}); 

    const match = await bcrypt.compareSync(user.password, founedUser.password);

    if (!founedUser || !match)
        return res.status(404).json({Status:FAIL,message: "User not register"})

    // generate token
    const token = await jwt.sign({email: founedUser.email, id: founedUser._id,role:founedUser.role},'36e6c0de43f9fdbd98c113f91782d74aa8e0aeb254dee6f01dc473e07d68f4e5',{expiresIn:'1h'})
    founedUser.token = token;


    res.status(201).json({Status:SUCCESS, data:{Token: founedUser.token}})
})

module.exports = {
    getAllUsers, 
    register,
    login
} 