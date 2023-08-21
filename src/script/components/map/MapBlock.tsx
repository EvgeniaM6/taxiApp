import { LatLngExpression, LatLng } from 'leaflet';
import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { FinishPointMarker } from './FinishPointMarker';
import { KYIV_POSITION, METERS_IN_KM } from '../../../constants';
import MapRouting from './MapRouting';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setDistanceInKms,
  setFinishPoint,
  setStartPoint,
  setStartAddress,
  setFinishAddress,
} from '../../store/routeSlice';
import { StartPointMarker } from './StartPointMarker';

export const MapBlock = () => {
  const mapStyle: React.CSSProperties = {
    height: '500px',
  };

  const { startPoint, finishPoint, canBuildRoute } = useAppSelector((state) => state.route);
  const dispatch = useAppDispatch();
  const [position, setPosition] = useState<LatLngExpression | null>(null);

  const changeStartPosition = (newPosition: LatLngExpression): void => {
    setPosition(newPosition);
    const { lat, lng } = newPosition as LatLng;
    dispatch(setStartPoint({ lat, lng }));
  };

  const successFoundPosition: PositionCallback = (pos) => {
    const { latitude, longitude } = pos.coords;
    const newPosition = new LatLng(latitude, longitude);

    if (!position) {
      setPosition(newPosition);
      return;
    }

    const { lat, lng } = position as LatLng;
    const isSimilarPosition = lat === latitude && lng === longitude;
    if (isSimilarPosition) return;

    changeStartPosition(newPosition);
  };

  const notFoundPosition: PositionErrorCallback = () => {
    setPosition(KYIV_POSITION);
  };

  navigator.geolocation.getCurrentPosition(successFoundPosition, notFoundPosition);

  const changeDistanceInKm = (distance: number): void => {
    dispatch(setDistanceInKms(distance / METERS_IN_KM));
  };

  const changeStartPoint = (lat: number, lng: number): void => {
    if (lat === startPoint?.lat && lng === startPoint.lng) return;
    dispatch(setStartPoint({ lat, lng }));
  };

  const changeFinishPoint = (lat: number, lng: number): void => {
    if (lat === finishPoint?.lat && lng === finishPoint.lng) return;
    dispatch(setFinishPoint({ lat, lng }));
  };

  const changeStartAddress = (address: string): void => {
    dispatch(setStartAddress(address));
  };

  const changeFinishAddress = (address: string): void => {
    dispatch(setFinishAddress(address));
  };

  return (
    <>
      {position && (
        <MapContainer center={position} zoom={13} scrollWheelZoom style={mapStyle}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <StartPointMarker position={position} />
          <FinishPointMarker />
          {startPoint && finishPoint && canBuildRoute && (
            <MapRouting
              startPoint={startPoint}
              finishPoint={finishPoint}
              changeDistanceInKm={changeDistanceInKm}
              changeStartPoint={changeStartPoint}
              changeFinishPoint={changeFinishPoint}
              changeStartAddress={changeStartAddress}
              changeFinishAddress={changeFinishAddress}
            />
          )}
        </MapContainer>
      )}
    </>
  );
};
