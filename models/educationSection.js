import Mongoose from "mongoose"

const educationSectionSchema= Mongoose.Schema({
    educationBody:{
        type: String,
        required: true
    },
    educationImg:{
        type: String,
        required: true
    },
    educationPeriod:{
        type: String,
        required: true
    },
    educationTitle:{
        type: String,
        required: true
    }
})

export default  Mongoose.model("Education", educationSectionSchema,"educationSection")