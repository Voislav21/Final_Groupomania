import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().email("Invalid email format").required("Email is required"),
			password: Yup.string().required("Password is required"),
		}),
		onSubmit: async (values, { setErrors }) => {
			try {
				const response = await axios.post("http://localhost:8080/api/auth/login", values, {
					withCredentials: true,
				});
				navigate("/");
				login(response.data);
			} catch (error) {
					setErrors ({ email: error.response.data});
			}
		},
	});


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
					<form onSubmit={formik.handleSubmit}>
						<input type="text" placeholder="Email" {...formik.getFieldProps("email")}/>
						{formik.touched.email && formik.errors.email ? (
							<div>{formik.errors.email}</div>
						) : null }
						<input type="password" placeholder="Password" {...formik.getFieldProps("password")}/>
						{formik.touched.password && formik.errors.password ? (
							<div>{formik.errors.password}</div>
						) : null }
						<button type="submit">Login</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;