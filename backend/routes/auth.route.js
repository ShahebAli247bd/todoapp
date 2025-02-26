import express from "express";
import {
    SignUp,
    SignIn,
    SignOut,
    verifyOTPCode,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/signout", SignOut);
router.post("/otp", verifyOTPCode);

export default router;
