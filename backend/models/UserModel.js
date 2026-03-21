const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    }, 
    
    team: {
        type: String,
        enum: ["Frontend", "Backend", "DevOps"],
    },

    workType: {
        type: String,
        enum: ["full-time", "part-time"],
        default: "full-time",
    },

    role: {
        type: String,
        enum: ["admin", "employee"],
        default: "employee",
    },

    isActive: {
        type: Boolean,
        default: true,
    },
},
  { timestamps: true}
);

module.exports = mongoose.model("User", userSchema);