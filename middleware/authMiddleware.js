// /middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers?.authorization?.replace("Bearer", "").trim();
  console.log("🚀 ~ authMiddleware ~ token:", token);
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🚀 ~ authMiddleware ~ decoded:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Authentication Token is not valid" });
  }
};
