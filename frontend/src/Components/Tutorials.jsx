import { useEffect, useState } from "react";
import { Card, CardBody, Heading, Text, Wrap } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { ChakraProvider } from '@chakra-ui/react';
import Header from './Header';
export default function Tutorials() {
  const [tutorials, setTutorials] = useState([]);
  const isAuthenticated = false; // Replace this with your actual authentication check (from local storage, Redux, etc.)

 const fetchTutorials = async () => {
  try {
    console.log("Fetching tutorials...");
    const response = await fetch("http://127.0.0.1:8000/tuto/getT");
    console.log("Response status:", response.status);
    
    if (!response.ok) {
      console.error("Failed to fetch tutorials.");
      return;
    }
    
    const data = await response.json();
    console.log("Data received:", data);
    setTutorials(data);
  } catch (error) {
    console.error("An error occurred while fetching tutorials:", error);
  }
}

/*const handleAddTutorial = async (tutorial) => {
  try {
    // Make a POST request to the backend API to add the tutorial to userTutorials
    const response = await axios.post('http://127.0.0.1:3000/userTuto/addUT', {
      utilisateurId: '64c04c705d6e761b1c744da4', // Replace with the user ID of the current user
      tutorialId: tutorial._id
    });

    // Handle the response if needed (e.g., show a success message)
    console.log(response.data); // Response from the server

    // Update the state of userTutorials if needed
    // setUserTutorials((prevTutorials) => [...prevTutorials, tutorial]);
  } catch (error) {
    console.error("An error occurred while adding the tutorial:", error);
  }
};*/

const handleAddTutorial = async () => {
  if (!isAuthenticated) {
    // If the user is not authenticated, do nothing or display a message.
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'login first',
    });// Or you can show a message to prompt the user to log in
  }

 
};



  useEffect(() => {
    fetchTutorials();
  }, []);

    const DescriptionPreview = ({ description, maxChars }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    return (
      <div>
        {showFullDescription ? (
          <>
            <Text>{description}</Text>
            <button onClick={() => setShowFullDescription(false)}>Read Less</button>
          </>
        ) : (
          <>
            <Text>{description.slice(0, maxChars)}</Text>
            {description.length > maxChars && (
              <button onClick={() => setShowFullDescription(true)}>Read More</button>
            )}
          </>
        )}
      </div>
    );
  };

  return (
 
    <ChakraProvider>
      <Header></Header>
    <Wrap spacing='24px'>
{!isAuthenticated}      {tutorials.length > 0 && (
        <>
          {tutorials.map(t => (
         
            <Card key={t._id} maxW='sm'>
            <CardBody>
              <Heading size='md'>{t.metadata.titre}</Heading>
                  <DescriptionPreview description={t.metadata.description} maxChars={100} />
              <Text>{t.metadata.durée}</Text>
              <Text color='blue.600' fontSize='2xl'>
                {t.metadata.difficulty}
              </Text>
              <Text color='blue.600' fontSize='2xl'>
                {t.metadata.vidéo}
              </Text>
              <Text color='blue.600' fontSize='2xl'>
                {t.metadata.difficulty}
              </Text>
              <Text color='blue.600' fontSize='2xl'>
                {t.metadata.code_source}
              </Text>
              <Text color='blue.600' fontSize='2xl'>
                {t.metadata.payant}
              </Text>
              <Text color='blue.600' fontSize='2xl'>
                {t.metadata.ressources}
              </Text>
              <button onClick={() => handleAddTutorial(t)}>Add</button>
            </CardBody>
          </Card>
          ))}
        </>
      )}
    </Wrap>
    </ChakraProvider>
    
  );

          }