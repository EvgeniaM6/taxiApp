import { LatLngExpression, LatLngTuple, LeafletEventHandlerFnMap, DivIcon } from 'leaflet';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { LocationMarker } from './LocationMarker';
import { renderToString } from 'react-dom/server';
import { EnvironmentFilled } from '@ant-design/icons';
import { primaryAppColor } from '../../constants';

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

  const succ: PositionCallback = (pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const newPosition: LatLngExpression = [lat, lng];
    if (!position) {
      setPosition(newPosition);
      return;
    }
    const isSimilarPosition = (position as LatLngTuple)[0] === lat;
    if (isSimilarPosition) return;
    setPosition(newPosition);
    setStartPoint(newPosition);
  };
  navigator.geolocation.getCurrentPosition(succ);

  const dragLocation: LeafletEventHandlerFnMap = {
    mouseup: (event) => {
      setStartPoint(event.latlng);
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
          <Marker position={position} draggable eventHandlers={dragLocation} icon={icon}>
            <Popup>From</Popup>
          </Marker>
          <LocationMarker position={finishPoint} setPosition={setFinishPoint} />
        </MapContainer>
      )}
      <EnvironmentFilled />
    </>
  );
};
