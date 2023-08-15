import L, { LatLng, LatLngExpression } from 'leaflet';
import { useMap } from 'react-leaflet';
import { useAppDispatch } from '../../hooks';
import { setCanBuildRoute, setStartPoint } from '../../store/routeSlice';

export const LocationPopup = (props: { position: LatLngExpression }) => {
  const dispatch = useAppDispatch();

  const map = useMap();
  const { position } = props;
  const popup = L.popup();
  popup
    .setLatLng(position)
    .setContent('You are here?')
    .on('remove', () => {
      const { lat, lng } = position as LatLng;
      dispatch(setStartPoint({ lat, lng }));
      dispatch(setCanBuildRoute(true));
    })
    .addTo(map);

  return null;
};
