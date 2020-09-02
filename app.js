import express from 'express'
import bodyParser from 'body-parser'

const app=express();
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.get('/blog',(req,res)=>{
    res.send('This is page of Blog')
})

app.listen(3500,()=>{
    console.log(` listening at 3500`)
})
