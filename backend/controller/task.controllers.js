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

export const allTask = async (req, res) => {
  const user = req.user;

  // if task is not in that at that user
  if (!user) {
    return res.status(400).json({ message: "User is not authenticated" });
  }

  try {
    const tasks = await Task.find({ userId: user._id });

    // check if the task is zero
    if (tasks.lenght === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    res.status(200).json({
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    console.error("Error occurred while retrieving tasks:", error);
    res.status(400).json({ message: "Error occurred while retrieving tasks" });
  }
};

// export const deleteTask = async (req, res) => {
//     const user = req.user;
//     const { taskId } = req.params;

//     if (!user) {
//       return res.status(400).json({ message: "User is not authenticated" });
//     }

//     try {
//       // Use findOne to get a single task document
//       const task = await Task.findOne({ _id: taskId, userId: user._id });

//       // If no task is found, return a 404 error
//       if (!task) {
//         return res
//           .status(404)
//           .json({ message: "Task not found or does not belong to the user" });
//       }

//       // Use deleteOne instead of remove to delete the task
//       await Task.deleteOne({ _id: taskId });

//       res.status(200).json({
//         message: "Task deleted successfully",
//       });
//     } catch (error) {
//       console.error("Error occurred while deleting task:", error);
//       res.status(400).json({ message: "Error occurred while deleting task" });
//     }
//   };

export const deleteTask = async (req, res) => {
  const { taskId } = req.params; // Extract task ID from the request parameters

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    // If no task is found, return a 404 error
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Return a success response with the deleted task
    res.status(200).json({
      message: "Task deleted successfully",
      deletedTask,
    });
  } catch (error) {
    console.error("Error occurred while deleting task:", error);
    res.status(400).json({ message: "Error occurred while deleting task" });
  }
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { task, description } = req.body;

  try {
    // find the task by id and update it
    const updateTask = await Task.findByIdAndUpdate(
      taskId,
      { task, description },
      { new: true }
    );

    // If no task is found, return a 404 error
    if (!updateTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Return a success response with the updated task
    res.status(200).json({
      message: "Task updated successfully",
      updateTask,
    });
  } catch (error) {
    console.error("Error occurred while updating task:", error);
    res.status(400).json({ message: "Error occurred while updating task" });
  }
};

// complated task api is below
export const complated = async (req, res) => {
  // console.log("completed api is trigrred");
  const { taskId } = req.params;
  const { completed } = req.body;

  try {
    const completeTask = await Task.findByIdAndUpdate(
      taskId,
      { completed },
      { new: true }
    );

    if (!completeTask) {
      return res.status(404).json({ message: "completeTask not found" });
    }

    res
      .status(200)
      .json({ message: "Task Completed  successfully", completeTask });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Error occuring while complated the Task" });
  }
};

// important task api is below
export const important = async (req, res) => {
  const { taskId } = req.params;
  const { important } = req.body;

  try {
    const importantTask = await Task.findByIdAndUpdate(
      taskId,
      { important },
      { new: true }
    );

    if (!importantTask) {
      return res.status(404).json({ message: "importantTask not found" });
    }

    res
      .status(200)
      .json({ message: "Task important  successfully", importantTask });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occuring while important the Task" });
  }
};

export const singleUserTask = async (req, res) => {
  const user = req.user; // Get the authenticated user from the request

  if (!user) {
    return res.status(400).json({ message: "User is not authenticated" });
  }

  const { taskId } = req.params; // Extract taskId from the URL parameters

  if (!taskId) {
    return res.status(400).json({ message: "Task ID is required" });
  }

  try {
    // Fetch the task for the authenticated user with the specific taskId
    const task = await Task.findOne({ userId: user._id, _id: taskId });

    // If no task is found, return a 404
    if (!task) {
      return res.status(404).json({ message: "Task not found for this user" });
    }

    // Return the task
    res.status(200).json({
      message: "Task retrieved successfully",
      task,
    });
  } catch (error) {
    console.error("Error occurred while retrieving the task:", error);
    res
      .status(400)
      .json({ message: "Error occurred while retrieving the task" });
  }
};

export const allTasksData = async (req, res) => {
  // res.send("all task is fetched here ");
  try {
    const tasks = await Task.find(); // Fetch all users
    if (tasks.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
    res.status(200).json(tasks); // Return all users
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
