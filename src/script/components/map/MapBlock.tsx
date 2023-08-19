import { LatLngExpression, LeafletEventHandlerFnMap, LatLng, LeafletMouseEvent } from 'leaflet';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { FinishPointMarker } from './FinishPointMarker';
import { KYIV_POSITION, METERS_IN_KM, PRIMARY_APP_COLOR } from '../../../constants';
import MapRouting from './MapRouting';
import { LocationPopup } from './LocationPopup';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setDistanceInKms,
  setFinishPoint,
  setStartPoint,
  setStartAddress,
  setFinishAddress,
  setCanBuildRoute,
} from '../../store/routeSlice';
import { customMarker } from './customMarker';

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

  const succ: PositionCallback = (pos) => {
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
  navigator.geolocation.getCurrentPosition(succ, () => {
    setPosition(KYIV_POSITION);
  });

  const dragLocation: LeafletEventHandlerFnMap = {
    mousedown: (): void => {
      dispatch(setCanBuildRoute(false));
    },
    mouseup: (event: LeafletMouseEvent): void => {
      const { lat, lng } = event.latlng;
      dispatch(setStartPoint({ lat, lng }));
      dispatch(setCanBuildRoute(true));
    },
  };

  const changeDistanceInKm = (distance: number): void => {
    dispatch(setDistanceInKms(distance / METERS_IN_KM));
  };

  const changeStartPoint = (lat: number, lng: number): void => {
    dispatch(setStartPoint({ lat, lng }));
  };

  const changeFinishPoint = (lat: number, lng: number): void => {
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
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={mapStyle}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {!startPoint && (
            <>
              <Marker position={position} icon={customMarker(PRIMARY_APP_COLOR)} />
              <LocationPopup position={position} />
            </>
          )}
          {startPoint && (
            <Marker
              position={startPoint}
              draggable
              eventHandlers={dragLocation}
              icon={customMarker(PRIMARY_APP_COLOR)}
            >
              <Popup>From</Popup>
            </Marker>
          )}
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
