import { useEffect, useState } from "react";
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
          {ututorials.length > 0 && (
            <>
              {ututorials.map(t => (
                <div key={t._id} className="col-md-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{t.tutorial.title}</h5>
                      <h5>{t.tutorial.description}</h5>
                      <a href={t.link}>{t.link}</a>                      
                      <button className="btn btn-warning" onClick={() => handleDeleteTutorial(t._id)}>Delete</button>
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
