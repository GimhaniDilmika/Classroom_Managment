const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (e) {
        console.error("MongoDB connection error:", e.message);
        process.exit(1);
    }
};

module.exports = connectDB;