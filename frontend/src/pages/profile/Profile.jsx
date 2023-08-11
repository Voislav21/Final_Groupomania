import { useContext, useState } from "react";
import Posts from "../../components/posts/Posts";
import Rightbar from "../../components/rightbar/Rightbar";
import Share from "../../components/share/Share";
import Update from "../../components/update/Update";
import Comments from "../../components/comments/Comments"
import "./profile.scss";
import profileDefault from "../../assets/profile-default.jpeg";
import coverDefault from "../../assets/cover-default.png";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";

const Profile = () => {
	// State to manage the visibility of the update form
	const [openUpdate, setOpenUpdate] = useState(false);
	// Accessing the current user information from AuthContext
	const { currentUser } = useContext(AuthContext);

	// Extracting the user ID from the URL
	const userId = parseInt(useLocation().pathname.split("/")[2]);

	// Fetching user information using a query
	const { isLoading, error, data } = useQuery(["user", userId], () =>
		makeRequest.get("/users/find/" + userId).then((res) => {
			return res.data;
		})
	);

	// Fetching friendship data using a query

	const { isLoading: fsIsloading, data: friendshipData } = useQuery(["friendship", userId], () =>
		makeRequest.get("/friendships?friendId=" + userId).then((res) => {
			return res.data;
		})
	);

	const queryClient = useQueryClient();

	// Mutation to add or remove friends
	const mutation = useMutation(
		(friends) => {
			if (friends) return makeRequest.delete("/friendships?userId=" + userId);
			return makeRequest.post("/friendships", { userId });
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["friendship"]);
			},
		}
	);

	// Function to handle friend request
	const handleRequest = () => {
		mutation.mutate(friendshipData.includes(currentUser.id));
	};

	// Base URL for image
	const imgUrl = "http://localhost:8080/api/uploads/";


	return (
		<div className="profile">
			{isLoading ? "loading" : <> <div className="top">
				<div className="cover">
					<img src={data.coverPic ? imgUrl + data.coverPic : coverDefault} alt="" className="cover-img" />
					<img src={data.profilePic ? imgUrl + data.profilePic : profileDefault} alt="" className="user-img" />
				</div>
				<div className="info">
					<h4>{data.firstName} {data.lastName}</h4>
					<span>{data.bio}</span>
					{fsIsloading ? (
						"loading"
					) : userId === currentUser.id ? (
						<button onClick={() => setOpenUpdate(true)}>Update</button>
					) : (
						<button onClick={handleRequest}>
							{friendshipData.includes(currentUser.id)
								? "Unfriend"
								: "Add Friend"}
						</button>
					)}
				</div>
			</div>
				<div className="bottom">
					<div className="sharing">
						<Share />
						<Posts userId={userId} />
					</div>
					<Rightbar profile />
				</div>
			</>
			}
			{openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
		</div>
	);
};


export default Profile;