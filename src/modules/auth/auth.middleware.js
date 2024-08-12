const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  // If the token is invalid, an error will be thrown
  // If the token is valid, the decoded token will be stored in `req.user`

  jwt.verify(token, "your_jwt_secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Set the user data from the token's payload
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
