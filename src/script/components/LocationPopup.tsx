import L, { LatLngExpression } from 'leaflet';
import { useMap } from 'react-leaflet';

export const LocationPopup = (props: {
  position: LatLngExpression;
  setStartPoint: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
  setCanBuildRoute: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const map = useMap();
  const { position, setStartPoint, setCanBuildRoute } = props;
  const popup = L.popup();
  popup
    .setLatLng(position)
    .setContent('You are here?')
    .on('remove', (e) => {
      console.log('remove', e);
      setStartPoint(position);
      setCanBuildRoute(true);
    })
    .addTo(map);

  return null;
};
