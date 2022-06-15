import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { fetchLogin } from './userAPI';
import type { FetchLoginParams } from './userAPI';

export interface UserState {
  name: string;
  token: string | undefined;
  status: 'loading' | 'idle' | 'failed';
}

const initialState: UserState = {
  name: 'name',
  token: undefined,
  status: 'idle'
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
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ name: string; token: string }>) => {
          const { name, token } = action.payload;
          state.name = name;
          state.token = token;
          state.status = 'idle';
        }
      )
      .addCase(login.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const { setToken } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
