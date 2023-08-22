import { TCarClassesObj } from '../script/models';

export const METERS_IN_KM = 1000;

export const CURRENCY_EXCH_UAH_IN_USD = 30;

export const CAR_CLASSES_OBJ: TCarClassesObj = {
  econom: {
    title: {
      en: 'Econom',
      ua: 'Економ',
    },
    priceUsdPerKm: 0.35,
  },
  standard: {
    title: {
      en: 'Standard',
      ua: 'Стандарт',
    },
    priceUsdPerKm: 0.5,
  },
  lux: {
    title: {
      en: 'Lux',
      ua: 'Люкс',
    },
    priceUsdPerKm: 0.75,
  },
};
