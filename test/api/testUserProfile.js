import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../app";

chai.use(chaiHttp);
let expect = chai.expect;
let should = chai.should();

describe("CRUD tests for /index", () => {
  //test for retrieving all articles
  it("Successful, get assets for landing page", function (done) {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        done();
      });
  }); 
});


