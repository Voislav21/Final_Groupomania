import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./comments.scss";
import profileDefault from "../../assets/profile-default.jpeg";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import moment from "moment";

const Comments = ({ postId }) => {

  const [desc, setDesc] = useState("");

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation((newComment) => {
    return makeRequest.post("/comments", newComment);
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (event) => {
    event.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  const imgUrl = "http://localhost:8080/api/uploads/";

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic ? imgUrl + currentUser.profilePic : profileDefault} alt="" />
        <input type="text" placeholder="Write a comment" value={desc} onChange={(event) => setDesc(event.target.value)} />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading ? "Fecthing data" : data.map(comment => (
        <div className="comment" key={comment.id}>
          <img src={comment.profilePic ? imgUrl + comment.profilePic : profileDefault} alt="" />
          <div className="info">
            <span>{comment.firstName} {comment.lastName}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;