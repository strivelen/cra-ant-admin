import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { fetchLogin, LoginParams, UserInfo } from 'api/User';
import { PURGE } from 'redux-persist';

export interface UserState {
  userInfo: UserInfo;
  token: string | undefined;
  isLogin: boolean;
}

const initialState: UserState = {
  userInfo: {} as UserInfo,
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
        const { UserInfo, SessionKey } = action.payload;
        state.userInfo = UserInfo;
        state.token = SessionKey;
        state.isLogin = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLogin = false;
      })
      .addCase(PURGE, (state) => {
        // 不能用这种赋值为一个新对象的方式更新state，因为state是一个Immutable对象。
        // state = {
        //   userInfo: {} as User,
        //   token: undefined,
        //   isLogin: false
        // };
        // 可以用这种方式更新
        state.userInfo = {} as UserInfo;
        state.token = undefined;
        state.isLogin = false;
      });
  }
});

export const { setToken } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.token;
export const selectUserInfo = (state: RootState) => state.user.userInfo;

export default userSlice.reducer;
