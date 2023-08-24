import {
  Container,
  Button,
  ChakraProvider,
  Heading,
  Center,
  Text,
  Link,
  Flex,
  SimpleGrid,
  Box,
  FormControl,
  FormLabel,
  Input,
  Highlight,
  Image,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import * as React from "react";
import SignUpimage from "../../assets/SignUpimage.png";
import ReturnImage from "../../assets/ReturnImage.png";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";

export default function SignUp() {
  const [name, setname] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [image, setimage] = useState("");
  const [role, setrole] = useState("");
  const [Emails, setEmails] = useState([]);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const getEmails = async () => {
    const data = await axios
      .get("http://localhost:8000/User/mails")
      .then((result) => {
        setEmails(result.data);
      });
  };
  useEffect(() => {
    getEmails();
  });
  //validation de email
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  //integration add user
  const AddUser = async (e) => {
    const data = await axios
      .get("http://localhost:8000/User/mails")
      .then((result) => {
        setEmails(result.data);
      });

    if (!name || !lastName || !email || !password || !image) {
      toast({
        title: "Warning.",
        description: "Please ! you have to fill all the blanks.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    } else if (!isValidEmail(email)) {
      toast({
        title: "Warning.",
        description: "please enter a valid email !",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    } else if (Emails.includes(email)) {
      toast({
        title: "Warning.",
        description: "mail exist deja  !",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    } else if (password.length < 6) {
      toast({
        title: "Warning.",
        description: "password min 6 caracteres  !",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    } else {
      try {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);
        formData.append("role", "user");

        await axios.post("http://localhost:8000/User/addUser", formData);
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {}
    }
  };

  return (
    <ChakraProvider>
      <Container maxW="container.lg" marginLeft="155" marginTop="10px">
        <Box className="paper" p={10} shadow="lg" borderWidth="2px">
        
        
          <Center></Center>
          <SimpleGrid columns={2} spacing={10}>
               
            <Center>      
            <Container spacing={3} marginBottom={-10}>
                <FormControl isRequired>
                  <FormLabel>First name</FormLabel>
                  <Input
                    placeholder="Enter your first name"
                    onChange={(e) => setname(e.target.value)}
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Last name</FormLabel>
                  <Input
                    placeholder="Enter your last name"
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Enter your email"
                    onChange={(e) => setemail(e.target.value)}
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter your password"
                      onChange={(e) => setpassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Picture</FormLabel>
                  <Input
                    placeholder="Picture"
                    type="file"
                    name="image"
                    onChange={(e) => setimage(e.target.files[0])}
                  />
                </FormControl>
                <br></br>
                <Button
                colorScheme="custom" bg="#f67325" marginLeft="150px" type="submit" onClick={AddUser}>
                  Sign Up
                </Button>
                <br></br>
                <br></br>
                <Box textAlign="center">
                <Flex alignItems="center">
                <Text as="span" fontSize="md"  color="#445a67" marginLeft="70px">
                Already have an account ?
              </Text>
                  <Link to="/login">
                    <Button colorScheme="custom" color="#445a67" marginLeft="-12px">
                      Sign In
                    </Button>
                  </Link>
                </Flex>
              </Box>
              </Container>
            </Center>

            <Box>
            
            <Link href="/">
            <Image
              marginLeft="-460px"
              marginTop="-10px"
              boxSize="25px"
              src={ReturnImage}
              alt="Register Image"
            />
          </Link>

              <br></br>
              <br></br>
              <Heading as="h4" size="md">
                <Highlight
                  query="Hello"
                  styles={{ px: "1", py: "1", rounded: "full", bg: "#FF9A60" }}>
                  Hello,
                </Highlight>
              </Heading>
              <br></br>
              <Heading as="h4" size="md">
                <Highlight
                  query="personal details"
                  styles={{ rounded: "full", bg: "#FF9A60" }}>
                  Enter your personal details and start journey with us
                </Highlight>
              </Heading>
              <br></br>
              <center>
              <Image
                boxSize="370px"
                marginTop={'-30px'}
                src={SignUpimage}
                className="SignUpimage"
                alt="React logo"
              />
              </center>
            </Box>
          </SimpleGrid>
        </Box>
      </Container>
    </ChakraProvider>
  );
}
