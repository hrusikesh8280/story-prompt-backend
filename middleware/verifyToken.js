const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token.' });
  }
  try {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.userId = decodedToken.userId;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized - Invalid token.' });
  }
};

module.exports = verifyToken;
