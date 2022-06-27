import { Input } from '@chakra-ui/react';
import { addTask, newTask } from '../../app/features/tasksReducer';
import { useDispatch, useSelector } from 'react-redux';


const InputComp = ({setDisable}) => {
  const dispatch = useDispatch();
  const item = useSelector(newTask);

  const handleChange = (e) => {
    dispatch(addTask(e.target.value));
    setDisable(false);
  }

  return (
            <Input
            maxW={'330px'}
            w={'full'}
            variant="flushed"
            placeholder='Escribí un item'
            value={item}
            onChange={handleChange}
            />
   );
}
 
export default InputComp;
