import { createContext, useEffect, useState } from "react";

// Create a new context for authentication-related state and functions
export const AuthContext = createContext();

// Define the context provider component
export const AuthContextProvider = ({ children }) => {
  // State to store the current user's information
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Function to log in a user
  const login = (inputs) => {
    setCurrentUser(inputs);
  };

  // Function to log out a user
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  // Function to update user profile information
  const updateUserProfile = (updatedProfile) => {
    setCurrentUser(updatedProfile);
    localStorage.setItem("user", JSON.stringify(updatedProfile));
  };

  // UseEffect to keep local storage and currentUser state in sync
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // UseEffect to keep local storage and currentUser state in sync
  return (
    <AuthContext.Provider value={{ currentUser, updateUserProfile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};