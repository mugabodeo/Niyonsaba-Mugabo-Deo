import Mongoose from "mongoose"
import validator from "validator";

const commentSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    isAsync: true,
    validate: function (email) {
      return validator.isEmail(email);
    },
    message: "{email} is not a valid email!"
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

export default Mongoose.model("Comment", commentSchema, "comments");