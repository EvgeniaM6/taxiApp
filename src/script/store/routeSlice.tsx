import { createSlice } from '@reduxjs/toolkit';
import { TRouteState } from '../models';

const initialState: TRouteState = {
  distanceInKms: 0,
  startPoint: null,
  finishPoint: null,
  carClass: 'standard',
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
    setCarClass(state, action) {
      return { ...state, carClass: action.payload };
    },
  },
});

export const { setDistanceInKms, setStartPoint, setFinishPoint, setCarClass } = routeSlice.actions;
export default routeSlice.reducer;
