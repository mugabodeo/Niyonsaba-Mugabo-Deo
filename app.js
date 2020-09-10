import express from 'express'
import Mongoose from 'mongoose'
import articleRouter from './routes/articles'
import querieRouter from './routes/queries'
import authRouter from './routes/auth'

require('dotenv').config()
const app=express();
const port= process.env.PORT || 8080;

app.use(express.json())

//defining routes
app.get('/',(req,res)=>{
    res.send('you are welcome')
})
app.use('/articles',articleRouter)
app.use('/queries',querieRouter)
app.use('/auth',authRouter)

//connect to database
Mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true,useUnifiedTopology: true},
).then((res)=>{
  console.log('database connnected')
})
.catch((err)=>{
  console.log('failed to connect to database',err)
})

//starting a server
export default app.listen(port,()=>{
    console.log(` listening at ${port}`)
})





