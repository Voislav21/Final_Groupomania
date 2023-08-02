import { useContext, useState } from "react";
import "./update.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CloudUpload } from "@mui/icons-material";
import { AuthContext } from "../../context/authContext";

const Update = ({ setOpenUpdate, user }) => {
  const { currentUser, updateUserProfile } = useContext(AuthContext);
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    city: "",
    from: "",
    relationship: "",
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await makeRequest.post("/upload", formData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation((user) => {
    return makeRequest.put("/users/update/", user);
  },
    {
      onSuccess: (data) => {
        updateUserProfile(data.data);
        setTexts({
          firstName: data.firstName,
          lastName: data.lastName,
          bio: data.bio,
          city: data.city,
          from: data.from,
          relationship: data.relationship,
        });
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    let coverUrl = user.coverPic;
    let profileUrl = user.profilePic;

    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;


    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
  };

  const handleChange = (event) => {
    setTexts((prev) => ({ ...prev, [event.target.name]: [event.target.value] }));
  };



  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img src={cover ? URL.createObjectURL(cover) : "/uploads/" + user.coverPic} alt="" />
                <CloudUpload className="icon" />
              </div>
            </label>
            <input type="file" id="cover" style={{ display: "none" }} onChange={event => setCover(event.target.files[0])} />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img src={profile ? URL.createObjectURL(profile) : "/uploads/" + user.profilePic} alt="" />
                <CloudUpload className="icon" />
              </div>
            </label>
            <input type="file" id="profile" style={{ display: "none" }} onChange={event => setProfile(event.target.files[0])} />
          </div>
          <label>First Name</label>
          <input type="text" name="firstName" value={texts.firstName} onChange={handleChange} />
          <label>Last Name</label>
          <input type="text" name="lastName" value={texts.lastName} onChange={handleChange} />
          <label>Bio</label>
          <input type="text" name="bio" value={texts.bio} onChange={handleChange} />
          <label>City</label>
          <input type="text" name="city" value={texts.city} onChange={handleChange} />
          <label>From</label>
          <input type="text" name="from" value={texts.from} onChange={handleChange} />
          <label>Relationship Status</label>
          <input type="text" name="relationship" value={texts.relationship} onChange={handleChange} />
          <button onClick={handleSubmit}>Update</button>
        </form>
      </div>
      <button className="close" onClick={() => setOpenUpdate(false)}>
        close
      </button>
    </div>
  );
};

export default Update;