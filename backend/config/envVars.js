import dotenv from "dotenv";
dotenv.config();

export const ENV_VARS = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.GOOGLE_CLIENT_SECRET,
    GOOGLE_AUTHORIZATION_CODE: process.env.GOOGLE_AUTHORIZATION_CODE,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_ACCESS_TOKEN: process.env.GOOGLE_ACCESS_TOKEN,
    JWT_AUTH_TOKEN: "jwt_auth_token",
    VERIFY_CODE_TOKEN: "verify_code_token",
    DURATION_2MIN: 2 * 60 * 1000,
    DURATION_15DAYS: 15 * 24 * 60 * 60 * 1000,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    NODE_ENV: process.env.NODE_ENV,
};
