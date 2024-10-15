import mongoose from "mongoose";
import { DB_NAME } from "../../constant.js";
import dotenv from "dotenv"

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.LOCAL_DB_URL}/${DB_NAME}`);
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log("MONGODB CONNECTION ERROR: ",error);
    }
}

export default connectDB;