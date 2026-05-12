import mongoose from "mongoose";
const connectDB = async () => {
    
try {
        const connectionInstance = await mongoose.connect
        (process.env.MONGODB_URI)
        console.log(`\n mongoose connected
            ${connectionInstance.connection.host}`);

        
        
    } catch (error) {
        console.log("mongoose connection failed", error);
            // Don't exit process, just log the error
            // process.exit(1)

            };

        
    };
    export default connectDB;





    