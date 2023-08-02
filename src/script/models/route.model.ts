import { SelectProps } from 'antd';
import { ControlOptions } from 'leaflet';
import { GeocodingResult } from 'leaflet-control-geocoder/dist/geocoders';

export type TLatLng = {
  lat: number;
  lng: number;
};

export type TCarClassObj = {
  title: string;
  priceUsdPerKm: number;
};

export type TCarClassesObj = {
  [key: string]: TCarClassObj;
};

export type TRouteState = {
  distanceInKms: number;
  startPoint: TLatLng | null;
  finishPoint: TLatLng | null;
  carClass: string;
};

export interface IWaypointsProps extends ControlOptions {
  startPoint: TLatLng;
  finishPoint: TLatLng;
  changeDistanceInKm: (distance: number) => void;
  changeStartPoint: (lat: number, lng: number) => void;
  changeFinishPoint: (lat: number, lng: number) => void;
}

export interface IGeocodeSelectProps<ValueType>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<GeocodingResult[]>;
  setPoint: (newPoint: TLatLng | null) => void;
}

export interface IGeocodeValue {
  label: string;
  value: string;
}
