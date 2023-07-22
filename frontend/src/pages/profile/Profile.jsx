import Posts from "../../components/posts/Posts";
import Rightbar from "../../components/rightbar/Rightbar";
import Share from "../../components/share/Share";
import "./profile.scss";

const Profile = () => {
	return (
		<div className="profile">
			<div className="top">
				<div className="cover">
					<img src="/assets/posts/3.jpeg" alt="" className="cover-img" />
					<img src="/assets/person/mario.png" alt="" className="user-img" />
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