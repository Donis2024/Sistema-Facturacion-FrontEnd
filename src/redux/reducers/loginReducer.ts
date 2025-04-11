import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


export interface AuthenticateResponse {  
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  token: string;
  connectionString: string;
}

export interface LoginState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  user: AuthenticateResponse | null;
}
//<any, any, string>
//<LoginState, any, any, any>
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isAuthenticated: false,
    loading: false,
    error: null,
    user: null,
  },
  reducers: {
    loginRequest: (
      state: LoginState,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state: LoginState,
      action: PayloadAction<AuthenticateResponse>
    ) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      axios.defaults.headers.common['Authorization'] = action.payload.connectionString;
      axios.defaults.baseURL = '/api/v1';
    },
    loginFailure: (
      state: LoginState,
      action: PayloadAction<{ message: string }>
    ) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    logout: (state: LoginState) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  loginSlice.actions;
export default loginSlice.reducer;
