import db from "../../database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const updateUser = (req, res) => {
  const q = "SELECT * from user";
  const { username, email, avatar } = req?.body ?? {};
  const userId = req?.userId;
  db.query(q, [], (err, data) => {
    if (err) return res.status(409).json(err);
    const newData = data
      .filter((item) => item.id != userId)
      .filter(
        (item) =>
          item?.username.trim() === username.trim() ||
          item?.email.trim() === email.trim()
      );
    if (newData.length)
      return res
        .status(409)
        .json(err, { message: "username or email already exits" });
    if (newData.length === 0) {
      const q =
        "UPDATE user SET `username`= ?,`email`= ?,`avatar`= ? WHERE `id`=? ";
      const values = [username, email, avatar, userId];
      db.query(q, [...values], (err, data) => {
        if (err)
          return res
            .status(409)
            .json({ err: err, message: "Cập nhật không thành công" });
        if (data) {
          const q = "SELECT * from user WHERE id=?";
          db.query(q, [userId], (err, data) => {
            if (err)
              return res
                .status(409)
                .json({ err: err, message: "Cập nhật không thành công" });

            if (data) {
              const token = jwt.sign(
                { id: data[0].id, username: data[0].username },
                "jwtkey"
              );
              const { password, ...orther } = data[0];

              return res.status(200).json({
                findUser: { ...orther },
                accessToken: token,
              });
            }
          });
        }
      });
    }
  });
};

export const updatePassword = (req, res) => {
  const q = "SELECT * FROM user WHERE id=?";
  const id = req?.userId ?? null;
  console.log("id", id);
  db.query(q, [id], async (err, data) => {
    if (err) return res.status(409).json(err);

    const { password, newPassword } = req?.body ?? {};
    console.log("password", password, newPassword);
    const isPassword = bcrypt.compareSync(
      password.trim(),
      data[0].password.trim()
    );
    if (!isPassword)
      res.status(409).json({ err, message: "password is not correct" });
    if (isPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const values = [hashedPassword, req?.userId];
      const q = "UPDATE user SET `password`= ? WHERE `id`=? ";
      db.query(q, [...values], (err, data) => {
        if (err)
          return res
            .status(409)
            .json({ err: err, message: "Cập nhật không thành công" });
        return res.status(200).json("Update password successfully");
      });
    }
  });
};
