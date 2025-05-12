/*
  Mongoose
  - MongoDB + Node.js용 ORM(Object-Relational Mapping)
  - node.js 방식으로 데이터베이스를 입력하면 mongoDB 쿼리문으로 바꿔줌.
  - no SQL에 스키마를 정의
  - 입력, 수정, 조회, 삭제(CRUD) 모두 안정적이고 코드를 간결하게 작성
*/

import { config } from "../config.mjs";
import Mongoose from "mongoose";

let db;

export async function connectDB() {
  return Mongoose.connect(config.db.host);
}

// id라는 가상 컬럼을 만들고 거기에 _id를 문자열로 변환한 값을 넣겠다.
export function useVirtualId(schema) {
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  schema.set("toJson", { virtual: true });
  schema.set("toObject", { virtual: true });
}
