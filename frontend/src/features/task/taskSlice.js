import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: [],
  loading: false,
  error: null,
  completed: false,
  important: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    startTask: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTast: (state, action) => {
      state.loading = false;
      state.error = null;
      state.task = action.payload.task;
      state.completed = false;
      state.important = false;
    },
    failTask: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { startTask, createTast, failTask } = taskSlice.reducer;

export default taskSlice.reducer;
