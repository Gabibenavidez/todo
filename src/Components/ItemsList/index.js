/* eslint-disable*/
import { ListItem, Radio, useColorModeValue, Box, RadioGroup, Button, Flex, List } from '@chakra-ui/react'
import { BsCheckLg, BsChevronCompactLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteApiTask, setCompletedTask } from '../../app/features/tasksReducer';



const ItemsList = () => {
  const tasks = JSON.parse(localStorage.getItem('tasksList'));
  const dispatch = useDispatch();

  const handleDisable = (id) => {
    dispatch(deleteApiTask({todoId: id}));
  }
  const handleCompleted = (id) => {
    dispatch(setCompletedTask({todoId: id, completed : true }))
  }
  return (
            <Box bg={useColorModeValue('white', 'gray.900')} px={6} py={2} minH='50px'> 
              <List spacing={3}>
                <ListItem>
                  {tasks?.length > 0 &&
                   tasks?.map((task) => {
                    console.log(task)
                    return (
                    <Flex justifyContent='space-between' key={task.todoId === String ? task.todoId : task.id}>
                      <RadioGroup onChange={() => handleCompleted(task.todoId === String ? task.todoId : task.id)} color={task.completed === true ? 'blackAlpha.400' : ''} fontWeight='semibold'>
                        <Radio colorScheme='orange' value={task.todoId === String ? task.todoId : task.id}>{task.title}</Radio>
                      </RadioGroup>
                      <Button
                              onClick={() => task.todoId === String ? handleDisable(task.todoId) : handleDisable(task.id) }
                              bgColor='whiteAlpha.100'
                              color='whiteAlpha.100' 
                              _hover={{color:'gray.500'}}
                              size='sm' 
                              mt={-1}>
                              Delete</Button>
                    </Flex>
                    )
                  })}
                </ListItem>
              </List>
            </Box>
  )
  
}
 
export default ItemsList;