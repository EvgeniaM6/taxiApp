import { configureStore } from '@reduxjs/toolkit';
import routeReducer from './routeSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    route: routeReducer,
    auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
