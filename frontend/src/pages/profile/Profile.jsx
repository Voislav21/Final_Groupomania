import { useContext } from "react";
import Posts from "../../components/posts/Posts";
import Rightbar from "../../components/rightbar/Rightbar";
import Share from "../../components/share/Share";
import "./profile.scss";
import { AuthContext } from "../../context/authContext";

const Profile = () => {

	const { currentUser } = useContext(AuthContext);
	return (
		<div className="profile">
			<div className="top">
				<div className="cover">
					<img src={currentUser.coverPic} alt="" className="cover-img" />
					<img src={currentUser.profilePic} alt="" className="user-img" />
				</div>
				<div className="info">
					<h4>Mario Mario</h4>
					<span>Its a me</span>
				</div>
			</div>
			<div className="bottom">
				<div className="sharing">
					<Share />
					<Posts />
				</div>
				<Rightbar profile />
			</div>
		</div>
	);
};


export default Profile;