import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("\n MongoDB Connection Failed \n", error);
        process.exit(1);
    }
};

export default connectDB;