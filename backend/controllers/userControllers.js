const User = require("../models/UserModel.js")
const bcrypt = require("bcrypt")

const asyncHandler = require("../utils/asyncHandler.js")
const ApiError = require("../utils/ApiError.js")
const ApiResponse = require("../utils/ApiResponse.js")

//get all users
const getUsers = asyncHandler(async(req, res)=> {
    const [
        users,
        total,
        Frontend, 
        Backend, 
        DevOps,
    ] = await Promise.all([
        User.find({role: "employee"}).select("-password").lean(),
        User.countDocuments({role : "employee"}),
        User.countDocuments({role : "employee", team : "Frontend"}),
        User.countDocuments({role : "employee", team : "Backend"}),
        User.countDocuments({role : "employee", team : "DevOps"}),
    ])

    return res.status(200).json(
        new ApiResponse(200, {
            count : {total, Frontend, Backend, DevOps}.
            users,
        }, "Users fetched successfully")
    )
})

//get user by id
const getUserById = asyncHandler(async(req, res) => {
    const { id } = req.params;

    //Authorisation check
    if(rq.user.role !== "admin" && req.user._id.toString() !== id) {
        throw new ApiError(403, "Access denied");
    }  

    const user = await User.findById(id).select("-password")

    if(!user) {
        throw new ApiError(404, "user not found")
    }

    return res
    .status(200).
    .json(new ApiResponse(200, user, "user fetched successfully"))
})