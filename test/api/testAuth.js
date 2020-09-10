import chai from 'chai'
import chaiHttp from 'chai-http'
import server from "../../app"
import  Mongoose  from 'mongoose';

let expect=chai.expect;
let should = chai.should();
let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUyNzlmYzRiMWNhNTA2MjJmZTg2ZGEiLCJpYXQiOjE1OTkyNTAzNTl9.6ZuKOGCY0pZ2yDwGrRnr6J3Ts2k13pMKq-hOkCQzkA0'

let login_details={
    email:"mugabodeo6@gmail.com",
    password:"pass123"
}
let new_user={
    name:"hope alexis",
    email:"hopealexis@gmail.com",
    password:"123pass"
}


chai.use(chaiHttp);
describe('auth tests /auth',()=>{

    beforeEach((done)=>{
        Mongoose.connection.collections.users.drop(()=>{
            done()
        })
    })
    it('user is succesful logged in',(done)=>{
        chai
        .request(server)
        .post('/auth/login')
        .send(login_details)
        .end((err,res)=>{
            if (err) done(err);
            res.should.have.status(200);
            done()
        })
    })

    it('created a user successfully',(done)=>{
        chai
        .request(server)
        .post('/auth/register')
        .set({ 'auth-token': token })
        .send(new_user)
        .end((err,res)=>{
            if (err) done(err);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("email")
            done()
        })
    })
  
})

