import Mongoose from "mongoose"

const projectsSectionSchema= Mongoose.Schema({
    projectBody:{
        type: String,
        required: true
    },
    projectImg:{
        type: String,
        required: true
    },
    projectTitle:{
        type: String,
        required: true
    }
})

const servicesSectionSchema= Mongoose.Schema({
    serviceFeatures:{
        type: String,
        required: true
    },
    serviceImg:{
        type: String,
        required: true
    },
    serviceTitle:{
        type: String,
        required: true
    }
})

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
    projectsSection:[projectsSectionSchema],
    servicesSection:[servicesSectionSchema],
    educationSection:[educationSectionSchema],
    contactEmail:{
        type: String,
        required: true
    },
    contactNumber:{
        type: String,
        required: true
    }
})

export default Mongoose.model("UserInfo", userInfoSchema, "landingPage");