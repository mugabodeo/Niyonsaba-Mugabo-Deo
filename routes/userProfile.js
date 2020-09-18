import express from "express";
import UserInfo from "../models/userInfo";

const userInfoRouter = express.Router();

//get all articles from mongo database

userInfoRouter.get("/", async (req, res) => {
  res.json('Welcome to my blog api, start by navigating to /api-docs to read documentation')
})
userInfoRouter.get("/api", async (req, res) => {
  try {
    const allInfo = await UserInfo.find()
        .populate("projectsSection")
        .populate("servicesSection")
        .populate("educationSection")
    res.json(allInfo);
  } catch (err) {
    res.json({ message: err });
  }
});



export default userInfoRouter;
