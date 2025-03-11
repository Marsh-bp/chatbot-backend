import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.AUTH_SECERT;

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.cookie.split("=")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied, no token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
export default authenticate;
