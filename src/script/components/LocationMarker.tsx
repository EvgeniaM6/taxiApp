import { EnvironmentFilled } from '@ant-design/icons';
import { DivIcon, LatLngExpression, LeafletEventHandlerFnMap } from 'leaflet';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { renderToString } from 'react-dom/server';
import { secondaryAppColor } from '../../constants';

const iconHtmlString = renderToString(
  <EnvironmentFilled style={{ color: secondaryAppColor, transform: 'scale(3.5)' }} />
);
const icon: DivIcon = new DivIcon({ html: iconHtmlString });

export const LocationMarker = (props: {
  position: LatLngExpression | null;
  setPosition: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
}) => {
  const { position, setPosition } = props;

  const map = useMapEvents({
    click(e) {
      map.locate();
      setPosition(e.latlng);
    },
  });

  const dragLocation: LeafletEventHandlerFnMap = {
    mouseup: (event) => {
      setPosition(event.latlng);
    },
  };

  return position === null ? null : (
    <Marker position={position} draggable icon={icon} eventHandlers={dragLocation}>
      <Popup>To</Popup>
    </Marker>
  );
};
