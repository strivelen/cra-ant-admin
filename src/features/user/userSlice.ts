import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { fetchLogin } from './userAPI';
import type { FetchLoginParams } from './userAPI';
import { PURGE } from 'redux-persist';

export interface UserState {
  name: string | undefined;
  token: string | undefined;
  isLogin: boolean;
}

const initialState: UserState = {
  name: undefined,
  token: undefined,
  isLogin: false
};

export const login = createAsyncThunk(
  'user/fetchLogin',
  async (params: FetchLoginParams) => {
    const response = await fetchLogin(params);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ name: string; token: string }>) => {
          const { name, token } = action.payload;
          state.name = name;
          state.token = token;
          state.isLogin = true;
        }
      )
      .addCase(login.rejected, (state) => {
        state.isLogin = false;
      })
      .addCase(PURGE, (state) => {
        state.name = undefined;
        state.token = undefined;
        state.isLogin = false;
      });
  }
});

export const { setToken } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
