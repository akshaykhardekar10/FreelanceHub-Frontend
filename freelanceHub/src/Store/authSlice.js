// src/Store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {
  user: localStorage.getItem('user') || null,      // Store user info
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("user",action.payload.user)
      localStorage.setItem("token",action.payload.token)
    },
    logout: (state) => {
      state.user = localStorage.removeItem('user');
      state.token = localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
