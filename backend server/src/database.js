import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`\n mongoose connected ${connectionInstance.connection.host}`);
  } catch (error) {
    // Do not exit process, just log the error
    console.log("Mongoose connection failed", error);
  }
};
export default connectDB;