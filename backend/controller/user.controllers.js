import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import { emailProvider } from "../utils/emailProvider.js";
import { generateToken } from "../middleware/generateToken.js";

export const signUp = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    let profilePicture = null;

    // Check if the profilePicture file is present
    if (req.file) {
      profilePicture = req.file.path; // Store the file path in the database
    } else {
      return res.status(400).json({
        success: false,
        message: "Profile picture is required",
      });
    }
    // Check if all required fields are provided
    if (!fullname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the user already exists in the database
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // OTP
    const OTPemail = Math.floor(100000 + Math.random() * 900000);

    // Create a new user with the hashed password
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      accountVerified: false,
      OTPemail,
      profilePicture, // Store the profile picture path
      OTPExpire: Date.now() + 10 * 60 * 1000,
    });

    // add the space in verification code

    // const verificationcode = verificationotp.toString().split().join();
    // console.log("space", verificationcode);

    // Save the user to the database
    await newUser.save();
    emailProvider(newUser.email, OTPemail);

    console.log("the email verification otp is", OTPemail);

    // Return a success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePicture: newUser.profilePicture, // Include profile picture URL in the response
        accountVerified: false,
      },
    });
  } catch (error) {
    console.error("Error during user registration:", error);

    // Return a failure response for server errors
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error: error.message,
    });
  }
};

// export const verifyOtp = async (req, res) => {
//   try {
//     const { OTPemail } = req.body;

//     const user = await User.findOne({ OTPemail });

//     console.log(user.OTPemail);
//     if (!user) {
//       return res.status(400).json({ status: false, message: "Invalid OTP" });
//     }

//     if (user.OTPExpire < Date.now()) {
//       returnres.status(400).json({ status: false, message: "OTP Expired" });
//     }

//     user.accountVerified = true;
//     await user.save();

//     return res.status(201).json({
//       message: "email verified successfully",
//       data: {
//         id: user._id,
//         fullname: user.fullname,
//         email: user.email,
//         isVerified: true,
//       },
//     });
//   } catch (error) {
//     console.error("Error during user registration:", error);

//     // Return a failure response for server errors
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error. Please try again later.",
//       error: error.message,
//     });
//   }
// };

export const verifyOtp = async (req, res) => {
  try {
    const { OTPemail } = req.body;

    // Check if OTPemail is provided
    if (!OTPemail) {
      return res
        .status(400)
        .json({ success: false, message: "OTP is required" });
    }

    // Find the user by OTPemail
    const user = await User.findOne({ OTPemail: Number(OTPemail) });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Check if OTP has expired
    if (user.OTPExpire < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP Expired" });
    }

    // Verify the user account
    user.accountVerified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        isVerified: true,
      },
    });
  } catch (error) {
    console.error("Error during OTP verification:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  //   res.send("this is the login fucntion ");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "plz provide both email and password",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "this user is not registerd",
      });
    }

    // Check if user is verified
    if (!user.accountVerified) {
      // OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
      user.OTPemail = otp;
      console.log("$$$$$", otp);
      user.OTPexpire = Date.now() + 10 * 60 * 1000; // 10 minutes = 600000 milliseconds
      await user.save();

      // send otp to the email user
      emailProvider(user.email, otp);

      return res.status(400).json({
        message: "Account not verified. OTP has been sent to your email.",
      });
    }

    // Compare provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "password is not matched",
      });
    }

    // Generate JWT token if login is successful
    const token = generateToken(user); // Corrected typo
    // Set token in cookies (1 hour expiration)
    // res.cookie("jwttoken", token, { maxAge: 3600000 });

    // below is the hint how can we set in the headers
    res.setHeader("Authorization", `Bearer ${token}`);

    return res.status(200).json({
      success: true,
      message: "User logged in succesfully",
      data: {
        id: user._id,
        name: user.fullname,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.error("Error during user registration:", error);

    // Return a failure response for server errors
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error: error.message,
    });
  }
};

// logout function
export const logout = (req, res) => {
  //   console.log("You clicked the logout button");
  try {
    res.clearCookie("jwttoken");
    return res.status(200).json({
      message: "User logged out succesfully",
    });
  } catch (error) {
    console.error("Error during logout:", error);

    return res.status(200).json({
      message: "Something logged went wrong",
    });
  }
};

// forget-password
export const forget_password = async (req, res) => {
  //   res.send("this function is clicked");
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "this user is not found" });
    }

    // OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log("+++++", otp);
    user.OTPforpassword = otp;
    user.OTpExpireforpassword = Date.now() + 10 * 60 * 1000; // 10 minutes = 600000 milliseconds

    await user.save();

    // send this otp to users email

    try {
      await emailProvider(user.email, otp);
    } catch (emailError) {
      console.error("Error sending email OTP:", emailError);

      return res
        .status(400)
        .json({ message: "Failed to send OTP. Please try againlater." });
    }

    return res
      .status(200)
      .json({ message: "Otp is send to your email succesfully" });
  } catch (error) {
    console.error("Error during user registration:", error);

    // Return a failure response for server errors
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error: error.message,
    });
  }
};
// reset-password
export const reset_password = async (req, res) => {
  const { OTPforpassword, newPassword } = req.body;

  try {
    // Validate new password
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    // Find user by OTP and check expiration
    const user = await User.findOne({
      OTPforpassword: Number(OTPforpassword),
      OTpExpireforpassword: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired OTP.",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;

    // Save the updated user without validation errors
    await user.save({ validateModifiedOnly: true });

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      message:
        "An error occurred while resetting the password. Please try again later.",
    });
  }
};
