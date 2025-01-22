import express from "express";
import dotenv from "dotenv";
import db from "./database/db.js";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";

const app = express();
// console.log(app);
dotenv.config();
const port = process.env.PORT;
db();

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());
// app.use("/user", userRouter);
// app.use("/user", taskRouter);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type"],
  })
);
app.use("/user", [userRouter, taskRouter]);

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
