import { Image, Box } from '@chakra-ui/react'
const Logo = () => {
  return ( 
    <Box>
        <Image className='logo' src="https://poincenot.com/wp-content/uploads/montania-noche.svg" w='80px' alt='logo' mr={280} mb={10} />
    </Box>
   );
}
 
export default Logo;
