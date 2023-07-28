import { Button, Form, Typography } from 'antd';
import { useAppSelector } from '../hooks';
import { priceUsdPerKm } from '../../constants';
import { convertSumToStr } from '../utils';

export const FormRoute = () => {
  const { distanceInKms } = useAppSelector((state) => state.route);
  const { Paragraph } = Typography;

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
            ? `${convertSumToStr(Math.round(distanceInKms * priceUsdPerKm * 30))} UAH`
            : `Build your roote, please`}
        </Paragraph>
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit">
            Order a taxi
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
