import {  BsChevronExpand } from 'react-icons/bs';
import InputComp from '../Input';
import Logo from '../Logo';
import {
  Box,
  Center,
  Stack,
  Button,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Flex,
  Heading 
} from '@chakra-ui/react';
import { useState } from 'react';
import { addApiTask, addedTasks, newTask, showCompletedTasks, showUncompletedTasks } from '../../app/features/tasksReducer';
import { useDispatch, useSelector } from 'react-redux';
import ItemsList from '../ItemsList';
import AlertComp from '../Alert';
import CompletedItems from '../CompletedItems';
import UncompletedItems from '../UncompletedItems';



export default function Pricing() {
  const dispatch = useDispatch();
  const task = useSelector(newTask)
  const tasksList = useSelector(addedTasks);
  const Options = ['Todos', 'Realizados', 'No Realizados'];
  const [optionName, setOptionName] = useState('Todos');
  const [disable, setDisable] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    dispatch(addApiTask({title: task, message: 'task added'}))
    setDisable(true);
  }
  const handleOptions = (option) => {
    setOptionName(option);
    if (option === 'Realizados') {
      dispatch(showCompletedTasks(tasksList));
    } else if(option === 'No Realizados') {
      dispatch(showUncompletedTasks(tasksList));
    }
  }

  return (
    <>
    <Center py={6} flexDirection='column'>
      <Logo />
      {isActive === false ?
      <Stack mb={5} mr={20}>
        <Heading>To do list</Heading>
        <Heading size='sm'>¿Que cosas tenés que terminar hoy?</Heading>
      </Stack>
      : null}
      <InputComp setDisable={setDisable}/>
    </Center>
    <Center py={2} flexDirection='column'>
      <Box
        flexDirection='column'
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
        borderRadius='30'
        >
        {isActive === true ?
            <>
              <Flex justifyContent='space-between'>
                <Flex>
                  <AlertComp setIsActive={setIsActive}/>
                </Flex>
                <Flex>
                  <Popover placement="bottom" isLazy>
                    <PopoverTrigger>
                  <Button bgColor='white'
                          rightIcon={<BsChevronExpand />}
                          fontWeight="normal"
                          fontSize="sm"
                    >{optionName}</Button>
                </PopoverTrigger>
                <PopoverContent w='70%' _focus={{ boxShadow: 'none' }} >
                  <PopoverBody>
                    <Stack >
                      {Options.map ((option) => {
                        return <Button
                        key={option}
                        h='fit-content'
                        variant="ghost"
                        justifyContent="center"
                        fontWeight="normal"
                        fontSize="sm"
                        mr={2}
                        onClick={() => handleOptions(option)}
                        >
                        {option}
                      </Button>
                      })}
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
          </Flex>
              {optionName === 'Realizados' ? <CompletedItems /> : optionName === 'No Realizados' ?  <UncompletedItems /> : optionName === 'Todos' ? <ItemsList /> : null }
          </>: null}
      </Box>
      <Button
            mt={10}
            maxW={'330px'}
            w={'full'}
            bg={'gray.800'}
            color={'gray.200'}
            opacity='1'
            borderRadius='100'
            disabled={disable}
            onClick={handleClick}>
            Agregar
          </Button>
    </Center>
    </>
  );
};