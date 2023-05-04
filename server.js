import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routerAuth from "./routes/auth/index.js";

const app = express();
const port = process.env.PORT | 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

app.use("/api/auth/", routerAuth);

app.listen(port, () => {
  console.log(`this is ${port}`);
});
