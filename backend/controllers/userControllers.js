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
    .status(200)
    .json(new ApiResponse(200, user, "user fetched successfully"))
})

//update user
const updateUserById = asyncHandler(async(req, res) => {
    const { id } = req.params;

    const user = await User.findById(id).select("-password")

    if(!user) {
        throw new ApiError(404, "user not found")
    }

    //update only provided fields
    user.name = req.body.name ?? user.name
    user.email = req.body.email ?? user.email
    user.team = req.body.team ?? user.team
    user.workType = req.body.workType ?? user.workType

    //boolean handling
    if(typeof req.body.isActive !== "undefined") {
        user.isActive = req.body.isActive
    }

    await user.save();

    return res.status(200).json(
        new ApiResponse(200, {
            _id: user_id,
            name: user.name,
            email: user.email,
            team: user.team,
            workType: user.workType,
            isActive: user.isActive
        }, "user updated successfully")
    )
})

//update password
const updateUserPassword = asyncHandler(async(req, res) => {
    const {password, newPassword} = req.body;

    //validation
    if(!password || !newPassword) {
        throw new ApiError(400, "Password and newPassword are required")
    }

    const user = await user.findById(req.user._id)

    if (!user) {
    throw new ApiError(404, "User not found");
    }

    //compare old password
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new ApiError(401, "Invalid password")
    }

    //hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedPassword
    await user.save()

    return res.status(200).json(new ApiResponse(200, null, "password updated successfully"))
})