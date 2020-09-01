const express=require('express')
const app=express()
const port =3000

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.get('/blog',(req,res)=>{
    res.send('This is page of Blog')
})

app.listen(port,()=>{
    console.log(` listening at ${port}`)
})
