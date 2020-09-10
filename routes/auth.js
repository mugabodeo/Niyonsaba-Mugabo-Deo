import express from 'express'
import User from '../models/user'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import VerifyToken from '../lib/verifyToken'

const authRouter=express.Router();
//save new user
authRouter.post('/register',VerifyToken,async (req,res)=>{

    const salt= await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(req.body.password,salt)
  

    const newUser= new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });

    try{
        const savedUser=await newUser.save();
        res.json(savedUser)
    }catch(err){
        res.status(409)
        res.json({message:err})
    }

});

//login for already registered user
authRouter.post('/login',async (req,res)=>{
    const checkEmail=validator.isEmail(req.body.email)
    if(!checkEmail) return res.json('invalid email') //validate email from input
    const currentUser=await User.findOne({email:req.body.email})
    if(!currentUser) return res.json('email and password is wrong') //check if user with email exist
    const checkPass=await bcrypt.compare(req.body.password,currentUser.password) //compare password hashes
    if(!checkPass) return res.json('email and password is wrong') // check if passwords are the same 
    
    //token of jwt
    const token=jwt.sign({_id:currentUser.id},process.env.TOKEN_KEY)
    res.header('auth-token'.token).send(token)
});

export default authRouter