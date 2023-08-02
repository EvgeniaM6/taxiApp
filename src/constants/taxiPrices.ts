import { TCarClassesObj } from '../script/models';

export const metersInKm = 1000;

export const currencyExchUahInUsd = 30;

export const carClassesObj: TCarClassesObj = {
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
