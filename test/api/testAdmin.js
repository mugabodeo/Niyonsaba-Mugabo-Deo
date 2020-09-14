import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../app";
import Mongoose from "mongoose";

let expect = chai.expect;
let should = chai.should();
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUyNzlmYzRiMWNhNTA2MjJmZTg2ZGEiLCJpYXQiOjE1OTkyNTAzNTl9.6ZuKOGCY0pZ2yDwGrRnr6J3Ts2k13pMKq-hOkCQzkA0";

let login_details = {
  email: "mugabodeo6@gmail.com",
  password: "pass123",
};
let new_user = {
  name: "hope alexis",
  email: "hopealexis@gmail.com",
  password: "123pass",
};
let new_article = {
  articleTitle: "article",
  articleCover: "cover",
  articleHeadline: " new  app",
  articleCategory: "devops",
  articleBody: "WElcome",
  articleUpdate: "false",
};

let update_article = {
  articleUpdate: "true",
};

let user_profile = {
  catchLine: "a FullStack Web Developer",
  fullName: "Niyonsaba Mugabo Deo",
  meImg:
    "https://firebasestorage.googleapis.com/v0/b/niyonsaba-blog.appspot.com/o/landingPage%2Fme.png?alt=media&token=b1eadf4b-e669-4f7e-92e4-81e8eba80361",
  projectsSection: [
    {
      projectBody:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vero quos maiores sed consectetur illo earum cum perferendis voluptatem?",
      projectImg:
        "https://firebasestorage.googleapis.com/v0/b/niyonsaba-blog.appspot.com/o/landingPage%2FroboCop.png?alt=media&token=1ef59086-88d6-4ff1-81cb-710133dc4a69",
      projectTitle: "Embedded System Design[edited]",
    },
  ],
  servicesSection: [
    {
      serviceFeatures: "Database Design,Deployment,Hosting",
      serviceImg:
        "https://firebasestorage.googleapis.com/v0/b/niyonsaba-blog.appspot.com/o/landingPage%2Fmeanstack.png?alt=media&token=1be2d852-c3cc-4e56-b8fa-5003d0b27fc2",
      serviceTitle: "Full Stack Web Development",
    },
  ],
  educationSection: [
    {
      educationBody:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima voluptates inventore dignissimos officia ipsa molestias fugit voluptatum rem magni corporis illum, quos doloremque nihil architecto hic molestiae. Voluptas, quasi labore.",
      educationImg:
        "https://firebasestorage.googleapis.com/v0/b/niyonsaba-blog.appspot.com/o/landingPage%2Fkeycompetences.png?alt=media&token=feb3dd78-dcea-4ac0-ba67-decc331e0a35",
      educationPeriod: "2016-2019",
      educationTitle: "Bachelor of Computer Engineering",
    },
  ],
  contactEmail: "mugabodeo6@gmail.com",
  contactNumber: "0782296231",
};

chai.use(chaiHttp);
describe("auth tests /admin", () => {
  beforeEach((done) => {
    Mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  //testing login
  it("user is succesful logged in", (done) => {
    chai
      .request(server)
      .post("/admin/login")
      .set({ "auth-token": token })
      .send(login_details)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });

  //testing user registration
  it("created a user successfully", (done) => {
    chai
      .request(server)
      .post("/admin/register")
      .set({ "auth-token": token })
      .send(new_user)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("email");
        done();
      });
  });

  //testing creating user profile
  it("created a user profile successfully", (done) => {
    chai
      .request(server)
      .post("/admin/saveUserProfile")
      .set({ "auth-token": token })
      .send(user_profile)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
 
  //test for creating an article
  it("Successful, created an article", function (done) {
    chai
      .request(server)
      .post("/admin/saveArticle")
      .set({ "auth-token": token })
      .send(new_article)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("articleTitle");
        done();
      });
  });

  //test for updating a single article
  it("Successful, updated an article", function (done) {
    chai
      .request(server)
      .get("/articles")
      .end((err, res) => {
        chai
          .request(server)
          .patch("/admin/articles/" + res.body[0]._id)
          .set({ "auth-token": token })
          .send(update_article)
          .end((err, res) => {
            if (err) done(err);
            res.should.have.status(200);
            done();
          });
      });
  });

  //test for deleting a single  article
  it("Successful, delete an article", function (done) {
    chai
      .request(server)
      .get("/articles")
      .end((err, res) => {
        chai
          .request(server)
          .delete("/admin/articles/" + res.body[0]._id)
          .set({ "auth-token": token })
          .end((err, res) => {
            if (err) done(err);
            res.should.have.status(200);
            done();
          });
      });
  });
});
