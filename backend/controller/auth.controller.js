import jwt from "jsonwebtoken";
import User from "./../models/auth.model.js";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage("./scratch"); // Creates a storage directory

import { sendEmailAndVerifyCode } from "../utils/verifyYourEmail.js";
import { generateTokenAndSetCookie } from "./../utils/jwtGenerator.js";
import { generateVerificationCode } from "./../utils/generateCode.js";
import bcrypt from "bcryptjs";

import { ENV_VARS } from "../config/envVars.js";
import OTP from "./../models/otp.model.js";

/**
 * Handle User Registration with Checking Input and save data, add jwt_auth_token
 * @param {Object} req
 * @param {Object} res
 * @returns object with success or error message
 * @throws {Error} internal server error 500
 */
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
      return res.status(401).json({ success: false, message: "Invalid Email" });
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
        .status(409)
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
      ENV_VARS.JWT_AUTH_TOKEN,
      newUser._id,
      ENV_VARS.DURATION_15DAYS,
      res
    );

    //save usre to db
    await newUser.save();

    //Varification
    // const varificationOTPCode = generateVerificationCode();

    //generate token and set cookie
    // generateTokenAndSetCookie(
    //     ENV_VARS.VERIFY_CODE_TOKEN,
    //     newUser._id,
    //     ENV_VARS.DURATION_2MIN,
    //     res
    // );

    /**
     * Sending Email is Pending
     */
    // sendEmailAndVerifyCode(newUser.email, varificationOTPCode, res);

    //then send response with new user and delete password
    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
      message: "Signup completed successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    console.log("i am error");
  }
};

/**
 * Handle User Login with Checking Input, compare password, create otp save in db, send otp to mail and add jwt_auth_token
 * @param {Object} req
 * @param {Object} res
 * @returns object with success or error message
 * @throws {Error} internal server error 500
 */
export const SignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(404)
        .json({ success: false, message: "All fields are required" });
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return res.status(404).json({ success: false, message: "Invalid Email" });
    }
    if (password.length < 6) {
      return res.status(401).json({
        success: false,
        message: "Password must be at least 6 char long",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Credential" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credential" });
    }

    generateTokenAndSetCookie(
      ENV_VARS.JWT_AUTH_TOKEN,
      user._id,
      ENV_VARS.DURATION_15DAYS,
      res
    );

    //Verification Token, (Not needed right now)
    const otpCode = generateVerificationCode();

    //OTP saved in OTP DB and after 2 min it will invalied and deleted automatically by index ttl (time-to-life) process
    const newOtpCreated = await OTP.create({ userId: user._id, otpCode });

    if (newOtpCreated) {
      //It will send mail after login successfull to verify using code
      const getLastOtp = await OTP.findOne({
        userId: newOtpCreated.userId,
      }).sort({
        createdAt: -1,
      });
      // console.log(getOtp.otpCode, "otpCode From Database");
      await sendEmailAndVerifyCode(user.email, getLastOtp.otpCode, res);
    }

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
        message: "Login successfull, Verify OTP Now",
      },
    });

    //if user found then send mail to locing
  } catch (error) {
    console.log("Error:" + error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Handle User signout clear cookie
 * @param {Object} req
 * @param {Object} res
 * @returns object with success or error message
 * @throws {Error} internal server error 500
 */
export const SignOut = async (req, res) => {
  try {
    res.clearCookie(ENV_VARS.JWT_AUTH_TOKEN);

    res.status(200).json({
      success: false,
      message: "Successfully signout",
    });
  } catch (error) {
    if (error.status == 404) {
      return res.status(404).json({
        success: false,
        message: "You are not authorized user",
      });
    }

    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Handle User VerifyOTPCode, checking input, decoded token get userId and get OTP to verify userOTP input
 * @param {Object} req
 * @param {Object} res
 * @returns object with success or error message
 * @throws {Error} internal server error 500
 */
export const verifyOTPCode = async (req, res) => {
  try {
    const { userOTP } = req.body;
    // console.log(userOTP, "i am here user OTP");
    if (!userOTP) {
      return res
        .status(404)
        .json({ success: false, message: "Please enter OTP" });
    }

    //get token
    const token = req.cookies[ENV_VARS.JWT_AUTH_TOKEN];
    //decode token and get userId stored in token
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET_KEY);
    // console.log("token:" + token, "userId:" + decoded.userId);
    //get OTP from database
    const getStoredOtp = await OTP.findOne({ userId: decoded.userId }).sort({
      createdAt: -1,
    });
    // console.log(getStoredOtp, getStoredOtp.otpCode);
    if (!getStoredOtp) {
      return res.status(404).json({
        success: false,
        message: "Invalid OTP, Please login again",
      });
    }
    // console.log(userOTP, getStoredOtp.otpCode);
    if (userOTP != getStoredOtp.otpCode) {
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }

    if (getStoredOtp && Date.now() > getStoredOtp.expireAt) {
      return res.status(401).json({
        success: false,
        message: "OTP expired, please login again!",
      });
    }

    res.status(200).json({ success: true, message: "OTP Verified" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const authCheck = async (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error: in authCheck");
    res.status(500).json({ success: false, message: error.message });
  }
};
