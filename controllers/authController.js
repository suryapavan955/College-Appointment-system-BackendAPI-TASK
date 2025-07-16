const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).send('User already exists');
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash, role });
  res.send(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).send('Invalid credentials');

  // const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  const token = jwt.sign(
//     { user: { id: user.id } }, process.env.JWT_SECRET, {
//   expiresIn: '1h'
// }

{ _id: user._id, role: user.role }, 
  process.env.JWT_SECRET,
  { expiresIn: '1h' }

);
  res.send({ token, user });
};
