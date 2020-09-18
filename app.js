import express from "express";
import Mongoose from "mongoose";
import articleRouter from "./routes/articles";
import querieRouter from "./routes/queries";
import userInfoRouter from "./routes/userProfile";
import adminRouter from "./routes/admin";
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./myBlog_1.0.json");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

//defining routes

app.use("/", userInfoRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/articles", articleRouter);
app.use("/queries", querieRouter);
app.use("/admin", adminRouter);

//connect to database
Mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then((res) => {
    console.log("database connnected");
    //starting a server
    app.listen(port, () => {
      console.log(` listening at ${port}`);
    });
  })
  .catch((err) => {
    console.log("failed to connect to database", err);
  });

export default app;
