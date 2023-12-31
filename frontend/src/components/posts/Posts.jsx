import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";

const Posts = ({ userId }) => {

  const { isLoading, error, data } = useQuery(["posts", userId], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="posts">
      {error
        ? "Somthing went wrong!"
        : isLoading
          ? "loading"
          : data.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default Posts;