import express from "express";
import Article from "../models/article";
import VerifyToken from "../lib/verifyToken";
import Comment from "../models/comment";

const articleRouter = express.Router();

//get all articles from mongo database

articleRouter.get("", async (req, res) => {
  try {
    const allArticles = await Article.find();
    res.json(allArticles);
  } catch (err) {
    res.json({ message: err });
  }
});


//get a specific article with article id and get all comments
articleRouter.get("/:articleId", async (req, res) => {
  try {
    const singleArticle = await Article.findOne({
      _id: req.params.articleId,
    }).populate("comments");
    res.json(singleArticle);
  } catch (err) {
    res.json({ message: err });
  }
});



//add new comment to an specific article
articleRouter.post("/:articleId/newComment", async (req, res) => {
  const newComment = new Comment({
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
  });

  try {
    const savedComment = await newComment.save();
    const getArticle = await Article.findOne({ _id: req.params.articleId });
    getArticle.comments.push(savedComment._id);
    const saveComment = await getArticle.save();
    res.json(savedComment);
  } catch (err) {
    res.json({ message: err });
  }
});

export default articleRouter;
