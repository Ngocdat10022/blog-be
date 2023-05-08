import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req?.header("Authorization");

  const token = authHeader || authHeader.split(" ")[1];

  console.log("token", token);
  if (!token) return res.status(409).json("Token not found");
  const auth = jwt.verify(token, "jwtkey");

  console.log("auth", auth);
  req.userId = auth?.id;
  req.username = auth?.username;
  next();
};
