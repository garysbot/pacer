const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  eventName:{ 
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  locationName: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true
  },
  maxGroupSize: {
    type: Number,
    required: true
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  ],
  maybes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  ],
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  eventPrivacy: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);