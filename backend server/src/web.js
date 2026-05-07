import express from "express";
import userRouter from './router/user.router.js';

const web = express (); 


web.use(express.json());


web.use("/api/register", userRouter);


export default web;

// http://localhost:4000/api/

