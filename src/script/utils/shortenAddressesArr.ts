import { AMOUNT_LETTERS_OF_ADDRESS } from '../../constants';
import { TTripsFilterData } from '../models';

export const shortenAddressesArr = (addressStrArr: string[]): TTripsFilterData[] => {
  return new Array(...new Set(addressStrArr)).map((address: string) => {
    return {
      text:
        address.length < AMOUNT_LETTERS_OF_ADDRESS
          ? address
          : `${address.slice(0, AMOUNT_LETTERS_OF_ADDRESS)}...`,
      value: address,
    };
  });
};
