import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: "auth",
  initialState: { isAuth: true },
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
        state.isAuth = action.payload
    }
  }
});

export const authReducer = slice.reducer
export const authAction = slice.actions
