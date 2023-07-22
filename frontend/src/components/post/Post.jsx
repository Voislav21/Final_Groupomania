import { Link } from "react-router-dom";
import { FavoriteOutlined } from "@mui/icons-material";
import { FavoriteBorder } from "@mui/icons-material"
import { SmsOutlined } from "@mui/icons-material";
import { ShareOutlined } from "@mui/icons-material";
import "./post.scss";
import { MoreHorizOutlined } from "@mui/icons-material";
import Comments from "../comments/Comments";
import { useState } from "react";

const Post = ({ post }) => {

  const[commentOpen, setCommentOpen] = useState(false);

  //TEMP
  const liked = false;

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }} >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <MoreHorizOutlined />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlined /> : <FavoriteBorder />}
            12 Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <SmsOutlined />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlined />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;