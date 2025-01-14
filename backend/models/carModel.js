const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  fromAddress: {
    type: String,
    required: true,
  },
  toAddress: {
    type: String,
    required: true,
  },
  journeyDate: {
    type: Date,
    required: true,
  },
  journeyTime: {
    type: String,
    required: true,
  },
  carType: {
    type: String,
    required: true,
  },
  userId : {
    
    type: String,
    required : true
  },
  
});

const Car = mongoose.model('Car', CarSchema);
module.exports = Car;
