import {
  AsyncThunkConfig,
  GetThunkAPI,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AxiosError, isAxiosError } from "axios";

/**
 * Обертка для Redux-Thunk, которая позволяет перехватывать и обрабатывать ошибки в сайд-эффектах.
 * @async
 * @function thunkTryCatch
 * @param {BaseThunkAPI<RootState, any, AppDispatch, string>} thunkAPI - объект, содержащий методы `dispatch`, `getState`, `extra`, `rejectWithValue` для использования внутри `logic`.
 * @param {Function} logic - сайд-эффект, который необходимо выполнить в `try...catch` блоке.
 * @returns {Promise<any>} результат выполнения `logic` в случае успешного выполнения, либо объект `{ e, showGlobalError }`, в случае возникновения ошибки.
 */

export const thunkTryCatch = async (
  thunkAPI: GetThunkAPI<AsyncThunkConfig>,
  logic: Function
) => {
  const { rejectWithValue } = thunkAPI;
  try {
    return await logic();
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
  }
};
