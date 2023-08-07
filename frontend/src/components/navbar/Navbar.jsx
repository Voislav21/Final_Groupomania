import "./navbar.scss";
import profileDefault from "../../assets/profile-default.jpeg";
import { WbSunnyOutlined, HomeOutlined, DarkModeOutlined, EmailOutlined, NotificationsNoneOutlined, SearchOutlined, LogoutOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import SearchResults from "../searchResults/SearchResults.jsx";

const Navbar = () => {

  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const imgUrl = "http://localhost:8080/api/uploads/";

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/logout", {
        withCredentials: true,
      });
      navigate("/");
      logout(response.data);
    } catch (error) {
      console.error("Error occured during logout:", error);
    }
  };

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    try {
      const response = await axios.get(`http://localhost:8080/api/users/search?q=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error occurred during search:", error);
    }
  };

  const handleResultClick = () => {
    // Hide the search results when clicking on a search result link
    setSearchQuery("");
  };



  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
          <span>Groupomania</span>
        </Link>
        <HomeOutlined />
        {darkMode ? <WbSunnyOutlined onClick={toggle} style={{ cursor: "pointer" }} /> : <DarkModeOutlined onClick={toggle} style={{ cursor: "pointer" }} />}
        <div className="search">
          <div className="search-wrapper">
            <SearchOutlined />
            <input type="text" placeholder="Take a look around..." value={searchQuery} onChange={handleSearch} />
            {searchQuery && <SearchResults results={searchResults} onResultClick={handleResultClick} />}
          </div>
        </div>
      </div>
      <div className="right">
        <EmailOutlined />
        <NotificationsNoneOutlined />
        <LogoutOutlined onClick={handleLogout} style={{ cursor: "pointer" }} />
        <Link to={`/profile/${currentUser.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <div className="user">
            <img src={currentUser.profilePic ? imgUrl + currentUser.profilePic : profileDefault} alt="" />
            <span>{currentUser.firstName} {currentUser.lastName}</span>
          </div>
        </Link>
      </div>
    </div >
  );
};

export default Navbar;