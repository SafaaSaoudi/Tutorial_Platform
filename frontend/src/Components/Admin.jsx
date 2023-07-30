import axios from "axios";
import { useNavigate } from "react-router-dom";
import ParamsContainer from "./ParamsContainer";
import { SearchIcon } from "@chakra-ui/icons";
import "./styleDashboard.css";

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("http://127.0.0.1:8000/user/logout", {})
      .then((response) => {
        console.log(response);
        if (response.data.msg === "user logout") {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="dashboard">
      <div className="sidebar">
        <div>
          <div className="logo">
            <SearchIcon color="black" />
            <h1>Tuto App</h1>
          </div>
          <div className="sidebar-items">
            <button className="btn-params">Research Parameters</button>
          </div>
        </div>
        <div className="sidebar-items-end">
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <ParamsContainer />
    </div>
  );
};

export default Admin;
