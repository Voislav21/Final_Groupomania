import { Link } from "react-router-dom";
import "./login.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Login = () => {

	const { login } = useContext(AuthContext);

	const handleLogin = () => {
		login(); //TODO
	}

	return (
		<div className="login">
			<div className="card">
				<div className="left">
					<h1>Hello Groupomania</h1>
					<p>
						If this is your first time visiting, you'll will be in awe at the possibilities of
						connection thats just like full connect to like everyone who do and dont know!!
					</p>
					<span>Been here before?</span>
					<Link to="/register">
						<button>Register</button>
					</Link>
				</div>
				<div className="right">
					<h1>Login</h1>
					<form>
						<input type="text" placeholder="Email" />
						<input type="password" placeholder="Password" />
						<button onClick={handleLogin}>Login</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;