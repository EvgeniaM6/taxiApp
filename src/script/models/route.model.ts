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
  startAddress: string;
  finishAddress: string;
  carClass: string;
  canBuildRoute: boolean;
};

export interface IWaypointsProps extends ControlOptions {
  startPoint: TLatLng;
  finishPoint: TLatLng;
  changeDistanceInKm: (distance: number) => void;
  changeStartPoint: (lat: number, lng: number) => void;
  changeFinishPoint: (lat: number, lng: number) => void;
  changeStartAddress: (address: string) => void;
  changeFinishAddress: (address: string) => void;
}

export interface IGeocodeSelectProps<ValueType>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<GeocodingResult[]>;
  setPoint: (newPoint: TLatLng | null) => void;
  setAddress: (newAddress: string) => void;
}

export interface IGeocodeValue {
  label: string;
  value: string;
}

export type TTripData = {
  startPoint: TLatLng;
  finishPoint: TLatLng;
  startAddress: string;
  finishAddress: string;
  distanceInKms: number;
  carClass: string;
};
