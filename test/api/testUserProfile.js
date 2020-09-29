import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../app";

chai.use(chaiHttp);
let expect = chai.expect;
let should = chai.should();

describe("CRUD tests for /api", () => {
  //test for retrieving all articles
  it("Successful, get assets for landing page", function (done) {
    chai
      .request(server)
      .get("/api")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("CRUD tests for /", () => {
  //test for retrieving all articles
  it("Welcome page", function (done) {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
