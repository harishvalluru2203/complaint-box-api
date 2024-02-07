const jwt = require("jsonwebtoken");

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) res.status(401).json({ error: "Access Denied" });
  try {
    const decoded = jwt.verify(token, "mySecretKey");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
};
