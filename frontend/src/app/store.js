import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import taskReducer from "../features/task/taskSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    task: taskReducer,
  },
});
