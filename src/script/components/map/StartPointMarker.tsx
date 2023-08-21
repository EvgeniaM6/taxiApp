import { LatLngExpression, LeafletEventHandlerFnMap, LeafletMouseEvent } from 'leaflet';
import { Marker, Popup, useMap } from 'react-leaflet';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { LocationPopup } from './LocationPopup';
import { customMarker } from './customMarker';
import { PRIMARY_APP_COLOR } from '../../../constants';
import { setCanBuildRoute, setStartPoint } from '../../store/routeSlice';
import { useEffect } from 'react';

export const StartPointMarker = (props: { position: LatLngExpression }) => {
  const { position } = props;
  const { startPoint } = useAppSelector((state) => state.route);
  const dispatch = useAppDispatch();
  const map = useMap();

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

  useEffect(() => {
    if (!startPoint) return;
    map.flyTo(startPoint);
  }, [startPoint]);

  return (
    <>
      {startPoint ? (
        <Marker
          position={startPoint}
          draggable
          eventHandlers={dragLocation}
          icon={customMarker(PRIMARY_APP_COLOR)}
        >
          <Popup>From</Popup>
        </Marker>
      ) : (
        <>
          <Marker position={position} icon={customMarker(PRIMARY_APP_COLOR)} />
          <LocationPopup position={position} />
        </>
      )}
    </>
  );
};
