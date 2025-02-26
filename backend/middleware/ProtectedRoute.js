import { ENV_VARS } from "../config/envVars.js";
import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";

export const ProtectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt_auth_token"];

        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Unauthorized access! Token not found",
            });
        }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorize Access! token invalid",
            });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found!" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error:" + error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
