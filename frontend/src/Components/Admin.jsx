import axios from "axios";
import { useNavigate } from "react-router-dom";
import ParamsContainer from "./ParamsContainer";
import "./styleDashboard.css";
import logo from "../assets/img/logo.png";
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
          <img src={logo} alt="Logo" className="logo-admin"/>
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
