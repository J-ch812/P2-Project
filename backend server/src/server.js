import dotenv from "dotenv";

dotenv.config({
    path: './.env'


});
import web from "./web.js";
import connectDB from "./database.js";
import dns from "node:dns/promises";   

dns.setServers(["1.1.1.1", "1.0.0.1"]);   

const startServer = async () => {
    try {
        await connectDB();
        web.on("error", (error) => {

            console.log("error", error);
           
        });

     web.listen(process.env.PORT|| 8000, () => {
        console.log(`server is running on port:

        ${process.env.PORT}`);
     });

        }catch (error){
        console.log("MONGODB connection failed", error);

        }
        
    };
startServer();



