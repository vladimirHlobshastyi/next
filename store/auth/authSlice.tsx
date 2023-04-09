import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  token: string;
  error: { isError: boolean; message: string };
}

interface LoginResponse {
  isAuthResponse: boolean;
  getToken: string;
}

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  token: "",
  error: { isError: false, message: "" },
};

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function setLogin(username: string, password: string) {
  try {
    const { data } = await axiosInstance.post(
      `${process.env.API_URL}/api/auth`,
      { username, password }
    );
    localStorage.setItem("token", data.token);
    return data.token;
  } catch (error) {
    console.log("setLogin false", error);
    throw new Error("Failed to login");
  }
}

async function getAuth() {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(`${process.env.API_URL}/api/user`, {
      authKey: token,
    });
    return data.message === "auth";
  } catch (error) {
    throw new Error("Failed to authenticate");
  }
}

export const loginThunk = createAsyncThunk<
  LoginResponse,
  { login: string; password: string },
  { rejectValue: { message: string } }
>(
  "auth/login",
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const getToken = await setLogin(login, password);
      const isAuthResponse = await getAuth();
      return { isAuthResponse, getToken };
    } catch (err: any) {
      console.log("thunk false", err);
      return rejectWithValue({ message: err.message });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoading = true;
      state.isAuth = false;
      state.token = "";
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.token = action.payload.getToken;
      state.isAuth = action.payload.isAuthResponse;
      state.isLoading = false;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.error.isError = true;
      state.error.message = action.payload?.message ?? "";
      state.isLoading = false;
    });
  },
});


export const { logout } = authSlice.actions;
export const isAuthState = (state: RootState) => state.auth.isAuth
export const isLoadingAuthState = (state: RootState) => state.auth.isLoading
export const errorAuthState = (state: RootState) => state.auth.error

export default authSlice.reducer;


