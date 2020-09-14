import express from "express";
import UserInfo from "../models/userInfo";

const userInfoRouter = express.Router();

//get all articles from mongo database

userInfoRouter.get("", async (req, res) => {
  try {
    const allInfo = await UserInfo.find();
    res.json(allInfo);
  } catch (err) {
    res.json({ message: err });
  }
});


export default userInfoRouter;
