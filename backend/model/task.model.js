import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Added timestamps for createdAt and updatedAt
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
