const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  eventName:{ 
    type:String,
    required: true
  },
  locationName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateTime: {
    type: String,
    required: true
  },
  type: String,
  difficulty: String,
  maxGroupSize: Number,
  attending: Array,
  longitude: Number,
  latitude: Number


}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);