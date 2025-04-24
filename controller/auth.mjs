import * as authRepository from "../data/auth.mjs";

// 회원가입 함수.
export async function newSignUp(req, res, next) {
  const { userid, password, name, email } = req.body;
  const users = await authRepository.singUp(userid, password, name, email);
  res.status(201).json(users);
}

// 로그인 함수
// export async function login(req, res, next) {
//   const id = req.params.id;
//   const userInfo = await authRepository.userInfo(id);
//   const { userid, password } = req.body;
//   if (userInfo.userid === userid && userInfo.password === password) {
//     return userInfo;
//   }
export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await authRepository.login(userid, password);
  if (user) {
    res.status(200).json(`${userid}님 로그인 완료`);
  } else {
    res
      .status(404)
      .json({ message: `${userid}님 아이디 또는 비밀번호를 확인하세요.` });
  }
}
