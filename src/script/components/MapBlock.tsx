import { LatLngExpression, LatLngTuple } from 'leaflet';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export const MapBlock = () => {
  const mapStyle: React.CSSProperties = {
    height: '500px',
  };

  const [position, setPosition] = useState<LatLngExpression | null>(null);

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
  };
  navigator.geolocation.getCurrentPosition(succ);

  return (
    <>
      {position && (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={mapStyle}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
};
