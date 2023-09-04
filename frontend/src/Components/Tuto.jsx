import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Header from "./Header";

export default function Tutorials() {
  const [tutorials, setTutorials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tutorialsPerPage] = useState(50);
  const [searchText, setSearchText] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedUploadDateFilter, setSelectedUploadDateFilter] = useState("All");

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

    const truncatedDescription = description ? description.slice(0, maxChars) : "";

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <p>{showFullDescription ? description : truncatedDescription}</p>
          {description && description.length > maxChars && (
            <button className="btn btn-sm btn-primary" onClick={toggleDescription} style={{
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

  // Fonction pour réinitialiser les filtres à leurs valeurs par défaut
  const resetFilters = () => {
    setSearchText("");
    setSelectedLevel("");
    setSelectedPrice("");
    setSelectedType("");
    setSelectedDuration("");
    setSelectedUploadDateFilter("All");
  };

  const renderAttribute = (tutorial, attributeKey) => {
    if (tutorial.hasOwnProperty(attributeKey) && tutorial[attributeKey]) {
      return (
        <div key={attributeKey}>
          <strong>{attributeKey}: </strong>
          {tutorial[attributeKey]}
        </div>
      );
    }
    return null;
  };

  const formatDuration = (duration) => {
    const timeParts = duration.split(":");
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const seconds = parseInt(timeParts[2]);
    return (hours * 60 + minutes + seconds / 60).toFixed(2);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const applyFilters = (tutorial) => {
    const titleMatch = tutorial.title.toLowerCase().includes(searchText.toLowerCase());
    const levelMatch = selectedLevel === "" || tutorial.level === selectedLevel;
    const priceMatch = selectedPrice === "" || tutorial.price === selectedPrice;
    const typeMatch = selectedType === "" || tutorial.type === selectedType;

    if (selectedType === "video") {
      const videoLinkMatch = tutorial.video_link?.startsWith("https://www.youtube.com/");

      return (
        titleMatch &&
        levelMatch &&
        priceMatch &&
        videoLinkMatch &&
        (selectedDuration === "" || parseFloat(formatDuration(tutorial.duration)) <= parseFloat(selectedDuration)) &&
        (selectedUploadDateFilter === "All" ||
          (selectedUploadDateFilter === "Older" && new Date(tutorial.upload_date).getFullYear() <= 2015) ||
          (selectedUploadDateFilter === "Old" && new Date(tutorial.upload_date).getFullYear() <= 2020) ||
          (selectedUploadDateFilter === "Recent" && new Date(tutorial.upload_date).getFullYear() === 2023))
      );
    } else if (selectedType === "document") {
      const documentLinkMatch = tutorial.link?.startsWith("https://www.w3schools.com/");

      return (
        titleMatch &&
        levelMatch &&
        priceMatch &&
        documentLinkMatch
      );
    } else if (selectedType === "course") {
      const courseLinkMatch = tutorial.link?.startsWith("https://alison.com/") ||
        tutorial.link?.startsWith("https://www.theodinproject.com/") ||
        tutorial.link?.startsWith("https://www.simplilearn.com/") ||
        tutorial.link?.startsWith("https://www.sololearn.com/") ||
        tutorial.link?.startsWith("https://www.udemy.com/courses/");

      return (
        titleMatch &&
        levelMatch &&
        priceMatch &&
        courseLinkMatch
      );
    }

    return titleMatch && levelMatch && priceMatch && typeMatch;
  };

  const filteredTutorials = tutorials.filter(applyFilters);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container mt-4">
        <div className="text-center">
          <h2 className="text-secondary">Available Tutorials</h2>
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title..."
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText} // Assurez-vous d'ajouter la valeur pour que l'input reflète l'état actuel
          />
          <button className="btn btn-secondary" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
        <div className="row">
          <div className="col-md-4 mb-4">
            <select
              className="form-select"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Mixed">Mixed</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div className="col-md-4 mb-4">
            <select
              className="form-select"
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
            >
              <option value="">Select Price</option>
              <option value="Free">Free</option>
              <option value="Free & Paid Courses">Free & Paid Courses</option>
            </select>
          </div>
          <div className="col-md-4 mb-4">
            <select
              className="form-select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="video">Video</option>
              <option value="course">Course</option>
              <option value="document">Document</option>
            </select>
          </div>
          {selectedType === "video" && (
            <div className="col-md-4 mb-4" >
              <input
                type="range"
                className="form-range"
                min="0"
                max="180"
                step="1"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
              />
              <div>
                <span >Duration: {selectedDuration} minutes</span>
              </div>
            </div>
          )}
          {selectedType === "video" && (
            <div className="col-md-4 mb-4">
              <select
                className="form-select"
                value={selectedUploadDateFilter}
                onChange={(e) => setSelectedUploadDateFilter(e.target.value)}
              >
                <option value="All">All Upload Dates</option>
                <option value="Older">Older</option>
                <option value="Old">Old</option>
                <option value="Recent">Recent</option>
              </select>
            </div>
          )}
        </div>
        <div className="row">
          {filteredTutorials.length > 0 &&
            filteredTutorials.map((t) => (
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
                    <button className="btn btn-warning" onClick={() => handleAddTutorial(t)} style={{
                      backgroundColor: '#f67325',
                      color: '#fff',
                      borderColor: '#f67325',
                      display: 'block',
                      marginTop: '20px'
                    }}>
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
