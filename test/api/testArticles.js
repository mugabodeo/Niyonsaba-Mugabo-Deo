import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../app";

chai.use(chaiHttp);
let expect = chai.expect;
let should = chai.should();
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUyNzlmYzRiMWNhNTA2MjJmZTg2ZGEiLCJpYXQiOjE1OTkyNTAzNTl9.6ZuKOGCY0pZ2yDwGrRnr6J3Ts2k13pMKq-hOkCQzkA0";
let article_id = "5f52a302a406fb0a72083c7a";
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

describe("CRUD tests for /articles", () => {
  //test for creating an article
  it("Successful, created an article", function (done) {
    chai
      .request(server)
      .post("/articles")
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

  //test for retrieving all articles
  it("Successful, get all articles", function (done) {
    chai
      .request(server)
      .get("/articles")
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  });

  //test for retrieving a single articles
  it("Successful, get single articles", function (done) {
    chai
      .request(server)
      .get("/articles")
      .end((err, res) => {
        chai
          .request(server)
          .get("/articles/" + res.body[0]._id)
          .end((err, res) => {
            if (err) done(err);
            res.should.have.status(200);
            done();
          });
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
          .patch("/articles/" + res.body[0]._id)
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
      .end((err,res)=>{
        chai
        .request(server)  
        .delete("/articles/" + res.body[0]._id)
        .set({ "auth-token": token })
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          done();
        });
      })
  });
});
