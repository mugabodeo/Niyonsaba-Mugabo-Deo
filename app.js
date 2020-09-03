import express from 'express'
import Mongoose from 'mongoose'
import router from './routes/articles'
require('dotenv').config()

const app=express();
const port= process.env.PORT || 8080;


app.use(express.json())
app.use('/articles',router)

app.get('/',(req,res)=>{
    res.send('you are welcome')
})


//connect to database
Mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true,useUnifiedTopology: true},
    ()=>{
    console.log('connected to db')
    }
)

app.listen(port,()=>{
    console.log(` listening at ${port}`)
})
