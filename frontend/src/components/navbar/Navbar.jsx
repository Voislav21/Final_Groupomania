import "./navbar.scss";
import profileDefault from "../../assets/profile-default.jpeg";
import { WbSunnyOutlined, HomeOutlined, DarkModeOutlined, EmailOutlined, NotificationsNoneOutlined, SearchOutlined, LogoutOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import SearchResults from "../searchResults/SearchResults.jsx";

// Custom hook to handle clicks outside a specified element
const useOutsideClick = (callback) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref]);

  return ref;
};

const Navbar = () => {

  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const imgUrl = "http://195.35.2.197:8080/api/uploads/";

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle clicks outside the search wrapper
  const handleClickOutside = () => {
    setSearchQuery("");
  };

  const ref = useOutsideClick(handleClickOutside);

  // Function to handle user logout
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

  // Function to handle search input change
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

  // Function to handle clicking on a search result
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
        <Link to={`/profile/${currentUser.id}`} style={{ textDecoration: "none", color: "inherit", marginTop: "5px" }}>
          <HomeOutlined />
        </Link>
        {darkMode ? <WbSunnyOutlined onClick={toggle} style={{ cursor: "pointer" }} /> : <DarkModeOutlined onClick={toggle} style={{ cursor: "pointer" }} />}
        <div className="search" ref={ref}>
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