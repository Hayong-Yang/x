import mysql from "mysql2";
// mysql2의 기능: 자바스크립트와 mysql의 언어차이를 해결해주는 중간다리 역할의 모듈.
import { config } from "../config.mjs";

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

export const db = pool.promise();
