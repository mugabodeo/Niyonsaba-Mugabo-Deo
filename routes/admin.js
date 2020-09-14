import express from "express";
import VerifyToken from "../lib/verifyToken";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt, { verify } from "jsonwebtoken";
import User from "../models/user";
import UserInfo from "../models/userInfo";
import Article from "../models/article";
import userInfo from "../models/userInfo";

const adminRouter = express.Router();

//save new user
adminRouter.post("/register", VerifyToken, async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(409);
    res.json({ message: err });
  }
});

//login for already registered user
adminRouter.post("/login", VerifyToken, async (req, res) => {
  const checkEmail = validator.isEmail(req.body.email);
  if (!checkEmail) return res.json("invalid email"); //validate email from input
  const currentUser = await User.findOne({ email: req.body.email });
  if (!currentUser) return res.json("email and password is wrong"); //check if user with email exist
  const checkPass = await bcrypt.compare(
    req.body.password,
    currentUser.password
  ); //compare password hashes
  if (!checkPass) return res.json("email and password is wrong"); // check if passwords are the same

  //token of jwt
  const token = jwt.sign({ _id: currentUser.id }, process.env.TOKEN_KEY);
  res.header("auth-token".token).send(token);
});

//save user Profile
adminRouter.post("/saveUserProfile", VerifyToken, async (req, res) => {
  const userProfile = new UserInfo({
    catchLine: req.body.catchLine,
    fullName: req.body.fullName,
    meImg: req.body.meImg,
    projectsSection: [
      {
        projectBody: req.body.projectsSection[0].projectBody,
        projectImg: req.body.projectsSection[0].projectImg,
        projectTitle: req.body.projectsSection[0].projectTitle,
      },
    ],
    servicesSection: [
      {
        serviceFeatures: req.body.servicesSection[0].serviceFeatures,
        serviceImg: req.body.servicesSection[0].serviceImg,
        serviceTitle: req.body.servicesSection[0].serviceTitle,
      },
    ],
    educationSection: [
      {
        educationBody: req.body.educationSection[0].educationBody,
        educationImg: req.body.educationSection[0].educationImg,
        educationPeriod: req.body.educationSection[0].educationPeriod,
        educationTitle: req.body.educationSection[0].educationTitle,
      },
    ],
    contactEmail: req.body.contactEmail,
    contactNumber: req.body.contactNumber,
  });

  try {
    const savedUserProfile = await userProfile.save();
    res.json(savedUserProfile);
  } catch (err) {
    res.json({ message: err });
  }
});

//update user profile on landing sections
adminRouter.patch("/updateLandingSection", VerifyToken, async (req, res) => {
  try {
    const getOneDocument = await userInfo.findOne();
    const updateLandingSection = await userInfo.updateOne(
      { _id: getOneDocument._id },
      {
        $set: {
          catchLine: req.body.catchLine,
          fullName: req.body.fullName,
          meImg: req.body.meImg,
        },
      }
    );
    res.json(updateLandingSection);
  } catch (err) {
    res.json({ message: err });
  }
});

//add a projectCard
adminRouter.patch(
  "/updateProjectsSection/add",
  VerifyToken,
  async (req, res) => {
    try {
      const getOneDocument = await userInfo.findOne();
      getOneDocument.projectsSection.push({
        projectBody: req.body.projectBody,
        projectImg: req.body.projectImg,
        projectTitle: req.body.projectTitle,
      });
      const updatedDoc = await getOneDocument.save();
      res.json(updatedDoc);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

//update user profile on education section (update a single education card)
adminRouter.patch(
  "/updateEducationSection/:educationCardId",
  VerifyToken,
  async (req, res) => {
    try {
      const updateEducationSection = await userInfo.updateOne(
        { _id: req.params.educationCardId },
        {
          $addToSet: {
            educationSection: [
              {
                educationBody: req.body.educationBody,
                educationImg: req.body.educationImg,
                educationPeriod: req.body.educationPeriod,
                educationTitle: req.body.educationTitle
              },
            ],
          },
        }
      );
      res.json(updateEducationSection);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

//update user profile on services section (delete a single service card)
adminRouter.delete(
  "/updateEducationSection/:educationCardId",
  VerifyToken,
  async (req, res) => {
    try {
      const updateEducationSection = await userInfo.deleteOne({
        _id: req.params.educationCardId,
      });
      res.json(updateEducationSection);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

//update user profile on services section (delete a single service card)
adminRouter.patch(
  "/updateProjectsSection/:projectCardId",
  VerifyToken,
  async (req, res) => {
    try {
      const updateProjectsSection = await userInfo.deleteOne({
        _id: req.params.projectCardId,
      });
      res.json(updateContactSection);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

//update user profile on contact sections
adminRouter.patch("/updateContactSection", VerifyToken, async (req, res) => {
  try {
    const getDocumentId = await userInfo.findOne();
    const updateContactSection = await userInfo.updateOne(
      { _id: getDocumentId._id },
      {
        $set: {
          contactEmail: req.body.contactEmail,
          contactNumber: req.body.contactNumber,
        },
      }
    );
    res.json(updateContactSection);
  } catch (err) {
    res.json({ message: err });
  }
});

//save an article into mongo db database
adminRouter.post("/saveArticle", VerifyToken, async (req, res) => {
  const newArticle = new Article({
    articleTitle: req.body.articleTitle,
    articleCover: req.body.articleCover,
    articleHeadline: req.body.articleHeadline,
    articleCategory: req.body.articleCategory,
    articleBody: req.body.articleBody,
    articleUpdate: req.body.articleUpdate,
  });
  try {
    const savedArticle = await newArticle.save();
    res.json(savedArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete a specific article and delete all comment
adminRouter.delete("/articles/:articleId", VerifyToken, async (req, res) => {
  try {
    const deleteArticle = await Article.deleteOne({
      _id: req.params.articleId,
    });
    res.json(deleteArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

//update a specific article
adminRouter.patch("/articles/:articleId", VerifyToken, async (req, res) => {
  try {
    const updateArticle = await Article.updateOne(
      { _id: req.params.articleId },
      { $set: { articleUpdate: req.body.articleUpdate } }
    );
    res.json(updateArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

export default adminRouter;
