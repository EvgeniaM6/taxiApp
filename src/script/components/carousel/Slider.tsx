import { Carousel } from 'antd';
import Client1 from '../../../assets/images/jpeg/smiling-young-woman-looking-away.jpg';
import Client2 from '../../../assets/images/jpeg/women-waiting-for-taxi.jpg';
import Client3 from '../../../assets/images/jpeg/handsome-man-talking-smartphone-while.jpg';
import { Slide } from './Slide';
import { useTranslation } from 'react-i18next';

export const Slider = () => {
  const { t } = useTranslation();

  return (
    <Carousel autoplay easing="ease-out">
      <Slide imgSrc={Client1} title={t('imgTitle1')}>
        {t('imgDescription1')}
      </Slide>
      <Slide imgSrc={Client2} title={t('imgTitle2')}>
        {t('imgDescription2')}
      </Slide>
      <Slide imgSrc={Client3} title={t('imgTitle3')}>
        {t('imgDescription3')}
      </Slide>
    </Carousel>
  );
};
