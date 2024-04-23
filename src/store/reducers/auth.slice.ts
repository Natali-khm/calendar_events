import { eventsThunks } from "./event.slice";
import {
  PayloadAction,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { createTypedAsyncThunk } from "../createAppAsyncThunk";
import { AxiosResponse } from "axios";
import UsersApi from "../../api/users.api";
import { thunkTryCatch } from "../../utils/thunkTryCatch";

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
    setUserData: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
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
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuth = false;
        state.user = null;
      })
      .addMatcher(pending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(fulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
        }
        state.isLoading = false;
      });
  },
});

const login = createTypedAsyncThunk<IUser, IUser>(
  "auth/login",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const response: AxiosResponse<IUser[]> = await new Promise((res) => {
        setTimeout(() => {
          const response = UsersApi.getUsers();
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
    });
  }
);

const logout = createTypedAsyncThunk("auth/logout", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await new Promise((res) => {
      setTimeout(() => {
        localStorage.removeItem("auth");
        localStorage.removeItem("username");
        res("ok");
      }, 500);
    });
  });
});

export const authReducer = slice.reducer;
export const authAction = slice.actions;
export const authThunks = { login, logout };

const pending = isPending(
  authThunks.login,
  authThunks.logout,
  eventsThunks.getGuests,
  eventsThunks.addEvent
);
const fulfilled = isFulfilled(
  authThunks.login,
  authThunks.logout,
  eventsThunks.getGuests,
  eventsThunks.addEvent
);
const rejected = isRejected(
  authThunks.login,
  authThunks.logout,
  eventsThunks.getGuests,
  eventsThunks.addEvent
);
