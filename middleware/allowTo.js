const { FAIL } = require("../utility/httpStatusText.js");
const userRoles = require("../utility/userRoles.js")

module.exports = (...roles) =>{
    return (req,res,next) => {
        if (!roles.includes(req.currentUser.role))
            return res.json({status:FAIL,message:"Not allowed to you to access"});
        
        next();
    }
}