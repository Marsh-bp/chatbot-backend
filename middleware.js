// import jwt from "jsonwebtoken";

// const SECRET_KEY = process.env.AUTH_SECERT;

// export const authenticate = (req, res, next) => {
//   try {
//     const token = req.headers.cookie.split("=")[1];
//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Access denied, no token provided" });
//     }

//     const decoded = jwt.verify(token, SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid token" });
//   }
// };
// export default authenticate;
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.AUTH_SECRET;

export const authenticate = (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.auth_token) {
      token = req.cookies.auth_token;
    }
    else if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Access denied, no token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded;

  } catch (err) {
    console.error("Authentication error:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default authenticate;
