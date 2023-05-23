import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [isAdmin, setAdmin] = useState(localStorage.getItem("role") || false);
  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        inputs,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setCurrentUser(res.data);
      setAdmin(res.data.roles);
    } catch (error) {
      console.log(error)
    }
  };

  const logOut = async () => {
    console.log("logout called ")
    localStorage.clear();

    window.location.reload();
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("role", isAdmin);
  }, [currentUser, isAdmin]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
