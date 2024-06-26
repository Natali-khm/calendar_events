import { IEvent } from "./../../models/IEvent";
import {  createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { createTypedAsyncThunk } from "../createAppAsyncThunk";
import { AxiosResponse } from "axios";
import UsersApi from "../../api/users.api";
import { thunkTryCatch } from "../../utils/thunkTryCatch";
import { authThunks } from "./auth.slice";

const slice = createSlice({
  name: "event",
  initialState: {
    guests: [] as IUser[],
    events: [] as IEvent[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGuests.fulfilled, (state, action) => {
        state.guests = action.payload;
      })
      .addCase(addEvent.fulfilled, (state, action) => {      
        state.events = action.payload;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      }).addCase(authThunks.logout.fulfilled, (state, action) => {
        state.guests = []
        state.events = []
      })
  },
});

const getGuests = createTypedAsyncThunk<IUser[]>(
  "event/getGuests",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const response: AxiosResponse<IUser[]> = await new Promise((res) => {
        setTimeout(() => {
          const response = UsersApi.getUsers();
          res(response);
        }, 1000);
      });
      return response.data;
    });
  }
);

const addEvent = createTypedAsyncThunk<IEvent[], IEvent>(
  "event/addEvent",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const response = await new Promise((res) => {
        setTimeout(() => {
          const eventsJson = localStorage.getItem("events") || "[]";
          const events = JSON.parse(eventsJson) as IEvent[];
          events.push(arg);
          localStorage.setItem("events", JSON.stringify(events));
          res(events);
        }, 1000);
      });
      return response;
    });
  }
);

const getEvents = createTypedAsyncThunk(
  "event/getEvents",
  async (arg, thunkAPI) => {
    const { getState } = thunkAPI;
    const state = getState();
    return thunkTryCatch(thunkAPI, async () => {
      const response = await new Promise((res) => {
        setTimeout(() => {
          const eventsJson = localStorage.getItem("events") || "[]";
          const events = JSON.parse(eventsJson) as IEvent[];
          const currentUserEvents = events.filter(
            (e) =>
              e.author === state.auth.user?.username ||
              e.guest === state.auth.user?.username
          );
          res(currentUserEvents);
        }, 1000);
      });
      return response;
    });
  }
);

export const eventReducer = slice.reducer;
export const eventsThunks = { getGuests, addEvent, getEvents };
