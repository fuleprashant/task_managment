import express from "express";
import {
  forget_password,
  login,
  logout,
  reset_password,
  signUp,
  verifyOtp,
} from "../controller/user.controllers.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/verifyotp", verifyOtp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgetpassword", forget_password);
router.post("/resetpassword", reset_password);

export default router;
