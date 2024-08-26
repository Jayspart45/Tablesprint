import { Router } from "express";
import {
  forgotPassword,
  loginUser,
  logout,
  registerUser,
  resetPassword,
} from "../controllers/auth.controller.js";

import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/forgot_password").post(forgotPassword);

router.route("/reset_password/:email/:token").post(resetPassword);

router.route("/logout").post(verifyJWT,logout);

export default router;
