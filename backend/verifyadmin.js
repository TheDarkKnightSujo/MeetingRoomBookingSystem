const verifyAdmin = (req, res, next) => {
  if (req.user.Role !== 'Admin') {
    return res.status(403).json({ error: "Access denied: Admins only" });
  }
  next();
};

module.exports = verifyAdmin;
