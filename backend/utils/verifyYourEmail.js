import nodemailer from "nodemailer";
import { ENV_VARS } from "./../config/envVars.js";
// import { google } from "googleapis"; // Add this line

// const CLIENT_ID = ENV_VARS.GOOGLE_CLIENT_ID;
// const CLIENT_SECRET = ENV_VARS.GOOGLE_CLIENT_SECRET;
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN = ENV_VARS.GOOGLE_REFRESH_TOKEN;

// const oAuth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// export const sendEmailAndVerifyCode = async (
//     newUser = ENV_VARS.EMAIL_USER,
//     varificationCode,
//     res
// ) => {
//     try {
//         const accessToken = await oAuth2Client.getAccessToken();

//         if (!accessToken.token) {
//             throw new Error("Failed to generate access token");
//         }
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 type: "OAuth2",
//                 user: ENV_VARS.EMAIL_USER,
//                 clientId: CLIENT_ID,
//                 clientSecret: CLIENT_SECRET,
//                 refreshToken: REFRESH_TOKEN,
//                 accessToken: accessToken.token,
//             },
//         });

//         // ইমেইল পাঠানোর জন্য তথ্য
//         const messageInfo = await transporter.sendMail({
//             from: '"Shaheb Ali" <shahebali247bd@gmail.com>',
//             to: newUser.email,
//             subject: `Hello ${newUser.username}, Verify Your Email`,
//             text: `Hello ${newUser.username},`,
//             html: `<h3>Here is your verification code:<br /></h3>
//              <h1>${varificationCode}</h1>`,
//         });

//         if (messageInfo.accepted.length > 0) {
//             return res.status(200).json({
//                 success: true,
//                 message: "Email sent! Please check your inbox.",
//             });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

//its working
export const sendEmailAndVerifyCode = async (userEmail, code, _) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: ENV_VARS.EMAIL_USER, // Your Gmail/SMTP username
            pass: ENV_VARS.EMAIL_PASS, // Your Gmail/SMTP password
        },
    });

    const mailOptions = {
        from: ENV_VARS.EMAIL_USER,
        to: userEmail,
        subject: `Your Login Verification Code is ${code}`,
        text: `Your verification code is: ${code}. It will expire in 2 minutes.`,
    };

    await transporter.sendMail(mailOptions);
};
