import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "../router/user.router.js";
import submissionRouter from "../router/submission.js";
import { User } from "../profile-model/user.js";

const web = express();

web.use(cors({ origin: "*" }));
web.use(express.json());

web.delete("/api/delete_profile", async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("Received delete request with userId:", userId);
    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      console.error(
        "Database not connected. Ready state:",
        mongoose.connection.readyState,
      );
      return res.status(500).json({ message: "Database connection error" });
    }

    console.log("Attempting to delete user with ID:", userId);
    const deletedUser = await User.findByIdAndDelete(userId);
    console.log("Delete result:", deletedUser);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete profile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// web.use('/api', userRouter); --??!! is there a difference between "" and '' ?? - Delete
web.use("/api", userRouter);
web.use("/api", submissionRouter);

web.get("/", (req, res) => {
  res.send("API WORKING");
});

export default web;
// http://localhost:4000/api/