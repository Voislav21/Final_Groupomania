import { useContext, useState } from "react";
import "./update.scss";
import profileDefault from "../../assets/profile-default.jpeg";
import coverDefault from "../../assets/cover-default.png";
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
    occupation: "",
    hobbies: "",
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
        console.log(data)
        updateUserProfile(data.data);
        setTexts({
          firstName: data.firstName,
          lastName: data.lastName,
          bio: data.bio,
          city: data.city,
          occupation: data.occupation,
          hobbies: data.hobbies,
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

  const imgUrl = "http://localhost:8080/api/uploads/";

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img src={
                  cover
                    ? URL.createObjectURL(cover)
                    : (user.coverPic
                      ? imgUrl + user.coverPic
                      : coverDefault)
                }
                  alt="" />
                <CloudUpload className="icon" />
              </div>
            </label>
            <input type="file" id="cover" style={{ display: "none" }} onChange={event => setCover(event.target.files[0])} />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img src={
                  profile
                    ? URL.createObjectURL(profile)
                    : (user.profilePic
                      ? imgUrl + user.profilePic
                      : profileDefault)
                }
                  alt="" />
                <CloudUpload className="icon" />
              </div>
            </label>
            <input type="file" id="profile" style={{ display: "none" }} onChange={event => setProfile(event.target.files[0])} />
          </div>
          <label>First Name</label>
          <input type="text" name="firstName" placeholder={currentUser.firstName} value={texts.firstName} onChange={handleChange} />
          <label>Last Name</label>
          <input type="text" name="lastName" placeholder={currentUser.lastName} value={texts.lastName} onChange={handleChange} />
          <label>Bio</label>
          <input type="text" name="bio" placeholder={currentUser.bio} value={texts.bio} onChange={handleChange} />
          <label>City</label>
          <input type="text" name="city" placeholder={currentUser.city} value={texts.city} onChange={handleChange} />
          <label>Occupation</label>
          <input type="text" name="occupation" placeholder={currentUser.occupation} value={texts.occupation} onChange={handleChange} />
          <label>Hobbies</label>
          <input type="text" name="hobbies" placeholder={currentUser.hobbies} value={texts.hobbies} onChange={handleChange} />
          <button onClick={handleSubmit}>Update</button>
          <button className="delete" onClick={() => setOpenUpdate(false)}>
            Deactivate Account
          </button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;