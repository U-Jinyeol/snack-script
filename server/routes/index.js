import { Router } from "express";
import auth from "./auth.routes.js";
import snack from "./snack.routes.js";

const api = Router();

api.use("/auth", auth);
api.use("/snack", snack);

export default api;
