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
  import { useState } from "react";
  import axios from "axios"; // Importez le package axios pour envoyer des requêtes HTTP
  import ResetCodeImage from "../assets/ResetCode.png";
  import ReturnImage from "../assets/ReturnImage.png";
  import { useNavigate, Link } from "react-router-dom";
  
  export default function ResetCode() {
    const [code, setCode] = useState("");
    const navigate = useNavigate();
    const toast = useToast();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Envoyez le code de réinitialisation saisi par l'utilisateur au backend pour vérification
        await axios.post('http://127.0.0.1:8000/reset-code', { code });
  
        toast({
          title: 'Success',
          description: 'Valid reset code. You can now reset your password.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
  
        // Rediriger l'utilisateur vers la page de réinitialisation du mot de passe avec le code saisi
        navigate(`/reset-password/${code}`);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Invalid reset code. Please check the code and try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        console.log(error);
      }
    }
  
    return (
      <ChakraProvider>
        <Box bg="white" minHeight="100vh" py="20px">
          <Container maxW="container.lg" marginLeft="168" marginTop="-10px">
            <Box className="paper" p={10} shadow="lg" borderWidth="2px">
              <Center></Center>
              <SimpleGrid columns={2} spacing={10}>
                <Box>
                  <Link to="/forgot-password">
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
                  
                    query="Code received! "
                    styles={{ px: "1", py: "1", rounded: "full",  bg: "#FF9A60",  }}
                  >
                  Code received! 
                  </Highlight>
                </Heading>
                <br />
                <Heading as="h4" size="md">
                  <Highlight
                    query="password"
                    styles={{ rounded: "full",  bg: "#FF9A60" }}
                  >
                  Please enter it here to proceed with resetting your password
                  </Highlight>
                </Heading>
                  <center>
                    <Image
                      boxSize="380px"
                      src={ResetCodeImage}
                      className="ResetCodeImage"
                      alt="React logo"
                    />
                  </center>
                </Box>
                <Center>
                  <Container spacing={3} marginBottom={-10}>
                    <FormControl isRequired>
                      <FormLabel>Verification Code</FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter the verification code"
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </FormControl>
                    <br />
                    <Center>
                      <Button
                        colorScheme="custom"
                        bgColor="#f67325"
                        onClick={handleSubmit}
                      >
                        Verify Code
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
  