const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addAvailability, getAvailability ,getAllAvailability} = require('../controllers/availabilityController');

router.post('/', auth, addAvailability);
router.get('/:professorId', auth, getAvailability);
router.get('/all',auth, getAllAvailability);

module.exports = router;
