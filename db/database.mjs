import { config } from "../config.mjs";
import MongoDb from "mongodb";

let db;

export async function connectDB() {
  return MongoDb.MongoClient.connect(config.db.host).then((client) => {
    db = client.db();
    // console.log(db);
  });
}

// db의 컬렉션 users 를 불러오는 함수
export function getUsers() {
  return db.collection("users");
}

export function getPosts() {
  return db.collection("posts");
}
