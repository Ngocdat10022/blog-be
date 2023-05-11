import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routerAuth from "./routes/auth/auth.js";
import routerPosts from "./routes/posts/posts.js";
import routerUser from "./routes/user/user.js";
const app = express();
const port = process.env.PORT | 4000;
// Page Home
const __dirname = path.resolve(path.dirname(""));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// use bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
//use cors
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);
// use Router
app.use("/api/auth/", routerAuth);
app.use("/api/posts/", routerPosts);
app.use("/api/user/", routerUser);

app.listen(port, () => {
  console.log(`Start server listen at http://localhost:${port}`);
});
