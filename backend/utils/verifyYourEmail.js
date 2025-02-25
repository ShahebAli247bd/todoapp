import nodemailer from "nodemailer";

export const sendEmailAndVerifyCode = async (newUser, res, randomToken) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com", // আপনার Gmail অ্যাকাউন্ট
        pass: "your-app-password", // Gmail অ্যাপ পাসওয়ার্ড (সাধারণ পাসওয়ার্ড নয়)
      },
    });

    // ইমেইল পাঠানোর জন্য তথ্য
    const messageInfo = await transporter.sendMail({
      from: '"Shaheb Ali" <your-email@gmail.com>',
      to: newUser.email,
      subject: `Hello ${newUser.username}, Verify Your Email`,
      text: `Hello ${newUser.username},\nYour verification code is: ${randomToken}`,
      html: `<h3>Here is your verification code:<br /></h3>
             <h1>${randomToken}</h1>`,
    });

    if (messageInfo) {
      return res.status(200).json({
        success: true,
        message: "Email sent! Please check your inbox.",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
