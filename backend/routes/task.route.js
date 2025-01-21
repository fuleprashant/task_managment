import express from "express";

import { useMiddleware } from "../middleware/userMiddleware.js";
import { createTask } from "../controller/task.controllers.js";

const taskRouter = express.Router();

taskRouter.post("/create-task", useMiddleware, createTask);

export default taskRouter;
