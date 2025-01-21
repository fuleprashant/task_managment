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
      validate: {
        validator: function () {
          return !this.googleId;
        },
        message: "Password is required if Google ID is not provided.",
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    accountVerified: {
      type: Boolean,
      default: false,
    },
    OTPemail: {
      type: String,
      select: false,
    },
    OTPexpire: {
      type: Date,
      select: false,
    },
    OTPforpassword: {
      type: String,
      select: false,
    },
    OTPExpireForPassword: {
      // Fixed inconsistent spelling
      type: Date,
      select: false,
    },
    profilePicture: {
      type: String,
      default:
        process.env.DEFAULT_PROFILE_PICTURE ||
        "https://example.com/default-profile-picture",
    },
    tasks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Task", // Fixed case sensitivity
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
