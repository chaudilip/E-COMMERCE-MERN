const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// varify user
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies;
    
    if(!token){
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    //if user is authenticated than get value of user = req.user
    req.user = await User.findById(decodedData.id);
  
    next();
});

// if ... then it will be array roles = array
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        //this function is for check whether the login person person is admin or not if user then throw error
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
      // if req.user.role = admin then skip this function with next() and return without anything
      next();
    };
  };
  

