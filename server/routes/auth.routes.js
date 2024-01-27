import { Router } from "express";
import { authSignIn, authSignUp } from "../controller/auth.controller.js";
import { signInValidation } from "../services/auth.service.js";

const auth = Router();

auth.post("/signin", signInValidation, authSignIn);
auth.post("/signup", authSignUp);

export default auth;
