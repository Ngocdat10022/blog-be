import db from "../../database/db.js";
import bcrypt from "bcryptjs";

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

    console.log("datafilter", newData);
    if (newData.length)
      return res.status(409).json("username or email already exits");
    if (newData.length === 0) {
      const q =
        "UPDATE user SET `username`= ?,`email`= ?,`avatar`= ? WHERE `id`=? ";
      const values = [username, email, avatar, userId];
      db.query(q, [...values], (err, data) => {
        if (err) return res.status(409).json(err);
        return res.status(200).json("Update user successfully");
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
    if (!isPassword) res.status(409).json("password is not correct");
    if (isPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const values = [hashedPassword, req?.userId];
      const q = "UPDATE user SET `password`= ? WHERE `id`=? ";
      db.query(q, [...values], (err, data) => {
        if (err) return res.status(409).json(err);
        return res.status(200).json("Update password successfully");
      });
    }
  });
};
