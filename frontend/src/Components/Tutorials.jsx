import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import Header from './Header';

export default function Tutorials() {
  const [tutorials, setTutorials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tutorialsPerPage] = useState(50); // Updated to display 50 tutorials per page
  const isAuthenticated = false; // Replace this with your actual authentication check (from local storage, Redux, etc.)

  const fetchTutorials = async () => {
    try {
      console.log("Fetching tutorials...");
      const response = await fetch("http://localhost:8000/tuto/getT");
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

  // Calculate the indexes of the tutorials to be displayed on the current page
  const indexOfLastTutorial = currentPage * tutorialsPerPage;
  const indexOfFirstTutorial = indexOfLastTutorial - tutorialsPerPage;
  const currentTutorials = tutorials.slice(indexOfFirstTutorial, indexOfLastTutorial);

  const handleAddTutorial = async () => {
    if (!isAuthenticated) {
      // If the user is not authenticated, do nothing or display a message.
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Login first',
      }); // Or you can show a message to prompt the user to log in
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
              className="btn btn-sm btn-primary"
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
  

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
          {currentTutorials.length > 0 && (
            <>
              {currentTutorials.map(t => (
                <div key={t._id} className="col-md-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{t.title}</h5>
                      <DescriptionPreview description={t.description} maxChars={100} />
                      <a href={t.link}>{t.link}</a>                      
                      <button className="btn btn-warning" style={{
                        backgroundColor: '#f67325',
                        color: '#fff',
                        borderColor: '#f67325',
                        display: 'block',
                        marginTop: '20px'
                      }} 
                      onClick={() => handleAddTutorial(t)}>Add</button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="container mt-4">
        {tutorials.length > tutorialsPerPage && (
          <ul className="pagination">
            {Array.from({ length: Math.ceil(tutorials.length / tutorialsPerPage) }, (_, index) => (
              <li className="page-item" key={index + 1}>
                <button
                  className={`page-link ${currentPage === index + 1 ? "active" : ""}`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
