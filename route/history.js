import express from "express";
import sessionlist from "../controllers/sessionlist.js";
import sessionmessage from "../controllers/sessionmessage.js";
const routes = express.Router();
routes.post("/list", sessionlist);
routes.post("/message", sessionmessage);
export default routes;
