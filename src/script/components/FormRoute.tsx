import { Button, Form } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchGeocode } from '../utils';
import { setFinishPoint, setStartPoint, setDistanceInKms } from '../store/routeSlice';
import { useEffect, useState } from 'react';
import { GeocodeSelect } from './GeocodeSelect';
import { IGeocodeValue, TLatLng } from '../models';
import { geocoders } from 'leaflet-control-geocoder';
import { LatLngLiteral } from 'leaflet';
import { GeocodingResult } from 'leaflet-control-geocoder/dist/geocoders';
import { CarClassChoice } from './CarClassChoice';
import { RouteCost } from './RouteCost';

const geocoder = new geocoders.Nominatim();

export const FormRoute = () => {
  const { startPoint, finishPoint } = useAppSelector((state) => state.route);
  const dispatch = useAppDispatch();

  const resetRoute = (): void => {
    dispatch(setStartPoint(null));
    dispatch(setFinishPoint(null));
    dispatch(setDistanceInKms(0));
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

  useEffect(() => {
    if (startPoint) {
      geocoder.reverse(startPoint as LatLngLiteral, 1, (resultsArr) => {
        const geocodeValuesArr = resultsArr.map((resultObj: GeocodingResult) => ({
          label: resultObj.name,
          value: resultObj.properties.place_id,
        }));

        setValueStart(geocodeValuesArr);
      });
    } else {
      setValueStart([]);
    }
  }, [startPoint]);

  useEffect(() => {
    if (finishPoint) {
      geocoder.reverse(finishPoint as LatLngLiteral, 1, (resultsArr) => {
        const geocodeValuesArr = resultsArr.map((resultObj: GeocodingResult) => ({
          label: resultObj.name,
          value: resultObj.properties.place_id,
        }));

        setValueFinish(geocodeValuesArr);
      });
    } else {
      setValueFinish([]);
    }
  }, [finishPoint]);

  return (
    <>
      <Form labelCol={{ span: 2 }} wrapperCol={{ xs: { span: 16 }, lg: { span: 8 } }}>
        <Form.Item label="Car class">
          <CarClassChoice />
        </Form.Item>
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
        <RouteCost />
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
