import { LatLng, LatLngExpression, LeafletEventHandlerFnMap, LeafletMouseEvent } from 'leaflet';
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { customMarker } from './customMarker';
import { PRIMARY_APP_COLOR } from '../../../constants';
import { setCanBuildRoute, setStartPoint } from '../../store/routeSlice';
import { useEffect } from 'react';
import L from 'leaflet';

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

  useMapEvents({
    popupclose() {
      if (startPoint) return;
      const { lat, lng } = position as LatLng;
      dispatch(setStartPoint({ lat, lng }));
      dispatch(setCanBuildRoute(true));
    },
  });

  const popup = L.popup();
  popup.setLatLng(position).setContent('You are here?');

  useEffect(() => {
    if (!startPoint) {
      map.openPopup(popup);
      return;
    }
    map.flyTo(startPoint);
    map.closePopup();
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
        </>
      )}
    </>
  );
};
