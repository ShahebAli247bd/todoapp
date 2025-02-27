import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profile: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
export default User;
