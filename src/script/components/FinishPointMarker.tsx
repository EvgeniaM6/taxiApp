import { EnvironmentFilled } from '@ant-design/icons';
import { DivIcon, LatLngExpression, LeafletEventHandlerFnMap } from 'leaflet';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { renderToString } from 'react-dom/server';
import { secondaryAppColor } from '../../constants';

const iconHtmlString = renderToString(
  <EnvironmentFilled
    style={{ color: secondaryAppColor, transform: 'translate(0px, -25px) scale(3.5)' }}
  />
);
const icon: DivIcon = new DivIcon({ html: iconHtmlString });

export const FinishPointMarker = (props: {
  position: LatLngExpression | null;
  setPosition: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
  setCanBuildRoute: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { position, setPosition, setCanBuildRoute } = props;

  useMapEvents({
    dblclick(e) {
      if (position) return;
      setPosition(e.latlng);
    },
  });

  const dragLocation: LeafletEventHandlerFnMap = {
    mousedown: () => setCanBuildRoute(false),
    mouseup: (event) => {
      setPosition(event.latlng);
      setCanBuildRoute(true);
    },
  };

  return position === null ? null : (
    <Marker position={position} draggable icon={icon} eventHandlers={dragLocation} opacity={1}>
      <Popup>To</Popup>
    </Marker>
  );
};
