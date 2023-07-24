import { useContext, useState } from "react";
import "./share.scss";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

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

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation((newPost) => {
    return makeRequest.post("/posts", newPost);
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (event) => {
    event.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
  };

  return (
    <div className="share">
      <div className="wrapper">
        <div className="share-top">
          <img src={currentUser.profilePic} alt="" className="profile-pic" />
          <input type="text" placeholder="Share your thoughts" className="input"
            onChange={(event) => setDesc(event.target.value)} />
        </div>
        <hr className="hr" />
        <div className="preview">
          {file && <img className="file" alt="" src={URL.createObjectURL(file)} />}
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