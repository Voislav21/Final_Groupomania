import Leftbar from "./components/leftbar/Leftbar";
import Navbar from "./components/navbar/Navbar";
import Rightbar from "./components/rightbar/Rightbar";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./styles.scss";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  // Access the user's authentication context
  const { currentUser } = useContext(AuthContext);
  // Access the dark mode context
  const { darkMode } = useContext(DarkModeContext);
  // Create a new instance of QueryClient
  const queryClient = new QueryClient();

  // Layout component that provides the overall structure
  const Layout = () => {
    const location = useLocation();
    const isProfilePage = location.pathname.startsWith("/profile");

    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar />
          <div className="main">
            <Leftbar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            {!isProfilePage && <Rightbar />}
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  // ProtectedRoute component to control access to routes
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      // Redirect to login if the user is not authenticated
      return <Navigate to="/login" />
    }
    // Render the protected content if the user is authenticated
    return children
  };

  // Create the router configuration
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        // Apply the ProtectedRoute wrapper
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          // Include the Home component
          element: <Home />,
        },
        {
          path: "/profile/:id",
          // Include the Profile component for user profiles
          element: <Profile />
        }


      ]
    },
    {
      path: "/login",
      // Include the Login component
      element: <Login />
    },
    {
      path: "/register",
      // Include the Register component
      element: <Register />
    },
  ]);


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
