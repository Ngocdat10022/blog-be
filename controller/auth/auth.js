import jwt from "jsonwebtoken";
import db from "../../database/db.js";
import bcrypt from "bcryptjs";
export const register = (req, res) => {
  const q = "SELECT * from user WHERE email=? OR username=?";
  const username = req.body?.username;
  const email = req.body?.email;
  const password = req.body?.password;

  db.query(q, [email, username], async (err, data) => {
    if (err) return res.status(409).json(err);
    if (data.length) res.status(409).json("user already exits");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const q = "INSERT INTO user(`username`,`email`,`password`) VALUES(?)";
    const value = [username, email, hashedPassword];

    db.query(q, [value], (err, data) => {
      if (err) return res.status(409).json(err);

      res.status(200).json("create user successfully");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * from user WHERE  username=?";
  const username = req.body?.username;

  db.query(q, [username], (err, data) => {
    if (err) return res.status(409).json(err);
    if (data.length === 0) return res.status(409).json("user not found");

    const isPassword = bcrypt.compareSync(req.body?.password, data[0].password);

    if (!isPassword) return res.status(409).json("Wrong password ");

    const token = jwt.sign(
      { id: data[0].id, username: data[0].username },
      "jwtkey"
    );
    const { password, ...orther } = data[0];

    return res.status(200).json({ ...orther, accessToken: token });
  });
};
