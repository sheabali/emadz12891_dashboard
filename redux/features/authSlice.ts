import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
interface AuthState {
  token: string | null;
  user: User | null;
  refresh_token: string | null;
}

export type UserRole = "SELLER" | "BUYER" | "ADMIN" | "SUPER_ADMIN";

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export type JwtPayload = {
  email: string;
  exp: number;
  iat: number;
  id: string;
  role: UserRole;
};

const initialState: AuthState = {
  token: null,
  user: null,
  refresh_token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      Cookies.set("token", action.payload.token);
    },
    setRefreshToken: (
      state,
      action: PayloadAction<{ refresh_token: string }>
    ) => {
      state.refresh_token = action.payload.refresh_token;
      Cookies.set("refreshToken", action.payload.refresh_token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.refresh_token = null;
      Cookies.remove("token");
    },
  },
});

export const { setUser, setRefreshToken, logout } = authSlice.actions;

export default authSlice.reducer;
