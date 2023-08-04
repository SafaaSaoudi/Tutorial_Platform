import { ChakraProvider, Flex, Box,Heading } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

export default function Header(){
    return (
        <ChakraProvider>
          <Flex as="nav" bg="#FBD38D" padding="1rem" alignItems="center">
          <Box marginRight="2rem">
          <Heading as="h5" size="xl" color="white">
          <Link to="/" >Tutorials Platform</Link>
        </Heading>
          </Box>

            <Box marginRight="2rem">
              <Link to="/" >Tutorials</Link>
            </Box>



            <Box marginRight="2rem">
              <Link to="/login">Login</Link>
            </Box>
          </Flex>
          </ChakraProvider>

)}