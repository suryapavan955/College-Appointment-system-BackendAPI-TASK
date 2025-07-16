
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');

  // Format should be: Bearer token
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded.user;
    req.user = decoded;
    // req.user = decoded.user; 
    // req.user._id = decoded.user.id; 

    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
