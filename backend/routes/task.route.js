import express from "express";

import { useMiddleware } from "../middleware/userMiddleware.js";
import {
  allTask,
  complated,
  createTask,
  deleteTask,
  important,
  updateTask,
} from "../controller/task.controllers.js";

const taskRouter = express.Router();

taskRouter.post("/create-task", useMiddleware, createTask);
taskRouter.get("/alltask", useMiddleware, allTask);
taskRouter.delete("/deletetask/:taskId", useMiddleware, deleteTask);
taskRouter.put("/updatetask/:taskId", useMiddleware, updateTask);
taskRouter.put("/completed/:taskId", useMiddleware, complated);
taskRouter.put("/important/:taskId", useMiddleware, important);

export default taskRouter;
