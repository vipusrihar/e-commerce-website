import express from "express";
import authController from "../controllers/authController.js";
import { Router } from "express";
import rateLimit from "express-rate-limit";
const router = Router();

// Prevent from brute force attacks
// This limits the number of login attempts to 5 per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Max 5 attempts per window
  message: "Too many login attempts, Try again after 15 minutes",
});


router.post("/signup", authController.signup);
router.post("/login", loginLimiter, authController.login);

export default router;
