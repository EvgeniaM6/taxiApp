import L, { LatLng, LatLngExpression } from 'leaflet';
import { useMap } from 'react-leaflet';
import { useAppDispatch } from '../../hooks';
import { setStartPoint } from '../../store/routeSlice';

export const LocationPopup = (props: {
  position: LatLngExpression;
  setCanBuildRoute: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const map = useMap();
  const { position, setCanBuildRoute } = props;
  const popup = L.popup();
  popup
    .setLatLng(position)
    .setContent('You are here?')
    .on('remove', () => {
      const { lat, lng } = position as LatLng;
      dispatch(setStartPoint({ lat, lng }));
      setCanBuildRoute(true);
    })
    .addTo(map);

  return null;
};
