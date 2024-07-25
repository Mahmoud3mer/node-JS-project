const jwt = require('jsonwebtoken');

const { SUCCESS , ERROR , FAIL } = require('../utility/httpStatusText.js');

const verifyToken = async(req,res,next) => {
    const authToken = req.headers['Authorization'] || req.headers['authorization'];
    if (!authToken) {
        return res.status(401).json({Status: FAIL, message : 'Token is requred'})
    }
    
    const token = authToken.split(' ')[1];
    try {
        const currentUser = await jwt.verify(token, '36e6c0de43f9fdbd98c113f91782d74aa8e0aeb254dee6f01dc473e07d68f4e5');
        req.currentUser = currentUser;
        next();
    } catch (error) {
        return res.status(401).json({Status: FAIL, message : 'Invalid Token'})
    }

}


module.exports ={
    verifyToken
}