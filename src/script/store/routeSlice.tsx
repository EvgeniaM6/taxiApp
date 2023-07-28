import { createSlice } from '@reduxjs/toolkit';
import { TRouteState } from '../models';

const initialState: TRouteState = {
  distanceInKms: 0,
};

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setDistanceInKms(state, action) {
      return { ...state, distanceInKms: action.payload };
    },
  },
});

export const { setDistanceInKms } = routeSlice.actions;
export default routeSlice.reducer;
