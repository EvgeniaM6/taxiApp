import { Button, Form } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchGeocode } from '../../utils';
import {
  setFinishPoint,
  setStartPoint,
  setDistanceInKms,
  setStartAddress,
  setFinishAddress,
} from '../../store/routeSlice';
import { useEffect, useState } from 'react';
import { GeocodeSelect } from './GeocodeSelect';
import { IGeocodeValue, TLatLng } from '../../models';
import { geocoders } from 'leaflet-control-geocoder';
import { LatLngLiteral } from 'leaflet';
import { GeocodingResult } from 'leaflet-control-geocoder/dist/geocoders';
import { CarClassChoice } from './CarClassChoice';
import { RouteCost } from './RouteCost';
const { Item } = Form;

const geocoder = new geocoders.Nominatim();

export const FormRoute = () => {
  const { startPoint, finishPoint, startAddress, finishAddress, distanceInKms } = useAppSelector(
    (state) => state.route
  );
  const dispatch = useAppDispatch();

  const resetRoute = (): void => {
    dispatch(setStartPoint(null));
    dispatch(setFinishPoint(null));
    dispatch(setStartAddress(''));
    dispatch(setFinishAddress(''));
    dispatch(setDistanceInKms(0));
  };

  const reverseRoute = (): void => {
    const newStartPoint = finishPoint;
    const newFinishPoint = startPoint;
    const newStartAddress = finishAddress;
    const newFinishAddress = startAddress;
    const newDistanceInKms = distanceInKms;
    resetRoute();
    dispatch(setStartPoint(newStartPoint));
    dispatch(setFinishPoint(newFinishPoint));
    dispatch(setStartAddress(newStartAddress));
    dispatch(setFinishAddress(newFinishAddress));
    dispatch(setDistanceInKms(newDistanceInKms));
  };

  const setNewStartPoint = (newPoint: TLatLng | null): void => {
    dispatch(setStartPoint(newPoint));
  };

  const setNewFinishPoint = (newPoint: TLatLng | null): void => {
    dispatch(setFinishPoint(newPoint));
  };

  const [valueStart, setValueStart] = useState<IGeocodeValue | null>(null);
  const [valueFinish, setValueFinish] = useState<IGeocodeValue | null>(null);

  useEffect(() => {
    if (startAddress) {
      setValueStart({ label: startAddress, value: startAddress.slice(0, 7) });
    } else if (startPoint) {
      geocoder.reverse(startPoint as LatLngLiteral, 100, (resultsArr) => {
        const geocodeValuesArr = resultsArr.map((resultObj: GeocodingResult) => ({
          label: resultObj.name,
          value: resultObj.properties.place_id,
        }));

        setValueStart(geocodeValuesArr[0]);
      });
    } else {
      setValueStart(null);
    }
  }, [startPoint, startAddress]);

  useEffect(() => {
    if (finishAddress) {
      setValueFinish({ label: finishAddress, value: finishAddress.slice(0, 7) });
    } else if (finishPoint) {
      geocoder.reverse(finishPoint as LatLngLiteral, 1, (resultsArr) => {
        const geocodeValuesArr = resultsArr.map((resultObj: GeocodingResult) => ({
          label: resultObj.name,
          value: resultObj.properties.place_id,
        }));

        setValueFinish(geocodeValuesArr[0]);
      });
    } else {
      setValueFinish(null);
    }
  }, [finishPoint, finishAddress]);

  const orderTaxi = () => {
    console.log('orderTaxi');
  };

  const handleChangeStartSelect = (newValue: IGeocodeValue | IGeocodeValue[]) => {
    setValueStart(newValue as IGeocodeValue);
  };

  const handleChangeFinishSelect = (newValue: IGeocodeValue | IGeocodeValue[]) => {
    setValueFinish(newValue as IGeocodeValue);
  };

  const changeStartAddress = (newAddress: string): void => {
    dispatch(setStartAddress(newAddress));
  };

  const changeFinishAddress = (newAddress: string): void => {
    dispatch(setFinishAddress(newAddress));
  };

  return (
    <>
      <Form
        labelCol={{ span: 2 }}
        wrapperCol={{ xs: { span: 16 }, lg: { span: 8 } }}
        onFinish={orderTaxi}
      >
        <Item label="Car class">
          <CarClassChoice />
        </Item>
        <Item
          label="From"
          rules={[{ required: true, message: 'Please input your point of departure!' }]}
        >
          <GeocodeSelect
            value={valueStart}
            placeholder="Enter point of departure"
            fetchOptions={fetchGeocode}
            onChange={handleChangeStartSelect}
            style={{ width: '100%' }}
            setPoint={setNewStartPoint}
            setAddress={changeStartAddress}
          />
        </Item>
        <Item label="To" rules={[{ required: true, message: 'Please input your destination!' }]}>
          <GeocodeSelect
            value={valueFinish}
            placeholder="Enter point of departure"
            fetchOptions={fetchGeocode}
            onChange={handleChangeFinishSelect}
            style={{ width: '100%' }}
            setPoint={setNewFinishPoint}
            setAddress={changeFinishAddress}
          />
        </Item>
        <RouteCost />
        <Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit">
            Order a taxi
          </Button>
        </Item>
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
