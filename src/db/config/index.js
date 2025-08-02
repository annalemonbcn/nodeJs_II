import mongoose from "mongoose";
import config from "../../config/config.js";

const MONGO_URI = config.MONGO_URI;
const DB_NAME = config.DB_NAME;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectToDatabase;
