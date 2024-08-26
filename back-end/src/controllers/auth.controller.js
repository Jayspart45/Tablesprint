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

// Register a new user
export const registerUser = asyncHandler(async (req, res) => {
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

// Log in an existing user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required.");
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new ApiError(400, "Invalid credentials.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(400, "Invalid credentials.");
  }

  const accessToken = await generateAccessToken(user.id);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 3600000),
  };

  res.cookie("accessToken", accessToken, options);
  res
    .status(200)
    .json(new ApiResponse(200, { user, accessToken }, "Login successful."));
});

// Handle forgotten password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required.");
  }

  const user = await User.findOne({ where: { email: email.toLowerCase() } });
  if (!user) {
    throw new ApiError(400, "User does not exist.");
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

// Reset user password
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, token } = req.params;
  console.log(email, token);

  const { password } = req.body;

  if (!email || !token || !password) {
    throw new ApiError(400, "Email, token, and new password are required.");
  }

  try {
    jwt.verify(token.trim(), process.env.FORGET_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(400, "Invalid or expired token.");
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new ApiError(400, "User does not exist.");
  }

  const hashedPassword = await bcrypt.hash(password.toString(), 10);
  const [updated] = await User.update(
    { password: hashedPassword },
    { where: { email } }
  );

  if (!updated) {
    throw new ApiError(400, "Password update failed.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Password updated successfully."));
});

// Log out the user
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json(new ApiResponse(200, {}, "Logout successful."));
});
