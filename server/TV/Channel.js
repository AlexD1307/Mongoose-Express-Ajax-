const mongoose = require("mongoose")
const Schema = mongoose.Schema

let TVchema = new Schema({
   name: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 20,
      unique: true
   },
   num: {
      type: Number,
      required: true,
      min: 0,
      unique: true
   }
}, {versionKey: false})

module.exports = mongoose.model("Channel", TVchema)