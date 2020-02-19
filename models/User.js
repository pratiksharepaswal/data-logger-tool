const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  login_times: [Date],
  register_time: Date,
  logout_times: [Date]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;