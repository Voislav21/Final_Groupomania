import { useLocation, Link } from "react-router-dom";
import "./rightbar.scss";
import profileDefault from "../../assets/profile-default.jpeg";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import NewsWindow from "../newsWindow/NewsWindow.jsx";

const Rightbar = ({ profile }) => {

  const location = useLocation();
  const isHomepage = location.pathname === "/";

  const { currentUser } = useContext(AuthContext);

  const { isLoading, data } = useQuery(["friends"], () =>
    makeRequest.get("/friendships/friends?userId=" + currentUser.id).then((res) => {
      return res.data;
    }),
  );

  const imgUrl = "https://195.35.2.197:8080/api/uploads/";

  const HomeRightBar = () => {
    return (
      <>
        <Link to={"https://openclassrooms.com/en/"} target="._blank" rel="noopener noreferrer">
          <img src="/assets/add.png" alt="" className="rightbar-add" />
        </Link>
        {data?.length > 0 && (
          <div className="item">
            <span>Friends</span>
            {data.map((friend) => (
              <div className="user" key={friend.friendId}>
                <Link to={`/profile/${friend.friendId}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="userInfo">
                    <img src={friend.profilePic ? imgUrl + friend.profilePic : profileDefault} />
                    <span>{friend.firstName} {friend.lastName}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div >
        )}
        <NewsWindow />
      </>
    );
  };

  const ProfileRightBar = () => {
    const userId = parseInt(useLocation().pathname.split("/")[2]);

    const { isLoading, error, data } = useQuery(["user"], () =>
      makeRequest.get("/users/find/" + userId).then((res) => {
        return res.data;
      })
    );

    return (
      <div className="profileRightbar">
        <h4 className="title">User information</h4>
        <div className="info">
          <div className="items">
            <span className="key">City:</span>
            <span className="value">{data?.city}</span>
          </div>
          <div className="items">
            <span className="key">Occupation:</span>
            <span className="value">{data?.occupation}</span>
          </div>
          <div className="items">
            <span className="key">Hobbies:</span>
            <span className="value">{data?.hobbies}</span>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className={`rightbar ${isHomepage ? "sticky-on-homepage" : ""}`}>
      <div className="container">
        {profile ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
};

export default Rightbar;