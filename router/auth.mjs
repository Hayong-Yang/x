import express from "express";
import * as authController from "../controller/auth.mjs";

const router = express.Router();

// 회원가입: put
// http://127.0.0.1:8080/auth/signup
router.post("/signup", authController.newSignUp);
// 로그인 : post
// http://127.0.0.1:8080/auth/login
router.post("/login", authController.login);

// 로그인 유지

export default router;
