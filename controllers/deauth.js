import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.AUTH_SECRET;

export const deauthenticate = (req, res) => {
  try {
    res.cookie("auth_token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 0,
    });
    return res.status(200).json({ message: "Logged out"});
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
export default deauthenticate;
