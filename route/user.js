import express from "express";
import login from "../controllers/login.js";
import signup from "../controllers/signup.js";
import auth from "../controllers/auth.js";
import deauth from "../controllers/deauth.js";
const routes = express.Router();
routes.post("/login", login);
routes.post("/signup", signup);
routes.post("/auth", auth);
routes.post("/deauth", deauth);
export default routes;
