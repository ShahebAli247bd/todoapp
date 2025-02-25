import { sendEmailAndVerifyCode } from "../utils/verifyYourEmail.js";
import User from "./../models/auth.model.js";
import { generateTokenAndSetCookie } from "./../utils/jwtGenerator.js";
import bcrypt from "bcryptjs";
import { generateVerificationCode } from "./../utils/generateCode.js";

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
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be at least 6 char" });
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
    const duration15Days = 15 * 24 * 60 * 60 * 1000;
    generateTokenAndSetCookie("JWT_TOKEN", newUser._id, res, duration15Days);

    //save usre to db
    await newUser.save();

    //Varification
    const varificationCode = generateVerificationCode();
    //generate token and set cookie
    const duration2Min = 2 * 60 * 1000;
    generateTokenAndSetCookie("CODE_TOKEN", newUser._id, res, duration2Min);

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
