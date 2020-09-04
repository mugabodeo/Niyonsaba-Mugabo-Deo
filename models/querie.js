import Mongoose from "mongoose"
import validator from 'validator';


const queriesSchema=Mongoose.Schema({
    email:{
        type:String,
        required:true,
        isAsync: true,
        validate:function(email){
            return validator.isEmail(email);
        },
        message: '{email} is not a valid email!'
    },
    name:{
        type:String,
        required:true
    },   
    subject:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export default Mongoose.model('Querie',queriesSchema,'queries')