import { createSlice } from '@reduxjs/toolkit';
import { TRouteState } from '../models';

const initialState: TRouteState = {
  distanceInKms: 0,
  startPoint: null,
  finishPoint: null,
};

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setDistanceInKms(state, action) {
      return { ...state, distanceInKms: action.payload };
    },
    setStartPoint(state, action) {
      return { ...state, startPoint: action.payload };
    },
    setFinishPoint(state, action) {
      return { ...state, finishPoint: action.payload };
    },
  },
});

export const { setDistanceInKms, setStartPoint, setFinishPoint } = routeSlice.actions;
export default routeSlice.reducer;
