import * as authRepository from "../data/auth.mjs";
import session from "express-session";

// 회원가입 함수.
export async function newSignUp(req, res, next) {
  const { userid, password, name, email } = req.body;
  const users = await authRepository.singUp(userid, password, name, email);
  res.status(201).json(users);
}

// 로그인 함수
export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await authRepository.login(userid, password);
  if (user) {
    req.session.user = { userid }; // 세션 저장
    res.status(200).json(`${userid}님 로그인 완료`);
  } else {
    res
      .status(404)
      .json({ message: `${userid}님 아이디 또는 비밀번호를 확인하세요.` });
  }
}

// 내 정보 확인 함수
// 세션이 있을때만 mypage확인 가능.
export async function goMyPage(req, res, next) {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
}

// 로그아웃
export async function logout(req, res, next) {
  req.session.destroy(() => {
    res.send("로그아웃 되었습니다.");
  });
}
