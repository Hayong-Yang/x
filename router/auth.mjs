import express from "express";
import * as authController from "../controller/auth.mjs";

import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";

const router = express.Router();

const validateLogin = [
  body("userid")
    .trim()
    .isLength({ min: 4 })
    .withMessage("최소 4자이상 입력") // isLength가 4자 미만일때 출력하는 메세지
    .matches(/^[a-zA-Z0-9]*$/) // isLength 만족시 넘어오는 조건
    .withMessage("특수문자는 사용불가"), // maches 만족 못할때 출력하는 메세지

  body("password").trim().isLength({ min: 8 }).withMessage("최소 8자이상 입력"),

  validate, // 미들웨어 validate 함수주소 참조. 실행하게 함.
];

const validateSignup = [
  ...validateLogin,
  body("name").trim().notEmpty().withMessage("name을 입력"),
  body("email").trim().isEmail().withMessage("이메일 형식 확인"),
  validate,
];

// 회원가입: post
// http://127.0.0.1:8080/auth/signup
router.post("/signup", validateSignup, authController.newSignUp);
// 로그인 : post
// http://127.0.0.1:8080/auth/login
router.post("/login", validateLogin, authController.login);

// 로그인 유지

export default router;
