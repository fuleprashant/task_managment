import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Required only if googleId is not present
      },
      select: false, // Exclude password from queries by default
    },
    googleId: {
      type: String, // For Google OAuth users
      unique: true,
      sparse: true, // Allows null or missing values but enforces uniqueness if present
    },
    profilePicture: {
      type: String, // URL for the user's profile picture
      default: null,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationOtp: {
      type: String,
      select: false,
    },
    verificationCodeExpire: {
      type: Date,
      select: false,
    },
    resetPasswordOtp: {
      type: String,
      select: false,
    },
    resetPasswordOtpExpire: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
); // Correct usage of timestamps

// Create the model
const User = mongoose.model("User", userSchema);

export default User;
