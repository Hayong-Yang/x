// .env에 있는 파일을 읽어오는 곳

import dotenv from "dotenv";

dotenv.config(); // .env를 싹 읽어옴

// defaultValue: 환경 변수 값이 없을 때 대신 쓸 기본값.
function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue; // key있으면 할당. 없으면 default할당
  // value == null: undefined 또는 null이면 예외 처리.
  if (value == null) {
    throw new Error(`키 ${key}는 undefined!!`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 10)),
  },
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
  },
  db: {
    host: required("DB_HOST"),
    user: required("DB_USER"),
    password: required("DB_PASSWORD"),
    database: required("DB_DATABASE"),
    port: required("DB_PORT"),
  },
};
