import "./leftbar.scss";
import { 
  RssFeed,
  Chat,
  Group,
  Bookmark,
  Event,
  School,
} from "@mui/icons-material";

const Leftbar = () => {
  return (
    <div className="leftbar">
      <div className="container">
        <ul className="menu">
          <li className="leftbar-list-item">
            <RssFeed className="leftbar-icon" />
            <span className="leftbar-list-item-text">Feed</span>
          </li>
          <li className="leftbar-list-item">
            <Chat className="leftbar-icon" />
            <span className="leftbar-list-item-text">Chat</span>
          </li>
          <li className="leftbar-list-item">
            <Group className="leftbar-icon" />
            <span className="leftbar-list-item-text">Group</span>
          </li>
          <li className="leftbar-list-item">
            <Bookmark className="leftbar-icon" />
            <span className="leftbar-list-item-text">Bookmark</span>
          </li>
          <li className="leftbar-list-item">
            <Event className="leftbar-icon" />
            <span className="leftbar-list-item-text">Event</span>
          </li>
          <li className="leftbar-list-item">
            <School className="leftbar-icon" />
            <span className="leftbar-list-item-text">School</span>
          </li>
        </ul>
        <button className="leftbar-button">Show More</button>
        <hr className="leftbar-hr" />
      </div>
    </div>
  );
};

export default Leftbar;