import Mongoose from "mongoose";
import * as UserRepository from "./auth.mjs";
import { useVirtualId } from "../db/database.mjs";

const postSchema = new Mongoose.Schema(
  {
    userid: { type: String, require: true },
    name: { type: String, require: true },
    url: String,
    text: { type: String, require: true },
    userId: { type: String, require: true }, // objectId
  },
  { timestamps: true }
);

useVirtualId(postSchema);

const Post = Mongoose.model("Post", postSchema);

// 모든 포스트를 리턴
export async function getAll() {
  return Post.find().sort({ createAt: -1 });
}

// 사용자 아이디(userid)에 대한 포스트를 리턴
// filter : 조건을 만족하는 모든 요소를 배열로 리턴
export async function getAllByUserid(userid) {
  return Post.find({ userid }).sort({ createAt: -1 });
}

// 글 번호(id)에 대한 포스트를 리턴
// find : 조건을 만족하는 첫번째 요소를 리턴
export async function getByid(id) {
  return Post.findById(id);
}

// 포스트 작성
// 자바스크립트 문법 특징: 객체 안의 key : value 이름이 같으면 생략 가능.
export async function create(text, userId) {
  return UserRepository.findByid(userId).then((user) =>
    new Post({
      userid: user.userid,
      name: user.name,
      userId,
      text,
    }).save()
  );
}

// 포스트 변경
export async function update(id, text) {
  return Post.findByIdAndUpdate(id, { text }, { returnDocument: "after" });
}

// 포스트 삭제
export async function remove(id) {
  return Post.findByIdAndDelete(id);
}
