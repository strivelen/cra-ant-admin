import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { fetchLogin, LoginParams } from 'api/User';
import { PURGE } from 'redux-persist';

export interface UserState {
  userinfo: object;
  token: string | undefined;
  isLogin: boolean;
}

const initialState: UserState = {
  userinfo: {},
  token: undefined,
  isLogin: false
};

export const login = createAsyncThunk(
  'user/fetchLogin',
  async (params: Expand<LoginParams>) => {
    const response = await fetchLogin(params);
    return response;
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
      .addCase(login.fulfilled, (state, action) => {
        const { User, SessionKey } = action.payload;
        state = {
          userinfo: User,
          token: SessionKey,
          isLogin: true
        };
      })
      .addCase(login.rejected, (state) => {
        state.isLogin = false;
      })
      .addCase(PURGE, (state) => {
        state = {
          userinfo: {},
          token: undefined,
          isLogin: false
        };
      });
  }
});

export const { setToken } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.token;
export const selectUserInfo = (state: RootState) => state.user.userinfo;

export default userSlice.reducer;
