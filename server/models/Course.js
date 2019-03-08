const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  isTaken:{
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Course', courseSchema);