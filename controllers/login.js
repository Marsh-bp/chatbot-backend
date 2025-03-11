import bcrypt from "bcryptjs";
import User from "../models/users.js";
import jwt from "jsonwebtoken";
const login = async (req, res) => {
  const SECRET_KEY = process.env.AUTH_SECERT;
  console.log(SECRET_KEY)AUTH_SECRET
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "12h",
    });
    res
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3600000 * 12,
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export default login;
