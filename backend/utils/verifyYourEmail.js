import nodemailer from "nodemailer";
import { ENV_VARS } from "./../config/envVars.js";
import { google } from "googleapis"; // Add this line
import { generateVerificationCode } from "./generateCode.js";

const CLIENT_ID = ENV_VARS.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = ENV_VARS.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = ENV_VARS.GOOGLE_REFRESH_TOKEN;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendEmailAndVerifyCode = async (newUser, res, randomToken) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    if (!accessToken.token) {
      throw new Error("Failed to generate access token");
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "shahebali247bd@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // ইমেইল পাঠানোর জন্য তথ্য
    const messageInfo = await transporter.sendMail({
      from: '"Shaheb Ali" <shahebali247bd@gmail.com>',
      to: newUser.email,
      subject: `Hello ${newUser.username}, Verify Your Email`,
      text: `Hello ${newUser.username},\nYour verification code is: ${randomToken}`,
      html: `<h3>Here is your verification code:<br /></h3>
             <h1>${generateVerificationCode()}</h1>`,
    });

    if (messageInfo.accepted.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Email sent! Please check your inbox.",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
