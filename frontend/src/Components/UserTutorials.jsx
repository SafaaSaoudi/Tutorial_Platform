import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import HeaderL from './HeaderL';

export default function UserTutorials() {
  const [ututorials, setUTutorials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tutorialsPerPage] = useState(50);
  const indexOfLastTutorial = currentPage * tutorialsPerPage;
  const indexOfFirstTutorial = indexOfLastTutorial - tutorialsPerPage;
  const currentTutorials = ututorials.slice(indexOfFirstTutorial, indexOfLastTutorial);
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
  const DescriptionPreview = ({ description, maxChars }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
  
    const toggleDescription = () => {
      setShowFullDescription(!showFullDescription);
    };
  
    // Check if description is defined before using slice
    const truncatedDescription = description ? description.slice(0, maxChars) : "";
  
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <p>{showFullDescription ? description : truncatedDescription}</p>
          {description && description.length > maxChars && (
            <button
              className="btn btn-sm btn-primary"
              onClick={toggleDescription}
              style={{
                display: 'block',
                marginRight: '-10px',
                backgroundColor: '#445a67',
                color: '#fff',
                borderColor: '#445a67',
              }}>
            
              {showFullDescription ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
      </div>
    );
  };
  const renderAttribute = (tutorial, attributeKey) => {
    // Check if the attribute exists in the tutorial data
    if (tutorial.hasOwnProperty(attributeKey) && tutorial[attributeKey]) {
      return (
        <div key={attributeKey}>
          <strong>{attributeKey}: </strong>
          {tutorial[attributeKey]}
        </div>
      );
    }
    return null; // Return null if the attribute doesn't exist or is falsy
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <HeaderL/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="container mt-4">
  <div className="text-center">
    <h2 className="text-secondary">Available Tutorials</h2>
  </div>
  <div className="row">
    {currentTutorials.length > 0 &&
      currentTutorials.map((t) => (
        <div key={t._id} className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{t.tutorial.title}</h5>
              <DescriptionPreview description={t.tutorial.description} maxChars={100} />
              {renderAttribute(t.tutorial, "link")}
              {renderAttribute(t.tutorial, "price")}
              {renderAttribute(t.tutorial, "level")}
              {renderAttribute(t.tutorial, "date")}
              {renderAttribute(t.tutorial, "category")}
              {renderAttribute(t.tutorial, "video_link")}
              {renderAttribute(t.tutorial, "duration")}
              {renderAttribute(t.tutorial, "upload_date")}
              <button className="btn btn-warning" onClick={() => handleDeleteTutorial(t._id)} style={{
                backgroundColor: '#f67325',
                color: '#fff',
                borderColor: '#f67325',
                display: 'block',
                marginTop: '20px'
              }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
  </div>
</div>
      <div className="container mt-4">
        {ututorials.length > tutorialsPerPage && (
          <ul className="pagination">
            {Array.from({ length: Math.ceil(ututorials.length / tutorialsPerPage) }, (_, index) => (
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

