import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.AUTH_SECERT;

export const authenticate = (req, res) => {
  try {
    const token = req.headers.cookie.split("=")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied, no token provided" });
    }

    const username = jwt.verify(token, SECRET_KEY).username;
    return res.status(200).json({ message: "Access Granted", username });
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
export default authenticate;
