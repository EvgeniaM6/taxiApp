import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import { geocoders } from 'leaflet-control-geocoder';
import { primaryAppColor } from '../../constants';
import { IWaypointsProps } from '../models';

const createRoutineMachineLayer = (props: IWaypointsProps): L.Routing.Control => {
  const { startPoint, finishPoint, changeDistanceInKm, changeStartPoint, changeFinishPoint } =
    props;

  if (!startPoint || !finishPoint) {
    const instance = L.Routing.control();
    return instance;
  }

  const { lat: startLat, lng: startLng } = startPoint;
  const { lat: finishLat, lng: finishLng } = finishPoint;

  const changeWaypoints = (e: L.Routing.RoutingEvent): void => {
    const { waypoints } = e;
    const [newStartWaypoint, newFinishWaypoint] = waypoints;
    const newStartLatLng = newStartWaypoint.latLng;
    const newFinishLatLng = newFinishWaypoint.latLng;

    changeStartPoint(newStartLatLng.lat, newStartLatLng.lng);
    changeFinishPoint(newFinishLatLng.lat, newFinishLatLng.lng);
  };

  const calculateDistance = (e: L.Routing.RoutingResultEvent): void => {
    const { summary } = e.routes[0];
    if (!summary) return;
    const { totalDistance } = summary;
    changeDistanceInKm(totalDistance);
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
