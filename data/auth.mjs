import Mongoose from "mongoose";
import { useVirtualId } from "../db/database.mjs";

// 1.몽구스 스키마 만들기
const userSchema = new Mongoose.Schema(
  {
    userid: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    url: String,
  },
  { versionKey: false }
);
// 2. id 간편사용
useVirtualId(userSchema);

// 3. 컬렉션 만들기_ 컬렉션 이름은 단수로 쓰기(s가 끝에 자동으로 붙기때문!)
const User = Mongoose.model("User", userSchema);

// 회원가입 : 배열에 객체 추가
export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

//
export async function findByUserid(userid) {
  return User.findOne({ userid });
}

export async function findByid(id) {
  return User.findById(id);
}

// user._id 에서 _id는 객체형식임. 따라서 이걸 값 비교하려면 문자열로 바꿔야 함.
// 따라서 user 컬렉션에서 id란 컬럼을 새로 만드는데 그 안의 값은 _id를 문자열로 바꾼 값을 넣겠다.
function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
