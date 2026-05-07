import express from "express";
import userRouter from '../router/user.router.js';
import cors from "cors";

   
const web = express (); 

web.use(cors({ origin: '*' })); 


web.use(express.json());


web.use('/api', userRouter);
            


  web.get("/", (req, res) => {
   res.send("API WORKING");





 
   

   });

   export default web;
// http://localhost:4000/api/

