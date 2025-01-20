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
        return !this.googleId;
      },
    },
    googleId: {
      type: String, // For Google OAuth users
      unique: true,
      sparse: true, // Allows null or missing values but enforces uniqueness if present
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
    OTpExpireforpassword: {
      type: Date,
      select: false,
    },
    profilePicture: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREh8TIFWYXVR4v4TeSVn20PTQ5WNaF5IteeQ&s",
    },
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);

export default User;
