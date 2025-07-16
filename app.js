const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const availabilityRoutes = require('./routes/availability');
const appointmentRoutes = require('./routes/appointment');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/appointments', appointmentRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port http://localhost/${process.env.PORT}`));

module.exports = app;
