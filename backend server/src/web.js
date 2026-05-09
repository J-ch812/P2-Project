import express from "express";
import userRouter from '../router/user.router.js';
import cors from "cors";
import submissionRouter from '../router/submission.js';

   
const web = express (); 

web.use(cors({ origin: '*' })); 


web.use(express.json());


web.use('/api', userRouter);
<<<<<<< HEAD
web.use('/api', submissionRouter);
=======
web.use('/uploads', express.static('uploads'));
            
>>>>>>> 6b328b3b93ee8ac91d4ffb7d9bd1b22df8ca551f


  web.get("/", (req, res) => {
   res.send("API WORKING");
   






 
   

   });

   export default web;
// http://localhost:4000/api/





