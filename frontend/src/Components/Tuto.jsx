import { useEffect, useState } from "react";
import {Text } from '@chakra-ui/react';
import axios from 'axios'; // Import axios
import { useParams } from 'react-router-dom';
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
  
    const toggleDescription = () => {
      setShowFullDescription(!showFullDescription);
    };
  

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <p>{showFullDescription ? description : description.slice(0, maxChars)}</p>
          {description.length > maxChars && (
            <button
            className="btn btn-primary"
            onClick={toggleDescription}
            style={{
              display: 'block',
              marginRight: '-10px',
              backgroundColor: '#445a67',
              color: '#fff',
              borderColor: '#445a67',
              fontSize: '0.75rem', // Taille de police plus petite
              padding: '0.2rem 0.5rem', // Rembourrage plus petit
            }}
          >
            {showFullDescription ? "Read Less" : "Read More"}
          </button>
          

          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="container mt-4">
      <div className="text-center">
          <h2 className="text-secondary">Available Tutorials</h2>
          
        </div>   
        <br></br>
        <br></br>
        <br></br> 
            <div className="row">
          {tutorials.length > 0 && (
            <>
              {tutorials.map(t => (
                <div key={t._id} className="col-md-4 mb-4">
                  <div className="card">
                    <div className="card-body" >
                      <h5 className="card-title">{t.title}</h5>
                      <DescriptionPreview description={t.description} maxChars={100} />
                      <a href={t.link}>{t.link}</a>                      
                      <button
  className="btn btn-warning"
  onClick={() => handleAddTutorial(t)}
  style={{
    backgroundColor: '#f67325',
    color: '#fff',
    borderColor: '#f67325',
    display: 'block',
    marginTop: '20px'
  }}
>
  Add
</button>

                    
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

    </div>
  );
}
