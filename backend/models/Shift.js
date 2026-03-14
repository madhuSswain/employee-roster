const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },

    start: { type: Date, required: true },
    end: { type: Date, required: true},
    notes: {
        type: String,
        trim: true,
    },
},
   { timestamp: true }

);

module.export = mongoose.model("Shift", shiftSchema)