import { geocoders } from 'leaflet-control-geocoder';
import { GeocodingResult } from 'leaflet-control-geocoder/dist/geocoders';

const geocoder = new geocoders.Nominatim();

export async function fetchGeocode(username: string): Promise<GeocodingResult[]> {
  return new Promise((resolve) => {
    geocoder.geocode(username, (resultsArr) => {
      resolve(resultsArr);
    });
  });
}
