import { useContext, useState } from "react";
import Posts from "../../components/posts/Posts";
import Rightbar from "../../components/rightbar/Rightbar";
import Share from "../../components/share/Share";
import Update from "../../components/update/Update";
import "./profile.scss";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";

const Profile = () => {
	const [openUpdate, setOpenUpdate] = useState(false);
	const { currentUser } = useContext(AuthContext);

	const userId = parseInt(useLocation().pathname.split("/")[2]);

	const { isLoading, error, data } = useQuery(["user"], () =>
		makeRequest.get("/users/find/" + userId).then((res) => {
			return res.data;
		})
	);

	const { isLoading: fsIsloading, data: friendshipData } = useQuery(["friendship"], () =>
		makeRequest.get("/friendships?friendId=" + userId).then((res) => {
			return res.data;
		})
	);

	const queryClient = useQueryClient();

	const mutation = useMutation((friends) => {
		if (friends) return makeRequest.delete("/friendships?userId=" + userId);
		return makeRequest.post("/friendships", { userId });
	},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["friendship"]);
			},
		}
	);

	const handleRequest = () => {
		mutation.mutate(friendshipData.includes(currentUser.id));
	};


	return (
		<div className="profile">
			{isLoading ? "loading" : <> <div className="top">
				<div className="cover">
					<img src={"/uploads/" + data.coverPic} alt="" className="cover-img" />
					<img src={"/uploads/" + data.profilePic} alt="" className="user-img" />
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