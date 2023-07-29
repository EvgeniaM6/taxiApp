import { ControlOptions } from 'leaflet';

export type TLatLng = {
  lat: number;
  lng: number;
};

export type TRouteState = {
  distanceInKms: number;
  startPoint: TLatLng | null;
  finishPoint: TLatLng | null;
};

export interface IWaypointsProps extends ControlOptions {
  startPoint: TLatLng;
  finishPoint: TLatLng;
  changeDistanceInKm: (distance: number) => void;
  changeStartPoint: (lat: number, lng: number) => void;
  changeFinishPoint: (lat: number, lng: number) => void;
}
