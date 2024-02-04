import { Router } from "express";
import authController from "../controller/auth.controller.js";
import authService from "../services/auth.service.js";

const auth = Router();

auth.post("/signin", authService.signInValidation, authController.signIn);
auth.post("/signup", authController.createUser);

export default auth;
