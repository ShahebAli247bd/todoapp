import express from "express";
import { SignUp, SignIn, SignOut } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/signout", SignOut);

export default router;
