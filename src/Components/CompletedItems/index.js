/* eslint-disable*/
import { ListItem, Radio, useColorModeValue, Box, RadioGroup, Button, Flex, List } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteApiTask, completed } from '../../app/features/tasksReducer';


const CompletedItems = () => {
  const tasks = useSelector(completed)
  const dispatch = useDispatch();
  console.log(tasks);
  const handleDisable = (id) => {
    dispatch(deleteApiTask({todoId: id}));
  }
  return (
            <Box bg={useColorModeValue('white', 'gray.900')} px={6} py={10}> 
              <List spacing={3}>
                <ListItem>
                  {tasks?.length > 0 &&
                   tasks?.map((task) => {
                    return (
                    <Flex justifyContent='space-between' key={task.todoId}>
                      <RadioGroup>
                        <Radio colorScheme='orange' value={task.todoId}>{task.title}</Radio>
                      </RadioGroup>
                      <Button
                              onClick={() => handleDisable(task.todoId)} 
                              bgColor='white' 
                              color='white' 
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
 
export default CompletedItems;