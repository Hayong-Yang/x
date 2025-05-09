import MongoDb, { ObjectId } from "mongodb";
import { getUsers } from "../db/database.mjs";
const ObjectID = MongoDb.ObjectId;

// 회원가입 : 배열에 객체 추가
export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((result) => result.insertedID.toString());
}

// 로그인 : 아이디 패스워드 가진 사람 있으면 로그인
// 로그인
export async function login(userid, password) {
  const user = users.find(
    (user) => user.userid === userid && user.password === password
  );
  return user;
}

//
export async function findByUserid(userid) {
  return getUsers().find({ userid }).next().then(mapOptionalUser);
}

export async function findByid(id) {
  return getUsers()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalUser);
}

// user._id 에서 _id는 객체형식임. 따라서 이걸 값 비교하려면 문자열로 바꿔야 함.
// 따라서 user 컬렉션에서 id란 컬럼을 새로 만드는데 그 안의 값은 _id를 문자열로 바꾼 값을 넣겠다.
function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
