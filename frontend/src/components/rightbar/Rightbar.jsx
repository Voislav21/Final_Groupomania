import { useLocation } from "react-router-dom";
import "./rightbar.scss";

const Rightbar = ({ profile }) => {

  const location = useLocation();
  const isHomepage = location.pathname === "/";

  const HomeRightBar = () => {
    return (
      <>
        <img src="/assets/add.png" alt="" className="rightbar-add" />
        <div className="item">
          <span>Suggestions for you</span>
          <div className="user">
            <div className="userInfo">
              <img src="/assets/person/luigi.jpeg" />
              <span>Luigi Mario</span>
            </div>
            <div className="buttons">
              <button>Add Friend</button>
              <button>No Thanks</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img src="/assets/person/toad.jpeg" alt="" />
              <div className="online" />
              <span>Mr. Toadstal</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <div className="profileRightbar">
        <h4 className="title">User information</h4>
        <div className="info">
          <div className="items">
            <span className="key">City:</span>
            <span className="value">Bordeaux</span>
          </div>
          <div className="items">
            <span className="key">From:</span>
            <span className="value">Gold Coast</span>
          </div>
          <div className="items">
            <span className="key">Relationship:</span>
            <span className="value">Married</span>
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