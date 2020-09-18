import express from "express";
import VerifyToken from "../lib/verifyToken";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt, { verify } from "jsonwebtoken";
import User from "../models/user";
import UserInfo from "../models/userInfo";
import Article from "../models/article";
import userInfo from "../models/userInfo";
import Projects from "../models/projectsSection";
import Services from "../models/servicesSection";
import Education from "../models/educationSection"

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
adminRouter.post("/login", async (req, res) => {
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
adminRouter.post(
  "/updateProjectsSection/add",
  VerifyToken,
  async (req, res) => {
    try {
      
      const newProjectCard= new Projects({
        projectBody: req.body.projectBody,
        projectImg: req.body.projectImg,
        projectTitle: req.body.projectTitle
      })
   
      const savedProjectCard = await newProjectCard.save();
      const getUserInfoDoc = await UserInfo.findOne();
      getUserInfoDoc.projectsSection.push(savedProjectCard._id);
      const saveNewDoc = await getUserInfoDoc.save();
      res.json(savedProjectCard);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

//getting projects section
adminRouter.get(
  "/getProjectsSection",
  VerifyToken,
  async(req, res) => {
    try {
      const getProjectsSection= await Projects.find()
      res.json(getProjectsSection)
    } catch (err) {
      res.json({message: err })
    }
  }
)
//update a single projectCard
adminRouter.patch(
  "/updateProjectsSection/:projectCardId",
  VerifyToken,
  async (req, res) => {
    try {
      
      const updateProjectCard= await Projects.updateOne(
        { _id: req.params.projectCardId },
        {
        projectBody: req.body.projectBody,
        projectImg: req.body.projectImg,
        projectTitle: req.body.projectTitle
      }
      )
      res.json(updateProjectCard);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

//delete a single projectCard
adminRouter.delete(
  "/updateProjectsSection/:projectCardId",
  VerifyToken,
  async (req, res) => {
    try {
      
      const deleteProjectCard= await Projects.findOneAndRemove(
        { _id: req.params.projectCardId })
      const getUserInfoDoc = await UserInfo.findOne();
      getUserInfoDoc.projectsSection.pull(deleteProjectCard._id)
      const saveNewDoc = await getUserInfoDoc.save();  
      res.json(deleteProjectCard);
    } catch (err) {
      res.json({ message: err });
    }
  }
);



//add service card
adminRouter.post(
  "/updateServiceSection/add",
  VerifyToken,
  async (req, res) => {
    try {
      const newServiceCard= new Services({
        serviceFeatures: req.body.serviceFeatures,
        serviceImg: req.body.serviceImg,
        serviceTitle: req.body.serviceTitle
      })
   
      const savedServiceCard = await newServiceCard.save();
      const getUserInfoDoc = await UserInfo.findOne();
      getUserInfoDoc.servicesSection.push(savedServiceCard._id);
      const saveNewDoc = await getUserInfoDoc.save();
      res.json(savedServiceCard);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

//getting  services section
adminRouter.get(
  "/getServicesSection",
  VerifyToken,
  async(req, res) => {
    try {
      const getServicesSection= await Services.find()
      res.json(getServicesSection)
    } catch (err) {
      res.json({message: err })
    }
  }
)

//update a single ServiceCard
adminRouter.patch(
  "/updateServiceSection/:serviceCardId",
  VerifyToken,
  async (req, res) => {
    try {
      
      const updateServiceCard= await Services.updateOne(
        { _id: req.params.serviceCardId },
        {
        serviceFeatures: req.body.serviceFeatures,
        serviceImg: req.body.serviceImg,
        serviceTitle: req.body.serviceTitle
      }
      )
      res.json(updateServiceCard);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

//delete a single serviceCard
adminRouter.delete(
  "/updateServiceSection/:serviceCardId",
  VerifyToken,
  async (req, res) => {
    try {
      
      const deleteServiceCard= await Services.findOneAndRemove(
        { _id: req.params.serviceCardId })
      const getUserInfoDoc = await UserInfo.findOne();
      getUserInfoDoc.servicesSection.pull(deleteServiceCard._id)
      const saveNewDoc = await getUserInfoDoc.save();  
      res.json(deleteServiceCard);
    } catch (err) {
      res.json({ message: err });
    }
  }
) 

//add education card
adminRouter.post(
  "/updateEducationSection/add",
  VerifyToken,
  async (req, res) => {
    try {
      const newEducationCard= new Education({
        educationBody: req.body.educationBody,
        educationImg: req.body.educationImg,
        educationPeriod: req.body.educationPeriod,
        educationTitle: req.body.educationTitle
      })
      const savedEducationCard = await newEducationCard.save();
      const getUserInfoDoc = await UserInfo.findOne();
      getUserInfoDoc.educationSection.push(savedEducationCard._id);
      const saveNewDoc = await getUserInfoDoc.save();
      res.json(savedEducationCard);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

//getting education section
adminRouter.get(
  "/getEducationSection",
  VerifyToken,
  async(req, res) => {
    try {
      const getEducationSection=await Education.find()
      res.json(getEducationSection)
    } catch (err) {
      res.json({message: err })
    }
  }
)

//update a single educationCard
adminRouter.patch(
  "/updateEducationSection/:educationCardId",
  VerifyToken,
  async (req, res) => {
    try {
      
      const updateEducationCard= await Education.updateOne(
        { _id: req.params.educationCardId },
        {
          educationBody: req.body.educationBody,
          educationImg: req.body.educationImg,
          educationPeriod: req.body.educationPeriod,
          educationTitle: req.body.educationTitle
      }
      )
      res.json(updateEducationCard);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

//delete a single educationCard
adminRouter.delete(
  "/updateEducationSection/:educationCardId",
  VerifyToken,
  async (req, res) => {
    try {
      
      const deleteEducationCard= await Education.findOneAndRemove(
        { _id: req.params.educationCardId })
      const getUserInfoDoc = await UserInfo.findOne();
      getUserInfoDoc.educationSection.pull(deleteEducationCard._id)
      const saveNewDoc = await getUserInfoDoc.save();  
      res.json(deleteEducationCard);
    } catch (err) {
      res.json({ message: err });
    }
  }
) 

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
