import { Link } from "react-router-dom";
import { FavoriteOutlined } from "@mui/icons-material";
import { FavoriteBorder } from "@mui/icons-material"
import { SmsOutlined } from "@mui/icons-material";
import { ShareOutlined } from "@mui/icons-material";
import "./post.scss";
import { MoreHorizOutlined } from "@mui/icons-material";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import moment from "moment";
import { makeRequest } from "../../axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {

  const [commentOpen, setCommentOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation((liked) => {
    if (liked) return makeRequest.delete("/likes?postId=" + post.id);
    return makeRequest.post("/likes", { postId: post.id });
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/uploads/" + post.profilePic} alt="" />
            <div className="details">
              <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }} >
                <span className="name">{post.firstName} {post.lastName}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizOutlined />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"../uploads/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading"
            ) :
              data.includes(currentUser.id) ? (
                <FavoriteOutlined style={{ color: "pink" }} onClick={handleLike} />
              ) : (
                <FavoriteBorder onClick={handleLike} />)}
            {data?.length} Likes
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
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;