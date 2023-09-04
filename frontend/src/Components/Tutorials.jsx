import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Header from "./Header";

export default function Tutorials() {
  const [tutorials, setTutorials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tutorialsPerPage] = useState(50);
  const indexOfLastTutorial = currentPage * tutorialsPerPage;
  const indexOfFirstTutorial = indexOfLastTutorial - tutorialsPerPage;
  const currentTutorials = tutorials.slice(indexOfFirstTutorial, indexOfLastTutorial);

  const isAuthenticated = false;
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
            >
              {showFullDescription ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
      </div>
    );
  };

  const handleAddTutorial = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login first",
      });
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);
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
      <Header />
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
              <h5 className="card-title">{t.title}</h5>
              <DescriptionPreview description={t.description} maxChars={100} />
              {renderAttribute(t, "link")}
              {renderAttribute(t, "price")}
              {renderAttribute(t, "level")}
              {renderAttribute(t, "date")}
              {renderAttribute(t, "category")}
              {renderAttribute(t, "video_link")}
              {renderAttribute(t, "duration")}
              {renderAttribute(t, "upload_date")}
              {/* Add rendering for other attributes here */}
              <button className="btn btn-warning" onClick={() => handleAddTutorial(t)}>
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
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
