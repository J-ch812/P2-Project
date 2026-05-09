import express from "express";
import userRouter from '../router/user.router.js';
import cors from "cors";
import submissionRouter from '../router/submission.js';

   
const web = express (); 

web.use(cors({ origin: '*' })); 


web.use(express.json());


web.use('/api', userRouter);
web.use('/api', submissionRouter);


  web.get("/", (req, res) => {
   res.send("API WORKING");
   






 
   

   });

   export default web;
// http://localhost:4000/api/





