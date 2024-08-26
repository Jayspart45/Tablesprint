import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "./asyncHandler.js";

export const generateAccessToken = async (userId) => {
  const user = await User.findByPk(userId);
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
  return accessToken;
};
export const generateForgotToken = async (userId) => {
  const user = await User.findByPk(userId);

  const forgetToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.FORGET_TOKEN_SECRET,
    { expiresIn: process.env.FORGET_TOKEN_EXPIRY }
  );

  return forgetToken;
};
