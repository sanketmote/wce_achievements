import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { makeRequest } from "../axios";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [isAdmin, setAdmin] = useState(localStorage.getItem("role") || false);
  const login = async (inputs, setErr) => {
    try {
      const res = await makeRequest.post("/auth/login", inputs, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
      setAdmin(res.data.role == 1);
      // localStorage.setItem("user", JSON.stringify(currentUser));
      localStorage.setItem("role", isAdmin);
      if (!(res.data.role == 1)) window.location.replace("/");
      else window.location.replace("/admin");
    } catch (err) {
      console.log(err.response);
      setErr(err.response.data + " check your username");
      // window.alert(err.response.data + "check your username");
    }
  };

  const logOut = async () => {
    console.log("logout called ");
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
