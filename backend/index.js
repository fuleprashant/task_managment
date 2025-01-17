import express from "express";
import dotenv from "dotenv";
import db from "./database/db.js";

const app = express();
// console.log(app);
dotenv.config();
const port = process.env.PORT;
db();

app.listen(port, () => {
  console.log(`the server run on the port of the http://localhost:${port}`);
});
