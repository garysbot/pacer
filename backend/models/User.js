const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    required: false
  },
  weight: {
    type: Number,
    required: false
  },
  primarySport: {
    type: Object,
    required: true
  },
  secondarySports: {
    type: Array,
    required: true
  },
  eventsAttended: {
    type: Array,
    required: true
  },
  profilePhotoUrl: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
