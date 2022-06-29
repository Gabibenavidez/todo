import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { postTask, resetTasks, removeTask, setTaskCompleted, getTasks, getCompletedTasks } from '../../Services/APIservice';

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
  export const getApiTasks = createAsyncThunk(
    'task/getTasks',
    async () => {
      return await getTasks()
      .then(res => res.data)
      .catch(error => console.log(error))
    }
  )
  export const getApiUncompletedTasks = createAsyncThunk(
    'task/getUncompletedTasks',
    async () => {
      return await getCompletedTasks()
      .then(res => res.data)
      .catch(error => console.log(error))
    }
  )
  export const getApiCompletedTasks = createAsyncThunk(
    'task/getCompletedTasks',
    async () => {
      return await getTasks()
      .then(res => res.data)
      .catch(error => console.log(error))
    }
  )
const initialState = {
  tasksList: [],
  task: '',
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
  },
  extraReducers (builder) {
    builder
      .addCase(addApiTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addApiTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasksList = action.payload;
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
        state.tasksList = null;
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
          ({todoId, id}) => todoId === String ? todoId : id !== action.meta.arg.todoId
        );
        localStorage.setItem('tasksList', JSON.stringify(state.tasksList));
      })
      .addCase(deleteApiTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getApiTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getApiTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasksList = action.payload;
        localStorage.setItem('tasksList', JSON.stringify(state.tasksList));
      })
      .addCase(getApiTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getApiUncompletedTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getApiUncompletedTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasksList = action.payload;
        localStorage.setItem('tasksList', JSON.stringify(state.tasksList));
      })
      .addCase(getApiUncompletedTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(setCompletedTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setCompletedTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
      })
      .addCase(setCompletedTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getApiCompletedTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getApiCompletedTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasksList = action.payload.filter(
          (task) => task.completed === true)
        localStorage.setItem('tasksList', JSON.stringify(state.tasksList));
      })
      .addCase(getApiCompletedTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
})

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
export const addedTasks = state => state.tasks.tasksList;
export const newTask = state => state.tasks.task;
export const completed = state => state.tasks.tasksCompleted;
export const unCompleted = state => state.tasks.tasksUncompleted;
