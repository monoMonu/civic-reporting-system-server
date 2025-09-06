import mongoose from "mongoose"

const connectDB = async (uri: string): Promise<typeof mongoose> => {
  try {
    const conn = await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); 
  }
}

export default connectDB;