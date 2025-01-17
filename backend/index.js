import express from "express";
import dotenv from "dotenv";

const app = express();
// console.log(app);
dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`the server run on the port of the http://localhost:${port}`);
});
