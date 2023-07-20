import "./share.scss";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"

const Share = () => {
  return (
    <div className="share">
      <div className="wrapper">
        <div className="share-top">
          <img src="/assets/person/mario.png" alt="" className="profile-pic" />
          <input type="text" placeholder="Share your thoughts" className="input" />
        </div>
        <hr className="hr" />
        <div className="share-bottom">
          <div className="options">
            <div className="option">
              <PermMedia className="icon" />
              <span className="text">Photo or Video</span>
            </div>
            <div className="option">
              <Label className="icon" />
              <span className="text">Tag</span>
            </div>
            <div className="option">
              <Room className="icon" />
              <span className="text">Location</span>
            </div>
            <div className="option">
              <EmojiEmotions className="icon" />
              <span className="text">Feelings</span>
            </div>
          </div>
          <button className="button">Share</button>
        </div>
      </div>
    </div>
  );
};

export default Share;