import { Router } from "express";
import {
  forgotPassword,
  loginInUser,
  logout,
  resetPassword,
  signInUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.route("/register").post(signInUser);

router.route("/login").post(loginInUser);

router.route("/forgot_password").post(forgotPassword);

router.route("/reset_password/:email/:token").post(resetPassword);

router.route("/logout").post(logout);

export default router;
