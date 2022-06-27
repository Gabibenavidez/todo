import { useEffect } from 'react';
import { addedTasks } from './app/features/tasksReducer';
import SimpleCard from './Components/TasksLists';
import { useSelector } from 'react-redux';



function App() {
  const tasksList = useSelector(addedTasks);

  useEffect(() => {
      localStorage.setItem('tasksList', JSON.stringify(tasksList))
  }, [tasksList])
  
  return (
    <div>
      <SimpleCard />
    </div>
  );
}

export default App;
