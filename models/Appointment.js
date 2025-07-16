const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  availability: { type: mongoose.Schema.Types.ObjectId, ref: 'Availability' },
  appointmentTime: String,
  status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' }
});
module.exports = mongoose.model('Appointment', appointmentSchema);
