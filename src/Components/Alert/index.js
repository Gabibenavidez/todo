import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Box
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { MdOutlineAddCircle } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { resetApiTasks } from '../../app/features/tasksReducer';


function AlertComp ({setIsActive})  {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch();

  const handleReset = () =>  {
    dispatch(resetApiTasks());
    setIsActive(false);
    onClose();
    localStorage.removeItem('tasksList');
  }

  return (
    <Box>
      <Button bgColor='white'
                          rightIcon={<MdOutlineAddCircle/>}
                          onClick={onOpen}
                    >To do list</Button>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
             Empezar una nueva lista
            </AlertDialogHeader>

            <AlertDialogBody>
              Cuando comenzás una nueva lista, tu lista existente se elimina.
              ¿Estas seguro que querés empezar una nueva lista?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>
                Cancelar
              </Button>
              <Button color='gray.200' bgColor='gray.800' onClick={handleReset} ml={3}>
                Nueva Lista
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}
export default AlertComp;