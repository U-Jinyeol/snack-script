import { Router } from "express";
import auth from "./auth.routes.js";
import snack from "./snack.routes.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const api = Router();

api.use("/auth", auth);
api.use("/snack", authMiddleware, snack);

export default api;
