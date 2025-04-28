import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    // 에러가 없으면 넘어가
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg }); // 에러 있으면 오류메세지 출력
};
