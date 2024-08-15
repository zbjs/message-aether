exports.profile = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Respond with the user's information (from `req.user`)
  res.status(200).json({
    id: req.user.id,
    fullname: req.user.fullname,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role,
    avatar_url: req.user.avatar_url,
    html_url: req.user.html_url,
    bio: req.user.bio,
    location: req.user.location,
    linkedin_url: req.user.linkedin_url,
    twitter_url: req.user.twitter_url,
    website_url: req.user.website_url,
    followers_url: req.user.followers,
    following_url: req.user.following,
    createdAt: req.user.createdAt,
    updatedAt: req.user.updatedAt,
  });
};

exports.dashboard = (req, res) => {
  // Respond with a message

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.status(200).json({
    id: req.user.id,
    fullname: req.user.fullname,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role,
    avatar_url: req.user.avatar_url,
    html_url: req.user.html_url,
    bio: req.user.bio,
    location: req.user.location,
    linkedin_url: req.user.linkedin_url,
    twitter_url: req.user.twitter_url,
    website_url: req.user.website_url,
    followers: req.user.followers,
    following: req.user.following,
    createdAt: req.user.createdAt,
    updatedAt: req.user.updatedAt,

    // You can add more fields if needed
  });
};
