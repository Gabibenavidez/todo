import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/tasksReducer';

export default configureStore({
  reducer: {
    tasks : tasksReducer
  }
})