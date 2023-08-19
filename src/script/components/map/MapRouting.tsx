import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import { geocoders } from 'leaflet-control-geocoder';
import { PRIMARY_APP_COLOR } from '../../../constants';
import { IWaypointsProps } from '../../models';

const createRoutineMachineLayer = ({
  startPoint,
  finishPoint,
  changeDistanceInKm,
  changeStartPoint,
  changeFinishPoint,
  changeStartAddress,
  changeFinishAddress,
}: IWaypointsProps): L.Routing.Control => {
  if (!startPoint || !finishPoint) {
    const instance = L.Routing.control();
    return instance;
  }

  const { lat: startLat, lng: startLng } = startPoint;
  const { lat: finishLat, lng: finishLng } = finishPoint;

  const changeAddress = (result: geocoders.NominatimResult): void => {
    const { lat, lon, display_name } = result;
    const latNum = Number(lat);
    const lngNum = Number(lon);
    const distanceLatToStart = Math.abs(latNum - startLat);
    const distanceLngToStart = Math.abs(lngNum - startLng);
    const distanceLatToFinish = Math.abs(latNum - finishLat);
    const distanceLngToFinish = Math.abs(lngNum - finishLng);
    if (distanceLatToStart + distanceLngToStart < distanceLatToFinish + distanceLngToFinish) {
      changeStartAddress(display_name);
    } else {
      changeFinishAddress(display_name);
    }
  };

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
      styles: [{ color: PRIMARY_APP_COLOR, weight: 4 }],
    },
    show: true,
    addWaypoints: false,
    routeWhileDragging: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
    geocoder: new geocoders.Nominatim({
      htmlTemplate(r) {
        changeAddress(r);
        return '';
      },
    }),
  })
    .on('waypointschanged', changeWaypoints)
    .on('routesfound', calculateDistance);

  return instance;
};

const MapRouting = createControlComponent(createRoutineMachineLayer);

export default MapRouting;
