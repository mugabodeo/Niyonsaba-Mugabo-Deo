import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../app";

chai.use(chaiHttp);
let expect = chai.expect;
let should = chai.should();

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUyNzlmYzRiMWNhNTA2MjJmZTg2ZGEiLCJpYXQiOjE1OTkyNTAzNTl9.6ZuKOGCY0pZ2yDwGrRnr6J3Ts2k13pMKq-hOkCQzkA0";



let new_comment={
  name:"Niyonsaba Mugabo Deo",  
  email:"mugabodeo6@gmail.com",
  comment:"testing new comment"
  
}

describe("CRUD tests for /articles", () => {

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

  //test for inserting  a new comment article
    it("Successful, insert new comment", function (done) {
      chai
        .request(server)
        .get("/articles")
        .end((err,res)=>{
          chai
          .request(server)  
          .post("/articles/" + res.body[0]._id + "/newComment")
          .send(new_comment)
          .end((err, res) => {
            if (err) done(err);
            res.should.have.status(200);
            done();
          });
        })
    });
});


