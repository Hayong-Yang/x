/*
    Authorization
    -본인의 신원을 증명하는 과정

    Authorization 헤더
    -http 요청을 보낼 때 헤더(Headers)라는 곳에 '추가정보'를 담을 수 있음
    -인증정보를 담는 표준 위치가 Authorization 헤더임

    Bearer
    -Authorization에 실을 수 있는 방식(타입)중 하나.
    - Bearer는 토큰(token)을 가지고 있다는 것 자체로 인증함
        Authorization: Bearer <토큰>
*/

import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth.mjs";
import { response } from "express"; // 이거 불필요
import { config } from "../config.mjs";

const AUTH_ERROR = { message: "인증에러" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization"); // 1. 요청 헤더에서 Authorization 값을 추출
  console.log(authHeader);

  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    // 2. Bearer {토큰} 형식인지 확인
    console.log("헤더 에러");
    return res.status(401).json(AUTH_ERROR);
  }
  const token = authHeader.split(" ")[1];
  console.log(token);

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    //3. jsonwebtoken.verify()로 토큰 검증
    if (error) {
      console.log("토큰 에러");
      return res.status(401).json(AUTH_ERROR);
    }
    console.log(decoded.idx);
    //4.처음에 토큰을 id로 만들었기 때문에, 복호화된 토큰은 id임. id를 기반으로 DB에서 유저 조회
    const user = await authRepository.findByid(decoded.idx);
    if (!user) {
      console.log("아이디 없음");
      return res.status(401).json(AUTH_ERROR);
    }
    console.log("user.id:", user.idx);
    console.log("user.userid:", user.userid);
    req.useridx = user.idx; // 5. 유효한 유저이면 req.userid에 넣고 다음 단계 진행 (next())
    next();
  });
};
