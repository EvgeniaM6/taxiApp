import { Typography } from 'antd';
import { useAppSelector } from '../../hooks';
import { convertSumToStr } from '../../utils';
import { CAR_CLASSES_OBJ, CURRENCY_EXCH_UAH_IN_USD } from '../../../constants';
import { useTranslation } from 'react-i18next';

export const RouteCost = () => {
  const { Text } = Typography;
  const { distanceInKms, carClass } = useAppSelector((state) => state.route);
  const { t } = useTranslation();
  const { priceUsdPerKm } = CAR_CLASSES_OBJ[carClass];

  return (
    <Text>
      {`${t('routeCostText1')}: ${
        distanceInKms
          ? `${convertSumToStr(
              Math.round(distanceInKms * priceUsdPerKm * CURRENCY_EXCH_UAH_IN_USD)
            )} ${t('routeCostText2')}`
          : t('routeCostTextNoRoute')
      }`}
    </Text>
  );
};
