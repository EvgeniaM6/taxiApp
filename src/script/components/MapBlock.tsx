import { LatLngExpression, LeafletEventHandlerFnMap, DivIcon, LatLng } from 'leaflet';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { FinishPointMarker } from './FinishPointMarker';
import { renderToString } from 'react-dom/server';
import { EnvironmentFilled } from '@ant-design/icons';
import { metersInKm, primaryAppColor } from '../../constants';
import MapRouting from './MapRouting';
import { LocationPopup } from './LocationPopup';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setDistanceInKms, setFinishPoint, setStartPoint } from '../store/routeSlice';

const iconHtmlString = renderToString(
  <EnvironmentFilled
    style={{ color: primaryAppColor, transform: 'translate(0px, -25px) scale(3.5)' }}
  />
);
const icon: DivIcon = new DivIcon({ html: iconHtmlString });

export const MapBlock = () => {
  const mapStyle: React.CSSProperties = {
    height: '500px',
  };

  const { startPoint, finishPoint } = useAppSelector((state) => state.route);
  const dispatch = useAppDispatch();
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const [canBuildRoute, setCanBuildRoute] = useState(!!startPoint && !!finishPoint);

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
  navigator.geolocation.getCurrentPosition(succ);

  const dragLocation: LeafletEventHandlerFnMap = {
    mousedown: () => setCanBuildRoute(false),
    mouseup: (event): void => {
      const newPosition = event.latlng;
      const { lat, lng } = newPosition;
      dispatch(setStartPoint({ lat, lng }));
      setCanBuildRoute(true);
    },
  };

  const changeDistanceInKm = (distance: number): void => {
    dispatch(setDistanceInKms(distance / metersInKm));
  };

  const changeStartPoint = (lat: number, lng: number): void => {
    dispatch(setStartPoint({ lat, lng }));
  };

  const changeFinishPoint = (lat: number, lng: number): void => {
    dispatch(setFinishPoint({ lat, lng }));
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
              <Marker position={position} icon={icon} />
              <LocationPopup position={position} setCanBuildRoute={setCanBuildRoute} />
            </>
          )}
          {startPoint && (
            <Marker position={startPoint} draggable eventHandlers={dragLocation} icon={icon}>
              <Popup>From</Popup>
            </Marker>
          )}
          <FinishPointMarker setCanBuildRoute={setCanBuildRoute} />
          {startPoint && finishPoint && canBuildRoute && (
            <MapRouting
              startPoint={startPoint}
              finishPoint={finishPoint}
              changeDistanceInKm={changeDistanceInKm}
              changeStartPoint={changeStartPoint}
              changeFinishPoint={changeFinishPoint}
            />
          )}
        </MapContainer>
      )}
    </>
  );
};
