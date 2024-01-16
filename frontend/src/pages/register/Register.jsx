import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be atleast 6 characters long').required('Password is required'),
});

const Register = () => {

  const navigate = useNavigate();
  // State to track whether the form has been submitted
  const [formSubmit, setFormSubmit] = useState(false);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema, // Apply the defined validation schema
    onSubmit: async (values, { setErrors }) => {
      try {
        // Send a POST request to register a new user
        await axios.post("https://api.groupomania-voislav.com/api/auth/register", values);

        // Update formSubmit state and navigate to login page
        setFormSubmit(true);
        navigate("/login", { state: { successMessage: "Registration successful, please login!" } });
      } catch (error) {
        setErrors({ email: error.response.data }); // Display error message if registration fails
      }
    }
  });

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lets Begin</h1>
          <p>
            If this is your first time visiting, you will be in awe at the possibilities that await you
            inside. So what are you waiting for? Join the new social media sharing platform designed just for you!
          </p>
          <span>Been here before?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={formik.handleSubmit}>
            <input type="text" placeholder="First Name" name="firstName" {...formik.getFieldProps("firstName")} />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}
            <input type="text" placeholder="Last Name" name="lastName" {...formik.getFieldProps("lastName")} />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div>{formik.errors.lastName}</div>
            ) : null}
            <input type="text" placeholder="Email" name="email" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
            <input type="password" placeholder="Password" name="password" {...formik.getFieldProps("password")} />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div >
  );
};

export default Register;