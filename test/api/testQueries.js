import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../app";

chai.use(chaiHttp);
let expect = chai.expect;
let should = chai.should();

let new_querie = {
  name: "hope alexis",
  email: "hopealexis@gmail.com",
  subject: "123pass",
};

let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUyNzlmYzRiMWNhNTA2MjJmZTg2ZGEiLCJpYXQiOjE1OTkyNTAzNTl9.6ZuKOGCY0pZ2yDwGrRnr6J3Ts2k13pMKq-hOkCQzkA0'

describe("adding and get queries tests for /queries", () => {
    //test for creating a querie
    it("Successful, created a querie", function (done) {
      chai
        .request(server)
        .post("/queries")
        .send(new_querie)
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("subject");
          done();
        });
    });

    //test for getting all queries
    it("Successful, getting all queries", function (done) {
        chai
          .request(server)
          .get("/queries")
          .set({ 'auth-token': token })
          .end((err, res) => {
            if (err) done(err);
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      });
})