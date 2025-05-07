import express from "express";
import postRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import { config } from "./config.mjs";
import { db } from "./db/database.mjs";

const app = express();

app.use(express.json());

app.use("/posts", postRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

// 서버 연결 정상적으로 되었는지 확인하는 코드
// db.getConnection().then((connection) => console.log(connection));

app.listen(config.host.port);
