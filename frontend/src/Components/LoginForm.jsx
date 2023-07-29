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
  useToast, // Import useToast from @chakra-ui/react
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import SignInimage from "../assets/SignInImage.png"; 
import ReturnImage from "../assets/ReturnImage.png";// Update the path and case of the file name
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast(); // Use the useToast hook to create toast messages

  const handleLogin = () => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all the fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (!email.includes("@")) {
      toast({
        title: "Error",
        description: "Invalid email format. Please enter a valid email.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      axios
        .post("http://localhost:8000/user/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.data.msg === "login success") {
            const { token, role, _id } = response.data.user;
            localStorage.setItem("token", token);
            localStorage.setItem("role", role); // Store the user's role in local storage

            if (role === "admin") {
              navigate(`/Admin/${_id}`); // Redirect to the admin dashboard if the role is admin
            } else {
              // Redirect to the user dashboard for any other role (default is 'user')
              navigate(`/Tuto/${_id}`);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          if (
            error.response.data === "email does not exist" ||
            error.response.data === "wrong password"
          ) {
            toast({
              title: "Error",
              description: "Invalid email or password.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Error",
              description: "Password does not match the email.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        });
    }
  };

  return (
    <ChakraProvider>
    <Box bg="white" minHeight="100vh" py="20px">
      <Container maxW="container.lg"  marginLeft="168" marginTop="-10px">
        <Box className="paper" p={10} shadow="lg" borderWidth="2px">
          <Center></Center>
          <SimpleGrid columns={2} spacing={10}>
            <Box >
            
                  {/* Image that links to /register */}
                  <Link to="/">
                    <Image
                      boxSize="25px"
                      src={ReturnImage} // Replace with the actual path to your image
                      alt="Register Image"
                    />
                  </Link>
                  
              <br />
              <br />
              <Heading as="h4" size="md">
                <Highlight
                
                  query="Welcome back!"
                  styles={{ px: "1", py: "1", rounded: "full",  bg: "#FF9A60",  }}
                >
                Welcome back! 
                </Highlight>
              </Heading>
              <br />
              <Heading as="h4" size="md">
                <Highlight
                  query="credentials"
                  styles={{ rounded: "full",  bg: "#FF9A60" }}
                >
                Enter your credentials to continue
                </Highlight>
              </Heading>
             
              <center>
              <Image
                
                boxSize="370px"
                src={SignInimage}
                className="SignInimage"
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
                < br />
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <Box textAlign="right">
                  <Link to="/Forgot-Password">
                    <Button variant="link" colorScheme="custom" color="#445a67" mt={4}>
                      Forgot Password
                    </Button>
                  </Link>
                </Box>

                </FormControl>

                <br />
                <Center>
                  <Button colorScheme="custom" bgColor="#f67325" onClick={handleLogin}>
                    Login
                  </Button>
                </Center>
                  <br/>
                <Box textAlign="center">
                <Flex alignItems="center">
                <Text as="span" fontSize="md"  color="#445a67" marginLeft="80px">
                Don't have an account? 
              </Text>
                  <Link to="/SignUp">
                    <Button colorScheme="custom" color="#445a67" marginLeft="-12px">
                      Sign Up
                    </Button>
                  </Link>
                </Flex>
              </Box>


              </Container>
            </Center>
          </SimpleGrid>
        </Box>
      </Container>
      </Box>
    </ChakraProvider>
  );
}

