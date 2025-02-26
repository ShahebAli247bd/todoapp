import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (tokenName, userId, duration, res) => {
    try {
        res.clearCookie(tokenName);

        const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET_KEY, {
            expiresIn: duration, //15days
        });

        if (token) {
            res.cookie(tokenName, token, {
                expires: duration,
                maxAge: duration,
                httpOnly: true,
                sameSite: "strict",
                secure: ENV_VARS.NODE_ENV === "production",
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
