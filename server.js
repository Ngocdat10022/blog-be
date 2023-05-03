import express from "express";
import bodyParser from "body-parser";
import routerAuth from "./routes/auth/index.js";

const app = express();
const port = process.env.PORT | 4000;

app.use("/api/v1/", routerAuth);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log(`this is ${port}`);
});
