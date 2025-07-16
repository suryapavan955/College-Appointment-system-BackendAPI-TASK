const Availability = require('../models/Availability');

exports.addAvailability = async (req, res) => {
  const { date, time } = req.body;
  const availability = await Availability.create({ professor: req.user._id, date, time });
  res.send(availability);
};

exports.getAvailability = async (req, res) => {
  const { professorId } = req.params;
  console.log("professorId param:", professorId);
  const slots = await Availability.find({ professor: professorId, isBooked: false });
   console.log("Found slots:", slots);
  res.send(slots);
};
exports.getAllAvailability = async (req, res) => {
  
  const slots = await Availability.find({ isBooked: false });
  
  res.send(slots ? slots : ["No data"]);
};
