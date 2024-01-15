import { Link } from "react-router-dom";
import { FavoriteOutlined } from "@mui/icons-material";
import { FavoriteBorder } from "@mui/icons-material"
import { SmsOutlined } from "@mui/icons-material";
import { ShareOutlined } from "@mui/icons-material";
import "./post.scss";
import profileDefault from "../../assets/profile-default.jpeg";
import { MoreHorizOutlined } from "@mui/icons-material";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import moment from "moment";
import { makeRequest } from "../../axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  // State to manage comment section visibility
  const [commentOpen, setCommentOpen] = useState(false);
  // State to manage post's menu visibility
  const [menuOpen, setMenuOpen] = useState(false);

  // Accessing user information from AuthContext
  const { currentUser } = useContext(AuthContext);

  // Query to get likes information for the post
  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  // Query to get comments information for the post
  const { isLoading: isLoadingComments, data: comments } = useQuery(["comments", post.id], () =>
    makeRequest.get("/comments?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  // Query client instance to manage cache
  const queryClient = useQueryClient();

  // Mutation to handle liking/unliking a post
  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  // Mutation to handle deleting a post
  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  // Function to handle liking/unliking a post
  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  // Function to handle deleting a post
  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  // Base URL for image
  const imgUrl = "http://api.groupomania-voislav.com/api/uploads/";

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }} >
              <img src={post.profilePic ? imgUrl + post.profilePic : profileDefault} alt="" />
            </Link>
            <div className="details">
              <span className="name">{post.firstName} {post.lastName}</span>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizOutlined onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: "pointer" }} />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img ? imgUrl + post.img : null} alt="" />
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
            {isLoadingComments ? "loading" : comments?.length ?? 0} Comments
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