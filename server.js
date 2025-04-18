// import mongoose from "mongoose";
// import express from "express";
// import cors from "cors";
// import gen from "./route/gen.js";
// import user from "./route/user.js";
// import history from "./route/history.js";
// import authenticate from "./middleware.js";
// import cookieParser from "cookie-parser";
// const app = express();
// const corsOptions = {
//   origin: "http://localhost/",
//   methods: "GET,POST,PUT,DELETE",
//   allowedHeaders: "Content-Type",
//   credentials: true,
// };
// app.use(cors(corsOptions));
// app.use(cookieParser());
// app.use(express.json());
// const uri = process.env.DB_URL;
// console.log(uri);
// mongoose
//   .connect(uri,{
//     useNewUrlParser: true,
//     connectTimeoutMS: 50000})
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const router = express.Router();

// app.use("/gen", authenticate, gen);
// app.use("/user", user);
// app.use("/history", authenticate, history);


import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import gen from "./route/gen.js";
import user from "./route/user.js";
import history from "./route/history.js";
import authenticate from "./middleware.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const corsOptions = {
 origin: (origin, callback) => {
    const allowedOrigins = ["https://genbot-1.vercel.app", "*"];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }, 
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const uri = process.env.DB_URL;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 50000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));

app.use("/gen", authenticate, gen);
app.use("/user", user);
app.use("/history", authenticate, history);
