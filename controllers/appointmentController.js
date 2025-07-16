const Appointment = require('../models/Appointment');
const Availability = require('../models/Availability');

exports.bookAppointment = async (req, res) => {
  const { professorId, availabilityId } = req.body;
  const availability = await Availability.findById(availabilityId);
  if (!availability || availability.isBooked) return res.status(400).send('Slot not available');

  availability.isBooked = true;
  await availability.save();

  const appointment = await Appointment.create({
    student: req.user._id,
    professor: professorId,
    availability: availabilityId,
    appointmentTime: `${availability.date} ${availability.time}`
  });

  res.send(appointment);
};

exports.cancelAppointment = async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) return res.status(404).send('Not found');

  appointment.status = 'cancelled';
  await appointment.save();

  const slot = await Availability.findById(appointment.availability);
  slot.isBooked = false;
  await slot.save();

  res.send('Cancelled');
};

exports.getStudentAppointments = async (req, res) => {
  const appointments = await Appointment.find({ student: req.user._id, status: 'booked' });
  res.send(appointments);
};
