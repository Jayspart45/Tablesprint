import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  generateAccessToken,
  generateForgotToken,
} from "../utils/tokenUtils.js";
import User from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { sendEmail } from "../utils/nodemailer.js";

/**
 * Handles user sign-in (registration).
 */
export const signInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required.");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashPassword });
  res
    .status(201)
    .json(new ApiResponse(201, user, "User created successfully."));
});

/**
 * Handles user login.
 */
export const loginInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required.");
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res
      .status(400)
      .json(new ApiError(400, "Invalid email or password."));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json(new ApiError(400, "Invalid email or password."));
  }

  const accessToken = await generateAccessToken(user.id);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("accessToken", accessToken, options);
  res
    .status(200)
    .json(new ApiResponse(200, { user, accessToken }, "Login successful."));
});

/**
 * Handles password reset requests.
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required.");
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json(new ApiError(400, "User does not exist."));
  }

  const forgotToken = await generateForgotToken(user.id);
  const resetPasswordLink = `${process.env.ORIGIN}/reset-password/${email}/${forgotToken}`;

  const parameters = {
    email: user.email,
    resetPasswordLink,
  };
  const response = await sendEmail(
    user.email,
    "Reset your password",
    parameters
  );

  res.status(200).json(new ApiResponse(200, { email: user.email }, response));
});

/**
 * Handles password reset.
 */
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, token } = req.params;
  const { password } = req.body;

  if (!email || !token || !password) {
    throw new ApiError(400, "Email, token, and new password are required.");
  }
  console.log(token);

  const decoded = jwt.verify(token.trim(), "sdbckjvsdvkjsdvjkbddvjbejb78323");

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json(new ApiError(400, "User does not exist."));
  }

  const hashedPassword = await bcrypt.hash(password.toString(), 10);
  const [updated] = await User.update(
    { password: hashedPassword },
    { where: { email } }
  );

  if (!updated) {
    return res.status(400).json(new ApiError(400, "Password update failed."));
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully."));
});

/**
 * Handles user logout.
 */
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json(new ApiResponse(200, {}, "Logout successful."));
});
