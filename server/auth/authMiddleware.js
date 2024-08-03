const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const requireAuth = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided, authorization denied' });
  }

  try {
    // Verify the token using the secret key from the environment variable
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token payload to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = requireAuth;