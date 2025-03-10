// db.js
const mysql = require("mysql2/promise");
require("dotenv").config();

// 데이터베이스 연결 풀 생성
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// 데이터베이스 연결을 가져오는 함수
const getConnection = async () => {
  const connection = await pool.getConnection();
  console.log(connection);
  return connection;
};

// 모듈 내보내기
module.exports = { getConnection };
