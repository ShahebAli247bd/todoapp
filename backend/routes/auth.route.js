import express from "express";
import {
    SignUp,
    SignIn,
    SignOut,
    verifyOTPCode,
} from "../controller/auth.controller.js";
import { ProtectedRoute } from "../middleware/ProtectedRoute.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/signout", SignOut);
router.post("/verifyotp", verifyOTPCode);

export default router;
