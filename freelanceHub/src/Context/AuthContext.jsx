// src/context/AuthContext.jsx
import { combineReducers } from '@reduxjs/toolkit';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = (accessToken) => {
    setToken(accessToken); // Store token
    // localStorage.setItem('token',JSON.stringify(token))
  };

  const logout = () => {
    setToken(null); // Clear token on logout
  };

  // useEffect(() => {
  //   console.log("Current token in context:", token); // Log the token whenever it changes
  // }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
