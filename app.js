// app.js
const express = require("express");
const cors = require("cors");
const { getConnection } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // JSON 요청 본문 파싱
app.use(cors());

// 루트 경로에 대한 라우터 추가
app.get("/", (req, res) => {
  res.send("서버가 정상적으로 실행 중입니다!");
});

// 모든 카드 조회
app.get("/get/cards", async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    console.log(connection);
    const [rows] = await connection.query("SELECT * FROM cards");
    console.log(rows);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  } finally {
    if (connection) connection.release(); // 연결 해제
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
