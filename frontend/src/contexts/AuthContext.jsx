import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, googleAuth, decodeJWT } from "@/lib/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        setUser(decoded);
        setIsAuthenticated(true);
      } else {
        // Token expired
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const loginUser = async (credentials) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await login(credentials);
      localStorage.setItem("token", data.token);

      const decoded = decodeJWT(data.token);
      setUser(decoded);
      setIsAuthenticated(true);

      return data;
    } catch (error) {
      throw error;
    }
  };

  const registerUser = async (userData) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await register(userData);
      localStorage.setItem("token", data.token);

      const decoded = decodeJWT(data.token);
      setUser(decoded);
      setIsAuthenticated(true);

      return data;
    } catch (error) {
      throw error;
    }
  };

  const googleLogin = async (token) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const data = await googleAuth(token);
      localStorage.setItem("token", data.token);

      const decoded = decodeJWT(data.token);
      setUser(decoded);
      setIsAuthenticated(true);

      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  const getUserRole = () => {
    return user?.user?.role || user?.role || null;
  };

  const isVendor = () => {
    return getUserRole() === "vendor";
  };

  const isAdmin = () => {
    return getUserRole() === "admin";
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    loginUser,
    registerUser,
    googleLogin,
    logout,
    getUserRole,
    isVendor,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
