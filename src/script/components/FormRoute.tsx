import { Button, Form, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks';
import { currencyExchUahInUsd, priceUsdPerKm } from '../../constants';
import { convertSumToStr, fetchGeocode } from '../utils';
import { setFinishPoint, setStartPoint } from '../store/routeSlice';
import { useState } from 'react';
import { GeocodeSelect } from './GeocodeSelect';
import { IGeocodeValue, TLatLng } from '../models';

export const FormRoute = () => {
  const { distanceInKms, startPoint, finishPoint } = useAppSelector((state) => state.route);
  const dispatch = useAppDispatch();
  const { Paragraph } = Typography;

  const resetRoute = (): void => {
    dispatch(setStartPoint(null));
    dispatch(setFinishPoint(null));
  };

  const reverseRoute = (): void => {
    const newStartPoint = finishPoint;
    const newFinishPoint = startPoint;
    resetRoute();
    dispatch(setStartPoint(newStartPoint));
    dispatch(setFinishPoint(newFinishPoint));
  };

  const setNewStartPoint = (newPoint: TLatLng | null): void => {
    dispatch(setStartPoint(newPoint));
  };

  const setNewFinishPoint = (newPoint: TLatLng | null): void => {
    dispatch(setFinishPoint(newPoint));
  };

  const [valueStart, setValueStart] = useState<IGeocodeValue[]>([]);
  const [valueFinish, setValueFinish] = useState<IGeocodeValue[]>([]);

  return (
    <>
      <Form labelCol={{ span: 2 }} wrapperCol={{ xs: { span: 16 }, lg: { span: 8 } }}>
        <Form.Item
          label="From"
          rules={[{ required: true, message: 'Please input your point of departure!' }]}
        >
          <GeocodeSelect
            value={valueStart}
            placeholder="Enter point of departure"
            fetchOptions={fetchGeocode}
            onChange={(newValue) => {
              setValueStart(newValue as IGeocodeValue[]);
            }}
            style={{ width: '100%' }}
            setPoint={setNewStartPoint}
          />
        </Form.Item>
        <Form.Item
          label="To"
          rules={[{ required: true, message: 'Please input your destination!' }]}
        >
          <GeocodeSelect
            value={valueFinish}
            placeholder="Enter point of departure"
            fetchOptions={fetchGeocode}
            onChange={(newValue) => {
              setValueFinish(newValue as IGeocodeValue[]);
            }}
            style={{ width: '100%' }}
            setPoint={setNewFinishPoint}
          />
        </Form.Item>
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
      <Button type="default" disabled={!startPoint || !finishPoint} onClick={reverseRoute}>
        Reverse the route
      </Button>
    </>
  );
};
