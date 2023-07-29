import { useEffect, useState } from "react";
import { Card, CardBody, Heading, Text, Wrap } from '@chakra-ui/react';
import axios from 'axios'; // Import axios
import { useParams,Link } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Header from "./Header";
export default function Tuto() {
  
  const [tutorials, setTutorials] = useState([]);
  const { _id } = useParams(); // Get the user ID from the URL
  console.log("User ID:", _id);

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

const handleAddTutorial = async (tutorial) => {
  try {
    console.log("Tutorial to add:", tutorial);
    console.log("User ID:", _id);
    // Make a POST request to the backend API to add the tutorial to userTutorials
    const response = await axios.post('http://127.0.0.1:8000/userTuto/addUT', {
      utilisateurId: _id, // Replace with the user ID of the current user
      tutorialId: tutorial._id
    });

    // Handle the response if needed (e.g., show a success message)
    console.log(response.data); // Response from the server

    // Update the state of userTutorials if needed
    // setUserTutorials((prevTutorials) => [...prevTutorials, tutorial]);
  } catch (error) {
    console.error("An error occurred while adding the tutorial:", error);
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
        
      {tutorials.length > 0 && (
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
                <button onClick={() => handleAddTutorial(t)}>Add</button><br></br>
                <Link to={`/UserTutorials/${_id}`}>historic</Link>
              </CardBody>
            </Card>
          ))}
        </>
      )}
    </Wrap>
    </ChakraProvider>

  );
}