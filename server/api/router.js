import { Router } from "express";
import auth from "./auth/router.js";

const api = Router();

api.use("/auth", auth);
// api.use("/snack", snack);

export default api;
