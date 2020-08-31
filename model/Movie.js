const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  year:  {
    type: String
  },
  duration: {
    type: Number
  },
  genres:{
    type: [String],
  },
  rating: {
    type: Number
  },
  summery: { 
    type: String
  },
  director: {
    type: String
  },
  stars: {
    type: [String],
  }
})

module.exports = mongoose.model('Movie', MovieSchema)