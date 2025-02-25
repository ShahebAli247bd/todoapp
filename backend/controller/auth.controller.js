import User from "./../models/auth.model.js";
import { sendEmailAndVerifyCode } from "../utils/verifyYourEmail.js";
import { generateTokenAndSetCookie } from "./../utils/jwtGenerator.js";
import { generateVerificationCode } from "./../utils/generateCode.js";
import bcrypt from "bcryptjs";
import { ENV_VARS } from "../config/envVars.js";

export const SignUp = async (req, res) => {
    const { email, password, username, profile } = req.body;

    try {
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "Email and Password is required",
            });
        }
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(email)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Email" });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 char",
            });
        }

        // const verifyCode = Math.floor(1000 + Math.random() * 9000);
        const user = await User.findOne({ email });
        // const username = await User.findOne({ username });
        if (user) {
            return res
                .status(404)
                .json({ success: false, message: "User already exists" });
        }

        //Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //profile image
        const profileImage = ["avater1.jpg", "avater2.jpg", "avater3.jpg"];
        const profile =
            profileImage[Math.floor(Math.random() * profileImage.length)];

        const newUser = new User({
            username,
            email,
            password: hashPassword,
            profile,
        });

        //generate token and set cookie
        generateTokenAndSetCookie(
            ENV_VARS.JWT_AUTH_TOKEN_NAME,
            newUser._id,
            ENV_VARS.DURATION_15DAYS,
            res
        );

        //save usre to db
        await newUser.save();

        //Varification
        const varificationCode = generateVerificationCode();

        //generate token and set cookie
        generateTokenAndSetCookie(
            ENV_VARS.VERIFY_CODE_TOKEN_NAME,
            newUser._id,
            ENV_VARS.DURATION_2MIN,
            res
        );

        /**
         * Sending Email is Pending
         */
        // sendEmailAndVerifyCode(newUser, varificationCode, res);

        //then send response with new user and delete password
        res.status(201).json({
            success: true,
            data: {
                ...newUser._doc,
                password: "",
                message: "Registration completed successfully!",
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const SignIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res
                .status(404)
                .json({ success: false, message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(401).json({
                success: false,
                message: "Password must be at least 6 char long",
            });
        }

        const user = await User.findOne({ email });
        const compairPassword = await bcrypt.compare(password, user.password);

        if (!user || !compairPassword) {
            return res
                .status(404)
                .json({ success: false, message: "Invalid Credential" });
        }
        //if user found then send mail to locing
        // sendEmailAndVerifyCode(newUser, varificationCode, res);

        //get jwt token its not working... need to fix
        // const token = req.cookies["JWT_AUTH_TOKEN"];

        console.log(token);
    } catch (error) {
        console.log("Error:" + error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
