import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

async function authenticate(req, res, next) {
  
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "token not found" });

    const data = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(data.uniqueId);
    if (!user) {
      return res.status(401).json({ success: false, error: "User is invalid" });
    }

    req.user = user; 
    next();
  } catch {
    res.status(403).json({ error: "Forbidden" });
  }
}

export default authenticate;