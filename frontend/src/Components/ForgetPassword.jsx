import {
    Container,
    Button,
    ChakraProvider,
    Heading,
    Center,
    SimpleGrid,
    Box,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Input,
    Highlight,
    Image,
    InputGroup,
    InputRightElement,
    useToast, 
    } from "@chakra-ui/react";
    import * as React from "react";
    import { useState, useEffect } from "react";
    import axios from "axios"; // Importez le package axios pour envoyer des requêtes HTTP
    
    import ForgotPasswordimage from "../assets/ForgotPassword.png";
    import ReturnImage from "../assets/ReturnImage.png";
    import { useNavigate, Link } from "react-router-dom";
  
    export default function ForgetPassword() {
      const [email, setEmail] = useState("");
      const [message, setMessage] = useState("");
      const navigate = useNavigate();
      const toast = useToast();
     
    
      
      const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            await axios.post('http://127.0.0.1:8000/forgot-password', { email }); // Update the URL to use the correct port for the backend
            setMessage('An email has been sent with a code to reset your password.');
            toast({
              title: 'Success',
              description: 'An email has been sent with a code to reset your password.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
  
            
          } catch (error) {
            setMessage('An error occurred while sending the email.');
            toast({
              title: 'Error',
              description: 'An error occurred while sending the email.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
            console.log(error);
          }
        };
        useEffect(() => {
          if (message === "An email has been sent with a code to reset your password.") {
            // Après 5 secondes (5000 ms), redirigez l'utilisateur vers la page de saisie du code
            setTimeout(() => {
              navigate("/reset-code"); // Utilisez la fonction navigate avec l'URL de la page de saisie du code
            }, 3000); // 5000 ms = 5 secondes
          }
        }, [message]);
      
  
    return (
      <ChakraProvider>
        <Box bg="white" minHeight="100vh" py="20px">
          <Container maxW="container.lg" marginLeft="168" marginTop="-10px">
            <Box className="paper" p={10} shadow="lg" borderWidth="2px">
              <Center></Center>
              <SimpleGrid columns={2} spacing={10}>
                <Box>
                  <Link to="/login">
                    <Image
                      boxSize="25px"
                      src={ReturnImage}
                      alt="Register Image"
                    />
                  </Link>
                  <br />
                  <br />
  
  
  
  
                  <Heading as="h4" size="md">
                  <Highlight
                  
                    query="password"
                    styles={{ px: "1", py: "1", rounded: "full",  bg: "#FF9A60",  }}
                  >
                  Forgot your password ? 
                  </Highlight>
                </Heading>
                <br />
                <Heading as="h4" size="md">
                  <Highlight
                    query="email address"
                    styles={{ rounded: "full",  bg: "#FF9A60" }}
                  >
                  No worries! Enter your email address to reset your password.
                  </Highlight>
                </Heading>
                  <center>
                    <Image
                      boxSize="380px"
                      src={ForgotPasswordimage}
                      className="ForgotPasswordimage"
                      alt="React logo"
                    />
                  </center>
                </Box>
                <Center>
                  <Container spacing={3} marginBottom={-10}>
                    <FormControl isRequired>
                      <FormLabel>Email Address</FormLabel>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormControl>
                    <br />
                    <Center>
                      <Button
                        colorScheme="custom"
                        bgColor="#f67325"
                        onClick={handleSubmit} // Appel à la fonction handleForgotPassword lors du clic sur le bouton
                      >
                        Continue
                      </Button>
                    </Center>
                    <br />
                  </Container>
                </Center>
              </SimpleGrid>
            </Box>
          </Container>
        </Box>
      </ChakraProvider>
    );
  }
  