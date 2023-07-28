import { ChakraProvider } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { Card, CardBody, Heading, Text, Wrap } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Header from './Header';

export default function UserTutorials() {
  const [ututorials, setUTutorials] = useState([]);
  const { _id } = useParams(); // Get the user ID from the URL

  const fetchTutos = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/userTuto/getUTT/${_id}`);
      if (!response.ok) {
        console.error("Failed to fetch user tutorials.");
        return;
      }
      const data = await response.json();
      console.log(data); // Check the data received from the API
      setUTutorials(data);
    } catch (error) {
      console.error("An error occurred while fetching user tutorials:", error);
    }
  };

  useEffect(() => {
    fetchTutos();
  }, [_id]);

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

  const handleDeleteTutorial = async (UtutorialId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/userTuto/deleteUT/${UtutorialId}`, {
        method: 'POST',
      });

      if (response.ok) {
        // Tutorial deleted successfully, update the list of user tutorials
        fetchTutos();
      } else {
        console.error("Failed to delete user tutorial.");
      }
    } catch (error) {
      console.error("An error occurred while deleting user tutorial:", error);
    }
  };

  return (
    <ChakraProvider>
      <Header />
      <Wrap spacing='24px'>
        {ututorials.length > 0 && (
          <>
            {ututorials.map(ut => (
              <Card key={ut._id} maxW='sm'>
                <CardBody>
                  <Heading size='md'>{ut.tutorial.metadata.titre}</Heading>
                  <DescriptionPreview description={ut.tutorial.metadata.description} maxChars={100} />
                  {/* Rest of the card content */}
                  <Text color='blue.600' fontSize='2xl'>
                    {ut.tutorial.metadata.difficulty}
                  </Text>
                  <Text color='blue.600' fontSize='2xl'>
                    {ut.tutorial.metadata.vidéo}
                  </Text>
                  <Text color='blue.600' fontSize='2xl'>
                    {ut.tutorial.metadata.difficulty}
                  </Text>
                  <Text color='blue.600' fontSize='2xl'>
                    {ut.tutorial.metadata.code_source}
                  </Text>
                  <Text color='blue.600' fontSize='2xl'>
                    {ut.tutorial.metadata.payant}
                  </Text>
                  <Text color='blue.600' fontSize='2xl'>
                    {ut.tutorial.metadata.ressources}
                  </Text>
                  <button onClick={() => handleDeleteTutorial(ut._id)}>Delete</button>
                </CardBody>
              </Card>
            ))}
          </>
        )}
      </Wrap>
    </ChakraProvider>
  );
}
