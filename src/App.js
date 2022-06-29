import { useEffect } from 'react';
import { addedTasks, getApiTasks } from './app/features/tasksReducer';
import Home from './Components/TasksLists';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';



function App() {
  const tasksList = useSelector(addedTasks);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getApiTasks());
      localStorage.setItem('tasksList', JSON.stringify(tasksList))
  }, [dispatch])

  
  return (
    <div className='home'>
      <Home/>
    </div>
  );
}

export default App;
