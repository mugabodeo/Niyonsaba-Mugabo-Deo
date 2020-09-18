import Mongoose from "mongoose";

const articleSchema = Mongoose.Schema({
  articleTitle: {
    type: String,
    required: true
  },
  articleCover: {
    type: String,
    required: true
  },
  articleHeadline: {
    type: String,
    required: true
  },
  articleCategory: {
    type: String,
    required: true
  },
  articleBody: {
    type: String,
    required: true
  },
  articleUpdate: {
    type: Boolean,
    required: true
  },
  comments:[{type:Mongoose.Schema.Types.ObjectId,ref:'Comment'}],
  timestamp: {
    type: Date,
    default: Date.now()
  }
});

export default Mongoose.model("Article", articleSchema, "articles");
