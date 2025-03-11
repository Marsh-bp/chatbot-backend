import express from "express";
import chatinteract from "../controllers/chatinteract.js";
const routes = express.Router();
routes.post("/interact", chatinteract);
export default routes;
