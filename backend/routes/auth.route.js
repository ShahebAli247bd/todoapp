import express from "express";
import {
    SignUp,
    SignIn,
    SignOut,
    verifyOTPCode,
    authCheck,
} from "../controller/auth.controller.js";
import { ProtectedRoute } from "../middleware/ProtectedRoute.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/signout", SignOut);
router.post("/verifyotp", verifyOTPCode);

router.get("/authCheck", ProtectedRoute, authCheck);

export default router;
