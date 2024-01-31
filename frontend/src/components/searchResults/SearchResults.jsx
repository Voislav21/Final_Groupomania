import React from "react";
import "./searchResults.scss";
import profileDefault from "../../assets/profile-default.jpeg";
import { Link } from "react-router-dom";

const SearchResults = ({ results, onResultClick }) => {
  const imgUrl = `${import.meta.env.VITE_API_BASE_URL}/api/uploads/`;

  return (
    <div className="search-results-box">
      {results?.length > 0 ? (
        <>
          {results.map((user) => (
            <div key={user.id} className="search-result-item">
              <Link to={`/profile/${user.id}`} style={{ textDecoration: "none", color: "inherit" }} onClick={onResultClick}>
                <img src={user.profilePic ? imgUrl + user.profilePic : profileDefault} alt="" />
                {user.firstName} {user.lastName}
              </Link>
            </div>
          ))}
        </>
      ) : (
        <div>No Results found</div>
      )}
    </div>
  );
};

export default SearchResults;
