import { Typography } from 'antd';
import { useAppSelector } from '../../hooks';
import { convertSumToStr } from '../../utils';
import { carClassesObj, currencyExchUahInUsd } from '../../../constants';

export const RouteCost = () => {
  const { Paragraph } = Typography;
  const { distanceInKms, carClass } = useAppSelector((state) => state.route);
  const { priceUsdPerKm } = carClassesObj[carClass];

  return (
    <Paragraph>
      {distanceInKms
        ? `${convertSumToStr(Math.round(distanceInKms * priceUsdPerKm * currencyExchUahInUsd))} UAH`
        : `Build your roote, please`}
    </Paragraph>
  );
};
