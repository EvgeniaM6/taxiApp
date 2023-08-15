import { EnvironmentFilled } from '@ant-design/icons';
import { DivIcon, LeafletEventHandlerFnMap, LeafletMouseEvent } from 'leaflet';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { renderToString } from 'react-dom/server';
import { secondaryAppColor } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCanBuildRoute, setFinishPoint } from '../../store/routeSlice';

const iconHtmlString = renderToString(
  <EnvironmentFilled
    style={{ color: secondaryAppColor, transform: 'translate(0px, -25px) scale(3.5)' }}
  />
);
const icon: DivIcon = new DivIcon({ html: iconHtmlString });

export const FinishPointMarker = () => {
  const { finishPoint } = useAppSelector((state) => state.route);
  const dispatch = useAppDispatch();

  useMapEvents({
    dblclick(e) {
      if (finishPoint) return;
      const { lat, lng } = e.latlng;
      dispatch(setFinishPoint({ lat, lng }));
    },
  });

  const dragLocation: LeafletEventHandlerFnMap = {
    mousedown: (): void => {
      dispatch(setCanBuildRoute(false));
    },
    mouseup: (event: LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      dispatch(setFinishPoint({ lat, lng }));
      dispatch(setCanBuildRoute(true));
    },
  };

  return finishPoint === null ? null : (
    <Marker position={finishPoint} draggable icon={icon} eventHandlers={dragLocation} opacity={1}>
      <Popup>To</Popup>
    </Marker>
  );
};
