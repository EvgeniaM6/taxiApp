import { TCarClassesObj } from '../script/models';

export const METERS_IN_KM = 1000;

export const CURRENCY_EXCH_UAH_IN_USD = 30;

export const CAR_CLASSES_OBJ: TCarClassesObj = {
  econom: {
    title: 'Econom',
    priceUsdPerKm: 0.35,
  },
  standard: {
    title: 'Standard',
    priceUsdPerKm: 0.5,
  },
  lux: {
    title: 'Lux',
    priceUsdPerKm: 0.75,
  },
};
