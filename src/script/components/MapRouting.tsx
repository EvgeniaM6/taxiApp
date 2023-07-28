import L, { ControlOptions, LatLng, LatLngExpression } from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import { geocoders } from 'leaflet-control-geocoder';
import { metersInKm, primaryAppColor } from '../../constants';
import { useAppDispatch } from '../hooks';
import { setDistanceInKms } from '../store/routeSlice';

export interface TWaypointsProps extends ControlOptions {
  startPoint: LatLngExpression;
  finishPoint: LatLngExpression;
  setStartPoint: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
  setFinishPoint: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
}

const createRoutineMachineLayer = (props: TWaypointsProps): L.Routing.Control => {
  const dispatch = useAppDispatch();

  const { startPoint, finishPoint, setStartPoint, setFinishPoint } = props;
  const { lat: startLat, lng: startLng } = startPoint as LatLng;
  const { lat: finishLat, lng: finishLng } = finishPoint as LatLng;

  const changeWaypoints = (e: L.Routing.RoutingEvent): void => {
    const { waypoints } = e;
    const [newStartWaypoint, newFinishWaypoint] = waypoints;
    const newStartLatLng = newStartWaypoint.latLng;
    const newFinishLatLng = newFinishWaypoint.latLng;

    setStartPoint(newStartLatLng);
    setFinishPoint(newFinishLatLng);
  };

  const calculateDistance = (e: L.Routing.RoutingResultEvent): void => {
    const { summary } = e.routes[0];
    if (!summary) return;
    const { totalDistance } = summary;
    dispatch(setDistanceInKms(totalDistance / metersInKm));
  };

  const instance = L.Routing.control({
    waypoints: [L.latLng(startLat, startLng), L.latLng(finishLat, finishLng)],
    lineOptions: {
      extendToWaypoints: true,
      missingRouteTolerance: 0,
      styles: [{ color: primaryAppColor, weight: 4 }],
    },
    show: true,
    addWaypoints: false,
    routeWhileDragging: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
    geocoder: new geocoders.Nominatim(),
  })
    .on('waypointschanged', changeWaypoints)
    .on('routesfound', calculateDistance);

  return instance;
};

const MapRouting = createControlComponent(createRoutineMachineLayer);

export default MapRouting;
