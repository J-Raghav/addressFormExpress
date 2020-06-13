const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
  fullName : String,
  userId : Number,
  mobileNumber : String,
  streetAddress : String,
  city : String,
  state : String,
  pinCode : String,
});

module.exports =  mongoose.model('Address', addressSchema);
