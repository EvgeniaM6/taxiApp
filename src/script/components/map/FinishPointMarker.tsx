import { LeafletEventHandlerFnMap, LeafletMouseEvent } from 'leaflet';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { SECONDARY_APP_COLOR } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCanBuildRoute, setFinishPoint } from '../../store/routeSlice';
import { customMarker } from './customMarker';

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
    <Marker
      position={finishPoint}
      draggable
      eventHandlers={dragLocation}
      icon={customMarker(SECONDARY_APP_COLOR)}
    >
      <Popup>To</Popup>
    </Marker>
  );
};
