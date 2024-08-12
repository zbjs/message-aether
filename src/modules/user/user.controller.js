exports.profile = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Respond with the user's information (from `req.user`)
  res.status(200).json({
    id: req.user.id,
    role: req.user.role,
    email: req.user.email,
    username: req.user.username,
    // You can add more fields if needed
  });
};

exports.dashboard = (req, res) => {
  // Respond with a message

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.status(200).json({
    id: req.user.id,
    role: req.user.role,
    email: req.user.email,
    username: req.user.username,
    // You can add more fields if needed
  });
};
