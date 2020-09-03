import express from 'express'
import Article from '../models/article' 

const router =express.Router();


//get all articles from mongo database
router.get('',async (req,res)=>{
    try{
        const allArticles=await Article.find()
        res.json(allArticles)
    } catch(err){
        res.json({message:err})
    }
})


//save an article into mongo db database
router.post('/',async (req,res)=>{

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
router.get('/:articleId', async (req,res)=>{
    try{
        const singleArticle= await Article.findById(req.params.articleId)
        res.json(singleArticle)
    }catch(err){
        res.json({message:err})
    }

    
})

//delete a specific article

router.delete('/:articleId', async(req,res)=>{
    try{
        const deleteArticle=await Article.remove({_id:req.params.articleId})
        res.json(deleteArticle)
    }catch(err){
        res.json({message:err})
    }
})

//update a specific article
router.patch('/:articleId',async (req,res)=>{
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
export default router