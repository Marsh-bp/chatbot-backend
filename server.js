import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import gen from "./route/gen.js";
import user from "./route/user.js";
import history from "./route/history.js";
import authenticate from "./middleware.js";
import cookieParser from "cookie-parser";
const app = express();
const corsOptions = {
  origin: "http://localhost/",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
const uri = process.env.DB_URL;
console.log(uri);
mongoose
  .connect(uri,{
    useNewUrlParser: true,
    connectTimeoutMS: 50000})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const router = express.Router();

app.use("/gen", authenticate, gen);
app.use("/user", user);
app.use("/history", authenticate, history);
