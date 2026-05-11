import express from "express";
import cors from "cors";
import userRouter from '../router/user.router.js';
import submissionRouter from '../router/submission.js';

/* import User from "../models/user.model.js"; */ /* for delete profile route --??-- is this the correct way to import it? */


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