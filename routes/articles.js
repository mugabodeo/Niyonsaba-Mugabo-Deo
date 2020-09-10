import express from 'express'
import Article from '../models/article' 
import VerifyToken from '../lib/verifyToken'

const articleRouter =express.Router();


//get all articles from mongo database

articleRouter.get('',async (req,res)=>{
    try{
        const allArticles=await Article.find()
        res.json(allArticles)
    } catch(err){
        res.json({message:err})
    }
})


//save an article into mongo db database
articleRouter.post('',VerifyToken,async (req,res)=>{
 
    const newArticle=new Article({
        "articleTitle":req.body.articleTitle,
        "articleCover":req.body.articleCover,   
        "articleHeadline":req.body.articleHeadline,
        "articleCategory":req.body.articleCategory,
        "articleBody":req.body.articleBody,
        "articleUpdate":req.body.articleUpdate,
    });
    try{
        const savedArticle= await newArticle.save();
        res.json(savedArticle)

    } catch(err){
        res.json({message: err})
    }
})

//get a specific article with article id
articleRouter.get('/:articleId', async (req,res)=>{
    try{
        const singleArticle= await Article.findById(req.params.articleId)
        res.json(singleArticle)
    }catch(err){
        res.json({message:err})
    }
    
})

//delete a specific article

articleRouter.delete('/:articleId',VerifyToken,async(req,res)=>{
    try{
        const deleteArticle=await Article.deleteOne({_id:req.params.articleId})
        res.json(deleteArticle)
    }catch(err){
        res.json({message:err})
    }
})

//update a specific article
articleRouter.patch('/:articleId',VerifyToken,async (req,res)=>{
    try{
        const updateArticle= await Article.updateOne(
            {_id:req.params.articleId},
            {$set:{articleUpdate:req.body.articleUpdate}}
        )
        res.json(updateArticle)
    } catch(err){
        res.json({message:err})
    }
})

export default articleRouter