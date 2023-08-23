const mongoose = require("mongoose")


const PhotoSchema = new mongoose.Schema({
 title: {
  type: String,
  required: [true, "Please provide title"],
  maxlength: [30, "title must be under 30 characters"]
 },
 image: {
  type: Object,
  required: true,
  default: () => {
   return {
    url: "",
    id: null,
   };
  },
 },
}, {
 timestamps: true
})


module.exports = mongoose.model("Photo", PhotoSchema)