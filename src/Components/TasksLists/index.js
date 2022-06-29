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
  Heading ,
  Text
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { addApiTask, getApiCompletedTasks, newTask, getApiTasks, getApiUncompletedTasks } from '../../app/features/tasksReducer';
import { useDispatch, useSelector } from 'react-redux';
import ItemsList from '../ItemsList';
import AlertComp from '../Alert';


export default function Home() {
  const dispatch = useDispatch();
  const task = useSelector(newTask)
  //const tasksList = useSelector(addedTasks);
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
      if (option === 'Todos') {
        dispatch(getApiTasks())
      }
      else if (option === 'Realizados') {
      dispatch(getApiCompletedTasks());
    } else if(option === 'No Realizados') {
      dispatch(getApiUncompletedTasks());
    }
  }

  useEffect(() => {
    if(!(localStorage.getItem('tasksList') === true)) {
      setIsActive(true);
    }
  }, [])

  return (
    <>
    <Center py={6} flexDirection='column'>
      <Logo />
      {isActive === false ?
      <Stack mb={5} mr={20}>
        <Heading>To do list</Heading>
        <Text fontWeight='480'>¿Que cosas tenés que terminar hoy?</Text>
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
                        color={option === optionName ? 'orange' : ''}
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
              <ItemsList />
          </>: null}
      </Box>
      <Button
            mt={10}
            maxW={'330px'}
            w={'full'}
            bg={'blackAlpha.800'}
            _disabled={{bgColor:'whiteAlpha.400'}}
            color={'gray.300'}
            opacity='1'
            borderRadius='100'
            disabled={disable}
            fontWeight='light'
            onClick={handleClick}>
            Agregar
          </Button>
    </Center>
    </>
  );
};