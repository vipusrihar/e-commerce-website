import express from "express";
import authController from "../controllers/authController.js";
import { Router } from "express";
import auth from "../middleware/auth.js";
const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

export default router;
