import express from "express";

import {
  forget_password,
  login,
  logout,
  reset_password,
  signUp,
  verifyOtp,
} from "../controller/user.controllers.js";
import upload from "../middleware/multermiddle.js";
import { useMiddleware } from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/signup", upload.single("profilePicture"), signUp);
router.post("/verifyotp", verifyOtp);
router.post("/login", login);
router.post("/forgetpassword", forget_password);
router.post("/resetpassword", reset_password);
router.get("/logout", useMiddleware, logout);

export default router;
