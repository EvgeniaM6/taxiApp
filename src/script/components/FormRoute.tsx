import { Button, Form, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks';
import { currencyExchUahInUsd, priceUsdPerKm } from '../../constants';
import { convertSumToStr } from '../utils';
import { setFinishPoint, setStartPoint } from '../store/routeSlice';

export const FormRoute = () => {
  const { distanceInKms } = useAppSelector((state) => state.route);
  const dispatch = useAppDispatch();
  const { Paragraph } = Typography;

  const resetRoute = (): void => {
    dispatch(setStartPoint(null));
    dispatch(setFinishPoint(null));
  };

  return (
    <>
      <Form labelCol={{ span: 2 }} wrapperCol={{ xs: { span: 16 }, lg: { span: 8 } }}>
        {/* <Form.Item
          label="From"
          rules={[{ required: true, message: 'Please input your point of departure!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="To"
          rules={[{ required: true, message: 'Please input your destination!' }]}
        >
          <Input />
        </Form.Item> */}
        <Paragraph>
          {distanceInKms
            ? `${convertSumToStr(
                Math.round(distanceInKms * priceUsdPerKm * currencyExchUahInUsd)
              )} UAH`
            : `Build your roote, please`}
        </Paragraph>
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit">
            Order a taxi
          </Button>
        </Form.Item>
      </Form>
      <Button type="default" onClick={resetRoute}>
        Reset the route
      </Button>
    </>
  );
};
