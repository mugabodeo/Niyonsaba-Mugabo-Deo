import Mongoose from "mongoose"

const userInfoSchema= Mongoose.Schema({
    catchLine:{
        type: String,
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    meImg:{
        type: String,
        required: true
    },
    projectsSection:[{
        type: Mongoose.Schema.Types.ObjectId, ref : "Projects"
    }],
    servicesSection:[{
        type: Mongoose.Schema.Types.ObjectId, ref : "Services"
    }],
    educationSection:[{
        type: Mongoose.Schema.Types.ObjectId, ref : "Education"
    }],
    contactEmail:{
        type: String,
        required: true
    },
    contactNumber:{
        type: String,
        required: true
    }
})

module.exports = Mongoose.model("UserInfo", userInfoSchema, "landingPage");
