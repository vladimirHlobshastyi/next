import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loginThunkType } from "./authSlice.types";
import { RootState } from "../store";



const initialState = {
  isAuth: true,
  isLoading: false,
  token: ''
}

const axiosInstance = axios.create();

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

async function setLogin(username: string, password: string) {
  try {
    const { data } = await axiosInstance.post(`${process.env.API_URL}/api/auth`, { username, password });
    localStorage.setItem("token", data.token);
    return data.token;
  } catch (error) {
    throw new Error("Failed to login");
  }
}

async function getAuth() {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(`${process.env.API_URL}/api/user`, { authKey: token });
    return data.message === "auth";
  } catch (error) {
    throw new Error("Failed to authenticate");
  }
}



export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ login, password }: loginThunkType, { rejectWithValue }) => {
    try {
      const getToken = await setLogin(login, password);
      const isAuthResponse = await getAuth();
      return { isAuthResponse, getToken }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoading = true
      state.isAuth = false
      state.token = ''
      state.isLoading = false
    }
  },
  extraReducers:
    (builder) => {
      builder.addCase(loginThunk.pending, (state) => { state.isLoading = true })
      builder.addCase(loginThunk.fulfilled, (state, PayloadAction) => {
        state.token = PayloadAction.payload.getToken
        state.isAuth = PayloadAction.payload.isAuthResponse
        state.isLoading = false
      })
      builder.addCase(loginThunk.rejected, (state) => { state.isLoading = false })

    },

});

export const { logout } = authSlice.actions;
export const isAuthState = (state: RootState) => state.auth.isAuth
export const isLoadingAuthState = (state: RootState) => state.auth.isLoading


export default authSlice.reducer;


