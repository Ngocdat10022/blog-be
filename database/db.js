import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "blog",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

export default db;
