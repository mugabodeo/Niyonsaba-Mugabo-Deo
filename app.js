import express from 'express'
import bodyParser from 'body-parser'

const app=express();
const port= process.env.PORT || 8080;
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.get('/blog',(req,res)=>{
    res.send('This is page of Blog')
})

app.listen(port,()=>{
    console.log(` listening at 3500`)
})
