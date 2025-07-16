const mongoose = require('mongoose');
const availabilitySchema = new mongoose.Schema({
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  time: String,
  isBooked: { type: Boolean, default: false }
});
module.exports = mongoose.model('Availability', availabilitySchema);
