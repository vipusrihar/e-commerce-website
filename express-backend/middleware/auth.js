import jwt from 'jsonwebtoken';

const { verify } = jwt;


function auth(roles = []) {
  return (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    try {
      const decoded = verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      //if neeeded, check user has required role
      if (roles.length > 0 && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    } catch (e) {
      res.status(400).json({ message: "Invalid token" });
    }
  }
}

// Specific auth middlewares for admin
const adminAuth = () => auth(['ADMIN']);

// Specific auth middlewares for user
const userAuth = () => auth(['USER']);

// Specific auth middlewares for admin or user
const adminOrUserAuth = () => auth(['ADMIN', 'USER']);

export { auth, adminAuth, userAuth, adminOrUserAuth };
