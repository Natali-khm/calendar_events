import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "./types";
import { createTypedAsyncThunk } from "../createAppAsyncThunk";
import axios, { AxiosError, AxiosResponse, isAxiosError } from "axios";

const slice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: null as IUser | null,
    isLoading: false,
    error: null as string | null,
  },
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setisLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        if (state.error) {
          state.error = null;
        }
      })
      .addCase(login.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

const login = createTypedAsyncThunk<IUser, IUser>(
  "auth/login",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    try {
      dispatch(authAction.setisLoading(true));

      const response: AxiosResponse<IUser[]> = await new Promise((res) => {
        setTimeout(() => {
          const response = axios.get<IUser[]>("./users.json");
          res(response);
        }, 1000);
      });

      const mockUser = response.data.find(
        (u) => u.username === arg.username && u.password === arg.password
      );
      if (mockUser) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("username", mockUser.username);
        return mockUser;
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      if (isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data
            ? (err.response.data as { error: string }).error
            : err.message
        );
      } else {
        return rejectWithValue(err.message);
      }
    } finally {
      dispatch(authAction.setisLoading(false));
    }
  }
);

export const authReducer = slice.reducer;
export const authAction = slice.actions;
export const authThunks = { login };
