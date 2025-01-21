import express from "express";

import { useMiddleware } from "../middleware/userMiddleware.js";
import {
  allTask,
  createTask,
  deleteTask,
} from "../controller/task.controllers.js";

const taskRouter = express.Router();

taskRouter.post("/create-task", useMiddleware, createTask);
taskRouter.get("/alltask", useMiddleware, allTask);
taskRouter.post("/deletetask/:taskId", useMiddleware, deleteTask);

export default taskRouter;
