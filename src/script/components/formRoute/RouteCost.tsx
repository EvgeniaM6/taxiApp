import { Typography } from 'antd';
import { useAppSelector } from '../../hooks';
import { convertSumToStr } from '../../utils';
import { CAR_CLASSES_OBJ, CURRENCY_EXCH_UAH_IN_USD } from '../../../constants';

export const RouteCost = () => {
  const { Text } = Typography;
  const { distanceInKms, carClass } = useAppSelector((state) => state.route);
  const { priceUsdPerKm } = CAR_CLASSES_OBJ[carClass];

  return (
    <Text>
      {`Cost: ${
        distanceInKms
          ? `${convertSumToStr(
              Math.round(distanceInKms * priceUsdPerKm * CURRENCY_EXCH_UAH_IN_USD)
            )} UAH`
          : `Build your roote, please`
      }`}
    </Text>
  );
};
