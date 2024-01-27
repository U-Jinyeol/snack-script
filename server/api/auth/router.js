import { Router } from "express";
import { authSignIn, authSignUp } from "./controller.js";
import { signInValidation } from "./services.js";

const auth = Router();

auth.post("/signin", signInValidation, authSignIn);
auth.post("/signup", authSignUp);

export default auth;
