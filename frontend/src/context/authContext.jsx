import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (inputs) => {
    setCurrentUser(inputs);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  const updateUserProfile = (updatedProfile) => {
    setCurrentUser(updatedProfile);
    localStorage.setItem("user", JSON.stringify(updatedProfile));
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUserProfile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};