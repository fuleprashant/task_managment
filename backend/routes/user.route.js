import express from "express";

import {
  allUsersData,
  forget_password,
  login,
  logout,
  reset_password,
  signUp,
  verifyOtp,
} from "../controller/user.controllers.js";
import upload from "../middleware/multermiddle.js";
import { useMiddleware } from "../middleware/userMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", upload.single("profilePicture"), signUp);
userRouter.post("/verifyotp", verifyOtp);
userRouter.post("/login", login);
userRouter.post("/forgetpassword", forget_password);
userRouter.post("/resetpassword", reset_password);
userRouter.get("/logout", useMiddleware, logout);
userRouter.get("/allUsers", allUsersData);

export default userRouter;
