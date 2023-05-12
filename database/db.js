import mysql from "mysql";

const db = mysql.createConnection({
  host: "http://127.0.0.1",
  user: "root",
  password: "12345678",
  database: "dbblog",
});

db.connect(function (err) {
  if (err) console.log("[mysql error]", err);
  console.log("Connected!");
});

export default db;
