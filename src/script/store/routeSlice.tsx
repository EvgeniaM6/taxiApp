import { createSlice } from '@reduxjs/toolkit';
import { TRouteState } from '../models';

const initialState: TRouteState = {
  distanceInKms: 0,
  startPoint: null,
  finishPoint: null,
  startAddress: '',
  finishAddress: '',
  carClass: 'standard',
  canBuildRoute: true,
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
    setStartAddress(state, action) {
      return { ...state, startAddress: action.payload };
    },
    setFinishAddress(state, action) {
      return { ...state, finishAddress: action.payload };
    },
    setCarClass(state, action) {
      return { ...state, carClass: action.payload };
    },
    setCanBuildRoute(state, action) {
      return { ...state, canBuildRoute: action.payload };
    },
  },
});

export const {
  setDistanceInKms,
  setStartPoint,
  setFinishPoint,
  setCarClass,
  setStartAddress,
  setFinishAddress,
  setCanBuildRoute,
} = routeSlice.actions;
export default routeSlice.reducer;
