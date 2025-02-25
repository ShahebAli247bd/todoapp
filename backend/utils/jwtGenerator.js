import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
export const generateTokenAndSetCookie = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET_KEY, {
      expiresIn: 15 * 24 * 60 * 60 * 1000, //15days
    });

    if (token) {
      res.cookie("JWT_TOKEN", token, {
        expires: 15 * 24 * 60 * 60 * 1000,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
