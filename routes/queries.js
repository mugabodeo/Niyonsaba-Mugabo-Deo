import express from 'express'
import Querie from '../models/querie'

const querieRouter=express.Router();


//view all queries
querieRouter.get('/',async(req,res)=>{
    try{
        const allQueries=await Querie.find()
        res.json(allQueries)
    } catch(err){
        res.json({message:err})
    }
})


//save a querie to Db

querieRouter.post('/',async(req,res)=>{
    const newQuery=new Querie({
        "email":req.body.email,
        "name":req.body.name,
        "subject":req.body.subject
    });
    try{

        const savedQuery= await  newQuery.save();
        res.json(savedQuery)
    } catch(err){
        res.json({message:err})
    }
})

export default querieRouter