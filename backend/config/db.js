const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI, {serverSelectionTimeoutMS: 5000})
            console.log("MongoDB connected");               
    }
    catch(error) {
        console.log("MongoDB connection error:", error);
        process.exit(1);
        
    }
}

module.exports = connectDB;