import Mongoose from "mongoose";

const servicesSectionSchema = Mongoose.Schema({
  serviceFeatures: {
    type: String,
    required: true,
  },
  serviceImg: {
    type: String,
    required: true,
  },
  serviceTitle: {
    type: String,
    required: true,
  },
});
export default Mongoose.model(
  "Services",
  servicesSectionSchema,
  "servicesSection"
);
