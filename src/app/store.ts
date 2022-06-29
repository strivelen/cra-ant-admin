import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import counterReducer from '../features/counter/counterSlice';
import userSlice from '../features/user/userSlice';
import layoutSlice from '../features/layout/layoutSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  user: persistReducer(
    {
      key: 'userInfo',
      storage,
      blacklist: ['status']
    },
    userSlice
  ),
  layout: persistReducer(
    {
      key: 'layout',
      storage: storageSession
    },
    layoutSlice
  )
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['user', 'layout']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
