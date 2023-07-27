import L, { ControlOptions, LatLng, LatLngExpression } from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import { geocoders } from 'leaflet-control-geocoder';
import { secondaryAppColor } from '../../constants';

export interface TWaypointsProps extends ControlOptions {
  startPoint: LatLngExpression;
  finishPoint: LatLngExpression;
  setStartPoint: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
  setFinishPoint: React.Dispatch<React.SetStateAction<LatLngExpression | null>>;
}

const createRoutineMachineLayer = (props: TWaypointsProps) => {
  const { startPoint, finishPoint, setStartPoint, setFinishPoint } = props;
  const { lat: startLat, lng: startLng } = startPoint as LatLng;
  const { lat: finishLat, lng: finishLng } = finishPoint as LatLng;

  const changeWaypoints = (e: L.Routing.RoutingEvent) => {
    const { waypoints } = e;
    const [newStartWaypoint, newFinishWaypoint] = waypoints;
    const newStartLatLng = newStartWaypoint.latLng;
    const newFinishLatLng = newFinishWaypoint.latLng;

    setStartPoint(newStartLatLng);
    setFinishPoint(newFinishLatLng);
  };

  const instance = L.Routing.control({
    waypoints: [L.latLng(startLat, startLng), L.latLng(finishLat, finishLng)],
    lineOptions: {
      extendToWaypoints: true,
      missingRouteTolerance: 0,
      styles: [{ color: secondaryAppColor, weight: 4 }],
    },
    show: true,
    addWaypoints: false,
    routeWhileDragging: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
    geocoder: new geocoders.Nominatim(),
  }).on('waypointschanged', changeWaypoints);

  return instance;
};

const MapRouting = createControlComponent(createRoutineMachineLayer);

export default MapRouting;
