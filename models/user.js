import Mongoose from 'mongoose'
import validator from 'validator'

const userSchema = Mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    }
})

export default Mongoose.model('User',userSchema,'users')