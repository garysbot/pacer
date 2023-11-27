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
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: false
  },
  weight: {
    type: String,
    required: false
  },
  friends: {
    type: Array,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
