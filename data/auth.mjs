import { db } from "../db/database.mjs";

// 회원가입 : 배열에 객체 추가
export async function signUp(user) {
  // 이런 방식도 있구나! 파라미터들을 한번에 받아서 객체분할하기.
  //INSERT 쿼리는 삽입된 데이터 행이 아니라 삽입 결과 정보만 반환함.
  const { userid, password, name, email, url } = user;
  return db
    .execute(
      "insert into users(userid, password, name, email, url) values (?,?,?,?,?)",
      [userid, password, name, email, url]
    )
    .then((result) => result[0].insertId);
}

// 로그인 : 아이디 패스워드 가진 사람 있으면 로그인
// 로그인
export async function login(userid, password) {
  const [user] = await db.query(
    "select * from users where userid=? and password=?",
    [userid, password]
  );
  return user[0];
}

export async function findByUserid(userid) {
  // const [user] = await db.query("select * from users where userid=?", [userid]);
  // return user[0];
  return db
    .execute("select * from users where userid=?", [userid])
    .then((result) => result[0][0]);
}

export async function findByid(idx) {
  // const [user] = await db.query("select * from users where idx=?", [idx]);
  // return user[0];
  return db
    .execute("select * from users where idx=?", [idx])
    .then((result) => result[0][0]);
}
