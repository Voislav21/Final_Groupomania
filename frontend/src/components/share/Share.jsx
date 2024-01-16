import { useContext, useState } from "react";
import "./share.scss";
import profileDefault from "../../assets/profile-default.jpeg";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {
  // State to manage the selected file for uploading
  const [file, setFile] = useState(null);
  // State to manage the user's input for the post description
  const [desc, setDesc] = useState("");

  // Function to upload the selected file
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await makeRequest.post("/upload", formData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Accessing current user's information from AuthContext
  const { currentUser } = useContext(AuthContext);

  // Query client instance to manage cache
  const queryClient = useQueryClient();

  // Mutation to handle creating a new post
  const mutation = useMutation((newPost) => {
    return makeRequest.post("/posts", newPost);
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  // Function to handle the "Share" button click
  const handleClick = async (event) => {
    event.preventDefault();
    let imgUrl = "";
    // Upload the file if available and get the image URL
    if (file) imgUrl = await upload();
    // Create a new post using the description and image URL
    mutation.mutate({ desc, img: imgUrl });
    // Reset input fields
    setDesc("");
    setFile(null);
  };

  // Base URL for image
  const imgUrl = "https://api.groupomania-voislav.com/api/uploads/";

  return (
    <div className="share">
      <div className="wrapper">
        <div className="share-top">
          <img src={currentUser.profilePic ? imgUrl + currentUser.profilePic : profileDefault} alt="" className="profile-pic" />
          <input type="text" placeholder="Share your thoughts" className="input"
            onChange={(event) => setDesc(event.target.value)} value={desc}/>
        </div>
        <hr className="hr" />
        <div className="preview">
          {file && (
          <img className="file" alt="" src={URL.createObjectURL(file)} />)}
        </div>
        <div className="share-bottom">
          <div className="options">
            <label htmlFor="file-input" className="option">
              <PermMedia className="icon" />
              <span className="text">Photo or Video</span>
            </label>
            <input type="file" id="file-input" style={{ display: "none" }}
              onChange={(event) => setFile(event.target.files[0])} />
            <div className="option">
              <Label className="icon" />
              <span className="text">Tag</span>
            </div>
            <div className="option">
              <Room className="icon" />
              <span className="text">Location</span>
            </div>
          </div>
          <button onClick={handleClick} className="button">Share</button>
        </div>
      </div>
    </div>
  );
};

export default Share;