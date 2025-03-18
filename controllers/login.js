// import bcrypt from "bcryptjs";
// import User from "../models/users.js";
// import jwt from "jsonwebtoken";
// const login = async (req, res) => {
//   const SECRET_KEY = process.env.AUTH_SECRET;
//   console.log(SECRET_KEY)
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username });
//     if (!user) return res.status(401).json({ message: "Invalid credentials" });

//     const isPasswordValid = bcrypt.compareSync(password, user.password);
//     if (!isPasswordValid)
//       return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ username: user.username }, SECRET_KEY, {
//       expiresIn: "12h",
//     });
//     res
//       .cookie("auth_token", token, {
//         httpOnly: true,
//         secure: true,
//         sameSite: "none",
//         maxAge: 3600000 * 12,
//       })
//       .status(200)
//       .json({ message: "Login successful" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// export default login;
import bcrypt from "bcryptjs";
import User from "../models/users.js";
import History from "../models/history.js"; // Import the History model
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const SECRET_KEY = process.env.AUTH_SECRET;
  console.log(SECRET_KEY);

  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Validate the password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Handle session management
    let sessionId, sessionName;

    // Check if the user has an existing session
    const existingSession = await History.findOne({ username })
      .sort({ sessionid: -1 }) // Get the session with the highest session ID
      .limit(1);

    if (existingSession) {
      // Use the existing session
      sessionId = existingSession.sessionid;
      sessionName = existingSession.sessionname;
    } else {
      // Generate a new session ID if none exist
      const lastSession = await History.findOne().sort({ sessionid: -1 }).limit(1); // Get the latest session ID globally
      sessionId = lastSession ? lastSession.sessionid + 1 : 1;
      sessionName = "New Chat Session";

      // Save the new session in the History collection
      const newSession = new History({
        sessionid: sessionId,
        username,
        sessionname: sessionName,
        interactions: [], // Initialize with no interactions
      });
      await newSession.save();
    }

    // Generate a JWT
    const token = jwt.sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "12h",
    });

    // Set the token in an HTTP-only cookie
    res
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3600000 * 12, // 12 hours
      })
      .status(200)
      .json({
        message: "Login successful",
        auth_token: token,
        session: { sessionid: sessionId, sessionname: sessionName }, // Send session details to the frontend
      });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export default login;
