export type TLatLng = {
  lat: number;
  lng: number;
};

export type TRouteState = {
  distanceInKms: number;
  startPoint: TLatLng | null;
  finishPoint: TLatLng | null;
};
