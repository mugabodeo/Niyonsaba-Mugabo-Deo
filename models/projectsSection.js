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
export default Mongoose.model("Projects", projectsSectionSchema,"projectsSection")