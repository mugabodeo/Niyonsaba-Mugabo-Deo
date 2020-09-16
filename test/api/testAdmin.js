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
  contactEmail: "mugabodeo6@gmail.com",
  contactNumber: "0782296231",
};

let landingSectionUpdate = {
  catchLine: "a FullStack Web Developer[updated]",
  fullName: "Niyonsaba Mugabo Deo[updated]",
  meImg:
    "https://firebasestorage.googleapis.com/v0/b/niyonsaba-blog.appspot.com/o/landingPage%2Fme.png?alt=media&token=b1eadf4b-e669-4f7e-92e4-81e8eba80361",
};

let contactSectionUpdate = {
  contactEmail: "mugabodeo6@gmail.com[updated]",
  contactNumber: "Niyonsaba Mugabo Deo[updated]",
};

let projectsSectionAdd = {
  projectBody:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vero quos maiores sed consectetur illo earum cum perferendis voluptatem?",
  projectImg:
    "https://firebasestorage.googleapis.com/v0/b/niyonsaba-blog.appspot.com/o/landingPage%2FroboCop.png?alt=media&token=1ef59086-88d6-4ff1-81cb-710133dc4a69",
  projectTitle: "Embedded System Design",
};

let servicesSectionAdd = {
  serviceFeatures:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vero quos maiores sed consectetur illo earum cum perferendis voluptatem?",
  serviceImg:
    "https://firebasestorage.googleapis.com/v0/b/niyonsaba-blog.appspot.com/o/landingPage%2FroboCop.png?alt=media&token=1ef59086-88d6-4ff1-81cb-710133dc4a69",
  serviceTitle: "Embedded System Design",
};

let educationSectionAdd = {
  educationBody:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vero quos maiores sed consectetur illo earum cum perferendis voluptatem?",
  educationImg:
    "https://firebasestorage.googleapis.com/v0/b/niyonsaba-blog.appspot.com/o/landingPage%2FroboCop.png?alt=media&token=1ef59086-88d6-4ff1-81cb-710133dc4a69",
  educationPeriod: "2016-2020",
  educationTitle: "Embedded System Design",
};

let projectsSectionUpdate = {
  projectBody:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vero quos maiores sed consectetur illo earum cum perferendis voluptatem?[updated]",
  projectImg:
    "https://firebasestorage.googleapis.com/v0/b/niyonsaba-blog.appspot.com/o/landingPage%2FroboCop.png?alt=media&token=1ef59086-88d6-4ff1-81cb-710133dc4a69",
  projectTitle: "Embedded System Design[updated]",
};

let servicesSectionUpdate = {
  serviceFeatures:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vero quos maiores sed consectetur illo earum cum perferendis voluptatem?[updated]",
  serviceImg:
    "https://firebasestorage.googleapis.com/v0/b/niyonsaba-blog.appspot.com/o/landingPage%2FroboCop.png?alt=media&token=1ef59086-88d6-4ff1-81cb-710133dc4a69",
  serviceTitle: "Embedded System Design[updated]",
};

let educationSectionUpdate = {
  educationBody:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vero quos maiores sed consectetur illo earum cum perferendis voluptatem?[updated]",
  educationImg:
    "https://firebasestorage.googleapis.com/v0/b/niyonsaba-blog.appspot.com/o/landingPage%2FroboCop.png?alt=media&token=1ef59086-88d6-4ff1-81cb-710133dc4a69",
  educationPeriod: "2016-2020",
  educationTitle: "Embedded System Design[updated]",
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

  //testing adding contents to projects section
  it("added projectCard successfully", (done) => {
    chai
      .request(server)
      .post("/admin/updateProjectsSection/add")
      .set({ "auth-token": token })
      .send(projectsSectionAdd)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  //testing adding contents to services section
  it("added serviceCard successfully", (done) => {
    chai
      .request(server)
      .post("/admin/updateServiceSection/add")
      .set({ "auth-token": token })
      .send(servicesSectionAdd)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  //testing adding contents to education section
  it("added educationCard successfully", (done) => {
    chai
      .request(server)
      .post("/admin/updateEducationSection/add")
      .set({ "auth-token": token })
      .send(educationSectionAdd)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  //testing updating landing section
  it("updated landing section successfully", (done) => {
    chai
      .request(server)
      .patch("/admin/updateLandingSection")
      .set({ "auth-token": token })
      .send(landingSectionUpdate)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  //testing for updating a single projectCard
  it("Successful, update a single projectCard", function (done) {
    chai
      .request(server)
      .get("/admin/getProjectsSection")
      .set({ "auth-token": token })
      .end((err, res) => {
        chai
          .request(server)
          .patch("/admin/updateProjectsSection/" + res.body[0]._id)
          .set({ "auth-token": token })
          .send(projectsSectionUpdate)
          .end((err, res) => {
            if (err) done(err);
            res.should.have.status(200);
            done();
          });
      });
  });

  //testing for deleting a single projectCard
  it("Successful, delete a single projectCard", function (done) {
    chai
      .request(server)
      .get("/admin/getProjectsSection")
      .set({ "auth-token": token })
      .end((err, res) => {
        chai
          .request(server)
          .delete("/admin/updateProjectsSection/" + res.body[0]._id)
          .set({ "auth-token": token })
          .end((err, res) => {
            if (err) done(err);
            res.should.have.status(200);
            done();
          });
      });
  });

  //testing for updating a single serviceCard
  it("Successful, update a single serviceCard", function (done) {
    chai
      .request(server)
      .get("/admin/getServicesSection")
      .set({ "auth-token": token })
      .end((err, res) => {
        chai
          .request(server)
          .patch("/admin/updateServiceSection/" + res.body[0]._id)
          .set({ "auth-token": token })
          .send(servicesSectionUpdate)
          .end((err, res) => {
            if (err) done(err);
            res.should.have.status(200);
            done();
          });
      });
  });

  //testing for deleting a single serviceCard
  it("Successful, delete a single serviceCard", function (done) {
    chai
      .request(server)
      .get("/admin/getServicesSection")
      .set({ "auth-token": token })
      .end((err, res) => {
        chai
          .request(server)
          .delete("/admin/updateServiceSection/" + res.body[0]._id)
          .set({ "auth-token": token })
          .end((err, res) => {
            if (err) done(err);
            res.should.have.status(200);
            done();
          });
      });
  });

  //testing for updating a single educationCard
  it("Successful, update a single educationCard", function (done) {
    chai
      .request(server)
      .get("/admin/getEducationSection")
      .set({ "auth-token": token })
      .end((err, res) => {
        chai
          .request(server)
          .patch("/admin/updateEducationSection/" + res.body[0]._id)
          .set({ "auth-token": token })
          .send(educationSectionUpdate)
          .end((err, res) => {
            if (err) done(err);
            res.should.have.status(200);
            done();
          });
      });
  });

  //testing for deleting a single educationCard
  it("Successful, delete a single educationCard", function (done) {
    chai
      .request(server)
      .get("/admin/getEducationSection")
      .set({ "auth-token": token })
      .end((err, res) => {
        chai
          .request(server)
          .delete("/admin/updateEducationSection/" + res.body[0]._id)
          .set({ "auth-token": token })
          .end((err, res) => {
            if (err) done(err);
            res.should.have.status(200);
            done();
          });
      });
  });
  //testing updating contact section
  it("updated contact section successfully", (done) => {
    chai
      .request(server)
      .patch("/admin/updateContactSection")
      .set({ "auth-token": token })
      .send(contactSectionUpdate)
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
