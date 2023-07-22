import { useContext } from "react";
import {AuthContext} from "../../context/authContext";
import "./comments.scss";

const Comments = () => {

  const {currentUser} = useContext(AuthContext);

  //TEMP 
  const comments = [
    {
      id: 1,
      desc: "I wouldnt exactly call this an invitation Mario? Get over Peach bro, shes not into you like that!",
      name: "Luigi",
      userId: 2,
      profilePic: "/assets/person/luigi.jpeg",
    },
    {
      id: 2,
      desc: "First you both have to try and save her from me!! Mwahahaha, You will never get through my maze",
      name: "Bowser",
      userId: 3,
      profilePic: "/assets/person/Bowser.png",
    },
  ];
  
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input placeholder="Write a comment" />
        <button>Send</button>
      </div>
      {comments.map(comment => (
        <div className="comment" key={comment.id}>
          <img src={comment.profilePic} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;