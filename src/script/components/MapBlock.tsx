import { LatLngExpression, LeafletEventHandlerFnMap, DivIcon, LatLng } from 'leaflet';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { LocationMarker } from './LocationMarker';
import { renderToString } from 'react-dom/server';
import { EnvironmentFilled } from '@ant-design/icons';
import { primaryAppColor } from '../../constants';
import MapRouting from './MapRouting';

const iconHtmlString = renderToString(
  <EnvironmentFilled style={{ color: primaryAppColor, transform: 'scale(3.5)' }} />
);
const icon: DivIcon = new DivIcon({ html: iconHtmlString });

export const MapBlock = () => {
  const mapStyle: React.CSSProperties = {
    height: '500px',
  };

  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const [startPoint, setStartPoint] = useState<LatLngExpression | null>(null);
  const [finishPoint, setFinishPoint] = useState<LatLngExpression | null>(null);
  const [canBuildRoute, setCanBuildRoute] = useState(false);

  const changeStartPosition = (newPosition: LatLngExpression): void => {
    setPosition(newPosition);
    setStartPoint(newPosition);
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
      setStartPoint(newPosition);
      setCanBuildRoute(true);
    },
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
            <Marker position={position} draggable eventHandlers={dragLocation} icon={icon}>
              <Popup>From</Popup>
            </Marker>
          )}
          {startPoint && (
            <Marker position={startPoint} draggable eventHandlers={dragLocation} icon={icon}>
              <Popup>From</Popup>
            </Marker>
          )}
          <LocationMarker
            position={finishPoint}
            setPosition={setFinishPoint}
            setCanBuildRoute={setCanBuildRoute}
          />
          {startPoint && finishPoint && canBuildRoute && (
            <MapRouting
              position="bottomright"
              startPoint={startPoint}
              finishPoint={finishPoint}
              setStartPoint={setStartPoint}
              setFinishPoint={setFinishPoint}
            />
          )}
        </MapContainer>
      )}
    </>
  );
};
