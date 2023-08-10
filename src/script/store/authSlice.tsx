import { createSlice } from '@reduxjs/toolkit';
import { TAuthState } from '../models';

const initialState: TAuthState = {
  userId: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId(state, action) {
      return { ...state, userId: action.payload };
    },
    resetUserId(state) {
      return { ...state, userId: '' };
    },
  },
});

export const { setUserId, resetUserId } = authSlice.actions;
export default authSlice.reducer;
