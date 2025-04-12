import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  
  // Kiểm tra đăng nhập từ localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setIsLoggedIn(true);
      setUserName(parsedUser.username);

      setCurrentUser(parsedUser);
    }
  }, []);



  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userName", user.username);
    setIsLoggedIn(true);
    setUserName(user.username);

    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserName("");

  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
