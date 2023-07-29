import {
  Container,
  Button,
  ChakraProvider,
  Heading,
  Center,
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
      <Container maxW="container.lg" marginLeft="155" marginTop="40px">
        <Box className="paper" p={10} shadow="lg" borderWidth="2px">
          <Center></Center>
          <SimpleGrid columns={2} spacing={10}>
            <Center>
              <Container spacing={3}>
                <FormControl isRequired>
                  <FormLabel>First name</FormLabel>
                  <Input
                    placeholder="First name"
                    onChange={(e) => setname(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Last name</FormLabel>
                  <Input
                    placeholder="Last name"
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>email</FormLabel>
                  <Input
                    placeholder="email"
                    onChange={(e) => setemail(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="password"
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
                <Button colorScheme="green" type="submit" onClick={AddUser}>
                  Validate
                </Button>
              </Container>
            </Center>

            <Box>
              <br></br>
              <br></br>
              <Heading as="h4" size="md">
                <Highlight
                  query="Hello"
                  styles={{ px: "1", py: "1", rounded: "full", bg: "red.100" }}>
                  Hello,
                </Highlight>
              </Heading>
              <br></br>
              <Heading as="h4" size="md">
                <Highlight
                  query="personal details"
                  styles={{ rounded: "full", bg: "red.100" }}>
                  Enter your personal details and start journey with us
                </Highlight>
              </Heading>
              <br></br>
              <Image
                boxSize="300px"
                src={SignUpimage}
                className="SignUpimage"
                alt="React logo"
              />
            </Box>
          </SimpleGrid>
        </Box>
      </Container>
    </ChakraProvider>
  );
}
