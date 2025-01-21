import Task from "../model/task.model.js";
import User from "../model/user.model.js"; // Import User model

export const createTask = async (req, res) => {
  const user = req.user; // The authenticated user is available here

  // Destructure task and description from req.body
  const { task, description } = req.body;

  // Check if user is authenticated (this check is optional if you are confident req.user is always set by the middleware)
  if (!user) {
    return res.status(400).json({ message: "User is not authenticated" });
  }

  // Create a new task and associate it with the user
  const addTask = new Task({
    task,
    description,
    userId: user._id, // Associate task with the user who created it
  });

  try {
    const newTask = await addTask.save();

    // Optionally, you can also push the task into the user's task array
    user.tasks.push(newTask._id); // Add the task reference to the user's tasks array
    await user.save(); // Save the updated user with the new task reference

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error occurred while creating task:", error);
    res.status(400).json({ message: "Error occurred while creating task" });
  }
};
