
const Shift = require("../models/ShiftModels")
const moment = require("moment-timezone")

const asyncHandler = require("../utils/asyncHandler.js")
const ApiError = require("../utils/ApiError.js")
const ApiResponse = require("../utils/ApiResponse.js")

// get shifts - fetch all shifts for a given month
// if the user is admin fetch all shifts
// if not then only for that user id
const getShifts = asyncHandler(async(req, res)=> {
    const {start} = req.query;

    if(!start) {
        throw new ApiError(400, "start date is required")
    }

    const startOfMonth = moment(start).startOf("month").toDate
    const endOfMonth = moment(start).endOf("month").toDate

    let filter = {
        start : {$gte:startOfMonth , $lte:endOfMonth},
    }

    if(req.user.role !== "admin") {
        filter.employee = req.user._id;
    }

    const shifts = await Shift.find(filter)
    .populate("employee", "name email team workType")
    .lean()

    const count = await Shift.countDocuments(filter)

    return res.status(200).json(new ApiResponse(200, {count, shifts}, "shifts fetched successfully"))
})

