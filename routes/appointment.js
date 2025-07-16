const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  bookAppointment,
  cancelAppointment,
  getStudentAppointments
} = require('../controllers/appointmentController');

router.post('/', auth, bookAppointment);
router.delete('/:id', auth, cancelAppointment);
router.get('/', auth, getStudentAppointments);

module.exports = router;
