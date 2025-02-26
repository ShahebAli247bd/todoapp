import mongoose from "mongoose";

const otpSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        otpCode: {
            type: Number,
            unique: true,
            required: true,
        },
        expireAt: {
            type: Date,
            default: function () {
                return Date.now() + 2 * 60 * 1000; // Adds 2 minutes to the current time
            },
            index: { expires: 120 }, // Auto-delete after 2 minutes
        },
    },
    {
        timestamps: true,
    }
);

const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
