import express from "express";
import session from "express-session";
import * as authController from "../controller/auth.mjs";

const router = express.Router();

// 회원가입: put
// http://127.0.0.1:8080/auth/signup
router.post("/signup", authController.newSignUp);
// 로그인 : post
// http://127.0.0.1:8080/auth/login
router.post("/login", authController.login);
// 내정보 확인: get
//http://127.0.0.1:8080/auth/mypage
router.get("/mypage", authController.goMyPage);
// 로그아웃
//http://127.0.0.1:8080/auth/logout
router.get("/logout", authController.logout);

export default router;
