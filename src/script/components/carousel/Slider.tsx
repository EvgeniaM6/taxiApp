import { Carousel } from 'antd';
import Client1 from '../../../assets/images/jpeg/smiling-young-woman-looking-away.jpg';
import Client2 from '../../../assets/images/jpeg/women-waiting-for-taxi.jpg';
import Client3 from '../../../assets/images/jpeg/handsome-man-talking-smartphone-while.jpg';
import { Slide } from './Slide';

export const Slider = () => {
  return (
    <Carousel autoplay easing="ease-out">
      <Slide imgSrc={Client1} title="trips">
        order in seconds, leave in a few minutes
      </Slide>
      <Slide imgSrc={Client2} title="delivery">
        fast delivery of your favorite dishes
      </Slide>
      <Slide imgSrc={Client3} title="business trips">
        management of corporate trips of employees and customers
      </Slide>
    </Carousel>
  );
};
