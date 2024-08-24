import { Router } from "express";
// import verifyJWT from "../middleware/auth.middleware.js";
import {
  forgotPassword,
  loginInUser,
  logout,
  resetPassword,
  signInUser,
} from "../controllers/auth.controller.js";

const router = Router();

// User registration
router.post("/register", signInUser);

// User login
router.post("/login", loginInUser);

// Request password reset
router.post("/forgot_password", forgotPassword);

// Reset password with token
router.post("/reset_password/:email/:token", resetPassword);

// User logout
router.post("/logout", logout);

export default router;
