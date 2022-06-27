import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { postTask, resetTasks, removeTask, setTaskCompleted } from '../../Services/APIservice';

export const addApiTask = createAsyncThunk(
  'task/addTask',
  async (body) => {
    return await postTask(body)
    .then(res => res.data)
    .catch(error => console.log(error));
  }
)

export const resetApiTasks = createAsyncThunk(
  'task/resetTasks',
  async () => {
    return await resetTasks()
    .then(res => res)
    .catch(error => console.log(error))
  })

  export const deleteApiTask = createAsyncThunk(
    'task/deleteTask',
    async (todoId) => {
      console.log(todoId)
      return await removeTask(todoId)
      .then(res => res.data)
      .catch(error => console.log(error))
    }
  )
  export const setCompletedTask = createAsyncThunk(
    'task/setTaskCompleted',
    async (body) => {
      return await setTaskCompleted(body)
      .then(res => res.data)
      .catch(error => console.log(error))
    }
  )

const initialState = {
  tasksList: [],
  task: '',
  tasksCompleted: [],
  tasksUncompleted: [],
  status: 'idle',
  error: null
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.task = action.payload;
      }
    },
    showCompletedTasks: {
      reducer(state, action) {
        state.tasksCompleted = action.payload.filter(
          (task) => task.completed === true)
      }
    },
    showUncompletedTasks: {
      reducer(state, action) {
        state.tasksUncompleted = action.payload.filter(
          (task) => task.completed === false)
      }
    }
  },
  extraReducers (builder) {
    builder
      .addCase(addApiTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addApiTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasksList = [...state.tasksList.concat(action.payload)];
        state.task = '';
        localStorage.setItem('tasksList', JSON.stringify(state.tasksList));
      })
      .addCase(addApiTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(resetApiTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetApiTasks.fulfilled, (state) => {
        state.status = 'succeeded';
        state.tasksList = state.tasksList.splice();
      })
      .addCase(resetApiTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteApiTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteApiTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasksList = state.tasksList.filter(
          ({todoId}) => todoId !== action.meta.arg.todoId
        );
        localStorage.setItem('tasksList', JSON.stringify(state.tasksList));
      })
      .addCase(deleteApiTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(setCompletedTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setCompletedTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const value = state.tasksList.findIndex(
          ({todoId}) => todoId === action.meta.arg.todoId,
          );
        state.tasksList[value].completed = true;

      })
      .addCase(setCompletedTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
})

export const { addTask, showCompletedTasks, showUncompletedTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
export const addedTasks = state => state.tasks.tasksList;
export const newTask = state => state.tasks.task;
export const completed = state => state.tasks.tasksCompleted;
export const unCompleted = state => state.tasks.tasksUncompleted;