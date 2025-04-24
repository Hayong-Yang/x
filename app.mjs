// 전체적인 구조.
// 메인 파일: app.mjs
//    -메인파일에서 불러오는 라우터
//      -라우터에서 불러오는 컨트롤러
//        -컨트롤러에서 불러오는 데이터

import express from "express";
import postRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import session from "express-session";

const app = express();

app.use(express.json());
app.use(
  session({
    secret: "!@#$%^&*()",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use("/posts", postRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.listen(8080);
