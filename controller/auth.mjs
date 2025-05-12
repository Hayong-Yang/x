import * as authRepository from "../data/auth.mjs";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.mjs";

const secretKey = config.jwt.secretKey;
const bcryptSaltRounds = config.bcrypt.saltRounds;
const jwtExpiresInDays = config.jwt.expiresInSec;

async function createJwtToken(id) {
  return jwt.sign({ id }, secretKey, { expiresIn: jwtExpiresInDays });
}

// 회원가입 함수.
export async function newSignUp(req, res, next) {
  const { userid, password, name, email, url } = req.body;
  // 회원 중복체크
  const found = await authRepository.findByUserid(userid);
  if (found) {
    return res.status(400).json({ message: `${userid} 이미 있습니다.` });
  }
  // 비밀번호 해시화
  const hashed = bcrypt.hashSync(password, bcryptSaltRounds);
  const users = await authRepository.createUser({
    userid,
    password: hashed,
    name,
    email,
    url,
  }); //이제 password대신 hashed 넣기
  // 사용자 아이디 토큰화
  const token = await createJwtToken(users.id);
  console.log(token);
  if (users) {
    // 토큰을 이제 사용자에게 보내줌.
    res.status(201).json({ token, userid });
  }
}

export async function verify(req, res, next) {
  const id = req.id;
  if (id) {
    res.status(200).json(id);
  } else {
    res.status(401).json({ message: "사용자 인증 실패" });
  }
}

export async function me(req, res, next) {
  const user = await authRepository.findByid(req.id);
  if (!user) {
    return res.status(404).json({ message: "일치하는 사용자가 없음" });
  }
  res.status(200).json({ token: req.token, userid: user.userid });
}

// 로그인 함수

export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await authRepository.findByUserid(userid); // user객체 가져옴.
  if (!user) {
    res.status(401).json(`${userid} 아이디를 찾을수 없음`);
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "아이디 또는 비밀번호 확인" });
  }
  const token = await createJwtToken(user.id);
  res.status(200).json({ token, userid });
}
