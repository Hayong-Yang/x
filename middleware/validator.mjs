//express-validator는 미들웨어로 유효성 검사를 정의합니다
import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  // validationResult() 함수는 **요청(req)**에서 유효성 검사 결과를 추출합니다.
  //결과는 Result 객체로, 내부에 여러 가지 메서드가 있어요.
  const errors = validationResult(req); // result 객체를 errors에 담음.
  if (errors.isEmpty()) {
    // 에러가 없으면 다음 미들웨어로 넘깁니다
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg }); // 에러 있으면 오류메세지 출력
};
// errors.array()는 유효성 검사 실패 항목들을 배열로 반환합니다.
// [0].msg는 첫 번째 오류의 메시지를 꺼냅니다.
//그걸 JSON 형태로 클라이언트에게 응답합니다.
