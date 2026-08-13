// src/store/slices/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "@/types/auth";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },

    setLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },

    setUser: (
      state,
      action: PayloadAction<User | null>
    ) => {
      state.user = action.payload;

      // IMPORTANT
      state.isAuthenticated =
        !!action.payload && !!state.token;
    },

    setToken: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.token = action.payload;

      // IMPORTANT
      state.isAuthenticated =
        !!action.payload && !!state.user;
    },
  },
});

export const {
  login,
  logout,
  setLoading,
  setUser,
  setToken,
} = authSlice.actions;

export default authSlice.reducer;