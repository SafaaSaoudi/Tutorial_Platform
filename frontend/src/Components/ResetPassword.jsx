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
  import axios from "axios";
  import { useNavigate, useParams, Link } from "react-router-dom";
  import ResetPasswordimage from "../assets/ResetPassword.png";
  import ReturnImage from "../assets/ReturnImage.png";
  
  export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const toast = useToast();
    const { code } = useParams(); 
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        
        await axios.put("http://127.0.0.1:8000/reset-password", { code, password });
  
        toast({
          title: "Password reset successful",
          description: "Your password has been successfully reset.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/login");
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred during password reset.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.log(error);
      }
    };
  
  
    return (
      <ChakraProvider>
        <Box bg="white" minHeight="100vh" py="20px">
          <Container maxW="container.lg" marginLeft="168" marginTop="-10px">
            <Box className="paper" p={10} shadow="lg" borderWidth="2px">
                <SimpleGrid columns={2} spacing={10}>
                  <Box>
                    <Link to="/login">
                      <Image boxSize="25px" src={ReturnImage} alt="Register Image" />
                    </Link>
                    <br />
                    <br />
                    <Heading as="h4" size="md">
                    <Highlight
                    
                      query="fresh start "
                      styles={{ px: "1", py: "1", rounded: "full",  bg: "#FF9A60",  }}
                    >
                    Time for a fresh start! 
                    </Highlight>
                  </Heading>
                  <br />
                  <Heading as="h4" size="md">
                    <Highlight
                      query="new password"
                      styles={{ rounded: "full",  bg: "#FF9A60" }}
                    >
                    Enter your new password to continue
                    </Highlight>
                  </Heading>
                  <br/>
                    <center>
                      <Image
                        boxSize="350px"
                        src={ResetPasswordimage}
                        className="ResetPasswordimage"
                        alt="React logo"
                      />
                    </center>
                  </Box>
                  <Center>
                    <Container spacing={3} marginBottom={-10}>
                      <FormControl isRequired>
                        <FormLabel>New password</FormLabel>
                        <Input
                          type="password"
                          placeholder="Enter your new password."
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </FormControl>
                      <br />
                      <Center>
                        <Button colorScheme="custom" bgColor="#f67325" onClick={handleSubmit}>
                          Reset Password
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
  