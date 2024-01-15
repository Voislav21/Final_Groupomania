import { Link, useNavigate, useLocation } from "react-router-dom";
import "./login.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Function to handle login
const Login = () => {
	// Navigate function from react-router-dom
	const navigate = useNavigate();
	// Accessing AuthContext using useContext
	const { login } = useContext(AuthContext);
	// Accessing location information using useLocation
	const location = useLocation();
	// Retrieving the successMessage from location state
	const successMessage = location.state?.successMessage;

	// Initialize formik form handling using useFormik
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		// Define validation schema using Yup
		validationSchema: Yup.object({
			email: Yup.string().email("Invalid email format").required("Email is required"),
			password: Yup.string().required("Password is required"),
		}),
		// Define submission function
		onSubmit: async (values, { setErrors }) => {
			try {
				const response = await axios.post("https://195.35.2.197:8080/api/auth/login", values, {
					withCredentials: true,
				});
				navigate("/");
				login(response.data);
			} catch (error) {
				setErrors({ email: error.response.data });
			}
		},
	});


	return (
		<div className="login">
			<div className="card">
				<div className="left">
					<h1>Hello Groupomania</h1>
					<p>
						Welcome back to the most talked about social media sharing platform between your colleagues. Discover more in-depth the company you work for and the people you work
						with. Be the change you want to see in the world!
					</p>
					<span>First time visiting?</span>
					<Link to="/register">
						<button>Register</button>
					</Link>
				</div>
				<div className="right">
					<h1>Login</h1>
					{successMessage && <h4>{successMessage}</h4>}
					<form onSubmit={formik.handleSubmit}>
						<input type="text" placeholder="Email" {...formik.getFieldProps("email")} />
						{formik.touched.email && formik.errors.email ? (
							<div>{formik.errors.email}</div>
						) : null}
						<input type="password" placeholder="Password" {...formik.getFieldProps("password")} />
						{formik.touched.password && formik.errors.password ? (
							<div>{formik.errors.password}</div>
						) : null}
						<button type="submit">Login</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;